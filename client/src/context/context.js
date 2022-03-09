import React, { createContext, useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const CourseAppContext = createContext();

export const Provider = (props) => {

    // const [authenticatedUser, setAuthenticatedUser] = useState('');
    // const [emailAddress, setEmailAddress] = useState('');
    // const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const [resErrors, setResErrors] = useState([]);


    // Action to POST a new course.
    const createNewCourse = async () => {
        let res = await api.post('/courses')
        if (res.status === 201) {
            console.log(res);
            setData(res.data);
            return data;
        } else if (res.status === 400) {
            console.log(res.errors);
            setResErrors(res.errors);
            return resErrors;
        };
    };

    // // Action to GET authenticated user on sign in. 
    // const signIn = async (emailAddress, password) => {
    //     const res = await api.get('/users', { emailAddress, password });
    //     if (res.status === 200) {
    //         console.log(res);
    //     } else {
    //         throw new Error();
    //     }
    // };

    // // Action to signout user.
    // const signOut = () => {
    //     setAuthenticatedUser(null);
    // }

    return (
        <CourseAppContext.Provider value={{
            data,
            resErrors,
            actions: {
                createCourse: createNewCourse,
                // signInUser: signIn,
                // signOutUser: signOut,
            }
        }}>
            {props.children}
        </CourseAppContext.Provider>
    );
};