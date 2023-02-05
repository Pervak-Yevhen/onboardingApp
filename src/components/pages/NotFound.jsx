import React, { useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { ROUTER_ROOT } from "../../router";

const PageNotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => navigate(ROUTER_ROOT), 1000);
        //eslint-disable-next-line
    },[]);
    return (
        <h1>Not Found</h1>
    );
};

export default PageNotFound;