import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class InventoryManagement extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>فروشگاه مکتب |  موجودی و قیمت کالا </title>
                </Helmet>
                <h1> I AM InventoryManagement </h1>

            </>
        );
    }
}

export {InventoryManagement};