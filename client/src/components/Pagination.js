import React,{useState,useEffect} from 'react';
import {Pagination, Paper} from '@mui/material';

function PaginateionComp(props) {
    let count = props.count;
    const [pageNumber,setPageNumber] = useState(props.page);

    useEffect(()=>{
        setPageNumber(props.page)
    },[props.page])


    const handleChange = props.handleChange;
    return (
    <Paper style={{justifyContent:"center",display:'flex',marginBottom: 'auto' ,padding : '2px', direction : 'ltr'}}>
        <Pagination color="primary" count={count} page={pageNumber} onChange={handleChange} showFirstButton showLastButton/>
    </Paper>
    );
}

export default PaginateionComp;