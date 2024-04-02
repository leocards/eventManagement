<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\QuantitativeAssessment;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class FeedbackReportExport implements FromView
{
    public $event;
    public function __construct($event_id)
    {
        $this->event = Event::find($event_id);
    }
    
    public function view(): View
    {
        $data = QuantitativeAssessment::with(['gender' => function ($query) {
            $query->select('id', 'gender');
        }])
        ->where('event_id', $this->event?->id)
        ->get();

        return view('FeedbackReport', [
            "consolidated" => $data,
            "event" => $this->event
        ]);
    }
}
