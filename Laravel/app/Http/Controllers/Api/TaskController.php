<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;


class TaskController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = Task::getTask($request->user()->id);
        return response()->json([
            'success' => true,
            'message' => 'All tasks',
            'data' =>$tasks ,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:280|unique:tasks',
            'description' => 'required|string',
            'status' => 'required|string',
        ]);

        // return form validation error with json if error occured
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error occured',
                'errors' => $validator->getMessageBag(),
            ], 422);
        }
        $data = $validator->validated();
        $data['user_id'] = $request->user()->id;
        // store a new post
        Task::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully!',
            'data' => [],
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json([
            'success' => true,
            'message' => 'Task details.',
            'data' => $task,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:280|unique:tasks,title,' . $task->id,
            'description' => 'required|string',
            'status' => 'required|string',
        ]);

        // return form validation error with json if error occured
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error occured',
                'errors' => $validator->getMessageBag(),
            ], 422);
        }

        $data = $validator->validated();

        // store a new task
        $task->update($data);
        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully!',
            'data' => [],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully!',
            'data' => [],
        ]);
    }
}
