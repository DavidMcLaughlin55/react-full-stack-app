import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const CourseAppContext = createContext();

// fetchHander is a function to set headers and handle requests
const axiosHandler = (path, method = 'GET', body = null, authRequired = false, credentials = null) => {
    const url = 'http://localhost:5000/api' + path;

    const headerConfig = {
        method,
        headers: {
            'Content-Type': 'application/json charset=utf-8',
        },
    };

    if (body !== null) {
        headerConfig.body = body;
    };

    if (authRequired) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        headerConfig.headers['Authorization'] = `Basic ${encodedCredentials}`;
    };
    return axios(url, headerConfig);
};


export const Provider = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState('');

    // Action to create new course
    const createCourse = async (newCourse, user) => {
        const res = await axiosHandler('/courses', 'POST', newCourse, true, user);
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
        console.log(user);
        if (res.status === 201) {
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
        const user = await getUser(emailAddress, password);
        if (user !== null) {
            setAuthenticatedUser(user);
            //Set cookie
            Cookies.set('authenticatedUser', user, { expires: 1 });
        };
        return user;
    };

    // // Action to signout user.
    const userSignOut = () => {
        setAuthenticatedUser(null);
        //Remove cookie
        Cookies.remove('authenticatedUser');
        return authenticatedUser;
    };

    return (
        <CourseAppContext.Provider value={{
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

