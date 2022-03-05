import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// App Component Imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
