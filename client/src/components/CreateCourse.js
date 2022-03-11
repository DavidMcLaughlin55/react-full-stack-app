import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ValidationErrors from './ValidationErrors';
import axios from 'axios';

function CreateCourse() {

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

    const createCourse = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/courses')
            .then(res => {
                console.log('Course has been created.');
            })
            .catch(error => {
                console.log('Could not create course', error);
            })
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {/* {(resErrors) ? <ValidationErrors errorMessages={resErrors} /> : null} */}
                <form onSubmit={createCourse}>
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