<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AddressBook extends Model
{
    protected $fillable = [
        'name',
        'email',
        'socialId',
        'pathToImage'
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
