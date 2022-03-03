import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {makeStyles} from '@mui/styles';
import {PersianNumber} from 'components';

const useStyle = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: '0',
        zIndex: '200',
        backgroundColor: '#dadada',
        padding: '10px 80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        color: 'white',
        width: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    }
}));

const arabicNumbers = '۰۱۲۳۴۵۶۷۸۹'

function convertNumberToLetter(num) {
    let result = ''
    const str = num.toString();
    for (let c of str) {
        result += arabicNumbers.charAt(c)
    }
    return result
}

function itemRender(current, type, originalElement) {
    if (type === 'page') {
        return <a>{convertNumberToLetter(current)}</a>;
    }
    return originalElement;
}


const AppPagination = ({setPage, pageNumber}) => {
    const classes = useStyle();

    const handleChange = page => {
        setPage(page);
        window.scrollTo(0, 0);
        console.log(page);
    };

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Stack>
                    <Pagination itemRender={itemRender}
                                onChange={e => handleChange(e.target.textContent)}
                                count={pageNumber}
                                showFirstButton
                                showLastButton/>
                </Stack>
            </div>
        </div>
    );
}


export {AppPagination};
