import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class OrdersManager extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>فروشگاه مکتب |  سفارش های مدیر </title>
                </Helmet>
                <h1> I AM OrdersManager </h1>

            </>
        );
    }
}

export {OrdersManager};