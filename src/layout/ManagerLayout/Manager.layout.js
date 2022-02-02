import React from 'react';

function ManagerLayout(props) {
    return (
        <div>
            <h1>Manager</h1>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export {ManagerLayout};