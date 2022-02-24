import React, {useEffect, useState} from 'react';
import {CardComponent} from 'components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {connect} from 'react-redux';
import {getMobiles, getComputers, getHeadPhones, getLaptopes} from 'redux/actions/products.action';
import {Button, Skeleton} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {Link, useNavigate} from 'react-router-dom';
import {PATHS} from 'configs/routes.config';


const HomePage = props => {

    const {getMobiles, getLaptops, getComputers, getHeadPhones} = props;
    const [mobilesData, setMobilesData] = useState([])
    const [laptopData, setLaptopData] = useState([])
    const [computerData, setComputerData] = useState([])
    const [headPhoneData, setHeadPhoneData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMobiles().then(res => setMobilesData(res))
        getLaptops().then(res => setLaptopData(res))
        getComputers().then(res => setComputerData(res))
        getHeadPhones().then(res => setHeadPhoneData(res))
    }, []);

    const handlePurchase = (e, id) => {
        navigate(`purchase/${id}`);
    }

    const skeletonNumber = [1, 2, 3, 4, 5, 6];


    return (
        <>
            <Button onClick={e => navigate('product-list/گوشی موبایل')}
                    endIcon={<ArrowLeftIcon sx={{fontSize: '3rem!important'}}/>}
                    sx={{fontSize: '1.8rem', lineHeight: '4rem', padding: '1.2rem 0'}}
                    size="large"> آیتم های گروه
                گوشی موبایل </Button>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 4}}
                      columns={{xs: 12, sm: 8, md: 12}}>
                    {!!mobilesData.length ? mobilesData.map(item => (
                        <Grid item xs={12} sm={4} md={4} key={item.id}>
                            <CardComponent
                                img={item.image[0]}
                                price={item.price} firstName={item.firstName} brand={item.brand}
                                description={item.description}
                                onClick={e => handlePurchase(e, item.id)}
                            />
                        </Grid>
                    )) : (skeletonNumber.map((item, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <Skeleton key={item} animation="wave" variant="rect" width={'300px'} height={'250px'}/>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
            <Button onClick={e => navigate('product-list/لپتاپ')} endIcon={<ArrowLeftIcon sx={{fontSize: '3rem!important'}}/>}
                    sx={{fontSize: '1.8rem', lineHeight: '4rem', padding: '1.2rem 0', marginTop: '2rem'}}
                    size="large"> آیتم های گروه
                لپتاپ </Button>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 4}}
                      columns={{xs: 12, sm: 8, md: 12}}>
                    {!!laptopData.length ? laptopData.map(item => (
                        <Grid item xs={12} sm={4} md={4} key={item.id}>
                            <CardComponent
                                img={item.image[0]}
                                price={item.price} firstName={item.firstName} brand={item.brand}
                                description={item.description}
                                onClick={e => handlePurchase(e, item.id)}/>
                        </Grid>
                    )) : (skeletonNumber.map((item, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <Skeleton key={item} animation="wave" variant="rect" width={'300px'} height={'250px'}/>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
            <Button onClick={e => navigate('product-list/کامپیوتر همه کاره')} endIcon={<ArrowLeftIcon sx={{fontSize: '3rem!important'}}/>}
                    sx={{fontSize: '1.8rem', lineHeight: '4rem', padding: '1.2rem 0', marginTop: '2rem'}}
                    size="large"> آیتم های گروه
                کامپیوتر همه کاره </Button>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 4}}
                      columns={{xs: 12, sm: 8, md: 12}}>
                    {!!computerData.length ? computerData.map(item => (
                        <Grid item xs={12} sm={4} md={4} key={item.id}>
                            <CardComponent
                                img={item.image[0]}
                                price={item.price} firstName={item.firstName} brand={item.brand}
                                description={item.description}
                                onClick={e => handlePurchase(e, item.id)}/>
                        </Grid>
                    )) : (skeletonNumber.map((item, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <Skeleton key={item} animation="wave" variant="rect" width={'300px'} height={'250px'}/>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
            <Button onClick={e => navigate('product-list/هدفون بی سیم')} endIcon={<ArrowLeftIcon sx={{fontSize: '3rem!important'}}/>}
                    sx={{fontSize: '1.8rem', lineHeight: '4rem', padding: '1.2rem 0', marginTop: '2rem'}}
                    size="large"> آیتم های گروه
                هدفون </Button>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 4}}
                      columns={{xs: 12, sm: 8, md: 12}}>
                    {!!headPhoneData.length ? headPhoneData.map(item => (
                        <Grid item xs={12} sm={4} md={4} key={item.id}>
                            <CardComponent
                                img={item.image[0]}
                                price={item.price} firstName={item.firstName} brand={item.brand}
                                description={item.description}
                                onClick={e => handlePurchase(e, item.id)}/>
                        </Grid>
                    )) : (skeletonNumber.map((item, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <Skeleton key={item} animation="wave" variant="rect" width={'300px'} height={'250px'}/>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        getMobiles: () => dispatch(getMobiles()),
        getLaptops: () => dispatch(getLaptopes()),
        getComputers: () => dispatch(getComputers()),
        getHeadPhones: () => dispatch(getHeadPhones())
    }
}


const Home = connect(undefined, mapDispatchToProps)(HomePage);

export {Home}