import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {
    Box,
    Button, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TextField,
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
import Skeleton from '@mui/material/Skeleton';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import Input from '@mui/material/Input';
import {FileInput} from '../../components/FileInput/ّFileInput.component';
import FormControl from '@mui/material/FormControl';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import {toast} from 'react-toastify';
import CardMedia from '@mui/material/CardMedia';
import styles from './OrdersManager.module.scss';
import {PersianNumber} from 'components';
import {useNavigate} from 'react-router-dom';


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
        [theme.breakpoints.down('md')]: {
            width: '80%',
        }, [theme.breakpoints.down('sm')]: {
            width: '90%',
        }
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


const OrdersManage = props => {

        const searchURL = window.location.search.split('&');
        const [data, setData] = useState([]);
        const [page, setPage] = useState(searchURL[2] ? searchURL[2].split('=')[1] : 1);
        const [numberOfPages, setNumberOfPages] = useState(10);
        const [value, setValue] = React.useState(searchURL[0] ? searchURL[0].split('=')[1] : '');
        const [typeModal, setTypeModal] = useState('');
        const [open, setOpen] = useState(false);
        const [description, setDescription] = useState('');
        const [openModalDelete, setOpenModalDelete] = useState(false);
        const [deleteOrderId, setDeleteOrderId] = useState([]);
        const [imageArray, setImageArray] = useState([]);
        const [editId, setEditId] = useState(null);
        const [dataEdit, setDataEdit] = useState([]);
        const [grouping, setGrouping] = React.useState('');
        const [editOrderName, setEditOrderName] = useState('');
        const [editOrderBrand, setEditOrderBrand] = useState('');
        const navigate = useNavigate();


        const handleModal = (id, type) => {
            setOpen(true);
            type === 'add' ? setTypeModal('add') : setTypeModal('edit');
            setEditId(id);
        }

        const handleClose = () => {
            setEditId(null);
            setDataEdit([]);
            setOpen(false);
            setEditOrderName('');
            setEditOrderBrand('');
            setGrouping('');
            setDescription('')
            setImageArray([]);
        }


        useEffect(() => {
            navigate(`?_sort=${value}&_order=${value === 'brand' ? 'asc' : 'desc'}&_page=${page}&_limit=10`);
            fetchProducts();
            if (editId !== null) {
                http.get(`${PRODUCTS}/${editId}`).then(res => {
                    setDataEdit(res.data);
                    setEditOrderName(res.data.firstName);
                    setEditOrderBrand(res.data.brand);
                    setGrouping(res.data.category.name);
                    setDescription(res.data.description);
                    setImageArray(res.data.image);
                });
            }

        }, [page, value, editId]);


        // FETCH PRODUCTS
        const fetchProducts = async () => {
            const {data} = await http.get(`${PRODUCTS}?_sort=${value}&_order=${value === 'brand' ? 'asc' : 'desc'}&_page=${page}&_limit=10`);
            setData(data);
            await http.get(PRODUCTS).then(res => {
                setNumberOfPages(Math.ceil(res.data.length / 10));
            });
        };


        const handleGrouping = (event) => {
            setGrouping(event.target.value);
        };

        const handleDescription = (event, editor) => {
            const descripData = editor.getData();
            setDescription(descripData);
        };

        const handleSubmit = (e, id = editId) => {
            e.preventDefault();
            setEditId(null)
            const form = new FormData(e.target);
            let data = Object.fromEntries(form);
            const dataToSend = {
                'firstName': data.firstName,
                'brand': data.brand,
                'image': imageArray,
                'thumbnail': '65ddd8b1bbce4d8396b62611147fa1d6',
                'price': data.price,
                'count': data.count,
                'createdAt': Date.now(),
                'description': description,
                'category': {
                    'name': data.category_name,
                    'icon': '65ddd8b1bbce4d8396b62611147fa1d6'
                },
            };

            try {
                if (typeModal === 'add') {
                    setEditOrderName('');
                    setEditOrderBrand('');
                    http.post(PRODUCTS, dataToSend).then(res => {
                        fetchProducts();
                        handleClose();
                        toast.success('کالا با موفقیت اضافه شد');
                        setImageArray([]);
                        setData([]);
                        setEditId(null)
                        setDescription('');
                        data = {};
                        setEditId(null)
                    });
                } else {
                    http.patch(`${PRODUCTS}/${id}`, {
                        'firstName': data.firstName,
                        'brand': data.brand,
                        'image': imageArray,
                        'thumbnail': '65ddd8b1bbce4d8396b62611147fa1d6',
                        'createdAt': Date.now(),
                        'description': description,
                        'category': {
                            'name': data.category_name,
                            'icon': '65ddd8b1bbce4d8396b62611147fa1d6'
                        },
                    }).then(res => {
                        fetchProducts();
                        handleClose();
                        toast.success('کالا با موفقیت ویرایش شد');
                        setImageArray([]);
                        setData([]);
                        setEditId(null)
                        setDescription('');
                        data = {};
                        setEditId(null)
                    });
                }

            } catch (e) {
                console.log(e);
            }
        };

        const handleOpenModalDelete = (e, id) => {
            setOpenModalDelete(true);
            setDeleteOrderId([...deleteOrderId, {id}]);
        }

        const handleCloseModalDelete = (id) => {
            setOpenModalDelete(false);
            setDeleteOrderId([]);
        }


        const handleDeleteOrder = () => {
            deleteOrderId.forEach(order => {
                http.delete(`${PRODUCTS}/${order.id}`).then(res => {
                    fetchProducts();
                    toast.success('کالا با موفقیت حذف شد');
                    setOpenModalDelete(false);
                }).catch(err => {
                    toast.error('خطا در حذف کالا');
                })
            })
        };


        const handleUploadImage = e => {
            e.preventDefault();
            const data = new FormData();
            data.append('image', e.target.image.files[0]);
            if (e.target.image.files[0] === undefined) {
                toast.warning('لطفا ابتدا تصویر را انتخاب کنید');
                return;
            }
            try {
                http.post(`/upload`, data).then(res => {
                    setImageArray([...imageArray, `${res.data.filename}`]);
                    toast.success('تصویر با موفقیت آپلود شد');
                    e.target.image.value = '';
                }).catch(err => {
                    toast.error('خطا در آپلود تصویر');
                })

            } catch (e) {
                return Promise.reject('خطا در آپلود تصویر')
            }
        };

        const handleImageDelete = (index) => {
            const newImageArray = imageArray.filter((item, i) => i !== index);
            setImageArray(newImageArray);
            toast.success('تصویر با موفقیت حذف شد');
        };


        const classes = useStyle();

        const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
                            {/*<StyledOption value=""></StyledOption>*/}
                        </CustomSelect>
                    </div>
                    <Button onClick={e => handleModal(null, 'add')} className={classes.button} color="success"
                            variant="contained"> افزودن
                        کالا </Button>
                    <Modal sx={{overflow: 'auto'}}
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
                                    <Typography sx={{my: 1, mb: 4}} id="transition-modal-title" variant="h6" component="h3">
                                        {typeModal === 'add' ? ' افزودن ' : ' ویرایش '}کالا
                                    </Typography>
                                    <Button onClick={handleClose}> <HighlightOffTwoToneIcon/>
                                    </Button>
                                </Box>
                                <form onSubmit={handleUploadImage}>
                                    <FileInput label="تصویر کالا" name="image"/>
                                    <div style={{
                                        display: !!imageArray.length ? 'flex' : 'none',
                                        gap: '6px',
                                        flexWrap: 'wrap',
                                        margin: '.8rem 0'
                                    }}>
                                        {!!imageArray.length && imageArray.map((image, index) => (
                                            <figure onClick={e => handleImageDelete(index)}
                                                    className={styles.figure} key={index} style={{
                                                width: '50px!important',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                border: '2px solid #ccc',
                                                cursor: 'pointer',
                                            }}>
                                                <CardMedia sx={{width: '70px!important'}}
                                                           component="img"
                                                           height="auto"
                                                           image={`http://localhost:3002/files/${image}`}
                                                           alt="test"
                                                />
                                            </figure>
                                        ))}
                                    </div>
                                    <Button variant="contained" type="submit"
                                            sx={{
                                                width: {xs: '100%', sm: '40%'},
                                                display: 'block',
                                                margin: 'auto',
                                                my: 2
                                            }}> آپلود
                                        عکس </Button>
                                </form>
                                <form onSubmit={handleSubmit}
                                      style={{'display': 'flex', 'flexDirection': 'column', 'gap': '25px'}}>
                                    <TextField required={typeModal === 'add'} fullWidth label="نام کالا"
                                               id="fullWidth" name="firstName"
                                               value={editOrderName}
                                               onChange={e => setEditOrderName(e.target.value)}
                                    />
                                    <TextField required={typeModal === 'add'} type="number" fullWidth label="قیمت / تومان"
                                               id="fullWidth" name="price"
                                               placeholder={!!dataEdit && dataEdit.price}
                                               sx={{display: typeModal === 'add' ? 'block' : 'none'}}
                                    />
                                    <TextField required={typeModal === 'add'}
                                               fullWidth
                                               label="برند"
                                               id="fullWidth" name="brand"
                                               value={editOrderBrand}
                                               onChange={e => setEditOrderBrand(e.target.value)}
                                    />
                                    <TextField required={typeModal === 'add'}
                                               fullWidth
                                               label="تعداد"
                                               id="fullWidth" name="count"
                                               sx={{display: typeModal === 'add' ? 'block' : 'none'}}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel name="category" id="demo-simple-select-label">دسته بندی</InputLabel>
                                        <Select required={typeModal === 'add'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={grouping}
                                                label="دسته بندی"
                                                onChange={handleGrouping}
                                                name="category_name"
                                        >
                                            <MenuItem value="گوشی موبایل">گوشی موبایل</MenuItem>
                                            <MenuItem value="لپتاپ">لپتاپ</MenuItem>
                                            <MenuItem value="کامپیوتر همه کاره">کامپیوتر</MenuItem>
                                            <MenuItem value="هدفون">هدفون</MenuItem>
                                            <MenuItem value="ساعت هوشمند">ساعت هوشمند</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <label> توضیحات:
                                        <CKEditor
                                            editor={ClassicEditor}
                                            name="description"
                                            data={description}
                                            onChange={handleDescription}
                                            config={{language: 'fa'}}
                                        />
                                    </label>
                                    <Button sx={{
                                        width: {xs: '100%', sm: '50%'}, display: 'block', margin: 'auto'
                                    }} type="submit"
                                            variant="contained"> ذخیره < /Button>
                                </form>
                            </Box>
                        </Fade>
                    </Modal>
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
                                        <TableCell>
                                            <figure style={{'width': '60px', 'height': 'auto'}}>
                                                <img style={{'width': '100%'}}
                                                     src={`http://localhost:3002/files/${item.image[0]}`}
                                                     alt={`${item.id}${item.image[1]}`}/>
                                            </figure>
                                        </TableCell>
                                        <TableCell key={item.key}>
                                            <PersianNumber number={item.firstName}/>
                                        </TableCell>
                                        <TableCell key={item.key}>
                                            <PersianNumber number={item.category.name}/> /
                                            &nbsp;<PersianNumber number={item.brand}/>
                                        </TableCell>
                                        <TableCell key={item.key}>
                                            <Box sx={{display: 'flex', gap: '10px'}}>
                                                <Button onClick={e => handleModal(item.id, 'edit')} color="warning"
                                                        variant="contained"> ویرایش </Button>
                                                <Button onClick={e => handleOpenModalDelete(e, item.id)} color="error"
                                                        variant="contained"> حذف </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )) : skeletonCount.map((item, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell>
                                            <Skeleton animation="wave" variant="rect" width={60} height={60}/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation="wave" variant="rect" width={200}/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation="wave" variant="rect" width={200}/>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{display: 'flex', gap: '10px'}}>
                                                <Skeleton animation="wave" width={90} height={70}/>
                                                <Skeleton animation="wave" width={90} height={70}/>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    open={openModalDelete}
                    onClose={handleCloseModalDelete}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModalDelete}>
                        <Box sx={style}>
                            <Typography sx={{textAlign: 'center'}} id="spring-modal-title" variant="h6"
                                        component="h2"> آیا
                                از حذف کردن کالا
                                مطمئنید؟ </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                                <Button onClick={handleDeleteOrder} sx={{width: '100px'}} color="success"
                                        variant="contained"> بله </Button>
                                <Button onClick={handleCloseModalDelete} sx={{width: '100px'}}
                                        variant="contained"> خیر </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
                <AppPagination setPage={setPage} pageNumber={numberOfPages}/>
            </>
        );
    }
;


const mapDispatchToProps = (dispatch) => {
        return {
            getProducts: () => dispatch(getProduct()),
        }
    }
;

const OrdersManager = connect(undefined, mapDispatchToProps)(OrdersManage);
export {OrdersManager};
