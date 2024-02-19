<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuantitativeAssessment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "event_id",
        "user_id",
        "q1",
        "q2",
        "q3",
        "q4",
        "q5",
        "q6",
        "q7",
        "q8",
        "q9",
        "q10",
        "q11",
        "q12",
    ];

    public function gender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
