import React, {useEffect, useRef} from 'react';
import {GetProfileDetails,ProfileUpdateRequest} from "../../ApiRequest/APIRequest";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
const Profile = () => {

    let emailRef,NameRef=useRef();

    useEffect(()=>{
        GetProfileDetails();
    },[])
    const ProfileData = useSelector((state) => state.profile.value);
    let navigate=useNavigate();

    return (
        <>
          <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                              
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']}  readOnly={true}  ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label> Name</label>
                                        <input  key={Date.now()} defaultValue={ProfileData['name']} readOnly={true} ref={(input)=>NameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
};

export default Profile;