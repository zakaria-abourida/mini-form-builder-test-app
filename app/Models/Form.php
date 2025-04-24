<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Form extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'bg_color', 'user_id'];


    public function fields()
    {
        return $this->hasMany(FormField::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
