import React from 'react';
import {Helmet} from 'react-helmet';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
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

const PaymentResultFailed = () => {

    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title> فروشگاه مکتب | نتیجه پرداخت شکست خورده </title>
            </Helmet>
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
    )
}

export {PaymentResultFailed};