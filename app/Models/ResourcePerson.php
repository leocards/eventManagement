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

    public function scopeSearch($query, $search)
    {
        return $query->select("id", "name", "position", "profile")->where('name', 'LIKE', "%$search%");
    }


    public function ratings(): HasMany
    {
        return $this->hasMany(QuantitativeAssessmentRP::class, 'rps_id', 'id')
            ->with('gender');
    }
}
