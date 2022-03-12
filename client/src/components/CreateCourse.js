import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import { CourseAppContext } from '../context/context';

function CreateCourse() {

    const { actions } = useContext(CourseAppContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [resErrors, setResErrors] = useState([]);

    // Brings user back to home page.
    let navigate = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const createNewCourse = (e) => {
        e.preventDefault();
        const newCourse = { title, description, estimatedTime, materialsNeeded };
        actions.createCourse(newCourse)
            .then(res => res.data)
            .catch(error => {
                console.log('Could not create new course', error);
                setResErrors(error.errors)
            })
    };


    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {resErrors ? <ValidationErrors errorMessages={resErrors} /> : null}
                <form onSubmit={createNewCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} ></input>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div >
        </main >
    );
}

export default CreateCourse;