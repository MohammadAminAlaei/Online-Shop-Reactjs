import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class LoginPanelManager extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>فروشگاه مکتب |  لاگین پنل مدیریت </title>
                </Helmet>
                <h1> I AM LoginPanelManager </h1>

            </>
        );
    }
}

export {LoginPanelManager};