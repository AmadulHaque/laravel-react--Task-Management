import React,{Suspense,lazy}  from 'react';
import MasterLayout from "../Components/masterLayout/MasterLayout";
import LazyLoader from "../Components/masterLayout/LazyLoader";

const  Profile = lazy(()=>import('../Components/Profile/Profile'));
const ProfilePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProfilePage;