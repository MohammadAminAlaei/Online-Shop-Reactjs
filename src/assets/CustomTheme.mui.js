import {createTheme} from '@mui/material';
import {faIR} from '@mui/material/locale';
import {DataGrid, FaIR} from '@mui/x-data-grid';


export const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Vazir-Regular',
        format: (value) => value.toLocaleString('fa-IR'),
    },

    format: (value) => value.toLocaleString('fa-IR'),
}, faIR);

