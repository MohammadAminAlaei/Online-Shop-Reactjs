import React from 'react';
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
        fontSize: '2rem!important',
        color: '#fff!important',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.6rem!important'
        },

    },
    containerPadding: {
        padding: '2.2rem 0',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem 0'
        }
    },
    title: {
        fontSize: '4rem!important',
        [theme.breakpoints.down('md')]: {
            fontSize: '3rem!important'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.8rem!important',
        }
    },
    main_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '1.6rem'
        }
    },
    box_header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3.2rem',
        [theme.breakpoints.down('sm')]: {
            gap: '1rem',
            justifyContent: 'space-evenly'
        },
    },
    iconSize: {
        fontSize: '3rem!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.4rem!important'
        },
    },
    margin_header: {
        margin: '80px 0',
        [theme.breakpoints.down('sm')]: {
            margin: '130px 0',
        },
    }
}));

function HeaderUser(props) {
    const classes = useStyles();
    return (
        <div>
            <AppBar>
                <Toolbar sx={{padding: '0!important'}}>
                    <Container className={classes.containerPadding}>
                        <Box className={classes.main_header}>
                            <Box className={classes.box_header}>
                                <figure>
                                    <CardMedia
                                        component="img"
                                        height="80"
                                        image={image}
                                        alt="آیکون فروشگاه"/>
                                </figure>
                                <Typography className={classes.title} component="h1" variant="h1">
                                    فروشگاه مکتب
                                </Typography>
                            </Box>
                            <Box className={classes.buttons}>
                                <Button className={classes.button}>مدیریت</Button>
                                <Button startIcon={<Badge color="error" badgeContent={99}>
                                    <ShoppingCartIcon className={classes.iconSize}/> </Badge>}
                                        className={classes.button}
                                        variant="text">سبد خرید</Button>
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
}

export {HeaderUser};