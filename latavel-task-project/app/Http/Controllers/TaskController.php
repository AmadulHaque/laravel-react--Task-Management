<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ServiceTask;
use App\Http\Requests\AddRequest;
class TaskController extends Controller
{
   use ServiceTask;

    
    public function Store(AddRequest $request)
    {
        $data = $request->validated();
        $data2 = $this->createTask($data);
         
        return response()->json(['result' => $data2]);

    }

}
