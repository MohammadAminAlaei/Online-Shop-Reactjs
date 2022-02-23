import React, {Component, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import {useNavigate, useParams} from 'react-router-dom';
import http from 'services/http.service';
import {PRODUCTS} from '../../configs/url.config';
import {Button, TextField, Typography} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {PATHS} from '../../configs/routes.config';

const useStyle = makeStyles(theme => ({}));


const Basket = props => {

    const navigate = useNavigate();

    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | سبد خرید </title>
            </Helmet>
            <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h3"> سبد خرید </Typography>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginTop: '60px',
                justifyContent: 'space-between'
            }}>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center'}}>
                    <Typography variant="h5"> جمع: </Typography>
                    <Typography sx={{display: 'flex', alignItems: 'center'}} variant="h5"> 1000تومان </Typography>
                </Box>
                <Button onClick={e => navigate(PATHS.FINAL_PURCHASE)} sx={{padding: '.8rem 1.9rem', fontSize: '1rem'}}
                        color="success" variant="contained"> نهایی کردن
                    سبدخرید </Button>
            </Box>
        </>
    );
}


export {Basket};