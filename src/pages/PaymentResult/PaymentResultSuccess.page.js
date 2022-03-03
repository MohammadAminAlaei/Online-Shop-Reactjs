import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {makeStyles} from '@mui/styles';

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