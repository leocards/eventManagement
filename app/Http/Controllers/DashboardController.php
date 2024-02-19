<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Event;
use App\Models\EventCode;
use App\Models\EventParticipants;
use App\Models\User;
use App\Models\UserLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $now;

    function __construct()
    {
        $this->now = Carbon::now("Asia/Manila");
    }

    public function index()
    {
        if (Auth::user()->role == "Employee") {
            return $this->EmployeeDashboard();
        } else {
            return $this->AdminDashboard();
        }
    }

    public function AdminDashboard()
    {
        $upcomingEvents = Event::with('eventCode')
            ->select("id", "platform", "title", "venue", "dateStart", "dateEnd")
            ->whereDate("dateStart", ">", $this->now->toDateString())
            ->orderBy("dateStart", "DESC")
            ->paginate(25);

        $gender = User::groupBy('gender')
            ->selectRaw('gender, COUNT(*) as count')
            ->where("role", "Employee")
            ->pluck('count', 'gender');
        
        $totalEmployee = User::selectRaw('COUNT(*) as total')
            ->where("role", "Employee")
            ->pluck('total');

        $attendace_today = EventParticipants::whereHas('attendance', function ($query) {
                $query->whereDate('updated_at', '=', $this->now->toDateString())
                    ->whereNotNull('time_in');
            })->count();
            /* ->whereDate('updated_at', '=', $this->now->toDateString())
            ->whereNotNull('time_in')
            ->count(); */

        $attendace_month = EventParticipants::whereHas('attendance', function ($query) {
            $query->whereMonth('updated_at', '=', $this->now->month)
                ->whereNotNull('time_in');
        })->count();

        $attendace_year = EventParticipants::whereHas('attendance', function ($query) {
            $query->whereYear('updated_at', '=', $this->now->year)
                ->whereNotNull('time_in');
        })->count();


        return Inertia::render('Dashboard', [
            'upcoming' => $upcomingEvents,
            'gender' => $gender,
            'totalEmployee' => $totalEmployee,
            'numberOfEvents' => collect([
                'Upcoming' => $upcomingEvents->total(),
                'Total' => Event::count()
            ]),
            'attendance' => collect([
                'Today' => $attendace_today,
                'This month' => $attendace_month,
                'This year' => $attendace_year,
            ])
        ]);
    }

    public function EmployeeDashboard()
    {
        $upcomingEvents = Event::with('eventCode')
            ->leftJoin("event_participants AS ep", "ep.event_id", "=", "events.id")
            ->select("events.id", "events.platform", "events.title", "events.venue", "events.dateStart", "events.dateEnd", "ep.user_id")
            ->whereDate("events.dateStart", ">", $this->now->toDateString())
            ->where("ep.user_id", Auth::id())
            ->whereNull('ep.deleted_at')
            ->orderBy("events.dateStart", "ASC")
            ->paginate(25);

        $totalEvents = EventParticipants::where("user_id", Auth::id())->count();
        $totalUpcomming = Event::leftJoin('event_participants AS ep', 'ep.event_id', '=', 'events.id')
            ->where('ep.user_id', Auth::id())
            ->whereDate('events.dateStart', '>', $this->now->toDateString())
            ->count();

        return Inertia::render('Trainee/Dashboard', [
            'upcoming' => $upcomingEvents,
            'totalevents' => collect([
                'Total' => $totalEvents,
                'Upcoming' => $totalUpcomming,
            ])
        ]);
    }

    public function searchUpcomingEvent(Request $request)
    {
        try {

            $upcomingEvents = Event::with('eventCode')
                ->when(Auth::user()->role == "Employee", function ($query) {
                    return $query->leftJoin("event_participants AS ep", "ep.event_id", "=", "events.id")
                        ->select("events.id", "events.platform", "events.title", "events.venue", "events.dateStart", "events.dateEnd", "ep.user_id")
                        ->where("ep.user_id", Auth::id());
                })
                ->when(Auth::user()->role != "Employee", function ($query) {
                    return $query->select("events.id", "events.platform", "events.title", "events.venue", "events.dateStart", "events.dateEnd");
                })
                ->where(function ($query) use ($request) {
                    return $query->where('events.title', 'LIKE', "%$request->search%")
                        ->orWhere('events.objective', 'LIKE', "%$request->search%")
                        ->orWhere('events.venue', 'LIKE', "%$request->search%");
                })
                ->whereDate("events.dateStart", ">", $this->now->toDateString())
                ->orderBy("events.dateStart", "DESC")
                ->paginate(25);

            return response()->json($upcomingEvents);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 400);
        }
    }

    public function getActivity(Request $request)
    {
        try {
            if (Auth::user()->role === "Employee") {
                $recentActivity = Activity::with('event')
                    ->where("user_id", Auth::id())
                    ->when($request->filter, function ($query) use ($request) {
                        if ($request->filter == "Today") {
                            return $query->whereDate('created_at', '=', $this->now->toDateString());
                        } else if ($request->filter == 'This month') {
                            return $query->whereMonth('created_at', '=', $this->now->month);
                        } else {
                            return $query->whereYear('created_at', '=', $this->now->year);
                        }
                    })
                    ->orderBy('created_at', 'DESC')
                    ->limit(15)
                    ->get();
            } else {
                $recentActivity = UserLog::with('event')
                    ->with(['user' => function ($query) {
                        $query->select('id', 'first_name', 'last_name');
                    }])
                    ->when($request->filter, function ($query) use ($request) {
                        if ($request->filter == "Today") {
                            return $query->whereDate('created_at', '=', $this->now->toDateString());
                        } else if ($request->filter == 'This month') {
                            return $query->whereMonth('created_at', '=', $this->now->month);
                        } else {
                            return $query->whereYear('created_at', '=', $this->now->year);
                        }
                    })
                    ->orderBy('created_at', 'DESC')
                    ->limit(15)
                    ->get();
            }

            return response()->json($recentActivity);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 400);
        }
    }

    public function activities()
    {
        if (Auth::user()->role === "Employee") {
            $activity = Activity::with('event')
                ->where("user_id", Auth::id())
                ->orderBy('created_at', 'DESC')
                ->paginate(50);
        } else {
            $activity = UserLog::with('event')
                ->with(['user' => function ($query) {
                    $query->select('id', 'first_name', 'last_name');
                }])
                ->orderBy('created_at', 'DESC')
                ->paginate(50);
        }

        return Inertia::render("Activities", [
            "activities" => $activity
        ]);
    }

    public function Notifications(Request $request)
    {
        $notification = [];
        $eventData = null;

        if ($request->id) {
            EventParticipants::where('id', $request->id)
                ->whereNull('seen')
                ->update(['seen' => true]);
        }

        if (!$request->event) {
            $notification = EventParticipants::with("eventSelect")
                ->where("user_id", Auth::id())
                ->when($request->unread, function ($query) {
                    $query->whereNull('seen');
                })
                ->latest()
                ->limit(15)
                ->get();
        } else {
            $eventData = Event::with('eventCode')->where('id', $request->event)
                ->first(["id", "title", "objective", "venue", "platform", "dateStart", "dateEnd", "is_range", "created_at"]);
        }

        return Inertia::render("Trainee/Notifications", [
            "notifications" => $notification,
            "event" => $eventData,
            "unread" => $request->unread
        ]);
    }

    public function NotificationJson(Request $request)
    {
        try {
            $notification = EventParticipants::with("eventSelect")
                ->where("user_id", Auth::id())
                ->latest()
                ->limit(15)
                ->get();

            $unseen = EventParticipants::with("eventSelect")
                ->where("user_id", Auth::id())
                ->whereNull('seen')
                ->count();

            

            return response()->json(collect(["notifications"=>$notification,"unseen"=>$unseen]));
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 400);
        }
    }

    public function getAllEvents()
    {
        try {
            if (Auth::user()->role == "Employee") {
                $events = EventParticipants::with('eventSelect')
                    ->where('user_id', Auth::id())
                    ->get(['id', 'user_id', 'event_id'])
                    ->map(function ($event) {
                        $time = EventCode::where('event_id', $event->event_id)->select('time_in', 'time_out')->get();
                        $event->event_code = $time;
                        return $event;
                    });
            } else {
                $events = Event::with("eventCode")
                    ->select("id", "platform", "venue", "title", "objective", "fund", "dateStart", "dateEnd", "is_range")
                    ->get()
                    ->map(function ($event) {
                        return collect([
                            "event_code" => $event->eventCode,
                            "event_select" => collect([
                                "id" => $event->id, 
                                "platform" => $event->platform, 
                                "venue" => $event->venue, 
                                "title" => $event->title, 
                                "objective" => $event->objective, 
                                "fund" => $event->fund, 
                                "dateStart" => $event->dateStart, 
                                "dateEnd" => $event->dateEnd, 
                                "is_range" => $event->is_range
                            ])
                        ]);
                    });
            }


            return response()->json($events);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 400);
        }
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }
}