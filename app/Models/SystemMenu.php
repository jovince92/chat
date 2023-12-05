<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemMenu extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function replies(){
        return $this->hasOne(SystemMessage::class,'id','sys_message_reply_id');
    }
}
