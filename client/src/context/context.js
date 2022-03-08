import React, { createContext, useState } from 'react';

export const CourseAppContext = createContext();

export const Provider = () => {

    const [authenticatedUser, setAuthenticatedUser] = useState('');


    const signInUser = () => {

    };

    const signOutUser = () => {
        setAuthenticatedUser(null);
    }

    return (
        <CourseAppContext.Provider value={{
            actions: {
                signIn: signInUser,
                signOut: signOutUser,
            }
        }}>
        </CourseAppContext.Provider>
    );
}