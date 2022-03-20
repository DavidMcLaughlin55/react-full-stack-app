import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';
import ValidationErrors from './ValidationErrors';

function UserSignUp() {

    const { actions } = useContext(CourseAppContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    // Brings user back to home page.
    let navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    // Function to sign up user on submission of form.
    const signUpUser = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, emailAddress, password, }; // New user payload
        console.log(user);
        actions.createUser(user)
            .then(errors => {
                if (errors.length > 0) {
                    console.log('Error signing up user.');
                } else {
                    actions.userSignIn(emailAddress, password)
                        .then(() => {
                            navigate('/');
                        });
                };
            })
            .catch(error => {
                setErrors(error.response.data.errors)
                console.log('User could not be created', error.response.data.errors);
            });
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {errors ? <ValidationErrors errorMessages={errors} /> : null}
                <form onSubmit={signUpUser}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" placeholder="Email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}

export default UserSignUp;