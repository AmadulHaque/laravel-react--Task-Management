import React,{Suspense,lazy} from 'react';
import LazyLoader from "../Components/masterLayout/LazyLoader";

const  P404 = lazy(()=>import('../Components/NotFound/Notfound'));

const Page404 = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <P404/>
            </Suspense>
        </div>
    );
};

export default Page404;