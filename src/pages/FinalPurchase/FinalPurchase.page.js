import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {Button, TextareaAutosize, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';

const useStyle = makeStyles(theme => ({
    form: {
        margin: '2rem 0',
        gap: '40px',
        display: 'flex',
        flexDirection: 'column',
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '30px',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        }
    },
    button: {
        fontSize: '1.08rem!important',
        padding: '.8rem 2rem!important',
        width: '220px',
        margin: '1rem auto!important',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0!important',
        },
    }
}));


const FinalPurchase = () => {


    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title> فروشگاه مکتب | نهایی کردن خرید </title>
            </Helmet>
            <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h3"> نهایی کردن
                خرید </Typography>
            <form className={classes.form}>
                <Box className={classes.box}>
                    <TextField
                        id="outlined-basic"
                        label="نام:"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                    /> <TextField
                    id="outlined-basic"
                    label="نام خانوادگی:"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                />
                </Box>
                <Box className={classes.box}>
                    <TextField
                        id="outlined-multiline-static"
                        label="آدرس:"
                        multiline
                        rows={2.5}
                        variant="outlined"
                        fullWidth
                        name="address"
                    />
                    <TextField
                        id="outlined-basic"
                        label="تلفن همراه:"
                        variant="outlined"
                        fullWidth
                        name="phoneNumber"
                        type="number"
                    />
                </Box>
                <Box className={classes.box}>
                    <TextField
                        id="datetime-local"
                        label="تاریخ تحویل"
                        type="datetime-local"
                        sx={{width: '100%'}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="date"
                    />
                    <div style={{width: '100%'}}/>
                </Box>
                <Button className={classes.button} variant="contained" color="success"> پرداخت </Button>
            </form>
        </>
    );
}

export {FinalPurchase};