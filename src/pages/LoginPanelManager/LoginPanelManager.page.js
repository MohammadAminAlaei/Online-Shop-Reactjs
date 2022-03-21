import React from 'react';
import {Helmet} from 'react-helmet';
import {
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Link, useNavigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {connect} from 'react-redux';
import {login} from 'redux/actions/user.action';
import {ToastContainer} from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: '4rem 0',
    },
    submit: {
        padding: '1.6 4rem!important',
        margin: '3rem auto!important',
        display: 'block!important',
        fontSize: '1.3rem!important',
        width: '100px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem!important',
            width: '100%',
        }
    },
    custom_container: {
        boxShadow: '0 0 20px 1px #ccc',
        borderRadius: '12px',
        padding: '2.4rem .8rem',
        position: 'relative',
        marginTop: '4rem',
        [theme.breakpoints.down('sm')]: {
            marginTop: '1.6rem'
        }
    },
    input: {
        fontSize: '2.6rem!important',
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.6rem!important',
            textAlign: 'center!important',
            lineHeight: '2.6rem!important',
        }
    },
    back: {
        position: 'absolute!important',
        bottom: '1.2rem!important',
        left: '1.4rem!important',
        fontSize: '1.2rem!important',
        color: '#1976d2!important',
        textDecoration: 'none!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem!important',
        }
    }
}));

const validationSchema = yup.object({
    username: yup
        .string('لطفا نام کاربری را وارد کنید')
        .min(4, 'نام کاربری حداقل باید 4 حرف باشید')
        .required('وارد کردن نام کاربری ضروری است'),
    password: yup
        .string('لطفا رمز عبور را وارد کنید')
        .min(4, 'رمز عبور حداقل باید 4 حرف باشد')
        .required('وارد کردن رمز عبور ضروری است'),
});


const LoginManager = props => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (e) => {
            try {
                const response = await props.login(e);
                navigate(PATHS.COMMODITY_MANAGEMENT);
                console.log('submit: ', response);
            } catch (e) {
                return e;
            }
        },
    });

    const classes = useStyles();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | لاگین پنل مدیریت </title>
            </Helmet>
            <Container className={classes.custom_container} component="main" maxWidth="sm">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography className={classes.title} component="h1" variant="h4">
                        ورود به پنل مدیریت فروشگاه مکتب
                    </Typography>
                    <Container maxWidth="xs">
                        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                            <TextField className={classes.input}
                                       variant="outlined"
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="username"
                                       name="username"
                                       autoComplete="current-password"
                                       autoFocus
                                       label="نام کاربری"
                                       value={formik.values.username}
                                       onChange={formik.handleChange}
                                       error={formik.touched.username && Boolean(formik.errors.username)}
                                       helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="رمز عبور"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}

                            >
                                ورود
                            </Button>
                        </form>
                    </Container>
                    <Button onClick={e => navigate(PATHS.HOME)} className={classes.back}
                    > بازشگت به
                        سایت </Button>
                </div>
            </Container>
        </>
    );
}

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
});

const LoginPanelManager = connect(undefined, mapDispatchToProps)(LoginManager);

export {LoginPanelManager};