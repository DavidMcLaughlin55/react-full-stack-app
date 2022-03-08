import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink, useParams } from 'react-router-dom';

function CourseDetail() {

    const [course, setCourse] = useState('');
    const [user, setUser] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                setCourse(data);
                setUser(data.User);
            })
            .catch(error => {
                console.log('Could not fetch course data', error);
            })
    }, [id]);

    console.log(course);

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink className="button" to="/courses/:id/update">Update Course</NavLink>
                    <NavLink className="button" to="#">Delete Course</NavLink>
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
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