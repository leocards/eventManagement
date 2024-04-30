<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\EventCode;
use App\Models\EventParticipants;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        $trainings = EventParticipants::with('event')
            ->leftJoin('event_codes AS ec', 'ec.event_id', '=', 'event_participants.event_id')
            ->when($request->attends && $request->attends != 'All', function ($query) use ($request) {
                return $query->where(function ($sub) use ($request) {
                    $sub->whereHas('attendance', function ($subquery) use ($request) {
                        if($request->attends == 'Missed')
                            $subquery->whereNull('time_in');
                        else if($request->attends == 'Attended')
                            $subquery->whereNotNull('time_in');
                    });
                });
            })
            ->when($request->search || ($request->year && $request->year != 'All Years'), function ($query) use ($request) {
                return $query->where(function ($sub) use ($request) {
                    return $sub->whereHas('event', function ($subquery) use ($request) {
                        if($request->search) {
                            $search = $request->search;
                            $subquery->where('title', 'LIKE', "%$search%");
                        }
                        if($request->year && $request->year != 'All Years')
                            $subquery->whereYear('dateStart', $request->year);
                    });
                });
            })
            ->selectRaw('CONCAT(DATE_FORMAT(ec.time_in, "%h:%i %p"), " - ", DATE_FORMAT(ec.time_out, "%h:%i %p")) AS time, 
                event_participants.event_id, event_participants.id AS participant_id')
            ->where('event_participants.user_id', Auth::id())
            ->whereNull('ec.deleted_at')
            ->distinct('event_participants.event_id')
            ->latest('event_participants.created_at')
            ->paginate(25);

        $hasAttended = $trainings->map(function ($attended) use ($request) {
            $attend = Attendance::where('event_participant_id', $attended->participant_id)
                
                ->exists();
            return $attend? $attended->participant_id : null;
        })->filter(function ($id) { return $id != null; });

        $years = EventParticipants::join('events as e', 'e.id', 'event_participants.event_id')
                    ->selectRaw('YEAR(e.dateStart) AS year')
                    ->groupBy('year')
                    ->get();

        if($request->expectsJson()) {
            return response()->json(collect([
                'trainings' => $trainings,
                'attends' => $hasAttended,
                'years' => $years
            ]));
        } else {
            return Inertia::render("Trainee/Trainings", [
                'trainings' => $trainings,
                'attends' => $hasAttended,
                'years' => $years
            ]);
        }
    }

}
