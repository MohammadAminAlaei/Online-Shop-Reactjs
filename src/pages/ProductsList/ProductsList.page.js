import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class ProductsList extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>فروشگاه مکتب |  لیست محصولات </title>
                </Helmet>
                <h1> I AM ProductsList </h1>

            </>
        );
    }
}

export {ProductsList};