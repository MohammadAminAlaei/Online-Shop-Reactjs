import React, {Component, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from 'react-router-dom';
import http from 'services/http.service';
import {PRODUCTS} from '../../configs/url.config';
import {
    Button,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {PATHS} from '../../configs/routes.config';
import {PersianNumber} from '../../components';
import Skeleton from '@mui/material/Skeleton';
import * as PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import store from '../../redux/store';
import {toast} from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


const columns = [
    {id: 'image', label: 'تصویر'},
    {id: 'order', label: 'کالا'},
    {id: 'price', label: 'قیمت'},
    {
        id: 'count',
        label: 'تعداد',
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'totalAmount',
        label: 'مجموع قیمت',
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'editeCount',
        label: '',
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'setting',
        label: '',
    }
];


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};


const Basket = props => {

    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [count, setCount] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => {
        setIndex(null);
        setOpen(false)
    };

    const handleOpen = index => {
        setIndex(index)
        setOpen(true)
    };

    useEffect(() => {
        didMount()
    }, [count, index]);


    const didMount = () => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        storage === null ? storage = [] : storage = JSON.parse(localStorage.getItem('orders'));
        localStorage.setItem('orders', JSON.stringify(storage));

        setData(storage)

        setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
    }


    const navigate = useNavigate();

    const handleBasket = () => {
        if (count === '' || count === null || count === 0) {
            toast.warn('لطفا تعداد را وارد کنید');
            return;
        }
        navigate(PATHS.FINAL_PURCHASE);
    }

    const handleDelete = () => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        storage.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(storage));
        console.log(storage)
        setData(storage);
        setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
        store.dispatch({type: 'ORDERS_DECREMENT'});
        toast.success('کالا با موفقیت حذف شد');
        setOpen(false);
    };

    const handleChange = e => {
        if (e.key === '-' || e.target.value[0] === '0' || e.key === '+' || e.key === '*' || e.key === '/') {
            e.preventDefault();
        } else if (e.target.value.length < 2 && e.key === 'Backspace') {
            e.preventDefault();
        } else if (!e.target.value.length === 0 && e.key === '0' || e.key === '.') {
            e.preventDefault();
        }
    };

    const handleChangeCount = (e, count, orderId, index) => {
        http.get(PRODUCTS + '/' + orderId).then(res => {
            let orderCount = +res.data.count;
            if (e.target.value > orderCount) {
                e.target.value = orderCount;
            } else if (+e.target.value === 0 || e.target.value === '') {
                e.target.value = 1;
                toast.warning('تعداد نمیتواند خالی یا صفر باشد!');
            }
            setCount(orderCount);

            // let updated = [...data];
            // updated[index].count = +e.target.value;
            // setData(updated);

            let storage = JSON.parse(localStorage.getItem('orders'));
            storage[index].count = +e.target.value;
            storage[index].totalAmount = storage[index].price * storage[index].count;
            localStorage.setItem('orders', JSON.stringify(storage));
            setData(storage);
            setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
        });
    };

    const handlePlusOrMines = (e, target, index, orderId) => {
        http.get(PRODUCTS + '/' + orderId).then(res => {
            let storage = JSON.parse(localStorage.getItem('orders'));
            if (target === 'plus' && storage[index].count + 1 > res.data.count) {
                toast.warning(`حداکثر تعداد موجود در انبار ${res.data.count} است`);
                return;
            }
            if (target === 'plus') {
                storage[index].count++;
                storage[index].totalAmount = storage[index].price * storage[index].count;
                localStorage.setItem('orders', JSON.stringify(storage));
                setData(storage);
                setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
            } else if (target === 'mines') {
                if (storage[index].count === 1) {
                    toast.warning('تعداد نمیتواند کمتر از 1 باشد!');
                    return;
                }
                storage[index].count--;
                storage[index].totalAmount = storage[index].price * storage[index].count;
                localStorage.setItem('orders', JSON.stringify(storage));
                setData(storage);
                setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
            }
        })
    };


    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | سبد خرید </title>
            </Helmet>
            <Typography sx={{fontFamily: 'Vazir-bold'}} variant="h4" component="h3"> سبد خرید </Typography>

            <Paper
                sx={{width: '100%', overflow: 'hidden', display: !!data.length ? 'block' : 'none', marginTop: '40px'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell sx={{fontSize: '1.1rem', cursor: column.cursor}}
                                                     key={column.id}
                                                     align={column.align}
                                                     style={{minWidth: column.minWidth}}
                                                     onClick={column.onclick}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!!data.length && data.map((item, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={`${index}`}>
                                    <TableCell>
                                        <figure style={{'width': '60px', 'height': 'auto'}}>
                                            <img style={{'width': '100%'}}
                                                 src={`http://localhost:3002/files/${item.image}`}
                                                 alt={`${item.id}${item.image}`}/>
                                        </figure>
                                    </TableCell>
                                    <TableCell>
                                        <PersianNumber number={item.brand}/>
                                        &nbsp;<PersianNumber number={item.name}/>
                                    </TableCell>
                                    <TableCell>
                                        <PersianNumber number={item.price}/>&nbsp;تومان
                                    </TableCell>
                                    <TableCell>
                                        <PersianNumber number={item.count}/>
                                    </TableCell>
                                    <TableCell>
                                        <PersianNumber number={item.count * item.price}/>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '1px'
                                            }}>
                                            <Button variant="contained" color="info"
                                                    sx={{minWidth: '40px', height: '40px'}}
                                                    onClick={e => handlePlusOrMines(e, 'plus', index, item.orderId)}>
                                                +
                                            </Button>
                                            <TextField
                                                size="small" sx={{width: '80px'}}
                                                type="number"
                                                id="outlined-basic"
                                                label="تغیر تعداد"
                                                variant="outlined"
                                                InputProps={{
                                                    inputProps: {
                                                        min: 1, max: count !== 0 ? count : 100,
                                                        onKeyPress: handleChange
                                                    },
                                                }}
                                                value={item.count}
                                                onChange={e => handleChangeCount(e, +item.count, item.orderId, index)}
                                            />
                                            <Button variant="contained" color="info"
                                                    sx={{minWidth: '40px', height: '40px'}}
                                                    onClick={e => handlePlusOrMines(e, 'mines', index, item.orderId)}>
                                                -
                                            </Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell key={item.key}>
                                        <Box sx={{display: 'flex', gap: '10px'}}>
                                            <Button onClick={e => handleOpen(index)} color="warning"
                                                    variant="contained"> حذف </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        < /TableBody>
                    </Table>
                </TableContainer>
            </Paper>

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
                        <Typography sx={{textAlign: 'center'}}
                                    id="transition-modal-title" variant="h6"
                                    component="h2">
                            آیا از حذف این محصول اطمینان دارید؟
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3
                        }}>
                            <Button onClick={handleDelete}
                                    sx={{width: '100px'}}
                                    color="success"
                                    variant="contained"> بله </Button>
                            <Button onClick={handleClose}
                                    sx={{width: '100px'}}
                                    variant="contained"> خیر </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            <Typography variant="h6" sx={{margin: '30px 0 -20px 0', display: !!data.length ? 'none' : 'block'}}> سبد
                خرید شما خالی
                است </Typography>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginTop: '60px',
                justifyContent: 'space-between'
            }}>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center'}}>
                    <Typography variant="h5"> جمع: </Typography>
                    <Typography sx={{display: 'flex', alignItems: 'center'}}
                                variant="h5"><PersianNumber number={totalPrice}/>&nbsp; تومان </Typography>
                </Box>
                <Button disabled={data.length === 0} onClick={e => handleBasket()}
                        sx={{padding: '.8rem 1.9rem', fontSize: '1rem'}}
                        color="success" variant="contained"> نهایی کردن
                    سبدخرید </Button>
            </Box>
        </>
    );
}


export {Basket};