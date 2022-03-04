import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {
    Box,
    Button, InputLabel, MenuItem, modalClasses,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {makeStyles} from '@mui/styles';
import http from 'services/http.service';
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import {AppPagination, FileInput} from 'components';
import {CUSTOMERS, PRODUCTS} from '../../configs/url.config';
import PropTypes from 'prop-types';
import SelectUnstyled, {selectUnstyledClasses} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {optionUnstyledClasses} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import Skeleton from '@mui/material/Skeleton';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {toast} from 'react-toastify';
import moment from 'jalali-moment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #000;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 4px solid rgba(100, 100, 100, 0.3);
  }

  &.${selectUnstyledClasses.expanded} {
    border-radius: 0.75em 0.75em 0 0;

    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
`;

const StyledListbox = styled('ul')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-color: #fff;
  min-width: 200px;
  border: 1px solid #ccc;
  border-top: none;
  color: #000;
`;

const StyledOption = styled(OptionUnstyled)`
  list-style: none;
  padding: 4px 10px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.disabled} {
    color: #888;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: rgba(25, 118, 210, 0.08);
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #16d;
    color: #fff;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #05e;
    color: #fff;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: #39e;
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1000;
`;

function CustomSelect(props) {
    const components = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper: StyledPopper,
        ...props.components,
    };

    return <SelectUnstyled {...props} components={components}/>;
}

