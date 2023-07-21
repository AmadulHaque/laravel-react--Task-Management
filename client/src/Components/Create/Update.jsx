import React, {useRef,useEffect} from 'react';
import {ErrorToast, IsEmpty} from "../../Helper/FormHelper";
import {useNavigate} from "react-router-dom";
import {UpdateTaskRequest} from "../../ApiRequest/APIRequest";
import {TaskShow} from "../../ApiRequest/APIRequest";
import {useSelector} from "react-redux";

const Update = () => {
    let statusRef,titleRef,descriptionRef=useRef();
    let navigate = useNavigate ();
    let params= new URLSearchParams(window.location.search);
    let id=params.get('id');

    useEffect(()=>{
        if(id!==null){
            TaskShow(id);  
        }
    },[])

    const details = useSelector((state) => state.task.details)

    useEffect(()=>{
        titleRef.value = details.title
        descriptionRef.value = details.description
        statusRef.value = details.status
    },[details])

    const UpdateTask = () => {
        let title=titleRef.value;
        let description=descriptionRef.value;
        let status = statusRef.value;
        if(IsEmpty(title)){
            ErrorToast("Title Required")
        }
        else if(IsEmpty(description)){
            ErrorToast("Description Required")
        }
        else {
            UpdateTaskRequest(id,title,description,status).then((res)=>{
                if(res===true){
                    navigate("/All")
                }
            })
        }
    }
    
    return (
        <div className="row d-flex justify-content-center">
            <div className=" col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                <div className="card">
                    <div className="card-body">
                        <h4 >Update Task</h4>
                        <br/>
                        <input ref={(input)=>titleRef=input} placeholder="Task Name" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <textarea ref={(input)=>descriptionRef=input} rows={5} placeholder="Task Description" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <select ref={(input)=>statusRef=input} className='form-control animated fadeInUp' >
                            <option value="1">Active</option>
                            <option value="0">InActive</option>
                        </select>
                        <button  onClick={UpdateTask}  className="btn float-end btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;