import React,{lazy, Suspense} from 'react';
import MasterLayout from "../Components/masterLayout/MasterLayout";
import LazyLoader from "../Components/masterLayout/LazyLoader";

const  Update = lazy(()=>import('../Components/Create/Update'));
const UpdatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Update/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default UpdatePage;