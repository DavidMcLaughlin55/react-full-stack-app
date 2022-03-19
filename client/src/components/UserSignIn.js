import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';

function UserSignIn() {

    const { actions } = useContext(CourseAppContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    // Brings user back to home page.
    let navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    // Function to sign-in user on submission of form.
    const signIn = (e) => {
        e.preventDefault();
        actions.userSignIn(emailAddress, password)
            .then((user) => {
                if (user === null) {
                    console.log('User could not be signed in.');
                } else {
                    navigate('/');
                }
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={signIn}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" placeholder="Email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

            </div>
        </main>
    );
}

export default UserSignIn;