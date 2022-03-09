import React from 'react';
import { Link } from 'react-router-dom';

function UserSignIn() {

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                <form>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""></input>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value=""></input>
                    <Link to="/users"><button class="button" type="submit">Sign In</button></Link>
                    <Link to="/"><button className="button button-secondary" onclick='signInUser'>Cancel</button></Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

            </div>
        </main>
    );
}

export default UserSignIn;