import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Button, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import moment from 'jalali-moment'
import AdapterJalali from '@date-io/date-fns-jalali';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {toast} from 'react-toastify';


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
    },
    inputDate: {
        width: '100%!important',
    }
}));


const FinalPurchase = () => {

    const [date, setDate] = React.useState(moment().format('jYYYY/jMM/jDD'));
    const [value, setValue] = React.useState(new Date());


    useEffect(() => {
        didMount();
    }, []);

    const didMount = () => {
        let d = new Date();
        d.setDate(d.getDate() + 8);

        setDate(moment(d, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
    };


    const handleSubmit = e => {
        e.preventDefault();
        let d = new Date();
        d.setDate(d.getDate());
        if (value < d) {
            toast.warning('تاریخ باید 1 روز بعد از تاریخ امروز باشد');
            return;
        }
        const form = new FormData(e.target);
        let data = Object.fromEntries(form);

        if (data.phoneNumber.length < 11) {
            toast.warning('شماره تلفن باید 11 رقم باشد');
            return;
        }
        const dataToSend = {
            ...data,
            date: moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
        };
        localStorage.setItem('CUSTOMER_INFO', JSON.stringify(dataToSend));
        window.location.href = 'http://localhost:3001/';
    };


    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title> فروشگاه مکتب | نهایی کردن خرید </title>
            </Helmet>
            <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h3"> نهایی کردن
                خرید </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Box className={classes.box}>
                    <TextField
                        id="outlined-basic"
                        label="نام:"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        required
                    /> <TextField
                    id="outlined-basic"
                    label="نام خانوادگی:"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    required
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
                        required
                    />
                    <TextField
                        id="outlined-basic"
                        label="تلفن همراه:"
                        variant="outlined"
                        fullWidth
                        name="phoneNumber"
                        type="number"
                        required
                    />
                </Box>
                <Box className={classes.box}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                            required
                            mask="____/__/__"
                            label=" تاریخ تحویل:"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            name="date"/>
                    </LocalizationProvider>
                    <div style={{width: '100%'}}/>
                </Box>
                <Button type="submit"
                        className={classes.button}
                        variant="contained"
                        color="success"> پرداخت </Button>
            </form>
        </>
    );
}

export {FinalPurchase};