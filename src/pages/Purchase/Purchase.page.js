import React, {Component, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import {useParams} from 'react-router-dom';
import http from 'services/http.service';
import {PRODUCTS} from '../../configs/url.config';
import {Button, TextField, Typography} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const useStyle = makeStyles(theme => ({
    box: {
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        marginTop: '10px'
    }
}));


const Purchase = props => {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [countOrder, setCountOrder] = useState(1);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        http.get(`${PRODUCTS}/${id}`).then(res => {
            setData([...data, res.data]);
            didMount();
        });
    }, [id]);

    const didMount = () => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        storage === null ? storage = [] : storage = JSON.parse(localStorage.getItem('orders'));
        setOrders(storage);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    const handleAddOrder = e => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        console.log(storage)


        const order = {
            count: countOrder,
            name: data[0].firstName,
            brand: data[0].brand,
            price: data[0].price,
        }

        localStorage.setItem('orders', [...storage, JSON.stringify(order)]);
    }

    const handleChange = e => {
        if (e.key === '-' || e.target.value > +'500' || e.target.value[0] === '0') {
            e.preventDefault();
        }
    }

    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | خرید </title>
            </Helmet>
            {!!data.length && data.map(item => (
                <>
                    <Box className={classes.box} key={item.firstName}>
                        <figure style={{maxWidth: '300px', maxHeight: '300px', border: '1px solid black'}}>
                            <img style={{width: '100%', height: 'auto'}} src={item.image[0]} alt={item.image[0]}/>
                        </figure>
                        <Box className={classes.infoBox}>
                            <Typography variant="h5" component="h1">{item.category.name} {item.firstName} </Typography>
                            <Typography variant="h6" component="h1">برند: {item.brand} </Typography>
                            <Typography variant="h6" component="h2"> {item.price} تومان </Typography>
                            <Box style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <TextField defaultValue="1" size="small" sx={{width: '100px'}} type="number"
                                           id="outlined-basic"
                                           label="تعداد"
                                           variant="outlined"
                                           InputProps={{
                                               inputProps: {
                                                   min: 1, max: item.count,
                                                   onKeyPress: handleChange
                                               },
                                           }}
                                           onChange={e => setCountOrder(e.target.value)}
                                />
                                <Button onClick={handleAddOrder} endIcon={<AddCircleIcon/>}
                                        sx={{width: '200px', height: '46px'}}
                                        variant="contained"
                                        color="success"> افزودن
                                    به سبد
                                    خرید </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Typography sx={{my: 3}}>
                        < div> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto blanditiis
                            consectetur consequuntur deserunt facilis labore laborum natus nemo neque, nobis officia qui
                            repellendus sint sunt tenetur veritatis voluptas voluptate.
                        </div>
                        <div>Aliquid amet asperiores debitis dolores enim est et hic impedit iste itaque labore maiores
                            maxime nostrum numquam obcaecati optio quibusdam quo ratione recusandae repellat sequi sint,
                            soluta sunt tempore velit!
                        </div>
                        <div>Animi consectetur dicta dolores eius voluptates. Aliquam animi assumenda autem
                            consequuntur, deleniti, dolorum eaque esse facere illum labore molestias mollitia nulla,
                            officia praesentium quae quidem quod recusandae sapiente voluptate voluptatibus?
                        </div>
                    </Typography>
                    <Typography>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at deserunt dolore neque
                            sunt suscipit ut vel! Aspernatur consequuntur delectus, et facere laboriosam nihil non odio
                            quae sed unde. Nostrum!
                        </div>
                        <div>Autem cupiditate, dicta? Accusantium, adipisci aliquid at deleniti dolorem doloribus
                            ducimus eligendi expedita, laborum minima molestiae nisi quis voluptatibus? Atque
                            consequatur excepturi facere fuga, harum id incidunt magni officia placeat?
                        </div>
                    </Typography>
                </>
            ))}
        </>
    );
}


export {Purchase};