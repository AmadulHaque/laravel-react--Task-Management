<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'task_url',
    ];


    public static function checkTaskUrl($value) {
        $data = self::where('task_url', $value)->count();
        return $data;
    }


}
