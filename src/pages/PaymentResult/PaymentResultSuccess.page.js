import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {makeStyles} from '@mui/styles';
import {CUSTOMERS} from 'configs/url.config';
import http from 'services/http.service';
import moment from 'jalali-moment';
import store from 'redux/store';


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


const PaymentResultSuccess = () => {

    useEffect(() => {
        didMount()
    }, []);

    const didMount = () => {

        const storageDataCustomer = JSON.parse(localStorage.getItem('CUSTOMER_INFO'));
        const storageDataOrders = JSON.parse(localStorage.getItem('orders'));

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

    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title> فروشگاه مکتب | نتیجه پرداخت شکست خورده </title>
            </Helmet>
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
    );
}

export {PaymentResultSuccess};