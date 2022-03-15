import React, { createContext, useState } from 'react';
// import Cookies from 'js-cookie';
import axios from 'axios';

export const CourseAppContext = createContext();

// fetchHandler is a function to set headers and handle requests
const axiosHandler = (path, method, data = null, authRequired = false, credentials = null) => {
    const url = 'http://localhost:5000/api' + path;

    const headerConfig = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data !== null) {
        headerConfig.body = data;
    };

    if (authRequired) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        headerConfig.headers['Authorization'] = `Basic ${encodedCredentials}`;
    };

    return axios(url, headerConfig);
};


export const Provider = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    // Action to create new course
    const createCourse = async (newCourse, currentUser) => {
        const email = currentUser.emailAddress;
        const password = currentUser.password;
        console.log(`${email} and ${password}`);
        const res = await axiosHandler('/courses', 'POST', newCourse, true, { email, password });
        if (res.status === 201) {
            console.log('Course has been created.');
        } else if (res.status === 400) {
            return res.data.errors;
        } else {
            throw new Error();
        }
    };

    // Action to create user
    const createUser = async (user) => {
        const res = await axiosHandler('/users', 'POST', user);
        if (res.status === 201) {
            console.log('User created');
            return [];
        } else if (res.status === 400) {
            return res.data.errors;
        } else {
            throw new Error();
        };
    };

    // Function to GET user from API
    const getUser = async (emailAddress, password) => {
        const res = await axiosHandler('/users', 'GET', null, true, { emailAddress, password });
        if (res.status === 200) {
            return res.data;
        } else if (res.status === 401) {
            return null;
        } else {
            throw new Error();
        };
    };

    // Action to find and authenticate user on sign in. 
    const userSignIn = async (emailAddress, password) => {
        setCurrentUser({ emailAddress, password });
        const user = await getUser(emailAddress, password);
        if (user !== null) {
            setAuthenticatedUser(user);
        };
        return user;
    };

    // // Action to signout user.
    const userSignOut = () => {
        setAuthenticatedUser(null);
    };

    return (
        <CourseAppContext.Provider value={{
            currentUser,
            authenticatedUser,
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

