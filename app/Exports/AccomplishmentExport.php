<?php

namespace App\Exports;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use stdClass;

class AccomplishmentExport implements FromView
{
    private $now;
    public function __construct(
        public int $year,
        public int|string $quarter,
        public object $reviewedby = new stdClass,
        public object $approvedby = new stdClass
    ) {
        $this->now = Carbon::now();
    }
    public function view(): View
    {
        if(!$this->year || !$this->quarter) {
            abort(404);
        }

        $years = Event::select(DB::raw('YEAR(dateStart) as year'))
            ->distinct()
            ->get(['year']);

        $found = $years->contains(function ($object) {
                return $object->year == $this->year;
            });

        if(!$found || (!is_numeric($this->quarter) && $this->quarter != "month")) abort(404);

        $events = Event::with(['evaluationRates' => function ($query) {
            $query->selectRaw(' event_id, count(q12) as rates, q12')
                ->orderBy('q12', 'desc')
                ->groupBy('event_id', 'q12');
        }])
        ->when($this->year, function ($query) {
            $query->whereYear('dateStart', $this->year)
                ->when(($this->quarter && $this->quarter!='month'), function ($query) {
                    $start = Carbon::createFromFormat('Y-m-d', $this->year . '-01-01', 'Asia/Manila')
                        ->startOfQuarter()->addMonths(($this->quarter - 1) * 3);
                    $end = $start->copy()->endOfQuarter();

                    $query->whereBetween('dateStart', [$start, $end]);
                })
                ->when($this->quarter == 'month', function ($query) {

                    $query->whereMonth('dateStart', $this->now->month);
                });
        })
        ->withCount('participant')
        ->get();

        $events->each(function ($event) {
            //dd($event->evaluationRates);
            $event->setRelation('evaluationRates', $event->evaluationRates->map(function ($rate) use ($event) {
                $levels = [
                    1 => "Poor",
                    2 => "Fair",
                    3 => "Satisfied",
                    4 => "Very Satisfied",
                    5 => "Excellent",
                ];
                return collect([
                    'percent' => number_format(($rate->rates/$event->participant_count) * 100, 2).'%',
                    'count' => $rate->rates,
                    'level' => $levels[$rate->q12],
                ]);
            }));
        });

        $quarters = [
            1 => "1st Quarter",
            2 => "2nd Quarter",
            3 => "3rd Quarter",
            4 => "4th Quarter",
            "month" => $this->now->format('F'),
        ];

        return view('Accomplishment', [
            "accomplishments" => $events,
            "year" => $this->year,
            "quarter" => $quarters[$this->quarter],
            "reviewedby" => $this->reviewedby,
            "approvedby" => $this->approvedby,
            "auth" => (object) [
                "name" => Auth::user()->first_name.' '.Auth::user()->last_name,
                "position" => Auth::user()->position,
                "date" => Carbon::now()->format("F d, Y")
            ]
        ]);
    }
}
