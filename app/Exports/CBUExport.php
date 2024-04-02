<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;

class CBUExport implements FromView
{

    public function __construct(
        public $year = 2024
    )
    {
    }

    public function view(): View
    {
        $users = User::with(['trainingsAttended' => function ($query) {
            $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                ->whereNotNull('a.time_in')
                //->whereNotNull('a.time_out')
                ->leftJoin('events AS e', function ($join) {
                    $join->on('e.id', '=', 'event_participants.event_id');
                })
                ->when($this->year, function ($subquery) {
                    return $subquery->whereYear('e.dateStart', $this->year);
                })
                ->selectRaw('count(*) as trainings, user_id')
                ->groupBy('user_id');
        }])
        ->with(['attendedEvent' => function ($query) {
            $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                ->leftJoin('events as e', 'e.id', '=', 'event_participants.event_id')
                ->whereYear('e.dateStart', $this->year)
                ->selectRaw('e.id as e_id, e.title, event_participants.event_id, event_participants.user_id, event_participants.id, a.event_participant_id, a.id');
        }])
        ->where('role', 'Employee')
        ->select('id', 'first_name', 'last_name', 'status')
        ->get();

        $events = Event::with(['participant' => function ($query) {
                $query->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
                    ->selectRaw('COUNT(*) as total, event_id')
                    ->groupBy('event_id');
            }])
            ->whereYear('dateStart', $this->year)
            ->orWhereYear('dateEnd', $this->year)
        ->get(['id', 'title']);

        return view('CBU', [
            'users' => $users,
            'events' => $events
        ]);
    }
}
