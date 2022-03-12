// import React, { useContext } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { CourseAppContext } from '../context/context';

// function PrivateRoute() {

//     let navigate = useNavigate();

//     const { authenticatedUser } = useContext(CourseAppContext);

//     return (
//         <Routes>
//             <Route {...authenticatedUser ? (<Courses />) : (navigate('/signin'))} />
//             <Route {...authenticatedUser ? (<UpdateCourse />) : (navigate('/signin'))} />
//         </Routes>
//     )
// };

// export default PrivateRoute;