import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import {makeStyles} from '@mui/styles';
import {useParams} from 'react-router-dom';
import moment from 'jalali-moment';
import http from 'services/http.service';
import {CUSTOMERS, PRODUCTS} from '../../configs/url.config';
import store from 'redux/store';
import * as PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toast} from 'react-toastify';


const useStyle = makeStyles(theme => ({
    textWidth: {
        fontSize: '1.1rem',
        width: '40%',
        lineHeight: '1.7rem!important',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }
}));


CheckCircleIcon.propTypes = {
    color: PropTypes.string,
    sx: PropTypes.shape({fontSize: PropTypes.string})
};

const PaymentResult = () => {

    const params = useParams();
    const status = params.status;

    useEffect(() => {
        didMount();
    }, []);

    const didMount = () => {
        if (status === 'success') {

            const storageDataCustomer = JSON.parse(localStorage.getItem('CUSTOMER_INFO'));
            const storageDataOrders = JSON.parse(localStorage.getItem('orders'));

            console.log(storageDataOrders);

            storageDataOrders.forEach(orderInfo => {
                http.get(`${PRODUCTS}/${orderInfo.orderId}`).then(res => {
                    const orderCount = res.data.count;
                    if (orderCount < orderInfo.count) {
                        toast.error('محصول مورد نظر با این مقدار تمام شده است');
                        return;
                    }

                    http.patch(`${PRODUCTS}/${orderInfo.orderId}`, {count: orderCount - orderInfo.count}).then(res => {
                        console.log(res);
                    });
                })
            });

            const data = {
                'name': storageDataCustomer.firstName + ' ' + storageDataCustomer.lastName,
                'date': moment().locale('fa').format('YYYY/MM/DD'),
                'status': 'doing',
                'address': storageDataCustomer.address,
                'totalAmount': storageDataOrders.reduce((total, item) => total + item.price * item.count, 0),
                'orders': storageDataOrders,
                'deliverytime': storageDataCustomer.date,
                'phone': storageDataCustomer.phoneNumber,
            }

            http.post(CUSTOMERS, data).then(res => {
                localStorage.setItem('CUSTOMER_INFO', JSON.stringify({}));
                localStorage.setItem('orders', JSON.stringify([]));
                store.dispatch({type: 'ORDERS_ZERO'});
            })
        }
    }

    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title> فروشگاه مکتب | نتیجه پرداخت شکست خورده </title>
            </Helmet>
            {status === 'failure' ? (
                <>
                    <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h6"> نتیجه پرداخت </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '60px', alignItems: 'center'}}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '20px'
                        }}>
                            <CancelIcon color="error" sx={{fontSize: '240px'}}/>
                            <Typography className={classes.textWidth
                            }> پرداخت موفقیت آمیز نبود, سفارش شما در
                                انتظار
                                پرداخت
                                است </Typography>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h6"> نتیجه پرداخت </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '60px',
                        alignItems: 'center',
                        maxWidth: '1000px'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '20px'
                        }}>
                            <CheckCircleIcon color="success" sx={{fontSize: '240px'}}/>
                            <Typography className={classes.textWidth}>
                                با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد
                            </Typography>
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

export {PaymentResult};