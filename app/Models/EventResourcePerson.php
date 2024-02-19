<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventResourcePerson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "event_id",
        "rp_id"
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function resourcePerson(): BelongsTo
    {
        return $this->belongsTo(ResourcePerson::class, "rp_id", "id")
            ->select("id", "name", "position", "profile");
    }
}
