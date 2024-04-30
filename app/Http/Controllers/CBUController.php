<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Event;
use App\Models\EventParticipants;
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

    public function index(Request $request)
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year'))
            ->distinct()
            ->get(['year']);

        $cbu = User::with(['trainingsAttended' => function ($query) {
            $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                ->whereNotNull('a.time_in')
                //->whereNotNull('a.time_out')
                ->leftJoin('events AS e', function ($join) {
                    $join->on('e.id', '=', 'event_participants.event_id');
                })
                ->selectRaw('count(*) as trainings, user_id')
                ->groupBy('user_id');
        }])
        ->where('role', 'Employee')
        ->select('id', 'first_name', 'last_name', 'status', 'created_at')
        ->paginate(25);

        /* $events = Event::get(['id', 'dateStart']);
        
        $inactives = $cbu->map(function ($user) use ($events) {
            $consecutive = $this->checkEmployeeInactivity($user, $events);
            if($consecutive >= 10) {
                return $user->id;
            }
        })->filter(function ($inactive) {
            if($inactive) return $inactive;
        })->values(); */

        return Inertia::render('CBUMonitoring', [
            "cbu_summary" => $cbu,
            //"inactiveUser" => $inactives,
            "years" => $years->prepend(['year'=>null]),
            "remarks" => collect(['All', 'Active Status', 'Resigned/Non-Renewal'])
        ]);
    }

    public function indexJson(Request $request)
    {
        $cbu = User::with(['trainingsAttended' => function ($query) use ($request) {
            $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                ->whereNotNull('a.time_in')
                //->whereNotNull('a.time_out')
                ->leftJoin('events AS e', function ($join) {
                    $join->on('e.id', '=', 'event_participants.event_id');
                })
                ->when($request->year, function ($query) use ($request) {
                    $query->whereYear('e.dateStart', $request->year);
                })
                ->selectRaw('count(*) as trainings, user_id')
                ->groupBy('user_id');
        }])
        ->when($request->search, function ($query) use ($request) {
            $query->where(function ($subquery) use ($request) {
                $subquery->where('first_name', 'LIKE', "%$request->search%")
                    ->orWhere('last_name', 'LIKE', "%$request->search%");
            })
            ->where('role', 'Employee')
            ->orWhereHas('trainingsAttended.event', function ($subquery) use ($request) {
                $subquery->where('title', 'LIKE', "%$request->search%");
            })
            ->where('role', 'Employee');
        })
        ->when($request->filter != 'All', function ($query) use ($request) {
            $filter = $request->filter == "Active Status"? ["Active"] : ["Resigned", "Non-renewal"];
            $query->whereIn('status', $filter);
        })
        ->where('role', 'Employee')
        ->select('id', 'first_name', 'last_name', 'status', 'created_at')
        ->paginate(25);

        /* $events = Event::get(['id', 'dateStart']);
        
        $inactives = $cbu->map(function ($user) use ($events) {
            $consecutive = $this->checkEmployeeInactivity($user, $events);
            if($consecutive >= 10) {
                return $user->id;
            }
        })->filter(function ($inactive) {
            if($inactive) return $inactive;
        })->values(); */

        return response()->json($cbu);
    }

    public function eventsPerYear()
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year, title'))
            ->get(['year', 'title']);

        return response()->json($years);
    }

    function checkEmployeeInactivity(User $user, $eventList)
    {
        $use_created_at = Carbon::parse($user->created_at);

        $consecutiveAbsent = 0;
        $eventList->each(function ($event) use (&$consecutiveAbsent, $use_created_at, $user) {
            $eventDate = Carbon::parse($event->dateStart);

            // check if the event is create later than the employee has been created
            if($eventDate->format('Ym') >= $use_created_at->format('Ym') && $eventDate->isBefore($this->now)) {
                // check if the user is part of the event
                $trainee = EventParticipants::where('user_id', $user->id)->where('event_id', $event->id)->first('id');
                if($trainee) {
                    // if the user is part of the event and has not attended count as inactive
                    $attended = Attendance::where('event_participant_id', $trainee->id)->exists();
                    if(!$attended) {
                        $consecutiveAbsent += 1;
                    } else {
                        $consecutiveAbsent = 0;
                    }
                }
            }
        });

        return $consecutiveAbsent;
    }
}
