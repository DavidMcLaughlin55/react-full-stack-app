import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

function CourseDetail() {

    const { actions, authenticatedUser } = useContext(CourseAppContext);

    const [course, setCourse] = useState('');
    const [user, setUser] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                setCourse(res.data);
                setUser(res.data.User);
            })
            .catch(error => {
                navigate('/notfound');
                console.log('Could not fetch course data', error);
            })
    }, [id, navigate]);

    const submitDeleteCourse = (e) => {
        e.preventDefault();
        actions.deleteCourse(id, authenticatedUser)
            .then(error => {
                if (error) {
                    console.log('Error deleting course.');
                } else {
                    navigate('/');
                };
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <main>
            <div className="actions--bar">
                {(authenticatedUser && authenticatedUser.id === user.id) ?
                    <div className="wrap">
                        <NavLink className="button" to={`/courses/${course.id}/update`}>Update Course</NavLink>
                        <NavLink className="button" onClick={submitDeleteCourse} to={'/'}>Delete Course</NavLink>
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                    :
                    <div className="wrap">
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                }
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {user.firstName} {user.lastName}</p>
                            <ReactMarkdown children={course.description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded} />
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CourseDetail;