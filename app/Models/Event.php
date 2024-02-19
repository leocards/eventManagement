<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "platform",
        "venue",
        "title",
        "objective",
        "fund",
        "is_range",
        "dateStart",
        "dateEnd",
        "total_rp",
        "remarks",
    ];

    public function eventCode(): HasMany
    {
        return $this->hasMany(EventCode::class, 'event_id', 'id')
            ->select(['id', 'event_id', 'time_in', 'time_in_cutoff', 'time_in_code', 'time_out', 'time_out_cutoff', 'time_out_code']);
    }
    //id, event_id, time_in, time_in_code, time_in_code_exp, time_out, time_out_code, time_out_code_exp, created_at, updated_at, deleted_at

    public function resourcePerson(): HasMany
    {
        return $this->hasMany(EventResourcePerson::class);
    }

    public function participant(): HasMany
    {
        return $this->hasMany(EventParticipants::class);
    }

    public function evaluationRates(): HasMany
    {
        return $this->hasMany(QuantitativeAssessment::class, 'event_id', 'id');
    }

    public function rpEvaluationRates(): HasMany
    {
        return $this->hasMany(QuantitativeAssessmentRP::class, 'event_id', 'id');
    }

    public function trainee(): HasMany
    {
        return $this->hasMany(EventParticipants::class)
            ->select(["id", "event_id", "user_id"])
            ->where("event_id", $this->id)
            ->where("user_id", Auth::id());
    }
}
