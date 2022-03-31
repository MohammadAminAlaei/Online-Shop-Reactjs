import React, {Component, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import Box from '@mui/material/Box';
import {Button, Skeleton, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import http from 'services/http.service';
import {PRODUCTS} from '../../configs/url.config';
import Grid from '@mui/material/Grid';
import {AppPagination, CardComponent} from 'components';
import {Link} from 'react-router-dom';
import {PATHS} from '../../configs/routes.config';
import PropTypes from 'prop-types';
import SelectUnstyled, {selectUnstyledClasses} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {optionUnstyledClasses} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import {styled} from '@mui/system';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledButton = styled('button')(
    ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 220px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
    ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 285px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
    ({theme}) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
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

const useStyle = makeStyles(theme => ({
    sideBar: {
        position: 'fixed',
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
        minHeight: '100vh',
        backgroundColor: '#eef3fe',
        borderLeft: '1px solid #e0e0e0',
        justifyContent: 'flex-start',
        textAlign: 'right',
        zIndex: 99,
        direction: 'ltr',
        [theme.breakpoints.down('sm')]: {
            maxHeight: 'max-content!important',
        }
    },
    sidebarButton: {
        lineHeight: '2rem!important',
        fontSize: '1rem!important',
        direction: 'rtl',
    },
    orderBox: {
        marginTop: '-20px'
    },
    menuIcon: {
        cursor: 'pointer',
        fontSize: '2rem!important',
    },
    sidebarIcon: {
        display: 'block',
        textAlign: 'left',
        margin: '9px 0 -12px 0',
    }

}));

const ProductsList = () => {

    const {group} = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [filter, setFilter] = useState('');
    const [background, setBackground] = useState('گوشی موبایل');
    const [menuIcon, setMenuIcon] = useState(false);

    const location = useLocation()
    console.log(location);

    useEffect(() => {
        http.get(`${PRODUCTS}?category.name=${group}${filter !== '' ? `&brand=${filter}` : ''}&_page=${page}&_limit=10`).then(res => {
            setData(res.data);
            setNumberOfPages(Math.ceil(res.data.length / 10));
        })
    }, [group, filter]);

    const handlePurchase = (e, id) => {
        navigate(`/purchase/${id}`);
    }

    const handleCategory = (category) => {
        navigate(`/product-list/${category}`);
        setBackground(category);
    }

    const classes = useStyle()

    return (
        <>
            <Helmet>
                <title>فروشگاه مکتب | لیست محصولات </title>
            </Helmet>
            <Box className={classes.orderBox}>
                <Box className={classes.sideBar} sx={{display: menuIcon ? 'flex' : 'none'}}>
                    <CloseOutlinedIcon color="error" onClick={e => setMenuIcon(!menuIcon)}
                                       className={`${classes.menuIcon} ${classes.sidebarIcon}`}/>
                    <Button style={{background: background === 'گوشی موبایل' ? '#cdc7ff7a' : 'transparent'}}
                            className={classes.sidebarButton}
                            onClick={e => handleCategory('گوشی موبایل')}
                            sx={{marginTop: '20px', justifyContent: 'flex-start'}}> کالاهای گروه گوشی موبایل </Button>
                    <Button style={{background: background === 'لپتاپ' ? '#cdc7ff7a' : 'transparent'}}
                            className={classes.sidebarButton} onClick={e => handleCategory('لپتاپ')}
                            sx={{justifyContent: 'flex-start'}}> کالاهای
                        گروه لپتاپ </Button>
                    <Button style={{background: background === 'کامپیوتر همه کاره' ? '#cdc7ff7a' : 'transparent'}}
                            className={classes.sidebarButton} onClick={e => handleCategory('کامپیوتر همه کاره')}
                            sx={{justifyContent: 'flex-start'}}> کالاهای
                        گروه کامپیوتر همه کاره </Button>
                    <Button style={{background: background === 'هدفون بی سیم' ? '#cdc7ff7a' : 'transparent'}}
                            className={classes.sidebarButton} onClick={e => handleCategory('هدفون بی سیم')}
                            sx={{justifyContent: 'flex-start'}}> کالاهای
                        گروه هدفون </Button>
                    <Typography sx={{fontSize: '.9rem', marginTop: '8px', padding: '0 .6rem'}}> فیلتر بر
                        اساس: </Typography>
                    <CustomSelect value={filter} onChange={setFilter}>
                        <StyledOption value="">هیچ چیز</StyledOption>
                        <StyledOption value="اپل">اپل</StyledOption>
                        <StyledOption value="شیائومی">شیائومی</StyledOption>
                        <StyledOption value="مودیو">مودیو</StyledOption>
                        <StyledOption value="سامسونگ">سامسونگ</StyledOption>
                        <StyledOption value="هایلو">هایلو</StyledOption>
                        <StyledOption value="ام اس آی ">ام اس آی</StyledOption>
                        <StyledOption value="اچ پی">اچ پی</StyledOption>
                        <StyledOption value="یونیو">یونیو</StyledOption>
                        <StyledOption value="لنوو">لنوو</StyledOption>
                        <StyledOption value="کرون">کرون</StyledOption>
                    </CustomSelect>
                </Box>
                <Box sx={{paddingTop: '20px'}}>
                    {
                        !menuIcon ? (
                            <MenuOutlinedIcon color="primary" onClick={e => setMenuIcon(!menuIcon)}
                                              className={classes.menuIcon}/>
                        ) : (
                            <CloseOutlinedIcon color="error" onClick={e => setMenuIcon(!menuIcon)}
                                               className={classes.menuIcon}/>
                        )
                    }
                    <Typography variant="h5" sx={{my: 3}}> کالاهای گروه {group}</Typography>
                    <Grid container spacing={{xs: 2, md: 4}}
                          columns={{xs: 12, sm: 8, md: 12}}>
                        {!!data.length ? data.map(item => (
                                <Grid item xs={12} sm={4} md={4} key={item.id}>
                                    <CardComponent
                                        img={item.image[0]}
                                        price={item.price} firstName={item.firstName} brand={item.brand}
                                        description={item.description}
                                        onClick={e => handlePurchase(e, item.id)}
                                    />
                                </Grid>
                            )) :
                            (
                                <Typography sx={{padding: '1.7rem', marginTop: '20px', fontFamily: 'Vazir-bold'}}
                                            variant="h5"> کالاهای مورد
                                    نظر ناموجود
                                    است </Typography>
                            )
                        }
                    </Grid>
                </Box>
            </Box>
            <AppPagination setPage={setPage} pageNumber={numberOfPages}/>
        </>
    );
}

export {ProductsList};