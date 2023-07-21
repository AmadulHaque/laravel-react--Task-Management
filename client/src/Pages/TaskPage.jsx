import React,{lazy, Suspense} from 'react';
import MasterLayout from "../Components/masterLayout/MasterLayout";
import LazyLoader from "../Components/masterLayout/LazyLoader";

const  Task = lazy(()=>import('../Components/Task/Task'));
const CreatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Task/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CreatePage;