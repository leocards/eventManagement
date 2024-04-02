<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\EventParticipants;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class AttendanceExport implements FromView
{
    
    public function __construct(
        public $id = null
    )
    {
        
    }

    public function view(): View
    {
        $attendance = EventParticipants::with('event')
            ->with('participants')
            ->join('attendances as a', 'a.event_participant_id', '=', 'event_participants.id')
            ->leftJoin('event_codes AS ec', function ($join) {
                $join->on('ec.event_id', '=', 'event_participants.event_id')
                    ->whereRaw('ec.id = (SELECT MIN(id) FROM event_codes WHERE event_codes.event_id = event_participants.event_id)');
            })
            ->select('a.*', 'event_participants.user_id', 'event_participants.event_id', 'ec.time_in AS event_time_in', 'ec.time_in_cutoff AS time_in_cutoff')
            ->when($this->id, function ($query) {
                $query->where('event_participants.event_id', $this->id);
            })
            ->whereNotNull('a.time_in')
            ->latest('a.updated_at')
            ->get();

        $event = null;
        if($this->id) {
            $event = Event::leftJoin('event_codes AS ec', function ($join) {
                $join->on('ec.event_id', '=', 'events.id')
                    ->whereRaw('ec.id = (SELECT MIN(id) FROM event_codes WHERE event_codes.event_id = events.id)');
            })
            ->when($this->id, function ($query) {
                $query->where('events.id', $this->id);
            })
            ->select('events.title', 'events.dateStart', 'events.dateEnd', 'events.platform', 'events.venue', 'ec.time_in', 'ec.time_out')
            ->first();
        }

        return view('Attendance', [
            "attendances" => $attendance,
            "event" => $event
        ]);
    }
}
