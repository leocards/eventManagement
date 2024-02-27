<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventParticipants extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "event_id",
        "user_id",
        "seen"
    ];

    protected static function boot()
    {
        parent::boot();

        // When an event is being deleted, also soft delete related event participants
        static::deleting(function($participants) {
            $participants->attendance()->delete();
        });
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id')
            ->select(["id", "title", "venue", "platform", "is_range", "dateStart", "dateEnd"]);
    }

    public function event2(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }

    public function eventSelect(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id')
            ->select(["id", "title", "objective", "venue", "platform", "fund", "is_range", "dateStart", "dateEnd"]);
    }

    public function participants(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "id")
            ->selectRaw("id, CONCAT(first_name, ' ', last_name) AS name, position, profile, province");
    }

    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class, 'event_participant_id', 'id');
    }
}
