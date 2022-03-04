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
import {MultipleImages} from 'components'
import styles from '../../components/Card/Card.module.scss';
import CardMedia from '@mui/material/CardMedia';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useSelector, useDispatch, connect} from 'react-redux';
import store from 'redux/store';
import {getProduct} from '../../redux/actions/products.action';
import {toast} from 'react-toastify';


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
    },
    figureGroup: {
        display: 'flex',
        gap: '16px',
        margin: '1.6rem 0'
    },
    modalImages: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        margin: '.8rem 0'
    },
    titleName: {
        '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '1.4px',
            backgroundColor: '#e0e0e2',
            marginTop: '10px'
        }
    }
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    minWidth: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1
};


const Purchase = props => {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [countOrder, setCountOrder] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [mainImage, setMainImage] = useState('');


    const handleOpen = (image) => {
        setOpen(true);
        setMainImage(image);
    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        http.get(`${PRODUCTS}/${id}`).then(res => {
            setData([...data, res.data]);
            didMount();
        });
    }, [id]);

    const didMount = () => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        storage === null ? storage = [] : storage = JSON.parse(localStorage.getItem('orders'));
        localStorage.setItem('orders', JSON.stringify(storage));
    }

    const handleAddOrder = e => {
        let storage = JSON.parse(localStorage.getItem('orders'));


        const order = {
            count: countOrder,
            name: data[0].firstName,
            brand: data[0].brand,
            price: data[0].price,
        }

        localStorage.setItem('orders', JSON.stringify([...storage, order]));
        store.dispatch({type: 'ORDERS_INCREMENT'});
        toast.success('کالا با موفقیت به سبد خرید اضافه شد.');
    }

    const handleChange = e => {
        if (e.key === '-' || e.target.value[0] === '0' || e.key === '+' || e.key === '*' || e.key === '/') {
            e.preventDefault();
        } else if (e.target.value.length < 2 && e.key === 'Backspace') {
            e.preventDefault();
        } else if (e.target.value.length === 0 && e.key === '0' || e.key === '.') {
            e.preventDefault();
        }
    };

    const handleChangeCount = (e, count) => {
        setCountOrder(e.target.value);
        if (e.target.value > count) {
            e.target.value = count;
        }
    };


    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | خرید </title>
            </Helmet>
            {!!data.length && data.map((item, index) => (
                <div key={index}>
                    <Box className={classes.box} key={item.firstName}>
                        <Box>
                            <figure>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={`http://localhost:3002/files/${item.image[0]}`}
                                    alt="test"
                                />
                            </figure>
                        </Box>
                        <Box className={classes.infoBox}>
                            <Typography className={classes.titleName} variant="h5"
                                        component="h1">{item.category.name} {item.firstName} </Typography>
                            <Typography variant="h6" component="h1">برند: {item.brand} </Typography>
                            <Typography variant="h6" component="h2"> قیمت: {item.price} تومان </Typography>
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
                                           onChange={e => handleChangeCount(e, +item.count)}
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
                    <Box className={classes.figureGroup}>
                        {item.image.map((image, index) => (
                            <figure key={index} onClick={e => handleOpen(`http://localhost:3002/files/${image}`)}
                                    style={{
                                        width: '50px!important',
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    }}>
                                <CardMedia sx={{width: '70px!important'}}
                                           component="img"
                                           height="auto"
                                           image={`http://localhost:3002/files/${image}`}
                                           alt="test"
                                />
                            </figure>
                        ))}
                    </Box>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <figure>
                                    <CardMedia sx={{width: '100%!important'}}
                                               component="img"
                                               height="auto"
                                               image={mainImage}
                                               alt="test"
                                    />
                                </figure>
                                <Box className={classes.modalImages}>
                                    {item.image.map((image, index) => (
                                        <figure key={index} style={{
                                            width: '50px!important',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: `http://localhost:3002/files/${image}` === mainImage ? '2px solid #3e9fd8' : '2px solid #ccc'
                                        }}
                                                onClick={e => setMainImage(`http://localhost:3002/files/${image}`)}>
                                            <CardMedia sx={{width: '70px!important'}}
                                                       component="img"
                                                       height="auto"
                                                       image={`http://localhost:3002/files/${image}`}
                                                       alt="test"
                                            />
                                        </figure>
                                    ))}
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                    <Box sx={{my: 3}}>
                        <Typography dangerouslySetInnerHTML={{__html: item.description}}/>
                        <Typography sx={{lineHeight: '2rem'}}>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                            تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در
                            شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها
                            شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                            ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط
                            سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                            اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </Typography>
                    </Box>
                </div>
            ))}
        </>
    );

};


export {Purchase};