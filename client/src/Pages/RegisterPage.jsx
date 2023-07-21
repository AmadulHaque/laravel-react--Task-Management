import React, {lazy, Suspense}  from 'react';

import LazyLoader from "../Components/masterLayout/LazyLoader";

const  Register = lazy(()=>import('../Components/Registration/Register'));
const RegisterPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <Register/>
            </Suspense>
        </div>
    );
};

export default RegisterPage;