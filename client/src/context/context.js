import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CourseAppContext = createContext();

export const Provider = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useState('');
    const [errors, setErrors] = useState([]);

    // Action to create user
    const createUser = async (user) => {
        const res = await axios.post('http://localhost:5000/api/users')
        if (res.status === 201) {
            return [];
        } else if (res.status === 400) {
            return setErrors(res.data.errors);
        } else {
            throw new Error();
        };
    };

    // GETs user from API
    const getUser = async (emailAddress, password) => {
        console.log(`${emailAddress}: ${password}`);
        emailAddress = btoa(emailAddress);
        password = btoa(password);
        const res = await axios.get('http://localhost:5000/api/users', { emailAddress, password }, {
            headers: {
                'Content-Type': 'application/json charset=utf-8',
            },
            auth: {
                emailAddress: `${emailAddress}`,
                password: `${password}`,
            },
        }
        );
        if (res.status === 200) {
            return res.data;
        } else if (res.status === 401) {
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
            errors,
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

