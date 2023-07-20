<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
    ];

    public static function getTask($user_id)
    {
        $data = self::where('user_id',$user_id)->latest('id')->get();
        return $data;
    }

    public static function getTaskByStatus($user_id,$status)
    {
        $data = self::where('user_id',$user_id)->where('status',$status)->latest('id')->get();
        return $data;
    }


}
