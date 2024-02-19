<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'event_participant_id',
        'time_in',
        'time_out',
        'evaluated',
    ];

    public function event_participant(): BelongsTo
    {
        return $this->belongsTo(EventParticipants::class, 'event_participant_id', 'id');
    }

    public function event_participant_id($event_participant_id): BelongsTo
    {
        return $this->belongsTo(EventParticipants::class, 'event_participant_id', 'id')
            ->where('event_participant_id', $event_participant_id);
    }
}
