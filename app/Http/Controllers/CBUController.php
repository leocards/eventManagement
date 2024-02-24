<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
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
        ->select('id', 'first_name', 'last_name', 'status')
        ->paginate(25);

        $cbu = $cbu->map(function ($user) {
            $consecutive = $this->checkEmployeeInactivity($user);
            if($consecutive >= 10) {
                $user->status = 'Inactive';
                return $user;
            }
            return $user;
        });

        // return response()->json($cbu);

        return Inertia::render('CBUMonitoring', [
            "cbu_summary" => $cbu,
            "years" => $years->prepend(['year'=>null])
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
            })->orWhereHas('trainingsAttended.event', function ($subquery) use ($request) {
                $subquery->where('title', 'LIKE', "%$request->search%");
            });
        })
        ->where('role', 'Employee')
        ->select('id', 'first_name', 'last_name', 'status')
        ->paginate(25);

        return response()->json($cbu);  
    }

    public function eventsPerYear()
    {
        $years = Event::select(DB::raw('YEAR(dateStart) as year, title'))
            ->get(['year', 'title']);

        return response()->json($years);
    }

    function checkEmployeeInactivity(User $user, $eventList = [])
    {
        $participant = $user->attendedEvent;
        $participant = $participant->filter(function ($event) {
            if(Attendance::where('event_participant_id', $event->id)->first()) {
                return ['id' => $event->id, 'event_id' => $event->event_id];
            }
        });
        $consecutive = 0;

        $events = Event::get(['id'])->pluck('id')->values();

        $events->each(function ($event) use ($consecutive, $participant) {
            if(!$participant->contains('event_id', 3)) {
                $consecutive += 1;
            } else $consecutive = 0;
        });


        return $consecutive;
    }
}
