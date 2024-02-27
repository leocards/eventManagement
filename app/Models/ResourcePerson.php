<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ResourcePerson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "name", "position", "profile"
    ];

    protected static function boot()
    {
        parent::boot();

        // When an event is being deleted, also soft delete related event participants
        static::deleting(function($rp) {
            $rp->rp_ratings()->delete();
            $rp->event_rps()->delete();
        });
    }

    public function scopeSearch($query, $search)
    {
        return $query->select("id", "name", "position", "profile")->where('name', 'LIKE', "%$search%");
    }


    public function ratings(): HasMany
    {
        return $this->hasMany(QuantitativeAssessmentRP::class, 'rps_id', 'id')
            ->with('gender');
    }

    public function rp_ratings(): HasMany
    {
        return $this->hasMany(QuantitativeAssessmentRP::class, 'rps_id', 'id');
    }

    public function event_rps(): HasMany
    {
        return $this->hasMany(EventResourcePerson::class, 'rp_id', 'id');
    }
}
