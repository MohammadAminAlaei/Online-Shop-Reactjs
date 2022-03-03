import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box, Button,
    CardMedia,
    Container,
    Fab,
    Toolbar,
    Typography,
    useScrollTrigger,
    Zoom
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import * as PropTypes from 'prop-types';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import image from 'assets/images/مکتب شریف.jfif';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '../../../../configs/routes.config';
import store from 'redux/store';
import {Purchase} from '../../../../pages';
import {getProduct} from '../../../../redux/actions/products.action';
import {connect} from 'react-redux';


ScrollTop.propTypes = {children: PropTypes.node};

function ScrollTop(props) {

    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {children}
            </Box>
        </Zoom>
    );
}

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-evenly'
        }
    },
    button: {
        fontSize: '1.2rem!important',
        color: '#fff!important',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.1rem!important'
        },

    },
    containerPadding: {
        padding: '1.75rem 0',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem 0'
        }
    },
    title: {
        fontSize: '2.4rem!important',
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem!important'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.4rem!important',
        }
    },
    main_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '1.6rem'
        },
    },
    box_header: {
        gap: '2.4rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            gap: '1rem',
            justifyContent: 'space-evenly'
        },
    },
    iconSize: {
        fontSize: '2.3rem!important',
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem!important'
        }, [theme.breakpoints.down('sm')]: {
            fontSize: '1.6rem!important'
        },
    },
    margin_header: {
        margin: '80px 0',
        [theme.breakpoints.down('sm')]: {
            margin: '130px 0',
        },
    }
}));

function OrdersManagePage(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <div>
            <AppBar>
                <Toolbar sx={{padding: '0!important'}}>
                    <Container className={classes.containerPadding}>
                        <Box className={classes.main_header}>
                            <Box className={classes.box_header} onClick={e => navigate(PATHS.HOME)}
                                 sx={{cursor: 'pointer'}}>
                                <figure>
                                    <CardMedia
                                        component="img"
                                        height="80"
                                        image={image}
                                        alt="آیکون فروشگاه"/>
                                </figure>
                                <Typography className={classes.title} component="h1"
                                            variant="h1">
                                    فروشگاه مکتب
                                </Typography>
                            </Box>
                            <Box className={classes.buttons}>
                                <Button onClick={e => navigate(PATHS.LOGIN_PANEL_MANAGEMENT)}
                                        className={classes.button}>مدیریت</Button>
                                <Button
                                    startIcon={<Badge color="error"
                                                      badgeContent={props.ordersLength}>
                                        <ShoppingCartIcon className={classes.iconSize}/> </Badge>}
                                    className={classes.button}
                                    variant="text"
                                    onClick={e => navigate(PATHS.BASKET)}
                                >سبد خرید</Button>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor"/>
            <Container>
                <Box className={classes.margin_header}>
                    {props.children}
                </Box>
            </Container>
            <ScrollTop {...props}>
                <Fab color="primary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon sx={{color: '#fff'}} fontSize="large"/>
                </Fab>
            </ScrollTop>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ordersLength: state.ordersLength
    }
};

const HeaderUser = connect(mapStateToProps, undefined)(OrdersManagePage);

export {HeaderUser};