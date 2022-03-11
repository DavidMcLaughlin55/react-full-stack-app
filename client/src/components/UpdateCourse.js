import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateCourse() {

    const [course, setCourse] = useState('');
    const [user, setUser] = useState('');
    const { id } = useParams();

    // GETs selected course to update.
    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = () => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                setCourse(res.data);
                setUser(res.data.User);
            })
            .catch(error => {
                console.log('Could not fetch course data', error);
            })
    };

    const updateCourse = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                console.log('Course has been updated.');
            })
            .catch(error => {
                console.log('Could not update course', error);
            })
    };

    // Brings user back to home page.
    let navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={updateCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title}></input>

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime}></input>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default UpdateCourse;