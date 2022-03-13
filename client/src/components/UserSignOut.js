import React, { useContext, useEffect } from 'react';
import { CourseAppContext } from '../context/context';
import { Navigate } from 'react-router-dom';

// Redirect to home upon user signout
function UserSignOut() {

    const { actions } = useContext(CourseAppContext);

    useEffect(() => {
        actions.userSignOut();
    }, [actions])

    return (
        <Navigate to="/" />
    );
}

export default UserSignOut;