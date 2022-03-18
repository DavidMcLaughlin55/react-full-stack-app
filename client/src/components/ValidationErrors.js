import React from 'react';

function ValidationErrors({ errorMessages }) {

    return (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {errorMessages.map((error, i) =>
                    <li key={i}>{error}</li>
                )}
            </ul>
        </div>
    )
}

export default ValidationErrors;