<?php
namespace App\Services;

use App\Models\Task;
use Illuminate\Database\Eloquent\Model;

trait ServiceTask
{


    public function createTask(array $data)
    {

        $dataArray = $data['task_url'];
   
        $resultArray = [];
        foreach ($dataArray as $key => $value) {
            
            $foundData = Task::checkTaskUrl($value);
            if ($foundData > 0) {
            }else{
                $resultArray[$key] = $value;
            }
        }
        return $resultArray;
 
    }
   


}