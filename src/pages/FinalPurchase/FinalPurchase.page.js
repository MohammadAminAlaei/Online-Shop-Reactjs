import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Button, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import moment from 'jalali-moment';
import {useFormik} from 'formik';
import * as yup from 'yup';
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
// const iranRegexPhoneNumber = /^([\u06F0]|[0])([\u06F9]|[9])(([\u06F0-\u06F9]|[0-9]){2})(([\u06F0-\u06F9]|[0-9]){3})(([\u06F0-\u06F9]|[0-9]){4})/

const validationSchema = yup.object({
        firstName: yup
            .string('لطفا نام را وارد کنید')
            .required('نام یکی از فیلد های الزامی است'),
        lastName: yup
            .string('لطفا نام خانوادگی را وارد کنید')
            .required('نام خانوادگی یکی از فیلد های الزامی است'),
        address: yup
            .string('لطفا آدرس را وارد کنید')
            .required('آدرس یکی از فیلد های الزامی است'),
        phoneNumber: yup
            .string('لطفا شماره تلفن را وارد کنید')
            // regexr.com/6anqd
            .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, {
                message: 'شماره تلفن صحیح نیست',
                excludeEmptyString: false,
            })
            .required('شماره تلفن یکی از فیلد های الزامی است'),
        date: yup.date().nullable()
    }
);


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

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: (e) => {
            let d = new Date();
            d.setDate(d.getDate());
            if (value < d) {
                toast.warning('تاریخ باید 1 روز بعد از تاریخ امروز باشد');
                return;
            }

            const dataToSend = {
                ...e,
                date: moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
            };

            localStorage.setItem('CUSTOMER_INFO', JSON.stringify(dataToSend));
            window.location.href = 'http://localhost:3001/';
        },
    });


    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title> فروشگاه مکتب | نهایی کردن خرید </title>
            </Helmet>
            <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h3"> نهایی کردن
                خرید </Typography>
            <form onSubmit={e => formik.handleSubmit(e)} className={classes.form}>
                <Box className={classes.box}>
                    <TextField
                        id="outlined-basic"
                        label="نام:"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    /> <TextField
                    id="outlined-basic"
                    label="نام خانوادگی:"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
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
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                    <TextField
                        id="outlined-basic"
                        label="تلفن همراه:"
                        variant="outlined"
                        fullWidth
                        name="phoneNumber"
                        type="number"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                </Box>
                <Box className={classes.box}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                            mask="____/__/__"
                            label=" تاریخ تحویل:"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
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