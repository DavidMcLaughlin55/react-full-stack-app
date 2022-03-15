import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CourseAppContext } from '../context/context';

function Header() {

    const { authenticatedUser } = useContext(CourseAppContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>
                    <ul className="header--signedout">
                        {authenticatedUser ? (
                            <React.Fragment>
                                <li>Welcome, {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}!</li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li><NavLink to="/signup">Sign Up</NavLink></li>
                                <li><NavLink to="signin">Sign In</NavLink></li>
                            </React.Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;