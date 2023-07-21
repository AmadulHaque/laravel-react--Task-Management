import React, {useEffect} from 'react';
import {SummaryRequest} from "../../ApiRequest/APIRequest";
import {useSelector} from "react-redux";

const Dashboard = () => {
    useEffect(()=>{
        SummaryRequest();
    },[])
    
    const SummaryList = useSelector((state) => state.summary.value)
    return (
        <div className="row">
            <div  className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="animated fadeInUp">Total Active Task </h5>
                        <h6 className="text-secondary animated fadeInUp">{SummaryList.Active}</h6>
                    </div>
                </div>
            </div>
            <div  className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="animated fadeInUp">Total InActive Task </h5>
                        <h6 className="text-secondary animated fadeInUp">{SummaryList.InActive}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;