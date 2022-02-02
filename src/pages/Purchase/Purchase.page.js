import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class Purchase extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>فروشگاه مکتب | سبد خرید </title>
                </Helmet>
                <h1> I AM Purchase </h1>

            </>
        );
    }
}

export {Purchase};