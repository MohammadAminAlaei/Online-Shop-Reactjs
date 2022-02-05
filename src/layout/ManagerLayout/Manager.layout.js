import React from 'react';
import {HeaderManager} from './components/Header/ManagerHeader.component';

function ManagerLayout(props) {
    return (
        <div>
            <HeaderManager>
                {props.children}
            </HeaderManager>
        </div>
    );
}

export {ManagerLayout};