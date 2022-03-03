import React, {Component, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
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


const useStyle = makeStyles(theme => ({}));

const columns = [
    {id: 'order', label: 'کالا', minWidth: 170},
    {id: 'price', label: 'قیمت', minWidth: 100},
    {
        id: 'count',
        label: 'تعداد',
        minWidth: 170,
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'setting',
        label: '',
        minWidth: 170,
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


const Basket = props => {

    const [data, setData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect((props) => {
        didMount()
    }, []);


    const didMount = () => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        storage === null ? storage = [] : storage = JSON.parse(localStorage.getItem('orders'));
        localStorage.setItem('orders', JSON.stringify(storage));

        setData(storage);

        setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
    }

    console.log(data)

    const navigate = useNavigate();

    const classes = useStyle();

    const handleDelete = (index) => {
        let storage = JSON.parse(localStorage.getItem('orders'));
        storage.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(storage));
        setData(storage);
        setTotalPrice(storage.reduce((total, item) => total + item.price * item.count, 0));
        store.dispatch({type: 'ORDERS_DECREMENT'});
    }


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
                                    <TableCell sx={{width: '80%'}}>
                                        <PersianNumber number={item.brand}/>
                                        &nbsp;<PersianNumber number={item.name}/>
                                    </TableCell>
                                    <TableCell sx={{width: '10%'}}>
                                        <PersianNumber number={item.price}/>&nbsp;تومان
                                    </TableCell>
                                    <TableCell sx={{width: '10%'}}>
                                        <PersianNumber number={item.count}/>
                                    </TableCell>
                                    <TableCell key={item.key}>
                                        <Box sx={{display: 'flex', gap: '10px'}}>
                                            <Button onClick={e => handleDelete(index)} color="warning"
                                                    variant="contained"> حذف </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        < /TableBody>
                    </Table>
                </TableContainer>
            </Paper>

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
                <Button disabled={data.length === 0} onClick={e => navigate(PATHS.FINAL_PURCHASE)}
                        sx={{padding: '.8rem 1.9rem', fontSize: '1rem'}}
                        color="success" variant="contained"> نهایی کردن
                    سبدخرید </Button>
            </Box>
        </>
    );
}


export {Basket};