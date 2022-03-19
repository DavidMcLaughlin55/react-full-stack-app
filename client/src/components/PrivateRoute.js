import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CourseAppContext } from '../context/context';

// Prevents access to route if user is not authenticated and sends them to sign-in page.
function PrivateRoute() {

    const { authenticatedUser } = useContext(CourseAppContext);

    return (authenticatedUser ? <Outlet /> : <Navigate to='/signin' />)
};
export default PrivateRoute;    