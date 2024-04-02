<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\QualitativeAssessment;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class QualitativeAssessmentExport implements FromView
{
    public $event;
    public function __construct($event_id)
    {
        $this->event = Event::find($event_id);
    }

    public function view(): View
    {
        $data = QualitativeAssessment::with('gender')
        ->where('event_id', $this->event?->id)
        ->get();

        return view('QualitativeAssessment', [
            "assessment" => $data,
            "event" => $this->event
        ]);
    }
}