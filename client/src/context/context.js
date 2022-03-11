import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CourseAppContext = createContext();

export const Provider = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState('');

    // Action to create user
    const createUser = async (user) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/users')
        if (res.status === 201) {
            return [];
        } else if (res.status === 400) {
            return res.data.errors;
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
                'Authorization': `Basic : ${encodedCredentials}`,
            },
            body: JSON.stringify(body),
        });
        if (res.status === 200) {
            return res.data;
        } else if (res.status === 400) {
            console.log('Could not get user.')
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
            actions: {
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

