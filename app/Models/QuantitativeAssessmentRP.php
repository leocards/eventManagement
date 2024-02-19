<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuantitativeAssessmentRP extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "event_id",
        "user_id",
        "rps_id",
        "q1",
        "q2",
        "q3",
        "q4",
        "q5",
        "q6",
        "q7",
        "comment",
    ];

    public function resourcePerson(): BelongsTo
    {
        return $this->belongsTo(ResourcePerson::class, 'rp_id', 'id');
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function gender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id')
            ->select('id', 'gender');
    }
}
