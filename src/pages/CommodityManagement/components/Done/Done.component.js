import React from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const useStyle = makeStyles(theme => ({
    box: {
        marginTop: '90px',
        marginBottom: '3.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            marginTop: '140px',
        }, [theme.breakpoints.down('sm')]: {
            marginTop: '180px',
        },
    },
    title: {
        fontSize: '1.8rem!important',
        fontFamily: 'Vazir-Bold!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.3rem!important'
        },
    },
    button: {
        padding: '1rem 3rem!important',
        fontSize: '1rem!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '.8rem!important',
            padding: '.8rem 2.4rem!important',
        },
    }
}));


const columns = [
    {id: 'image', label: 'نام کاربر', minWidth: 170},
    {id: 'code', label: 'مجموع مبلغ', minWidth: 100},
    {
        id: 'population',
        label: 'زمان ثبت سفارش',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('fa-IR'),
        onclick: (e) => alert('hello'),
        cursor: 'pointer',
    },
    {
        id: 'size',
        label: 'بررسی',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('fa-IR'),
    }
];

function createData(image, code, population, size) {
    const density = population / size;
    return {image, code, population, size, density};
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];


const Done = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const classes = useStyle();


    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell sx={{fontSize: '1.1rem', cursor: column.cursor}}
                                           key={column.id}
                                           align={column.align}
                                           style={{minWidth: column.minWidth}}
                                           onClick={column.onclick}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id}
                                                           align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value) :
                                                        column.id === 'image' ?
                                                            <img src={value} alt={value}/> : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export {Done}