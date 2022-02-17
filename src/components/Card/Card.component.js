import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles';
import styles from './Card.module.scss';

const useStyle = makeStyles(theme => ({
    mainCard: {
        width: '100%',
        cursor: 'pointer',
        transition: 'all ease-in-out .3s!important',
        '&:hover': {
            transform: 'translateY(-10px) scale(1.05)'
        }
    },
    figure: {
        '&:hover:after': {
            content: 'مشاهده بیشتر',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
        }
    }
}));


const CardComponent = ({img, firstName, price, brand, description}) => {

    const classes = useStyle()

    const handleClick = e => {
        e.stopPropagation();
        alert('Clicked');
    }

    return (
        <Card onClick={e => alert('salam')} className={classes.mainCard}>
            <figure className={styles.figure} onClick={e => handleClick(e)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={brand}
                />
            </figure>
            <CardContent>
                <Typography sx={{padding: '.2rem 0 1rem 0'}} gutterBottom variant="h6" component="div">
                    {brand} - {firstName}
                </Typography>
                <Typography variant="body" color="text.secondary">
                    {price} تومان {description && <br/>}
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export {CardComponent}