import React, {useRef,Fragment} from 'react';
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../Helper/FormHelper";
import {LoginRequest} from "../../ApiRequest/APIRequest"
import { Link,useNavigate} from 'react-router-dom';

const Login = () => {
    let passRef,emailRef=useRef();
    let navigate = useNavigate();

    const SubmitLogin=()=>{
        let email=emailRef.value;
        let pass=passRef.value;
        if(IsEmail(email)){
            ErrorToast("Invalid Email Address")
        }
        else if(IsEmpty(pass)){
            ErrorToast("Password Required")
        }
        else{
            LoginRequest(email,pass).then((result)=>{
                if(result===true){
                    window.location.href="/";
                    // navigate("/");
                }
            })

    
        }
    }


    return (
        <div>
            <Fragment>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-6 center-screen">
                            <div className="card w-90  p-4">
                                <div className="card-body">
                                    <h4>SIGN IN</h4>
                                    <br/>
                                    <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    <br/>
                                    <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    <br/>
                                    <button onClick={SubmitLogin} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                                    <hr/>
                                    <div className="float-end mt-3">
                                        <span>
                                            <Link className="text-center ms-3 h6 animated fadeInUp" to="/Register">Sign Up </Link>
                                            <span className="ms-1">|</span>
                                            <Link className="text-center ms-3 h6 animated fadeInUp" to="/SendOTP">Forget Password</Link>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    );
};

export default Login;