import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class Home extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>فروشگاه مکتب | خانه </title>
                </Helmet>
                <h1> I AM HOME </h1>
            </>
        );
    }
}

export {Home};