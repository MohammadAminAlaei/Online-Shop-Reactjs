import React from 'react';

function UserLayout(props) {
    return (
        <div>
            <UserLayout>
                {props.children}
            </UserLayout>
        </div>
    );
}

export {UserLayout};