import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Link} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';

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
        fontSize: '1.6rem!important',
        width: '100px'
    },
    custom_container: {
        border: '3px solid #000',
        padding: '2.4rem .8rem',
        position: 'relative',
        marginTop: '12rem',
        [theme.breakpoints.down('sm')]: {
            marginTop: '1.6rem'
        }
    },
}));


const LoginPanelManager = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const classes = useStyles();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | لاگین پنل مدیریت </title>
            </Helmet>
            <Container className={classes.custom_container} component="main" maxWidth="sm">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography sx={{textAlign: 'center', lineHeight: '4.8rem'}} component="h1" variant="h3">
                        ورود به پنل مدیریت فروشگاه مکتب
                    </Typography>
                    <Container maxWidth="xs">
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <TextField sx={{fontSize: '2.4rem!important'}}
                                       variant="outlined"
                                       margin="normal"
                                       required
                                       fullWidth
                                       id="userName"
                                       name="userName"
                                       autoComplete="current-password"
                                       autoFocus
                                       label="نام کاربری"
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
                    <Link style={{
                        'position': 'absolute',
                        'bottom': '2rem',
                        'left': '1.4rem',
                        'fontSize': '1.6rem',
                        'color': '#1976d2',
                        'textDecoration': 'none'
                    }}
                          to={PATHS.HOME}> بازشگت به
                        سایت </Link>
                </div>
            </Container>
        </>
    );
}

export {LoginPanelManager};