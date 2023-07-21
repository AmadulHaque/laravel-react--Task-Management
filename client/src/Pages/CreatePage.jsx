import React,{lazy, Suspense} from 'react';
import MasterLayout from "../Components/masterLayout/MasterLayout";
import LazyLoader from "../Components/masterLayout/LazyLoader";

const  Create = lazy(()=>import('../Components/Create/Create'));
const CreatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Create/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CreatePage;