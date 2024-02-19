<?php

namespace App\Http\Controllers;

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
            ->selectRaw('CONCAT(DATE_FORMAT(ec.time_in, "%h:%i %p"), " - ", DATE_FORMAT(ec.time_out, "%h:%i %p")) AS time, event_participants.event_id')
            ->where('event_participants.user_id', Auth::id())
            ->whereNull('ec.deleted_at')
            ->when($request->search, function ($query) use ($request) {
                return $query->where(function ($query) use ($request) {
                    return $query->whereHas('event', function ($subquery) use ($request) {
                        return $subquery->where('title', 'like', '%' . $request->search . '%');
                    });
                });
            })
            ->distinct('event_participants.event_id')
            ->latest('event_participants.created_at')
            ->paginate(25);

        if($request->expectsJson()) {
            return response()->json($trainings);
        } else {
            return Inertia::render("Trainee/Trainings", [
                'trainings' => $trainings
            ]);
        }
    }

}
