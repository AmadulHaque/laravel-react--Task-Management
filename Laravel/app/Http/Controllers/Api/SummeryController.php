<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
class SummeryController extends Controller
{

    public function TaskSummery(Request $request)
    {
        $active = Task::getTaskByStatus($request->user()->id,1);
        $inactive = Task::getTaskByStatus($request->user()->id,0);
        return response()->json([
            'success' => true,
            'message' => 'All tasks',
            'Active' => count($active),
            'InActive' => count($inactive),
        ]);
    }
}
