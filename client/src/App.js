import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// App Component Imports
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route element={<PrivateRoute />}>
            <Route path='/courses/create' element={<CreateCourse />} />
            <Route path='/courses/:id/update' element={<UpdateCourse />} />
          </Route>
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path='/signin' element={<UserSignIn />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/signout' element={<UserSignOut />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
