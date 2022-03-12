import React, { createContext, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';

export const CourseAppContext = createContext();

export const Provider = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState('');
    const [errors, setErrors] = useState([]);

    // Action to create new course
    const createCourse = async (newCourse) => {
        const res = await axios.post('http://localhost:5000/api/courses', newCourse);
        if (res.status === 201) {
            console.log('Course has been created.');
        } else if (res.status === 400) {
            console.log('Coure could not be created.');
            console.log(res.error.msg);
        } else {
            throw new Error();
        }
    };

    // Action to create user
    const createUser = async (user) => {
        const res = await axios.post('http://localhost:5000/api/users', user)
        if (res.status === 201) {
            return [];
        } else if (res.status === 400) {
            console.log(res);
            return setErrors(res.error);
        } else {
            throw new Error();
        };
    };

    // GETs user from API
    const getUser = async (emailAddress, password) => {
        const encodedCredentials = btoa(`${emailAddress}:${password}`);
        const res = await axios.get('http://localhost:5000/api/users', {
            headers: {
                'Content-Type': 'application/json charset=utf-8',
                'Authorization': `Basic ${encodedCredentials}`
            },
        });
        if (res.status === 200) {
            return res.data;
        } else if (res.status === 401) {
            console.log('Could not get user.');
            return null;
        } else {
            throw new Error();
        };
    };

    // Action to find and authenticate user on sign in. 
    const userSignIn = async (emailAddress, password) => {
        const user = await getUser(emailAddress, password);
        if (user !== null) {
            setAuthenticatedUser(user);
        }
        return user;
    };

    // // Action to signout user.
    const userSignOut = () => {
        setAuthenticatedUser(null);
    };

    return (
        <CourseAppContext.Provider value={{
            authenticatedUser,
            errors,
            actions: {
                createCourse: createCourse,
                createUser: createUser,
                getUser: getUser,
                userSignIn: userSignIn,
                userSignOut: userSignOut,
            }
        }}>
            {props.children}
        </CourseAppContext.Provider>
    );
};

