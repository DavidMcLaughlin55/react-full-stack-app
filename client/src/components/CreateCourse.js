import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseAppContext } from '../context/context';

function CreateCourse() {

    const { actions, currentUser } = useContext(CourseAppContext);

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

    const createNewCourse = (e) => {
        e.preventDefault();
        const newCourse = { title, description, estimatedTime, materialsNeeded };
        actions.createCourse(newCourse, currentUser)
            .then(res => res.data)
            .catch((error) => {
                console.log('error', error);
            });
    };


    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
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