import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';

function PrivateRoute({ Component }) {

    const { authenticatedUser } = useContext(CourseAppContext);

    return authenticatedUser ? <Component /> : <Navigate to='/signin' />;
};
export default PrivateRoute;