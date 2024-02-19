<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CBUController extends Controller
{
    protected $now;

    function __contruct()
    {
        $this->now = Carbon::now('Asia/Manila');
    }

    public function index()
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year'))
            ->distinct()
            ->get(['year']);

        $cbu = User::select('id', 'first_name', 'last_name', 'status') // Select the columns you need from User model
        ->has('trainingsAttended.attendance')
        ->withCount('trainingsAttended')
        ->paginate(20);

        return Inertia::render('CBUMonitoring', [
            "cbu_summary" => $cbu,
            "years" => $years->prepend(['year'=>null])
        ]);
    }

    public function indexJson(Request $request)
    {
        $cbu = User::select('id', 'first_name', 'last_name', 'status')
        ->when($request->search, function ($query) use ($request) {
            $query->where(function ($subquery) use ($request) {
                $subquery->where('first_name', 'LIKE', "%$request->search%")
                    ->orWhere('last_name', 'LIKE', "%$request->search%");
            })->orWhereHas('trainingsAttended.event', function ($subquery) use ($request) {
                $subquery->where('title', 'LIKE', "%$request->search%");
            });
        })
        ->when($request->year, function ($query) use ($request) {
            $query->whereHas('trainingsAttended.event', function ($query) use ($request) {
                $query->whereYear('dateStart', $request->year);
            });
        })
        ->has('trainingsAttended.attendance')
        ->withCount('trainingsAttended')
        ->paginate(20);

        return response()->json($cbu);  
    }

    public function eventsPerYear()
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year, title'))
            ->get(['year', 'title']);

        return response()->json($years);
    }
}
