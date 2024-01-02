<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemMessage extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function menus()
    {
        return $this->hasMany(SystemMenu::class, 'sys_message_id', 'id')
            ->where('system_type', 0);
    }
}
