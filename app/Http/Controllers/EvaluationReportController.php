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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EvaluationReportController extends Controller
{
    public function index()
    {
        $events = Event::all(['id', 'title']);
        $events->prepend(collect(['id' => null, 'title' => 'All']));

        return Inertia::render('EvaluationReport', ['report' => 'Evaluation', 'events' => $events]);
    }

    public function eventsEvaluationData(Event $event)
    {
        try {
            $trainingActivityRatingSummary = $this->getActivityRatingSummary($event);
            $event_rp = $event->resourcePerson->first()->resourcePerson;
            $event_rp_rate = $this->getRpRatingSummary($event, $event_rp->id);
            $sexDesaggregeted = QuantitativeAssessmentRP::join('users as u', 'u.id', '=', 'quantitative_assessment_r_p_s.user_id')
                ->where('event_id', $event->id)
                ->select('u.id', 'u.gender')
                ->groupBy('u.id', 'u.gender')
                ->get();

            $genders = collect(["Male"=>0, "Female"=>0]);

            $sexDesaggregeted->each(function ($gender) use (&$genders) {
                    if($gender->gender == 'Male') {$genders["Male"] +=1;}
                    if($gender->gender == 'Female') {$genders["Female"]+=1;}
                });
            
            $eventRP = EventResourcePerson::join('resource_people as rp', 'rp.id', '=', 'event_resource_people.rp_id')
                ->where('event_id', $event->id)
                ->select('rp.id', 'rp.name')
                ->get();
            $ratings = QuantitativeAssessmentRP::with('gender')
                ->where('rps_id', $event_rp->id)
                ->where('event_id', $event->id)
                ->paginate(25);
            $consolidated = QuantitativeAssessment::with(['gender' => function ($query) {
                    $query->select('id', 'gender');
                }])
                ->where('event_id', $event->id)
                ->paginate(25);
                
            $trainingAssessment = QualitativeAssessment::with('gender')
                ->where('event_id', $event->id)
                ->paginate(25);

            return response()->json(collect([
                "consolidatedChart" => $this->getConsolidated($event),
                "trainingActivityRatingSummary" => $trainingActivityRatingSummary,
                "rpRatingSummary" => collect($event_rp_rate),
                "resourcePersonList" => $eventRP,
                "gender" => $genders,
                "ratings" => $ratings,
                "consolidated" => $consolidated,
                "eventAssessment" => $trainingAssessment,
            ]));
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    public function getRpRatingSummary($event, $rp, Request $request = null)
    {
        $rates = collect(["5", "4", "3", "2", "1"]);

        $rates = $rates->map(function ($rate) use ($rp, $event) {
            $count = QuantitativeAssessmentRP::join('users as u', 'u.id', '=', 'quantitative_assessment_r_p_s.user_id')
                ->where("event_id", $event->id)
                ->where("rps_id", $rp)
                ->selectRaw('COUNT(u.gender) as count, u.gender, CAST((q1+q2+q3+q4+q5+q6+q7)/7 AS SIGNED) as rate')
                ->havingRaw('rate = ?', [$rate])
                ->groupBy('u.gender', 'rate')
                ->get()
                ->pluck('count', 'gender', 'rate')
                ->toArray();

            return [ $rate => $count ];
        });

        $mappedValue = new \stdClass();
        foreach ($rates as $key => $item) {
            foreach ($item as $key => $value) {
                $mappedValue->$key = (object) [
                    "female" => data_get($value, 'Female', 0),
                    "male" => data_get($value, 'Male', 0)
                ];
            }
        }

        if($request?->expectsJson()) return response()->json($mappedValue);

        return $mappedValue;
    }

    public function rpEvaluatioRates(Event $event, ResourcePerson $rp, Request $request)
    {
        $ratings = QuantitativeAssessmentRP::with('gender')
            ->where('rps_id', $rp->id)
            ->where('event_id', $event->id)
            ->paginate(25);

        if($request->rateOnly) {
            return response()->json($ratings);
        }

        return response()->json(collect([
            "ratings" => $ratings,
            "chartData" => $this->getRpRatingSummary($event, $rp->id)
        ]));
    }

    public function getConsolidatedData(Event $event)
    {
        $assessment = QualitativeAssessment::with('gender')
        ->where('event_id', $event->id)
        ->paginate(25);

        return response()->json($assessment);
    }

    public function getQualitativeData(Event $event)
    {
        $consolidated = QuantitativeAssessment::with(['gender' => function ($query) {
            $query->select('id', 'gender');
        }])
        ->where('event_id', $event->id)
        ->paginate(25);

        return response()->json($consolidated);
    }

    public function getConsolidated(Event $event)
    {
        $data = collect([
            (object) [ "q1" => null ],
            (object) [ "q2" => null ],
            (object) [ "q3" => null ],
            (object) [ "q4" => null ],
            (object) [ "q5" => null ],
            (object) [ "q6" => null ],
            (object) [ "q7" => null ],
            (object) [ "q8" => null ],
            (object) [ "q9" => null ],
            (object) [ "q10" => null ],
            (object) [ "q11" => null ],
            (object) [ "q12" => null ],
        ]);

        $totalParticipants = QuantitativeAssessment::where("event_id", $event->id)
            ->selectRaw("COUNT(id) as count")
            ->count();
        
        $totalEventParticipants = EventParticipants::where("event_id", $event->id)
            ->selectRaw("COUNT(id) as count")
            ->count();

        $data = $data->map(function ($value) use ($event) {
            $column = key((array) $value);

            return (object) [
                $column => QuantitativeAssessment::join('users as u', 'u.id', '=', 'quantitative_assessments.user_id')
                ->where("$column", '>=', '4')
                ->where("$column", '<=', '5')
                ->where("event_id", $event->id)
                ->selectRaw("COUNT(u.gender) as count, u.gender")
                ->groupBy('u.gender')
                ->get()
                ->pluck('count', 'gender')
                ->toArray()
            ];
        });

        $mappedValue = new \stdClass();
        foreach ($data as $item) {
            $column = key((array) $item);
            //dd($item->$column['Female']??0) + ($item->$column['Male']??0);
            $total = ($item->$column['Female']??0) + ($item->$column['Male']??0);
            $mappedValue->$column = (object) [...$item->$column, "total" => $total, "percent" => $total?(($total/$totalEventParticipants)*100):0];
            //dd($mappedValue->$column);
        }
        $mappedValue->total = $total?$totalEventParticipants:0;
        
        return $mappedValue;
    }

    public function getActivityRatingSummary(Event $event)
    {
        $activity = QuantitativeAssessment::join('users as u', 'u.id', '=', 'quantitative_assessments.user_id')
            ->selectRaw('u.gender, quantitative_assessments.q12, count(u.gender) as count')
            ->where('event_id', $event->id)
            ->groupBy('q12', 'u.gender')
            ->orderBy('q12', 'desc')
            ->get();


        $total = EventParticipants::where('event_id', $event->id)->count();

        $collect = new \stdClass();
        $activity->groupBy('q12')->each(function ($value, $key) use ($collect, $total) {
            $obj = new \stdClass();
            $value->each(function ($item, $key) use ($obj, $total) {
                $k = $item['gender'];
                $count = 'count'.$k;
                $obj->$k = ($item['count'] / $total) * 100;
                $obj->$count = $item['count'];
            });

            $collect->$key = $obj;
        });

        return $collect;
    }
}

