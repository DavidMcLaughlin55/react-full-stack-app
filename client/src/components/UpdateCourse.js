import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';
import axios from 'axios';

function UpdateCourse() {

    const { actions, authenticatedUser } = useContext(CourseAppContext);
    const [course, setCourse] = useState('');
    const [user, setUser] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState([]);

    // GETs selected course to update.
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                setCourse(res.data);
                setUser(res.data.User);
            })
            .catch(error => {
                console.log('Could not fetch course data', error);
            })
    }, [id]);

    // Form variables
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    // Brings user back to home page.
    let navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const submitCourseUpdate = (e) => {
        e.preventDefault();
        const userId = authenticatedUser.id;
        console.log(authenticatedUser.id);
        const courseUpdate = { id, userId, title, description, estimatedTime, materialsNeeded };
        actions.updateCourse(id, courseUpdate, authenticatedUser)
            .then(errors => {
                if (errors.length) {
                    console.log('Error updating course.');
                    setErrors(errors);
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
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={submitCourseUpdate}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} onChange={(e) => setTitle(e.target.value)}></input>

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}></input>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
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