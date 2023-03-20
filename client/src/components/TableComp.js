import React from 'react';
// import utils from '../generalUtils';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import {TableRow, CircularProgress} from '@mui/material';
import { Paper, Container, IconButton, Tooltip} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Table, TableBody, TableContainer, TableHead} from '@mui/material';

// Icons
import CallMadeIcon from '@mui/icons-material/CallMade';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';


// Modals
// import AudioModal from './modals/AudioModal';
// import DeleteModal from './modals/DeleteModal';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));

// vars :

// maxWidth, style, tableSize, headers, data(rows content)

function TableTamplateComp(props) {

    let style = props.style ; // table style json
    let maxContainerWidth = props.maxContainerWidth; // 'md' etc. 
    let tableSize = props.tableSize; // string : 'small', etc.
    let headers = props.headers; // an arry that contains the headers title
    let data = props.data; // rows data


    const makeRow = (data) => { // the func gets a json and return a list if table cells
        let fields = props.fields; // we get a list of cells in row from parent
        // let callbacks = props.callbacks; // a json of callBacks (mainly use in modals)
        let row = fields.map((field, index)=>{
            if (field?.type === 'audio'){
                // get a proper unifiy rec link
                let playRec = null //<AudioModal src={data[field]}/>

                return <StyledTableCell key={index} align="center">{playRec}</StyledTableCell>
            } else if (field?.type === 'transcript'){
                let transcriptBtn = null // <TranscriptModal content={data[field]}/>
                return <StyledTableCell key={index} align="center">{transcriptBtn}</StyledTableCell>

            } else if (field?.type === 'delete'){
                let deleteBtn = null //<DeleteModal data={data} delete={callbacks?.delete}/>
                return <StyledTableCell key={index} align="center">{deleteBtn}</StyledTableCell>
            } else if (field?.type === 'edit'){
                let editBtn = null // add edit modal btn (or link to edit view)
                return <StyledTableCell key={index} align="center">{editBtn}</StyledTableCell>
            } else if (field?.type === 'call-direction'){
                let direction = (data[field] === "inbound") ? (
                    <Tooltip title = "נכנסת" arrow>
                        <PhoneCallbackIcon style={{fill : '#228B22'}}/>
                </Tooltip>
                ) : (
                    <Tooltip title = "יוצאת" arrow>
                        <CallMadeIcon style={{fill : 'black'}}/>
                    </Tooltip>
                )

                return <StyledTableCell key={index} align="center">{direction}</StyledTableCell>
            } else if (field?.type === 'duration'){
                return <StyledTableCell key={index} align="center">{utils.convetSecToTime(data[field?.value])}</StyledTableCell>
            } else if (field?.type === 'datetime'){
                let date =  utils.getDateTime(data[field?.value])
                return <StyledTableCell key={index} align="center">{date}</StyledTableCell>
            } else if (field?.type === 'link'){
                let path = field?.getPath(data)
                return <StyledTableCell key={index} align="center">
                    <Tooltip arrow title={field?.tooltip}>
                        <Link 
                            to={{
                                pathname : path,
                                state : {lastPageQuery : field?.lastPageQuery}
                            }}
                            className='link-route-btn'
                        >
                            {data[field?.value]}
                        </Link>
                    </Tooltip>
                </StyledTableCell>
            } else {
                return <StyledTableCell key={index} align="center">{data[field]}</StyledTableCell>
            }
        })
        return row
    }

    let loadingTable = (
        <Paper elevation={7} style ={{'padding' : '10px', 'textAlign' : 'center'}}>
            <h4>טוען טבלה, אנא המתן</h4>
            <CircularProgress color="inherit" />
            <br/>
        </Paper>
    )

    let emptyTable = (
        <Paper elevation={7} style ={{'padding' : '10px', 'textAlign' : 'center'}}>
            <h4>הטבלה ריקה</h4>
        </Paper>
    )

    let table = (
        <div>
            <TableContainer component={Paper} style={style}>
                <Table size = {tableSize} stickyHeader sx={{ minWidth: props.minTableWidth ? props.minTableWidth : 700 }}>
                    <TableHead>
                        <TableRow>
                            {
                                headers.map( // creates table headers
                                    (item, index) => { 
                                        // item can be either a string (the title) or json that 
                                        // contains title and onClick function
                                        let title = item; // we asume that the item is a string
                                        let handleClick = null;
                                        let style = {};

                                        if(typeof(item) === 'object'){ // if item is a json we make a clickable header
                                            title = item.title;
                                            handleClick = item.handleClick;
                                            style = {'cursor' : 'pointer'}
                                        }

                                        return <StyledTableCell style={style} key={index} onClick={handleClick} align="center">
                                                    <b>{title}</b>
                                                </StyledTableCell>
                                    }
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data ? data?.map((row, index) => {
                        return (
                            <StyledTableRow key={index}>
                                {makeRow(row)}
                            </StyledTableRow>
                        )
                    }) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {!data ? loadingTable : null} {/* if data = null we show loading component */}
            {data ? data.length === 0 ? emptyTable : null : null} {/* if data != null and data == [] show empty table else null*/}
        </div>
    )


    return (
        <div style={{minHeight : props.divHeight}}> {/* we set size of table div */}
            {maxContainerWidth ? ( // if have max Container width, it will automaticly enter the table into a container
                <Container maxWidth={maxContainerWidth}>
                    {table}
                </Container>
                ) : (
                    table
            )}
        </div>
    );
}

export default TableTamplateComp;