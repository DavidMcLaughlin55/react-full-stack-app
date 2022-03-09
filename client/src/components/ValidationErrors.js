import React from 'react';

function ValidationErrors({ errorMessages }) {

    return (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {errorMessages.map(error => (
                    <li>{error}</li>
                ))}
            </ul>
        </div>
    )
}

export default ValidationErrors;