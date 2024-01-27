<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[];
    protected $with = ['system_message','system_message.menus'];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getFileAttribute($value){
        if($value && str_contains( strtolower($value),'http')){return $value;}
        if(!$value){return null;}
        return url('/').'/'. $value;
    }

    public function system_message(){
        return $this->belongsTo(SystemMessage::class);
    }
}
