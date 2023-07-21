import axios from "axios"
import {ErrorToast, SuccessToast} from "../Helper/FormHelper";
import store from '../redux/store/store';
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import  {getToken, setEmail, setOTP, setToken, setUserDetails} from "../Helper/SessionHelper";
import { SetNewTask,SetTaskDetails} from "../redux/state-slice/task-slice";
import {SetProfile} from "../redux/state-slice/profile-slice";
import {SetSummary} from "../redux/state-slice/summary-slice";

const token = getToken();
const BaseURl = "http://localhost:8000/api";
const AxiosHeader ={headers:{Authorization: `Bearer ${token}`}};

export async function RegisterRequest(name,email,password_confirmation,password){
    try {
        store.dispatch(ShowLoader())
        const URL=BaseURl+"/register";
        const PostBody={email,name,password_confirmation,password}
        let res=await axios.post(URL,PostBody)
        store.dispatch(HideLoader())
        if(res.data['success']==false){
            let data = res.data['errors'];
            if(data.email){
                ErrorToast(data.email[0])
                return false;
            }
            if(data.password){
                ErrorToast(data.password[0])
                return false;
            }
            if(data.password_confirmation){
                ErrorToast(data.password_confirmation[0])
                return false;
            }
        }
        else{
            SuccessToast("Registration Success")
            return true;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    }
}

export async function LoginRequest(email,password){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURl+"/login";
        let PostBody={"email":email,"password":password}
        let res =await axios.post(URL,PostBody);
        if(res.data['success']==false){
            let data = res.data['errors'];
            if(data.email){
                ErrorToast(data.email[0])
                return false;
            }
            if(data.password){
                ErrorToast(data.password[0])
                return false;
            }
        }
        else{
            setToken(res.data['data']['token']);
            setUserDetails(res.data['data']['user']);
            SuccessToast("Login Success")
            return true;
        }

        store.dispatch(HideLoader())
    }
    catch (e) {
        store.dispatch(HideLoader())
        ErrorToast("Invalid Email or Password")
        return  false;
    }
}

export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/user";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            store.dispatch(SetProfile(res.data['data']['user']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        console.log(err);
        ErrorToast("Something Went Wrong 2")
        store.dispatch(HideLoader())
    });
}

// create task
export function NewTaskRequest(title,description){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/tasks";
    let PostBody={"title":title,"description":description,status:1}
    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            SuccessToast("New Task Created")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}

// Get Task By Status
export function TaskList(){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/tasks";
     axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            store.dispatch(SetNewTask(res.data['data']));
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

// Summary
export function SummaryRequest(){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/task/summery";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            store.dispatch(SetSummary(res.data))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

// delete Task
export function DeleteRequest(id){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/tasks/"+id;
    return axios.delete(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            SuccessToast("Delete Successful")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

// Get Task By Status
export function TaskShow(id){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/tasks/"+id;
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            store.dispatch(SetTaskDetails(res.data['data']));
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

// update task
export function UpdateTaskRequest(id,title,description,status){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/tasks/"+id;
    let PostBody={"title":title,"description":description,"status":status,"_method":"put"}
    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.data['success']==true){
            SuccessToast("Task Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}



export function ProfileUpdateRequest(email,name,username,mobile,password,photo){

    store.dispatch(ShowLoader())

    let URL=BaseURl+"/profile-update";

    let PostBody={email:email,name:name,username:username,mobile:mobile,password:password,photo:photo}
    let UserDetails=[{email:email,name:name,username:username,mobile:mobile,photo:photo}];
    console.log(UserDetails)

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            SuccessToast("Profile Update Success")
            setUserDetails(UserDetails)

            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

// Recover Password Step 01 Send OTP
export function RecoverVerifyEmailRequest(email){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/RecoverVerifyEmail/"+email;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}
 
// Recover Password Step 02 Verify OTP
export function RecoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/RecoverVerifyOTP/"+email+"/"+OTP;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

// Recover Password Step 03 Reset Pass
export function RecoverResetPassRequest(email,OTP,password){
    store.dispatch(ShowLoader())
    let URL=BaseURl+"/RecoverResetPass";
    let PostBody={email:email,OTP:OTP,password:password}

    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });

}
