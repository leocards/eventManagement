<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\QuantitativeAssessmentRP;
use App\Models\ResourcePerson;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ResourcePersonExport implements FromView
{
    public $rp;
    public $event;
    public function __construct($event_id = null, $rp = null)
    {
        $this->rp = ResourcePerson::find($rp);
        $this->event = Event::find($event_id);
    }

    public function view(): View
    {
        $data = QuantitativeAssessmentRP::with('gender')
        ->where('event_id', $this->event?->id)
        ->get();

        return view('ResourcePerson', [
            "ratings" => $data,
            "event" => $this->event,
            "rp" => $this->rp
        ]);
    }
}
