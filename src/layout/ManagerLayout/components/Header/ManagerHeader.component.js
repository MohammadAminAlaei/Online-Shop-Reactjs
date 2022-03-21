import React from 'react';
import {
    AppBar,
    Box, Button, ButtonGroup,
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
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {PATHS} from '../../../../configs/routes.config';


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
                sx={{position: 'fixed', bottom: 16, right: 16, zIndex: 500}}
            >
                {children}
            </Box>
        </Zoom>
    );
};


const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-evenly'
        },
    },
    button: {
        fontSize: '1.2rem!important',
        color: '#fff!important',
        [theme.breakpoints.down('lg')]: {
            fontSize: '1rem!important'
        },
    },
    containerPadding: {
        padding: '1.2rem 0',
        [theme.breakpoints.down('sm')]: {
            padding: '0'
        }
    },
    title: {
        fontSize: '2.4rem!important',
        [theme.breakpoints.down('lg')]: {
            fontSize: '2rem!important'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8rem!important'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.4rem!important',
        }
    },
    main_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '1.6rem',
            paddingBottom: '.8rem'
        },
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap!important',
            gap: '1rem'
        }
    },
    box_header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3.2rem',
        padding: '1.65rem 0',
        [theme.breakpoints.down('sm')]: {
            gap: '1rem',
            justifyContent: 'space-evenly',
        }
    },
    iconSize: {
        fontSize: '3rem!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.4rem!important'
        },
    },
    margin_header: {
        [theme.breakpoints.down('sm')]: {
            margin: '130px 0!important',
        }, [theme.breakpoints.up('sm')]: {
            margin: '115px 0!important',
        }, [theme.breakpoints.up('md')]: {
            margin: '75px 0!important',
        }, [theme.breakpoints.up('lg')]: {
            margin: '80px 0!important',
        }
    },
    button_group: {
        fontSize: '1rem!important',
        padding: '0 2.4rem!important',
        backgroundColor: '#fff !important',
        color: '#000!important',
        '&:hover': {
            backgroundColor: '#c5cae9 !important',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '.8rem!important',
            padding: '0 2rem!important',

        },
        [theme.breakpoints.down('md')]: {
            padding: '0 2.4rem!important'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 1rem!important',
        },

    },
    buttons_group: {
        height: '55px',
    }
}));

const buttons = [
    {
        label: 'کالاها',
        path: PATHS.ORDERS_MANAGER,
    }, {
        label: 'موجودی قیمت ها',
        path: PATHS.INVENTORY_MANAGEMENT,
    }, {
        label: 'سفارش ها',
        path: PATHS.COMMODITY_MANAGEMENT,
    },
]

function HeaderManager(props) {

    const navigate = useNavigate();
    const location = useLocation()

    const classes = useStyles();

    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <div>
            <AppBar>
                <Toolbar sx={{padding: '0!important'}}>
                    <Container className={classes.containerPadding}>
                        <Box className={classes.main_header}>
                            <Box className={classes.box_header}>
                                <Typography className={classes.title} component="h1" variant="h1">
                                    پنل مدیریت فروشگاه
                                </Typography>
                            </Box>
                            <ButtonGroup className={classes.buttons_group} variant="contained"
                                         aria-label="medium secondary button group">
                                {buttons.map((item, index) => (
                                    <Button
                                        sx={{backgroundColor: (location.pathname === item.path) ? '#c5cae9!important' : '#fff'}}
                                        onClick={e => handleClick(item.path)}
                                        className={classes.button_group}
                                        key={index}>
                                        {item.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                            <Box className={classes.buttons}>
                                <Button onClick={e => navigate(PATHS.HOME)} className={classes.button}
                                        variant="text"> بازگشت به سایت</Button>
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
                <Fab sx={{color: '#fff', zIndex: '500'}} color="primary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon sx={{color: '#fff', zIndex: '500!important'}}/>
                </Fab>
            </ScrollTop>
        </div>
    );
}

export {HeaderManager};