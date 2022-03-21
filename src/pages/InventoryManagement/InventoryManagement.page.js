import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {tableCellClasses} from '@mui/material/TableCell';
import {makeStyles} from '@mui/styles';
import SelectUnstyled, {selectUnstyledClasses} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {optionUnstyledClasses} from '@mui/base/OptionUnstyled';
import Skeleton from '@mui/material/Skeleton';
import {getProduct} from 'redux/actions/products.action';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import http from 'services/http.service';
import {styled} from '@mui/material/styles';
import {AppPagination, InputChanger, PersianNumber} from 'components';
import {PRODUCTS} from 'configs/url.config';


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
    changer: {
        textDecoration: 'underline',
        color: '#3b54b0de!important',
        cursor: 'pointer',
        fontFamily: 'Vazir-Bold!important',
        height: '30px'
    }
}));


const columns = [
    {id: 'order', label: 'کالا', minWidth: 170},
    {
        id: 'price', label: 'قیمت', minWidth: 100,
        format: (value) => value.toLocaleString('fa-IR')
    },
    {
        id: 'count',
        label: 'موجودی',
        minWidth: 170,
        format: (value) => value.toLocaleString('fa-IR')
    }
];


const InventoryManage = props => {

    const searchURL = window.location.search.split('&');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(searchURL[2] ? searchURL[2].split('=')[1] : 1);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [value, setValue] = React.useState(searchURL[0] ? searchURL[0].split('=')[1] : '');
    const [displayInputPrice, setDisplayInputPrice] = useState([])
    const [displayInputCount, setDisplayInputCount] = useState([])
    const [displayButton, setDisplayButton] = useState('false')
    const [changePrice_Count, setChangePrice_Count] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchProducts();
        escCancel();
    }, [page, value, displayButton]);

    const escCancel = () => {
        document.addEventListener('keydown', e => {
            if (e.keyCode === 27) {
                setDisplayButton('false')
                setDisplayInputPrice([]);
                setDisplayInputCount([]);
                setChangePrice_Count([]);
                document.querySelectorAll('input').forEach(item => {
                    item.value = ''
                })
            }
        })
    }

    // FETCH PRODUCTS
    const fetchProducts = async () => {
        navigate(`?_sort=${value}&_order=${value === 'brand' ? 'asc' : 'desc'}&_page=${page}&_limit=10`);
        const {data} = await http.get(`${PRODUCTS}?_sort=${value}&_order=${value === 'brand' ? 'asc' : 'desc'}&_page=${page}&_limit=10`);
        setData(data);
        await http.get(PRODUCTS).then(res => {
            setNumberOfPages(Math.ceil(res.data.length / 10));
        });
    };

    const handlePrice_Count = (e, type, id) => {
        setDisplayButton('true')
        if (type === 'price') {
            setDisplayInputPrice([...displayInputPrice, id])
        } else {
            setDisplayInputCount([...displayInputCount, id])
        }
    }

    const handleSave = e => {

        const changeCount = changePrice_Count.length;
        let successApiCall = 0;


        changePrice_Count.forEach(item => {

            Promise.all([
                http.patch(`${PRODUCTS}/${item.id}`, {
                    price: item.price,
                    count: item.count
                })
            ]).then(() => {
                successApiCall++;
                successApiCall === changeCount && toast.success('اطلاعات با موفقیت ثبت شد');
                fetchProducts();
                setDisplayButton('false')
                setDisplayInputPrice([]);
                setDisplayInputCount([]);
                setChangePrice_Count([]);
                document.querySelectorAll('input').forEach(item => {
                    item.value = ''
                })
            }).catch(err => {
                console.log(err)
                item.price && toast.error(`متاسفانه ویرایش قیمت ${item.categoryName} ${item.name}  از ${item.previousPrice} به ${item.price} با مشکل مواجه شد`);
                item.count && toast.error(`متاسفانه ویرایش موجودی ${item.categoryName} ${item.name}  از ${item.previousCount} به ${item.count} با مشکل مواجه شد`);
            });
        })
    }

    const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | مدیریت سفارش ها </title>
            </Helmet>
            <Box className={classes.box}>
                <Typography className={classes.title} component="h3" variant="h3"> مدیریت کالاها </Typography>
                <div style={{'display': 'flex', 'alignItems': 'center', 'flexWrap': 'wrap', 'gap': '.8rem'}}>مرتب سازی
                    بر اساس :
                    <CustomSelect value={value} onChange={setValue}>
                        <StyledOption value="price">قیمت</StyledOption>
                        <StyledOption value="count">تعداد</StyledOption>
                        <StyledOption value="brand">برند</StyledOption>
                        {/*<StyledOption value="">جدیدترین محصولات</StyledOption>*/}
                    </CustomSelect>
                </div>
                <Button disabled={displayButton === 'false'} className={classes.button} onClick={handleSave}
                        color="success"
                        variant="contained">ذخیره</Button>
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
                                <TableRow key={item.id} hover role="checkbox" tabIndex={-1}>
                                    <TableCell sx={{width: '80%'}}>
                                        {item.category.name + ' ' + item.brand + ' ' + item.firstName}
                                    </TableCell>

                                    <TableCell onClick={e => handlePrice_Count(e, 'price', item.id)}
                                               className={classes.changer}>
                                        <span
                                            style={{
                                                display: !!displayInputPrice.length && displayInputPrice.includes(item.id) ? 'none' : 'block',
                                                fontFamily: 'Vazir-bold'
                                            }}> <PersianNumber number={item.price}/> </span>
                                        <InputChanger type="number"
                                                      style={{display: !!displayInputPrice.length && displayInputPrice.includes(item.id) ? 'block' : 'none'}}
                                                      placeholder={item.price}
                                                      onBlur={e => setChangePrice_Count([...changePrice_Count, {
                                                          id: item.id,
                                                          price: e.target.value,
                                                          name: item.firstName,
                                                          categoryName: item.category.name,
                                                          previousPrice: item.price
                                                      }])}
                                        />
                                    </TableCell>

                                    <TableCell onClick={e => handlePrice_Count(e, 'count', item.id)}
                                               className={classes.changer}>
                                        <span
                                            style={{
                                                display: !!displayInputCount.length && displayInputCount.includes(item.id) ? 'none' : 'block',
                                                fontFamily: 'Vazir-bold'
                                            }}> <PersianNumber number={item.count}/> </span>
                                        <InputChanger type="number"
                                                      style={{display: !!displayInputCount.length && displayInputCount.includes(item.id) ? 'block' : 'none'}}
                                                      placeholder={item.count}
                                                      onBlur={e => setChangePrice_Count([...changePrice_Count, {
                                                          id: item.id,
                                                          count: e.target.value,
                                                          name: item.firstName,
                                                          categoryName: item.category.name,
                                                          previousCount: item.count
                                                      }])}
                                        />
                                    </TableCell>

                                </TableRow>
                            )) : skeletonCount.map((item, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={`${index}`}>
                                    <TableCell sx={{width: '80%'}}>
                                        <Skeleton animation="wave" variant="rect" width={300}/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className={classes.changer} animation="wave" variant="rect"
                                                  width={50}/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className={classes.changer} animation="wave" variant="rect"
                                                  width={50}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <AppPagination setPage={setPage} pageNumber={numberOfPages}/>
        </>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProduct()),
    }
};

const InventoryManagement = connect(undefined, mapDispatchToProps)(InventoryManage);
export {InventoryManagement};
