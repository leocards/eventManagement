<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventCode extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "event_id",
        "time_in",
        "time_in_cutoff",
        "time_in_code",
        "time_in_code_exp",
        "time_out",
        "time_out_cutoff",
        "time_out_code",
        "time_out_code_exp",
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }
}
