import React,{Suspense,lazy} from 'react';
import LazyLoader from "../Components/masterLayout/LazyLoader";
import MasterLayout from "../Components/masterLayout/MasterLayout";


const  Dashboard = lazy(()=>import('../Components/Dashboard/Dashboard'));

const DashboardPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default DashboardPage;