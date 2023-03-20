import './style.css';
import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

function ViewFieldComp(props) {
    return (
        <Grid container alignItems={'center'} className='field'>
            <Grid item xs={6}><div className='field-title'>{props.title}</div></Grid>
            <Grid item xs={6}>
                    <div 
                        className='field-value' 
                        onClick={() => (props.onClick ? props.onClick() : console.log(''))}
                    >
                        {props.children ? props.children : <CircularProgress color='info' size={15}/>}
                    </div>
            </Grid>
        </Grid>
    );
}

export default ViewFieldComp;