import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';
import ValidationErrors from './ValidationErrors';
import axios from 'axios';

function UpdateCourse() {

    const { actions, authenticatedUser } = useContext(CourseAppContext);
    const [user, setUser] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState(null);
    let navigate = useNavigate();

    // Form variables
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    // GETs selected course to update.
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                if (res.data) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setEstimatedTime(res.data.estimatedTime);
                    setMaterialsNeeded(res.data.materialsNeeded);
                    setUser(res.data.User);
                };
            })
            .catch(error => {
                navigate('/notfound');
                console.log('Could not fetch course data', error);
            })
    }, [id, navigate]);

    // Brings user back to home page.
    const handleCancel = (e) => {
        e.preventDefault();
        navigate(`/courses/${id}`);
    };

    const submitCourseUpdate = (e) => {
        e.preventDefault();
        const userId = authenticatedUser.id;
        const courseUpdate = { id, userId, title, description, estimatedTime, materialsNeeded };
        actions.updateCourse(courseUpdate, authenticatedUser)
            .then(errors => {
                if (errors) {
                    return errors;
                } else {
                    navigate('/');
                };
            })
            .catch(error => {
                setErrors(error.response.data.errors);
            });
    };

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                {errors ? <ValidationErrors errorMessages={errors} /> : null}
                <form onSubmit={submitCourseUpdate}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title ? title : ''} onChange={(e) => setTitle(e.target.value)}></input>

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description ? description : ''} onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime ? estimatedTime : ''} onChange={(e) => setEstimatedTime(e.target.value)}></input>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded ? materialsNeeded : ''} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div >
        </main >
    );
}

export default UpdateCourse;