import React, { Component } from 'react';

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
                        <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
                </div>
            </main>
        );
    }
}

export default UserSignUp;