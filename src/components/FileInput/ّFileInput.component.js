import {useRef, useState} from 'react';
import {useTheme} from '@emotion/react';
import Box from '@mui/material/Box';
import {ButtonBase, TextField} from '@mui/material';
import {makeStyles} from '@mui/styles';


const FileInput = ({label, onChange, error, name}) => {
    const ref = useRef();
    const theme = useTheme();
    const classes = useStyles();
    const [attachment, setAttachment] = useState(null);

    const handleChange = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        setAttachment(file);
        if (!!onChange) onChange({target: {value: file}});
    };

    return (
        <Box sx={{border: '1px solid #ccc'}}
             position="relative"
             height={98}
             color={
                 !!error ? theme.palette.error.main : theme.palette.background.paper
             }
             borderBottom={4}
        >
            <Box position="absolute" top={0} bottom={0} left={0} right={0} mx={2}>
                <TextField
                    variant="standard"
                    className={classes.field}
                    InputProps={{disableUnderline: true}}
                    margin="normal"
                    fullWidth
                    disabled
                    label={label}
                    value={attachment?.name || ''}
                    error={!!error}
                    helperText={error?.message || ' '}
                />
            </Box>
            <ButtonBase
                className={classes.button}
                component="label"
                onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
            >
                <input
                    ref={ref}
                    type="file"
                    accept="image/jpeg"
                    hidden
                    onChange={handleChange}
                    max-size="2000"
                    name={name}
                />
            </ButtonBase>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    field: {
        '& .MuiFormLabel-root.Mui-disabled': {
            color: theme.palette.text.secondary
        }
    },
    button: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    }
}));

export {FileInput};
