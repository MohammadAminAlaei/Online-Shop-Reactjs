import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

class PaymentResult extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title> فروشگاه مکتب | نتیجه پرداخت   </title>
                </Helmet>
                <h1> I AM PaymentResult </h1>

            </>
        );
    }
}

export {PaymentResult};