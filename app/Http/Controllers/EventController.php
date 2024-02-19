<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventCode;
use App\Models\EventParticipants;
use App\Models\EventResourcePerson;
use App\Models\ResourcePerson;
use App\Models\User;
use App\Models\UserLog;
use App\Rules\ValidateEventDateRange;
use App\Rules\ValidateEventTimeInOut;
use App\Rules\ValidVirtualVenueUrl;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Ramsey\Uuid\Uuid;

class EventController extends Controller
{
    protected $now;

    function __construct()
    {
        $this->now = Carbon::now("Asia/Manila");
    }

    public function index(Request $request)
    {
        if ($request->event) {
            $resource_persons = ResourcePerson::select("id", "name", "position", "profile")
                ->orderBy('created_at', 'desc')
                ->paginate(25);
            $employees = User::select("id", "first_name", "last_name", "province", "position", "profile", "status")
                ->where('role', 'Employee')
                ->where('status', 'Active')
                ->orderBy('created_at', 'desc')
                ->paginate(25);
            $results = User::select('province', DB::raw('count(*) as count'))
                ->where('role', 'Employee')->where('status', 'Active')
                ->groupBy('province')
                ->get();
            $events = [];
        } else {
            $resource_persons = [];
            $employees = [];
            $results = [];

            $events = Event::with("eventCode")
                ->select("id", "platform", "venue", "title", "objective", "fund", "dateStart", "dateEnd", "is_range", "remarks", "created_at")
                ->orderBy('created_at', 'desc')
                ->paginate(25);
        }

        return Inertia::render('Event', [
            "events" => $events,
            "addEvent" => $request->event,
            "resourcePersons" => $resource_persons,
            "participants" => $employees,
            "totalEmp" => $results,
            "editId" => $request->event_id
        ]);
    }

    public function indexJson()
    {
        return collect([]);
    }

