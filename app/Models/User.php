<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "first_name",
        "last_name",
        "birthday",
        "email",
        "contact",
        "address",
        "position",
        "province",
        "gender",
        "profile",
        "password",
        "status",
        "role",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function scopeSearch($query, $search, $filter = "All")
    {
        if($filter != "All") {
            return $query->select("id", "first_name", "last_name", "email", "province", "position", "profile", "status")
            ->where('role', 'Employee')
            ->where(function ($query) use ($search, $filter) {
                $query->where('first_name', 'LIKE', "%$search%")
                    ->orWhere('last_name', 'LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->where('province', "$filter");
            });
        }else{
            return $query->select("id", "first_name", "last_name", "email", "province", "position", "profile", "status")
            ->where('first_name', 'LIKE', "%$search%")
            ->orWhere('last_name', 'LIKE', "%$search%")
            ->orWhere('email', 'LIKE', "%$search%")
            ->where('role', 'Employee');
        }
    }

    public function hasRole($role)
    {
        return $this->role == $role;
    }

    public function trainingsAttended(): HasMany
    {
        return $this->hasMany(EventParticipants::class, 'user_id', 'id');
    }

    public function attendedEvent(): HasMany
    {
        return $this->hasMany(EventParticipants::class, 'user_id', 'id');
    }
}