CustomSelect.propTypes = {
    /**
     * The components used for each slot inside the Select.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components: PropTypes.shape({
        Listbox: PropTypes.elementType,
        Popper: PropTypes.elementType,
        Root: PropTypes.elementType,
    }),
};


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const useStyle = makeStyles(theme => ({
    box: {
        marginTop: '90px',
        marginBottom: '3.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            marginTop: '140px',
            flexWrap: 'wrap',
            gap: '1rem',
        }, [theme.breakpoints.down('sm')]: {
            marginTop: '180px',
        },
    },
    title: {
        fontSize: '1.8rem!important',
        fontFamily: 'Vazir-Bold!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem!important'
        },
    },
    button: {
        padding: '1rem 3rem!important',
        fontSize: '1rem!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '.8rem!important',
            padding: '.8rem 2.4rem!important',
            width: '100%',
        },
    },
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        }, [theme.breakpoints.down('sm')]: {
            width: '90%',
        }
    }

}));


const columns = [
    {id: 'name', label: 'نام کاربر', minWidth: 170},
    {id: 'totalAmount', label: 'مجموع مبلغ', minWidth: 100},
    {
        id: 'date',
        label: 'زمان سفارش',
        minWidth: 170,
        format: (value) => value.toLocaleString('fa-IR'),
    },
    {
        id: 'setting',
        label: '',
        minWidth: 170,
        format: (value) => value.toLocaleString('fa-IR'),
    }
];

const columnsModal = [
    {id: 'name', label: 'کالا', width: '70%'},
    {id: 'price', label: 'قیمت', width: '18%'},
    {
        id: 'count',
        label: 'تعداد',
        width: '12%',
        format: (value) => value.toLocaleString('fa-IR'),
    },
]


const CommodityManagement = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [value, setValue] = React.useState('doing');
    const [open, setOpen] = React.useState(false);
    const [dataModal, setDataModal] = useState([]);


    const handleOpen = (e, id) => {
        setOpen(true);
        http.get(`${CUSTOMERS}/${id}`).then(res => {
            setDataModal([res.data]);
        });
    }

    const handleClose = () => setOpen(false);


    useEffect(() => {
        fetchProducts();

    }, [page, value, dataModal]);

    // FETCH PRODUCTS
    const fetchProducts = async () => {
        const {data} = await http.get(`${CUSTOMERS}?status=${value}`);
        setData(data);
        await http.get(CUSTOMERS).then(res => {
            setNumberOfPages(res.headers['x-total-count']);
        });
        didMount();
    };

    const didMount = () => {
        const todayDate = moment().locale('fa').format('YYYY/MM/DD');

        http.get(`${CUSTOMERS}?deliverytime=${todayDate}`).then(res => {
            if (res.data === []) return;
            res.data.forEach(item => {
                if (item.status === 'doing') {
                    http.patch(`${CUSTOMERS}/${item.id}`, {status: 'done'}).then(res => {
                        fetchProducts();
                    })
                }
            })
        });
    };


    const classes = useStyle();


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeStatus = (id, status) => {

        if (status === 'doing') {
            http.patch(`${CUSTOMERS}/${id}`, {status: 'done'}).then(res => {
                fetchProducts();
                toast.success('وضعیت سفارش با موفقیت تغییر یافت');
            });
        } else {
            http.patch(`${CUSTOMERS}/${id}`, {status: 'doing'}).then(res => {
                fetchProducts();
                toast.success('وضعیت سفارش با موفقیت تغییر یافت');
            });
        }

        handleClose()

    }

    const skeletonCount = [1, 2, 3, 4, 5]

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | مدیریت سفارش ها </title>
            </Helmet>
            <Box className={classes.box}>
                <Typography className={classes.title} component="h3" variant="h3"> مدیریت کالاها </Typography>
                <FormControl>
                    <RadioGroup sx={{display: 'flex!important', flexDirection: 'row'}}
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                    >
                        <FormControlLabel value="done" control={<Radio/>} label="سفارش های تحویل شده"/>
                        <FormControlLabel value="doing" control={<Radio/>} label="سفارش های در انتظار ارسال"/>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
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
                            {!!data.length ? data.map(item => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                    <TableCell sx={{width: '30%'}} key={item.id}>
                                        {item.name}
                                    </TableCell>
                                    <TableCell sx={{width: '20%'}}>
                                        {(item.totalAmount).toLocaleString('fa-ir')}
                                    </TableCell>
                                    <TableCell sx={{width: '40%'}}>
                                        {item.date}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{display: 'flex', gap: '10px'}}>
                                            <Button onClick={e => handleOpen(e, item.id)} color="info"
                                                    variant="contained"> بررسی سفارش </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )) : skeletonCount.map((item, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell sx={{width: '30%'}}>
                                        <Skeleton animation="wave" variant="rect" width={120}/>
                                    </TableCell>
                                    <TableCell sx={{width: '20%'}}>
                                        <Skeleton animation="wave" variant="rect"
                                                  width={50}/>
                                    </TableCell>
                                    <TableCell sx={{width: '40%'}}>
                                        <Skeleton animation="wave" variant="rect"
                                                  width={50}/>
                                    </TableCell>
                                    <TableCell sx={{display: 'flex', gap: '10px'}}>
                                        <Skeleton animation="wave" variant="rect"
                                                  width={80}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Modal sx={{overflowX: 'hidden'}}
                   aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   open={open}
                   onClose={handleClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                       timeout: 500,
                   }}>
                <Fade in={open}>
                    <Box className={classes.modalBox}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Typography sx={{my: 1, mb: 1}} id="transition-modal-title" variant="h6" component="h3">
                                نمایش سفارش
                            </Typography>
                            <Button onClick={handleClose}> <HighlightOffTwoToneIcon/>
                            </Button>
                        </Box>
                        {!!dataModal.length ? dataModal.map(item => (
                            <Box key={item.id}>
                                <article>
                                    <p style={{lineHeight: '2rem'}}>
                                        <span style={{fontFamily: 'Vazir-bold'}}> نام مشتری:</span> {item.name} <br/>
                                        <span style={{fontFamily: 'Vazir-bold'}}> شماره تماس:</span> {item.phone} <br/>
                                        <span style={{fontFamily: 'Vazir-bold'}}>  آدرس:</span> {item.address} <br/>
                                        <span
                                            style={{fontFamily: 'Vazir-bold'}}>  زمان تحویل:</span> {item.deliverytime}<br/>
                                        <span style={{fontFamily: 'Vazir-bold'}}>  زمان سفارش:</span> {item.date} <br/>
                                    </p>
                                </article>
                                <Paper sx={{width: '100%', overflow: 'auto'}}>
                                    <TableContainer>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columnsModal.map((column) => (
                                                        <StyledTableCell
                                                            sx={{
                                                                fontSize: '1.1rem',
                                                                cursor: column.cursor,
                                                                width: column.width
                                                            }}
                                                            key={column.id}
                                                            align={column.align}
                                                            onClick={column.onclick}
                                                        >
                                                            {column.label}
                                                        </StyledTableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.orders.map((item, index) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        <TableCell sx={{width: '30%'}} key={item.id}>
                                                            {item.brand} {item.name}
                                                        </TableCell>
                                                        <TableCell sx={{width: '20%'}}>
                                                            {(item.price).toLocaleString('fa-ir')}
                                                        </TableCell>
                                                        <TableCell sx={{width: '40%'}}>
                                                            {item.count}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Box>
                        )) : [1, 2, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                            <Box sx={{my: 1, display: 'flex', gap: '20px'}} key={index}>
                                <Skeleton variant="rect" width={50} height={20}/>
                                <Skeleton variant="rect" width={300} height={20}/>
                            </Box>
                        ))}
                        {!!dataModal.length && dataModal[0].status === 'done' ? (
                            <Button onClick={e => handleChangeStatus(dataModal[0].id, 'done')} color="warning"
                                    variant="contained"> تغیر وضعیت به سفارش های درحال انتظار </Button>
                        ) : <Button onClick={e => handleChangeStatus(dataModal[0].id, 'doing')} color="success"
                                    variant="contained"> تغیر وضعیت به سفارش های تحویل داده شده </Button>}
                    </Box>
                </Fade>
            </Modal>
            <AppPagination setPage={setPage} pageNumber={numberOfPages}/>

        </>
    );
}

export {CommodityManagement};