    public function editEvent(Event $event)
    {
        try {
            $resourcePersons = EventResourcePerson::join('resource_people as rp', 'rp.id', '=', 'event_resource_people.rp_id')
                ->where('event_resource_people.event_id', $event->id)
                ->select('rp.id', 'rp.name', 'rp.position', 'rp.profile')
                ->get();

            $participants = EventParticipants::join('users as u', 'u.id', '=', 'event_participants.user_id')
                ->where('event_participants.event_id', $event->id)
                ->select('u.id', 'u.first_name', 'u.last_name', 'u.position', 'u.profile', 'u.province', 'u.status')
                ->get();

            $countPerProvince = $participants->groupBy('province')->map(function ($group, $province) {
                return [
                    "count" => $group->count(),
                    "province" => $province
                ];
            })->values()->all();

            return response()->json(collect([
                "event" => $event,
                "resource_persons" => $resourcePersons,
                "participants" => $participants,
                "provinceCount" => $countPerProvince,
                "time" => $event->eventCode->first()
            ]));
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    public function store(Request $request)
    {
        $validate = $this->eventValidator($request);

        if($validate && $validate->get('error') === 'resourcePerson') {
            return redirect()->back()->withErrors($validate->get('message'), "resourcePerson");
        } else if($validate && $validate->get('error') === 'participant') {
            return redirect()->back()->withErrors($validate->get('message'), "participant");
        }

        try {
            $range = $request->date['isRange'];
            $startDate = Carbon::parse($request->date['start'], 'Asia/Manila');
            $endDate = Carbon::parse($range ? $request->date['end'] : $request->date['start'], 'Asia/Manila');
            $dateRange = collect([]);

            if ($range) {
                $period = CarbonPeriod::create($startDate, $endDate);

                foreach ($period as $date) {
                    $dateRange->push($date->toDateString());
                }
            } else {
                $dateRange->push($startDate->toDateString());
            }

            DB::transaction(function () use ($request, $dateRange) {
                $event = Event::create([
                    "platform" => $request->platform,
                    "venue" => $request->venue,
                    "title" => $request->title,
                    "objective" => $request->objective,
                    "fund" => 'Php ' . number_format($request->fund),
                    "is_range" => $request->date['isRange'],
                    "dateStart" => $request->date['start'],
                    "dateEnd" => $request->date['end'],
                    "total_rp" => $request->resourcePerson,
                ]);

                foreach ($dateRange as $date) {
                    EventCode::create([
                        "event_id" => $event->id,
                        "time_in" => $date . ' ' . $request->timeIn . ':00',
                        "time_in_cutoff" => $date . ' ' . $request->timeInCutoff . ':00',
                        "time_in_code" => Uuid::uuid4()->toString(),
                        "time_in_code_exp" => $date . ' ' . $request->timeInCutoff . ':00',
                        "time_out" => $date . ' ' . $request->timeOut . ':00',
                        "time_out_cutoff" => $date . ' ' . $request->timeOutCutoff . ':00',
                        "time_out_code" => Uuid::uuid4()->toString(),
                        "time_out_code_exp" => $date . ' ' . $request->timeOutCutoff . ':00',
                    ]);
                }

                foreach ($request->rp_list as $rp) {
                    EventResourcePerson::create([
                        "event_id" => $event->id,
                        "rp_id" => $rp['id']
                    ]);
                }

                foreach ($request->trainee_list['list'] as $p) {
                    EventParticipants::create([
                        "event_id" => $event->id,
                        "user_id" => $p['id'],
                    ]);
                }

                UserLog::create([
                    "event_id" => $event->id,
                    "user_id" => Auth::id(),
                    "description" => "created an event"
                ]);
            });

            return redirect()->back()->with("success");
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }

    public function updateEvent(Request $request, Event $event)
    {
        $validate = $this->eventValidator($request, $event->id);

        if($validate && $validate->get('error') === 'resourcePerson') {
            return redirect()->back()->withErrors($validate->get('message'), "resourcePerson");
        } else if($validate && $validate->get('error') === 'participant') {
            return redirect()->back()->withErrors($validate->get('message'), "participant");
        }

        $range = $request->date['isRange'];
        $start = Carbon::parse($event->dateStart, 'Asia/Manila');
        $end = Carbon::parse($event->dateEnd, 'Asia/Manila');
        $userDateStart = Carbon::parse($request->date['start'], 'Asia/Manila');
        $userDateEnd = Carbon::parse($range ? $request->date['end'] : $request->date['start'], 'Asia/Manila');

        // check changes of the event dates
        if($userDateEnd->toDateString() != $end->toDateString() || 
            $event->isRange != $range || $userDateStart->toDateString() != $start->toDateString())
        {
            if($start->isYesterday()) {
                return redirect()->back()->withErrors("Cannot update event date when event is active");
            }
            if($start->isSameDay($this->now)) {
                $time = Str::of($event->eventCode->first()->time_in)->explode(' ')[1];
    
                if(Carbon::parse($start.' '.$time, 'Asia/Manila')->lte($this->now)) {
                    if($request->timeIn != Carbon::parse($time)->format("H:i")) {
                        return redirect()->back()->withErrors("Cannot update date or time when event is active");
                    }
                }
            } else if($event->isRange) {
                if($this->now->between($start, $end)) {
    
                }
                 
                // check if the event has eneded and if the user has change the end date of the date range
                if($this->now->gt($end) && $userDateEnd->toDateString() != $end->toDateString()) {
                    return redirect()->back()->withErrors("Event has been ended, cannot update the date.", "event_status");
                }
            }
        }
        
        try {
            DB::transaction(function () use ($request, $event, $range, $userDateStart, $userDateEnd) {
                $this->checkUpdatedRp($request, $event);
                $this->checkUpdatedParticipants($request, $event);
                
                if ($request->initialDate['withTimeChanges'] || $request->initialDate['withDateChanges']) {
                    $dateRange = collect([]);
                    $period = CarbonPeriod::create($userDateStart, $userDateEnd);

                    foreach ($period as $date) {
                        $dateRange->push(collect([
                            "time_in" => $date->toDateString() . ' ' . $request->timeIn . ':00',
                            "time_in_cutoff" => $date->toDateString() . ' ' . $request->timeInCutoff . ':00',
                            "time_out" => $date->toDateString() . ' ' . $request->timeOut . ':00',
                            "time_out_cutoff" => $date->toDateString() . ' ' . $request->timeOutCutoff . ':00',
                        ]));
                    }

                    if ($range) {
                        if ($request->initialDate['withDateChanges']) {
                            EventCode::where('event_id', $event->id)->delete();
                            foreach ($dateRange as $date) {
                                EventCode::create([
                                    "event_id" => $event->id,
                                    "time_in" => $date['time_in'],
                                    "time_in_cutoff" => $date['time_in_cutoff'],
                                    "time_in_code" => Uuid::uuid4()->toString(),
                                    "time_in_code_exp" => $date['time_in_cutoff'],
                                    "time_out" => $date['time_out'],
                                    "time_out_cutoff" => $date['time_out_cutoff'],
                                    "time_out_code" => Uuid::uuid4()->toString(),
                                    "time_out_code_exp" => $date['time_out_cutoff'],
                                ]);
                            }
                        } else if ($request->initialDate['withTimeChanges']) {
                            $eventTime = $event->eventCode;
                            foreach ($eventTime as $key => $eventDate) {
                                /* dd($eventDate);
                                $updateEvent = EventCode::find($eventDate->id); */

                                $eventDate->time_in = $dateRange[$key]['time_in'];
                                $eventDate->time_in_cutoff = $dateRange[$key]['time_in_cutoff'];
                                $eventDate->time_in_code_exp = $dateRange[$key]['time_in_cutoff'];
                                $eventDate->time_out = $dateRange[$key]['time_out'];
                                $eventDate->time_out_cutoff = $dateRange[$key]['time_out_cutoff'];
                                $eventDate->time_out_code_exp = $dateRange[$key]['time_out_cutoff'];
                                $eventDate->save();
                            }
                        }
                    } else {
                        if ($request->initialDate['withDateChanges']) {
                            EventCode::where('event_id', $event->id)->delete();
                            foreach ($dateRange as $date) {
                                EventCode::create([
                                    "event_id" => $event->id,
                                    "time_in" => $date['time_in'],
                                    "time_in_cutoff" => $date['time_in_cutoff'],
                                    "time_in_code" => Uuid::uuid4()->toString(),
                                    "time_in_code_exp" => $date['time_in_cutoff'],
                                    "time_out" => $date['time_out'],
                                    "time_out_cutoff" => $date['time_out_cutoff'],
                                    "time_out_code" => Uuid::uuid4()->toString(),
                                    "time_out_code_exp" => $date['time_out_cutoff'],
                                ]);
                            }
                        } else if ($request->initialDate['withTimeChanges']) {
                            $eventTime = $event->eventCode;

                            foreach ($eventTime as $key => $eventDate) {
                                $eventDate->time_in = $dateRange[$key]['time_in'];
                                $eventDate->time_in_cutoff = $dateRange[$key]['time_in_cutoff'];
                                $eventDate->time_in_code_exp = $dateRange[$key]['time_in_cutoff'];
                                $eventDate->time_out = $dateRange[$key]['time_out'];
                                $eventDate->time_time_out_cutoffin = $dateRange[$key]['time_out_cutoff'];
                                $eventDate->time_out_code_exp = $dateRange[$key]['time_out_cutoff'];
                                $eventDate->save();
                            }
                        }
                    }
                }

                $event->platform = $request->platform;
                $event->venue = $request->venue;
                $event->title = $request->title;
                $event->objective = $request->objective;
                $event->fund = 'Php ' . number_format($request->fund);
                $event->is_range = $request->date['isRange'];
                $event->dateStart = $request->date['start'];
                $event->dateEnd = $request->date['isRange']?$request->date['end']:null;
                $event->total_rp = $request->resourcePerson;
                $event->save();
            });

            return back();
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function getEventRPParticipant(Event $event)
    {
        try {
            $rps = $event->resourcePerson->map(function ($erp) {
                return $erp->resourcePerson;
            });

            $participants = $event->participant->map(function ($participant) {
                return $participant->participants;
            });

            return response()->json(collect([
                "rps" => $rps,
                "participants" => $participants,
            ]));
        } catch (\Throwable $th) {
            return response()->json(collect(['rps' => [], 'participants' => [], "error" => $th->getMessage()]), 400);
        }
    }

    public function searchEvent(Request $request)
    {
        try {

            $sortBy = $request->sort == "Date created" ? "created_at" : ($request->sort == "Event date" ? "dateStart" : $request->sort);

            $this->now = Carbon::now();

            $search = Event::with("eventCode")
                ->select("id", "platform", "venue", "title", "objective", "fund", "dateStart", "dateEnd", "is_range", "created_at")
                ->orderBy($sortBy, $request->order)
                ->where(function ($query) use ($request) {
                    $query->orWhere("title", "LIKE", "%$request->search%")
                        ->orWhere("venue", "LIKE", "%$request->search%")
                        ->orWhere("objective", "LIKE", "%$request->search%");
                })
                ->where(function ($query) use ($request) {
                    if ($request->filterEvent != "All") {
                        if ($request->filterEvent == "Active") {
                            // Today
                            $query->orWhereDate('dateStart', $this->now->toDateString())
                                ->where("is_range", "=", true)
                                ->orWhereDate('dateEnd', $this->now->toDateString())
                                ->where("is_range", "=", true)
                                ->orWhereDate('dateStart', $this->now->toDateString())
                                ->where("is_range", "=", false);
                        } else if ($request->filterEvent == "Upcoming") {
                            // Upcoming
                            $query->orWhere('dateStart', '>', $this->now->toDateString());
                        } else if ($request->filterEvent == "Ended") {
                            // Ended
                            $query->orWhere(function ($query) {
                                $query->whereNotNull('dateEnd')
                                    ->where('dateEnd', '<', $this->now->toDateString())
                                    ->orWhere("dateStart", '<', $this->now->toDateString())
                                    ->whereNull('dateEnd');
                            });
                        } else if ($request->filterEvent == "This month") {
                            // This Month
                            $query->orWhereYear('dateStart', $this->now->year)
                                ->whereMonth('dateStart', $this->now->month);
                        } else if ($request->filterEvent == "This year") {
                            // This Year
                            $query->orWhereYear('dateStart', $this->now->year);
                        }
                    } else {
                        $query->whereNotNull("dateStart");
                    }
                })
                ->paginate(25);

            return response()->json($search);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    public function destroy(Event $event)
    {
        try {
            $event->delete();

            return back();
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function generateCopyCode(Request $request, Event $event)
    {
        $code = EventCode::where('event_id', $event->id)
            ->when($request->time_in, function ($query) {
                return $query->whereDate('time_in', '>=', $this->now->toDateString());
            })
            ->when($request->time_out, function ($query) {
                return $query->whereDate('time_out', '>=', $this->now->toDateString());
            })
            ->first();
        
        return response()->json(URL::temporarySignedRoute('temporary.link', now()->addDay(), [
            'code' => $request->time_in?$code->time_in_code:$code->time_out_code,
            'event' => $event->id,
            'session' => $request->time_in?'Time in':'Time out'
        ]));
    }

    public function addRemarks(Request $request, Event $event)
    {
        $request->validate([
            "remarks" => "required"
        ]);

        try {
            $event->remarks = $request->remarks;
            $event->save();

            return back()->with('message', 'Successfull');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    function eventValidator(Request $request, $event_id = null)
    {
        $rp_validator = $this->ValidateRPConflictSchedule(
            $request->rp_list,
            $request->date['start'],
            $request->date['end'] ?? $request->date['start'],
            $event_id
        );

        if ($rp_validator->isNotEmpty()) { 
            return collect(["message" => $rp_validator->toJson(), "error" => "resourcePerson"]); 
        }

        $participantValidator = $this->ValidateParticipantConflictSchedule(
            $request->trainee_list['list'],
            $request->date['start'],
            $request->date['end'] ?? $request->date['start'],
            $event_id
        );

        if ($participantValidator->isNotEmpty()) {
            return collect(["message" => $participantValidator->toJson(), "error" => "participant"]);
        }

        Validator::extend('rp_list_size', function ($attribute, $value, $parameters, $validator) {
            $expectedSize = $validator->getData()[$parameters[0]];
            return count($value) == $expectedSize;
        });

        $validator = Validator::make($request->all(), [
            "venue" => [new ValidVirtualVenueUrl, "required"],
            "platform" => ["required", "in:Virtual,Face-to-face"],
            "title" => ["required", $event_id ? Rule::unique('events')->ignore($event_id) : "unique:events,title"],
            "objective" => ["required"],
            "fund" => ["required", "numeric"],
            "date" => [new ValidateEventDateRange],
            "timeIn" => ["required", new ValidateEventTimeInOut],
            "timeInCutoff" => ["required", new ValidateEventTimeInOut],
            "timeOut" => ["required", new ValidateEventTimeInOut],
            "timeOutCutoff" => ["required", new ValidateEventTimeInOut],
            "resourcePerson" => ['required', 'integer', 'min:1'],
            "rp_list" => ['array', "rp_list_size:resourcePerson"],
            "trainee_list.list" => ["min:1"]
        ], [
            "rp_list" => "The event resource person must have " . $request->input("resourcePerson") . " resource person",
            "trainee_list.list" => "The event must have participants.",
            "resourcePerson" => "The number of resource person field is required"
        ]);

        $validator->validate();
    }

    function ValidateRPConflictSchedule($rps, $startDate, $endDate, $event_id = null)
    {
        $exist = collect([]);

        foreach ($rps as $rp) {
            $count = Event::whereHas("resourcePerson", function ($query) use ($rp, $startDate, $endDate, $event_id) {
                $query->where('rp_id', $rp['id'])
                    ->when($event_id !== null, function ($query) use ($event_id) {
                        $query->whereNot('event_id', $event_id);
                    })
                    ->where(function ($query) use ($startDate, $endDate) {
                        $query->whereRaw('dateStart <= ? and dateEnd >= ?', [$endDate, $startDate])
                            ->orWhereRaw('dateStart <= ? and dateEnd >= ?', [$startDate, $endDate]);
                    });
            })->get();

            if ($count->isNotEmpty()) $exist->push($rp);
        }

        return $exist;
    }

    function ValidateParticipantConflictSchedule($participants, $startDate, $endDate, $event_id = null)
    {
        $exist = collect([]);

        foreach ($participants as $participant) {
            $count = Event::whereHas("participant", function ($query) use ($participant, $startDate, $endDate, $event_id) {
                $query->where('user_id', $participant['id'])
                    ->when($event_id !== null, function ($query) use ($event_id) {
                        $query->whereNot('event_id', $event_id);
                    })
                    ->where(function ($query) use ($startDate, $endDate) {
                        $query->whereRaw('dateStart <= ? and dateEnd >= ?', [$endDate, $startDate])
                            ->orWhereRaw('dateStart <= ? and dateEnd >= ?', [$startDate, $endDate]);
                    });
            })->get();

            if ($count->isNotEmpty()) $exist->push($participant);
        }

        return $exist;
    }

    function checkUpdatedRp(Request $request, Event $event)
    {
        $rp_list = collect($request->rp_list)->map(function ($rp) {
            return collect($rp);
        });

        $existing_rp = $event->resourcePerson;

        $newly_added = $rp_list->whereNotIn('id', $existing_rp->pluck('rp_id'))->values()->all();
        $deleted_rp = $existing_rp->whereNotIn('rp_id', $rp_list->pluck('id'))->values()->all();

        foreach ($newly_added as $rp) {
            EventResourcePerson::create([
                "event_id" => $event->id,
                "rp_id" => $rp['id']
            ]);
        }

        foreach ($deleted_rp as $rp) {
            $rp->delete();
        }
    }

    function checkUpdatedParticipants(Request $request, Event $event)
    {
        $participant_list = collect($request->trainee_list['list'])->map(function ($participant) {
            return collect($participant);
        });

        $existing_participant = $event->participant;

        $newly_added = $participant_list->whereNotIn('id', $existing_participant->pluck('user_id'))->values()->all();
        $deleted_participants = $existing_participant->whereNotIn('user_id', $participant_list->pluck('id'))->values()->all();

        foreach ($newly_added as $participant) {
            EventParticipants::create([
                "event_id" => $event->id,
                "user_id" => $participant['id']
            ]);
        }

        foreach ($deleted_participants as $participant) {
            $participant->delete();
        }
    }
}
