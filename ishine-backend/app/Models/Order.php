<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];
    protected $casts = [
        'shipping_address' => 'array',
        'items' => 'array',
        'total' => 'decimal:2'
    ];
    public function user() { return $this->belongsTo(User::class); }
}
