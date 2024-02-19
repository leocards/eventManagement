<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventParticipants;
use App\Models\EventResourcePerson;
use App\Models\QualitativeAssessment;
use App\Models\QuantitativeAssessment;
use App\Models\QuantitativeAssessmentRP;
use App\Models\ResourcePerson;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PrintController extends Controller
{
    protected $now;

    function __construct()
    {
        $this->now = Carbon::now('Asia/Manila');
    }

    public function printAttendance(Request $request)
    {
        $attendance = EventParticipants::with('event')
            ->with('participants')
            ->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
            ->leftJoin('event_codes AS ec', function ($join) {
                $join->on('ec.event_id', '=', 'event_participants.event_id')
                    ->whereRaw('ec.id = (SELECT MIN(id) FROM event_codes WHERE event_codes.event_id = event_participants.event_id)');
            })
            ->select('a.*', 'event_participants.user_id', 'event_participants.event_id', 'ec.time_in AS event_time_in', 'ec.time_in_cutoff AS time_in_cutoff')
            ->when($request->event, function ($query) use ($request) {
                return $query->where('event_participants.event_id', $request->event);
            })
            ->when($request->id, function ($query) use ($request) {
                $query->where('event_participants.event_id', $request->id);
            })
            ->whereNotNull('a.time_in')
            ->latest('a.updated_at')
            ->get();
        
        $event = null;
        if($request->id) {
            $event = Event::leftJoin('event_codes AS ec', function ($join) {
                $join->on('ec.event_id', '=', 'events.id')
                    ->whereRaw('ec.id = (SELECT MIN(id) FROM event_codes WHERE event_codes.event_id = events.id)');
            })
            ->when($request->id, function ($query) use ($request) {
                $query->where('events.id', $request->id);
            })
            ->select('events.title', 'events.dateStart', 'events.dateEnd', 'events.platform', 'events.venue', 'ec.time_in', 'ec.time_out')
            ->first();
        }

        return Inertia::render('Prints/PrintAttendance', [
            "attendance" => $attendance,
            "event" => $event
        ]);
    }

    public function printCBU(Request $request)
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year'))
            ->distinct()
            ->get(['year']);    

        return Inertia::render("Prints/PrintCBU", [
            'years' => $years,
            'printYear' => $request->year
        ]);
    }

    public function getEmployeeTrainingsCBU(Request $request)
    {
        $users = User::with(['trainingsAttended' => function ($query) use ($request) {
                $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                    ->whereNotNull('a.time_in')
                    //->whereNotNull('a.time_out')
                    ->leftJoin('events AS e', function ($join) {
                        $join->on('e.id', '=', 'event_participants.event_id');
                    })
                    ->when($request->year, function ($subquery) use ($request) {
                        return $subquery->whereYear('e.dateStart', $request->year);
                    })
                    ->selectRaw('count(*) as trainings, user_id')
                    ->groupBy('user_id');
            }])
            ->with(['attendedEvent' => function ($query) use ($request) {
                $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                    ->leftJoin('events as e', 'e.id', '=', 'event_participants.event_id')
                    ->whereYear('e.dateStart', $request->year)
                    //->whereNotNull('a.time_in')
                    //->whereNotNull('a.time_out')
                    ->selectRaw('e.id as e_id, e.title, event_participants.event_id, event_participants.user_id, event_participants.id, a.event_participant_id, a.id');
            }])
            ->where('role', 'Employee')
            ->select('id', 'first_name', 'last_name', 'status')
            ->get();

        $events = Event::with(['participant' => function ($query) use ($request) {
                $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                    ->selectRaw('COUNT(*) as total, event_id')
                    ->groupBy('event_id');
            }])
            ->whereYear('dateStart', $request->year)
            ->orWhereYear('dateEnd', $request->year)
            ->get(['id', 'title']);
        
        return response()->json(collect([
            'users' => $users,
            'events' => $events
        ]));
    }

    public function PrintAccomplishment(Request $request)
    {
        if(!$request->year || !$request->quarter) {
            abort(404);
        }

        $years = Event::select(DB::raw('YEAR(dateStart) as year'))
            ->distinct()
            ->get(['year']);

        $found = $years->contains(function ($object) use ($request) {
                return $object->year == $request->year;
            });

        if(!$found || (!is_numeric($request->quarter) && $request->quarter != "month")) abort(404);

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
                    $start = Carbon::createFromFormat('Y-m-d', $request->year . '-01-01', 'Asia/Manila')
                        ->startOfQuarter()->addMonths(($request->quarter - 1) * 3);
                    $end = $start->copy()->endOfQuarter();

                    $query->whereBetween('dateStart', [$start, $end]);
                })
                ->when($request->quarter == 'month', function ($query) use ($request) {

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

        return Inertia::render('Prints/PrintAccomplishment', [
            "accomplishments" => $events,
            "year" => $request->year,
            "quarter" => $quarters[$request->quarter]
        ]);
    }

    public function printConsolidated(Event $event)
    {
        $data = QuantitativeAssessment::with(['gender' => function ($query) {
            $query->select('id', 'gender');
        }])
        ->where('event_id', $event->id)
        ->get();

        return Inertia::render('Prints/PrintConsolidated', [
            "consolidated" => $data,
            "event" => $event
        ]);
    }

    public function printQualiAssessment(Event $event)
    {
        $data = QualitativeAssessment::with('gender')
        ->where('event_id', $event->id)
        ->get();

        return Inertia::render('Prints/PrintAssessment', [
            "assessment" => $data,
            "event" => $event
        ]);
    }

    public function printResourcePersonRatings(ResourcePerson $rp, Event $event)
    {
        $data = QuantitativeAssessmentRP::with('gender')
        ->where('event_id', $event->id)
        ->get();

        return Inertia::render('Prints/PrintResourcePerson', [
            "ratings" => $data,
            "event" => $event,
            "rp" => $rp
        ]);
    }

    public function printCharts(Event $event) 
    {
        $evaluation = new EvaluationReportController();
        $rps = EventResourcePerson::where('event_id', $event->id)
            ->get()
            ->map(function ($data) {
                return $data->resourcePerson;
            });

        $rp_collection = collect([]);
        $rps->each(function($rp) use ($rp_collection, $evaluation, $event) {
            $evaluation->getRpRatingSummary($event, $rp->id);
            $rp_collection->push((object) [
                "rp" => $rp,
                "summary" => $evaluation->getRpRatingSummary($event, $rp->id)
            ]);
        });

        $activityAssessment = $evaluation->getActivityRatingSummary($event);
        $sexDesaggregeted = QuantitativeAssessmentRP::join('users as u', 'u.id', '=', 'quantitative_assessment_r_p_s.user_id')
            ->where('event_id', $event->id)
            ->selectRaw('COUNT(u.id) as count, u.gender')
            ->groupBy('u.gender')
            ->get()
            ->pluck('count', 'gender')
            ->toArray();
        $consolidated = $evaluation->getConsolidated($event);
        
        return Inertia::render('Prints/PrintCharts', [
            "event" => $event,
            "genders" => $sexDesaggregeted,
            "consolidated" => $consolidated,
            "trainingActivity" => $activityAssessment,
            "resource" => $rp_collection
        ]);
    }
}
