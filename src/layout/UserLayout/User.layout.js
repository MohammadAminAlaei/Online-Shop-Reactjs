import React from 'react';

function UserLayout(props) {
    return (
        <div>
            <h1>User Layout</h1>
            {props.children}
        </div>
    );
}

export {UserLayout};