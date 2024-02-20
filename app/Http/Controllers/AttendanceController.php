<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\EventCode;
use App\Models\EventParticipants;
use App\Models\QualitativeAssessment;
use App\Models\QuantitativeAssessment;
use App\Models\QuantitativeAssessmentRP;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    protected $now;

    function __construct()
    {
        $this->now = Carbon::now("Asia/Manila");
    }

    public function index(Request $request)
    {
        $attendance = EventParticipants::with('event')
            ->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
            ->when($request->search, function ($query) use ($request) {
                return $query->where(function ($query) use ($request) {
                    return $query->whereHas('event', function ($subquery) use ($request) {
                        return $subquery->where('title', 'like', '%' . $request->search . '%');
                    })->when(Auth::user()->role !== "Employee", function ($whenQuery) use ($request) {
                        return $whenQuery->whereHas('participants', function ($subquery) use ($request) {
                            return $subquery->orWhere('first_name', 'like', '%' . $request->search . '%')
                                ->orWhere('last_name', 'like', '%' . $request->search . '%');
                        });
                    });
                });
            })
            ->when(Auth::user()->role === "Employee", function ($query) {
                return $query->where('user_id', Auth::id())
                    ->whereNotNull('a.time_in')
                    ->latest('a.updated_at');
            })
            ->when(Auth::user()->role !== "Employee", function ($query) use ($request) {
                return $query->with('participants')
                    // get the first occurence in event codes to set as a reference for the attendance remarks
                    ->leftJoin('event_codes AS ec', function ($join) {
                        $join->on('ec.event_id', '=', 'event_participants.event_id')
                            ->whereRaw('ec.id = (SELECT MIN(id) FROM event_codes WHERE event_codes.event_id = event_participants.event_id)');
                    })
                    ->select('a.*', 'event_participants.user_id', 'event_participants.event_id', 'ec.time_in AS event_time_in', 'ec.time_in_cutoff AS time_in_cutoff')
                    ->when($request->event, function ($query) use ($request) {
                        return $query->where('event_participants.event_id', $request->event);
                    })
                    ->whereNotNull('a.time_in')
                    ->latest('a.updated_at');
            })
            ->paginate(25);

        if($request->expectsJson()) {
            return response()->json($attendance);
        } else {
            if(Auth::user()->role === "Employee") {
                return Inertia::render("Trainee/Attendance", [
                    "attendance" => $attendance
                ]);
            } else {
                $events = Event::all(['id', 'title']);
                $events->prepend(collect(['id' => null, 'title' => 'All']));

                return Inertia::render("Attendance", [
                    "events" => $events
                ]);
            }
        }
    }

    public function setTimeIn(Request $request)
    {
        try {

            //verify the code for the event
            $event = EventCode::when($request->session == "Time in", function ($query) use ($request) {
                return $query->where('time_in_code', $request->code)
                    ->whereDate('time_in', $this->now->toDateString());
            })->when($request->session == "Time out", function ($query) use ($request) {
                return $query->where('time_out_code', $request->code)
                    ->whereDate('time_out', $this->now->toDateString());
            })
            ->first();

            // if the code is valid then check if the event is open
            if($event) {
                $event_participant = EventParticipants::where("user_id", Auth::id())
                    ->where("event_id", $event->event_id)
                    ->first();

                if(!$event_participant) {
                    throw new Exception("You are not added as trainee for the event with this code");
                }

                $this->now = $this->now;
                $timeIn = Carbon::parse($event->time_in, 'Asia/Manila');
                $timeOut = Carbon::parse($event->time_out, 'Asia/Manila');
                
                $oneHourBeforeTimeIn = $timeIn->subHour();

                // validate if the user has already set time in or out
                if($request->session == "Time in") {
                    $checkTimeIn = Attendance::whereNotNull("time_in")
                        ->whereDate("time_in", $this->now->toDateString())
                        ->where("event_participant_id", $event_participant->id)
                        ->first();
    
                    if($checkTimeIn) {
                        return back()->with("message", "You've already logged your time in for the event.");
                    }
                } else {
                    $checkTimeOut = Attendance::whereNotNull("time_in")
                        ->whereNotNull("time_out")
                        ->whereDate("time_out", $this->now->toDateString())
                        ->whereDate("time_in", $this->now->toDateString())
                        ->where("event_participant_id", $event_participant->id)
                        ->first();

                    if($checkTimeOut) {
                        return back()->with("message", "You've already logged your time out for the event.");
                    }
                }

                // if the event is open for time in then set attendance and record the user's activity
                if($this->now->gte($oneHourBeforeTimeIn) && $this->now->lt($timeOut) && $request->session == "Time in") {

                    DB::transaction(function () use ($event, $event_participant) {
                        Attendance::create([
                            'event_participant_id' => $event_participant->id,
                            'time_in' => $this->now,
                        ]);
                            
                        Activity::create([
                            "event_id" => $event->event_id,
                            "user_id" => Auth::id(),
                            "description" => "Your time in for the event has been recorded"
                        ]);
                    });

                    return redirect()->back()->with("message", "1");

                // if the event is not yet open for the time in then respond with the remaining time before time in
                } else if($this->now->gte($oneHourBeforeTimeIn) && $this->now->lt($timeOut) && $request->session == "Time in") {
                    $remaining = $this->now->diff($oneHourBeforeTimeIn);

                    throw new Exception($remaining->h . " " . ($remaining->h > 1 ? 'hrs' : 'hr') . " " . $remaining->i . " " . 
                        ($remaining->i > 1 ? 'mins' : 'min') . " " . $remaining->i . " sec remain before time in starts.");
                }

                // dd($this->now->gte($timeOut), $timeOut, $this->now);
                
                // if the user is about to log out, redirect to evaluation page, else send error
                if ($this->now->gte($timeOut) && $request->session == "Time out") {
                    if($this->now->toDateString() == $timeOut->toDateString()) {
                        Session::put('evaluation', Auth::id());
                        return redirect()->route("trainee.evaluation", ["event" => $event->event_id]);
                    } else {
                        throw new Exception("The event timeout has ended.");
                    }
                } else {
                    throw new Exception("Event is not yet open for time out.");
                }
            } else {
                throw new Exception("Invalid code for ".$request->session);
            }

        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage(), "error");
        }
    }

    public function evaluation(Event $event)
    {
        if(Session::has('evaluation')) {
            $event_participant = EventParticipants::where("user_id", Auth::id())
                ->where("event_id", $event->id)
                ->first();
    
            $notEevaluated = Attendance::where('event_participant_id', $event_participant->id)
                ->whereDate('time_in', $this->now->toDateString())
                ->whereNull('time_out')
                ->first();
    
            if(!$notEevaluated) {
                $event = Event::find($event->id);
                $event_rp = Event::find($event->id)->resourcePerson;
        
                $resourcePersons = collect([]);
                foreach ($event_rp as $rp) {
                    $resourcePersons->push($rp->resourcePerson);
                }

                return Inertia::render("Trainee/Evaluation", [
                    'event' => $event,
                    'resourcePersons' => $resourcePersons,
                    'completed' => false,
                    'participant_id' => $event_participant->id
                ]);
            } else {
                Session::forget('key');
                return Inertia::render("Trainee/Evaluation", [
                    'event' => null,
                    'resourcePersons' => [],
                    'completed' => true,
                    'participant_id' => null
                ]);
            }
        }

        abort(404);
    }

    public function storeEvaluation(Request $request, Event $event)
    {
        $attendance = Attendance::where('event_participant_id', $request->participantId)
            ->whereNotNull("evaluated")
            ->first();

        // dd($event);
        if($attendance) {
            return redirect()->route("trainee.evaluation");
        }

        try {
            
            DB::transaction(function () use ($request, $event) {
                $qualiAA = (object) $request->Qualitative;
                $quantiAA = (object) $request->Quantitative;
                $rp_evaluation = $request->EvaluatedRp;

                foreach ($rp_evaluation as $value) {
                    $evaluationAnswer = (object) $value['evaluation'];
                    QuantitativeAssessmentRP::create([
                        "event_id" => $event->id,
                        "user_id" => Auth::id(),
                        "rps_id" => $value['rp']['id'],
                        "q1" => $evaluationAnswer->qarp1,
                        "q2" => $evaluationAnswer->qarp2,
                        "q3" => $evaluationAnswer->qarp3,
                        "q4" => $evaluationAnswer->qarp4,
                        "q5" => $evaluationAnswer->qarp5,
                        "q6" => $evaluationAnswer->qarp6,
                        "q7" => $evaluationAnswer->qarp7,
                        "comment" => $evaluationAnswer->comment,
                    ]);
                }

                QualitativeAssessment::create([
                    "event_id" => $event->id,
                    "user_id" => Auth::id(),
                    "q1" => $qualiAA->question1,
                    "q2" => $qualiAA->question2,
                    "q3" => $qualiAA->question3,
                    "q4" => $qualiAA->question4,
                    "q5" => $qualiAA->question5,
                    "q6" => $qualiAA->question6,
                    "q7" => $qualiAA->question7,
                    "q8" => $qualiAA->question8,
                ]);

                QuantitativeAssessment::create([
                    "event_id" => $event->id,
                    "user_id" => Auth::id(),
                    "q1" => $quantiAA->qaa1,
                    "q2" => $quantiAA->qaa2,
                    "q3" => $quantiAA->qaa3,
                    "q4" => $quantiAA->qaa4,
                    "q5" => $quantiAA->qaa5,
                    "q6" => $quantiAA->qaa6,
                    "q7" => $quantiAA->qaa7,
                    "q8" => $quantiAA->qaa8,
                    "q9" => $quantiAA->qaa9,
                    "q10" => $quantiAA->qaa10,
                    "q11" => $quantiAA->qaa11,
                    "q12" => $quantiAA->qaa12,
                ]);

                Attendance::where('event_participant_id', $request->participantId)
                    ->whereDate('time_in', $this->now->toDateString())
                    ->update(['time_out' => $this->now, 'evaluated' => true]);

                Activity::insert([
                    [
                        "event_id" => $event->id,
                        "user_id" => Auth::id(),
                        "description" => "Your evaluation for the event has been recorded",
                        "created_at" => now()->format('Y-m-d H:i:s'),
                        "updated_at" => now()->format('Y-m-d H:i:s'),
                    ], [
                        "event_id" => $event->id,
                        "user_id" => Auth::id(),
                        "description" => "Your time out for the event has been recorded",
                        "created_at" => now()->format('Y-m-d H:i:s'),
                        "updated_at" => now()->format('Y-m-d H:i:s'),
                    ]
                ]);
            });

            return redirect()->back();

        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage(), "error");
        }
    }

    public function setTimeOut(Request $request)
    {
        
    }

}
