<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AccomplishmentReportController extends Controller
{
    protected $now;

    function __construct()
    {
        $this->now = Carbon::now('Asia/Manila');
    }

    public function index()
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year'))
            ->distinct()
            ->get(['year']);

        return Inertia::render('AccomplishmentReport', ['report' => 'Accomplishment', 'years'=>$years]);
    }

    public function accomplishmentData(Request $request)
    {
        try {
                $events = Event::with(['evaluationRates' => function ($query) {
                        $query->selectRaw(' event_id, count(q12) as rates, q12')
                            ->orderBy('q12', 'desc')
                            ->groupBy('event_id', 'q12');
                    }])
                    ->when($request->search, function ($query) use ($request) {
                        $query->where('title', 'LIKE', "%$request->search%");
                    })
                    ->when($request->year, function ($query) use ($request) {
                        $query->whereYear('dateStart', $request->year)
                            ->when(($request->quarter && $request->quarter!='month'), function ($query) use ($request) {
                                $start = Carbon::createFromFormat('Y-m-d', $request->year . '-01-01')
                                    ->startOfQuarter()->addMonths(($request->quarter - 1) * 3);
                                $end = $start->copy()->endOfQuarter();

                                $query->whereBetween('dateStart', [$start, $end]);
                            })
                            ->when($request->quarter == 'month', function ($query) use ($request) {

                                $query->whereMonth('dateStart', $this->now->month);
                            });
                    })
                    ->withCount('participant')
                    ->paginate(25);

            return response()->json($events);
            
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }
}
