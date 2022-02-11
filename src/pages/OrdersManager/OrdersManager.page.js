import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {getProduct} from 'redux/actions/products.action';
import {connect} from 'react-redux';
import {getProducts} from 'api/product.api';
import axios from 'axios';
import http from 'services/http.service';
import {styled} from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import {AppPagination} from 'components';
import {PRODUCTS} from '../../configs/url.config';
import PropTypes from 'prop-types';
import SelectUnstyled, {selectUnstyledClasses} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {optionUnstyledClasses} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

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
    }
}));


const columns = [
    {id: 'name', label: 'تصویر', minWidth: 170},
    {id: 'code', label: 'نام کالا', minWidth: 100},
    {
        id: 'category',
        label: 'دسته بندی',
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


const OrdersManage = props => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [value, setValue] = React.useState('');


    useEffect(() => {
        fetchProducts();

    }, [page, value]);

    // FETCH PRODUCTS
    const fetchProducts = async () => {
        const {data} = await http.get(`${PRODUCTS}?_sort=${value}&_order=${value === 'brand' ? 'asc' : 'desc'}&_page=${page}&_limit=10`);
        setData(data);
        await http.get(PRODUCTS).then(res => {
            setNumberOfPages(Math.ceil(res.data.length / 10));
        });
    };


    const classes = useStyle();

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | مدیریت کالاها </title>
            </Helmet>
            <Box className={classes.box}>
                <Typography className={classes.title} component="h3" variant="h3"> مدیریت کالاها </Typography>
                <div style={{'display': 'flex', 'alignItems': 'center', 'flexWrap': 'wrap', 'gap': '.8rem'}}>مرتب سازی
                    بر اساس :
                    <CustomSelect value={value} onChange={setValue}>
                        <StyledOption value="price">قیمت</StyledOption>
                        <StyledOption value="count">تعداد</StyledOption>
                        <StyledOption value="brand">برند</StyledOption>
                        <StyledOption value="">جدیدترین محصولات</StyledOption>
                    </CustomSelect>
                </div>
                <Button className={classes.button} color="success" variant="contained"> افزودن کالا </Button>
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
                            {!!data.length && data.map(item => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell key={item.id}>
                                        <figure style={{'width': '60px', 'height': 'auto'}}>
                                            <img style={{'width': '100%'}} src={item.image[0]}
                                                 alt={`${item.id}${item.image[1]}`}/>
                                        </figure>
                                    </TableCell>
                                    <TableCell key={item.key}>
                                        {item.firstName}
                                    </TableCell>
                                    <TableCell key={item.key}>
                                        {item.category.name} / {item.brand}
                                    </TableCell>
                                    <TableCell key={item.key}>
                                        <Box sx={{display: 'flex', gap: '10px'}}>
                                            <Button color="warning" variant="contained"> ویرایش </Button>
                                            <Button color="error" variant="contained"> حذف </Button>
                                        </Box>
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

const OrdersManager = connect(undefined, mapDispatchToProps)(OrdersManage);
export {OrdersManager};
