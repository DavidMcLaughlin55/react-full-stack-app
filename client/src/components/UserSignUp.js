import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {

    render() {

        return (
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>

                    <form>
                        <label for="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" value=""></input>
                        <label for="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" value=""></input>
                        <label for="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" value=""></input>
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='/';">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
            </main>
        );
    }
}

export default UserSignUp;