import React,{Suspense,lazy} from 'react';
import LazyLoader from "../Components/masterLayout/LazyLoader";



const  Login = lazy(()=> import('../Components/Login/Login'));

const LoginPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <Login/>
            </Suspense>
        </div>
    );
};

export default LoginPage;