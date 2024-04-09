<?php

namespace App\Exports;

use App\Models\Event;
use App\Models\EventResourcePerson;
use App\Models\QuantitativeAssessmentRP;
use App\Models\ResourcePerson;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromView;

class ResourcePersonExport implements FromView
{
    public $rp;
    public $event;
    public $bgcolors;
    public function __construct($event_id = null, $rp = null, public bool $isAll = false)
    {
        $this->rp = ResourcePerson::find($rp);
        $this->event = !$isAll ? Event::find($event_id) : Event::with(['eventResourcePerson' => function ($query) {
                $query->with(['resourcePerson' => function ($query) {
                    $query->with(['rp_ratings' => function ($query) {
                        $query->with('gender');
                    }]);
                }]);
            }])
            ->where('id', $event_id)
            ->first();
        $this->bgcolors = collect([
            '#7f1d1d', '#713f12', '#064e3b', '#0c4a6e', '#4c1d95', '#831843', '#7c2d12', '#365314', 
            '#134e4a', '#1e3a8a', '#581c87', '#881337', '#78350f', '#14532d', '#134e4a', '#164e63'
        ]);
    }

    // for testing view
    public function jsonView()
    {
        return response()->json($this->event->eventResourcePerson->flatMap(function ($item) {
            return $item->resourcePerson->rp_ratings;
        })->groupBy('user_id')->values()->toArray());
    }

    public function view(): View
    {
        if($this->isAll) {
            $ratings = $this->event->eventResourcePerson->flatMap(function ($item) {
                return $item->resourcePerson->rp_ratings;
            })->groupBy('user_id')->values()->toArray();

            return view('AllResourcePerson', [
                "event" => $this->event,
                "rp" => $this->rp,
                "rps" => $this->event->eventResourcePerson->map(fn ($item) => $item->resourcePerson),
                "ratings" => $ratings,
                "randomColors" => fn ($index) => $this->bgcolors[$index>16?rand(0, count($this->bgcolors) - 1):$index]
            ]);
        } else {
            $data = QuantitativeAssessmentRP::with('gender')
                ->where('event_id', $this->event?->id)
                ->where('rps_id', $this->rp->id)
                ->get();

            return view('ResourcePerson', [
                "ratings" => $data,
                "event" => $this->event,
                "rp" => $this->rp,
            ]);
        }
    }
}
