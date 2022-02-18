import React, {Component, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import {Button, Skeleton, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useNavigate, useParams} from 'react-router-dom';
import http from 'services/http.service';
import {PRODUCTS} from '../../configs/url.config';
import Grid from '@mui/material/Grid';
import {CardComponent} from '../../components';

const useStyle = makeStyles(theme => ({
    sideBar: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '300px',
        backgroundColor: '#fafafa',
        borderLeft: '1px solid #e0e0e0',
        justifyContent: 'right',
        [theme.breakpoints.down('sm')]: {
            maxHeight: 'max-content!important',
        }
    },
    orderBox: {
        display: 'flex',
        gap: '1rem',
    }

}));


const ProductsList = () => {

    const {group} = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        http.get(`${PRODUCTS}?category.name=${group}`).then(res => {
            setData(res.data)
        })
    }, [group]);

    const handlePurchase = (e, id) => {
        navigate(`purchase/${id}`);
    }

    const skeletonNumber = [1, 2, 3, 4, 5, 6];

    const classes = useStyle()

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | لیست محصولات </title>
            </Helmet>
            <Box className={classes.orderBox}>
                <Box className={classes.sideBar}>
                    <Button> کالاهای گروه گوشی مبایل </Button>
                    <Button> کالاهای گروه لپتاپ </Button>
                    <Button> کالاهای گروه کامپیوتر همه کاره </Button>
                    <Button> کالاهای گروه هدفون </Button>
                </Box>
                <Box>
                    <Typography variant="h5" sx={{my: 2}}> کالاهای گروه {group}</Typography>
                    <Grid container spacing={{xs: 2, md: 6}}
                          columns={{xs: 12, sm: 12, md: 12}}>
                        {!!data.length ? data.map(item => (
                            <Grid item xs={12} sm={12} md={6} key={item.id}>
                                <CardComponent
                                    img={item.image[0]}
                                    price={item.price} firstName={item.firstName} brand={item.brand}
                                    description={item.description}
                                    onClick={e => handlePurchase(e, item.id)}
                                />
                            </Grid>
                        )) : (skeletonNumber.map((item, index) => (
                                <Grid item xs={12} sm={4} md={4} key={index}>
                                    <Skeleton key={item} animation="wave" variant="rect" width={'300px'}
                                              height={'250px'}/>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Box>


        </>
    );
}

export {ProductsList};