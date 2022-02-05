import React from 'react';
import {HeaderUser} from './components/Header/UserHeader.component';

function UserLayout(props) {
    return (
        <div>
            <HeaderUser>
                {props.children}
            </HeaderUser>
        </div>
    );
}

export {UserLayout};