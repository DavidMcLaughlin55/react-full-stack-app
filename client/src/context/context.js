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
        console.log(data);
        headerConfig.data = data;
    };

    if (authRequired) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        headerConfig.headers['Authorization'] = `Basic ${encodedCredentials}`;
        console.log(credentials);
        console.log(encodedCredentials);
    };

    return axios(url, headerConfig);
};


export const Provider = (props) => {

    // const [cookie] = useState('authenticatedUser');
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    // Action to create new course
    const createCourse = async (newCourse, authenticatedUser) => {
        const emailAddress = authenticatedUser.emailAddress;
        const password = authenticatedUser.password;
        const res = await axiosHandler('/courses', 'POST', newCourse, true, { emailAddress: emailAddress, password: password });
        if (res.status === 201) {
            console.log('Course has been created.');
        } else if (res.status === 400) {
            return res.data.errors;
        } else {
            throw new Error();
        }
    };

    // Action to update course
    const updateCourse = async (id, courseUpdate, authenticatedUser) => {
        const emailAddress = authenticatedUser.emailAddress;
        const password = authenticatedUser.password;
        const res = await axiosHandler(`/courses/${id}`, 'PUT', courseUpdate, true, { emailAddress: emailAddress, password: password });
        if (res.status === 201) {
            console.log('Course has been updated.');
        } else if (res.status === 400) {
            return res.data.errors;
        } else {
            throw new Error();
        }
    };

    const deleteCourse = async (id, authenticatedUser) => {
        const emailAddress = authenticatedUser.emailAddress;
        const password = authenticatedUser.password;
        const res = await axiosHandler(`/courses/${id}`, 'DELETE', null, true, { emailAddress: emailAddress, password: password })
        if (res.status === 204) {
            console.log('Course has been deleted.');
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
        const user = await getUser(emailAddress, password);
        if (user !== null) {
            setAuthenticatedUser({ ...user, password });
            //Set Cookie
            // Cookies.set('authenticatedUser', user, { expires: 1 })
        };
        return user;
    };

    // // Action to signout user.
    const userSignOut = () => {
        setAuthenticatedUser(null);
        // Remove Cookie
        // Cookies.remove('authenticatedUser');
    };

    return (
        <CourseAppContext.Provider value={{
            authenticatedUser,
            actions: {
                createCourse: createCourse,
                updateCourse: updateCourse,
                deleteCourse: deleteCourse,
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

