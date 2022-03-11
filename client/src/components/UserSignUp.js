import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';
import ValidationErrors from './ValidationErrors';
import axios from 'axios';

function UserSignUp() {

    const { actions } = useContext(CourseAppContext);

    // const [user, setUser] = useState('');
    // const [emailAddress, setEmailAddress] = useState('');
    // const [password, setPassword] = useState('');
    const [resErrors, setResErrors] = useState([])

    // Brings user back to home page.
    let navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    // Function to sign up user on submission of form.
    const signUpUser = (e) => {
        e.preventDefault();
        actions.createUser(user)
            .then(errors => {
                if (errors.length) {
                    setResErrors(errors);
                } else {
                    actions.userSignIn(emailAddress, password)
                        .then(() => {
                            navigate('/');
                        });
                }
            }).catch(error => {
                console.log('There was an error signing up.', error);
            })
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {(resErrors) ? <ValidationErrors errorMessages={resErrors} /> : null}
                <form onSubmit={signUpUser}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue=""></input>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue=""></input>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue=""></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue=""></input>
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}

export default UserSignUp;