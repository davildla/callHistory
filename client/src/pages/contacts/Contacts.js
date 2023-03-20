import React, { useState, useEffect } from 'react';
import SimpleTableComp from '../../components/SimpleTableComp';
import PaginateionComp from '../../components/Pagination';
import { TextField, Button, Grid } from '@mui/material';
import AddContactModal from '../../modals/AddContactModal';
import EditUser from '../../modals/EditUser';
import { getContacts } from './utils';

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            setLoading(true);
            return await getContacts(pageNumber, search);
        };

        getData().then(
            data => {
                if (isMounted) {
                    setLoading(false);
                    setContacts(data.results);
                    setTotalPageCount(data.total);
                }
            }
        );
        return () => { isMounted = false };
    }, [pageNumber, search]);

    const columns = [
        {
            accessor: 'name',
            header: 'שם מלא',
            width: '130px',
        },
        {
            accessor: 'phoneNumber',
            header: 'מספר טלפון',
            width: '130px',
        },
        {
            accessor: '_id',
            header: '',
            width: '130px',
            renderCell: (row) => {
                return <EditUser data={row}/>
            }
        },
    ]

    const handleSearch = () => {
        setSearch(input);
    }

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    return (
        <div>
            <br />
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={10}>
                    <TextField
                        fullWidth
                        value={input}
                        placeholder='חיפוש...'
                        onChange={ e => setInput(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        variant='outlined'
                        size='large'
                        fullWidth
                        onClick={handleSearch}
                    >
                        חיפוש
                    </Button>
                </Grid>

            </Grid>
            <br />
            <SimpleTableComp
                loading={loading}
                columns={columns}
                rows={contacts}
            />
            <br />
            <PaginateionComp count={totalPageCount} page={pageNumber} handleChange={handlePageChange} />

            <br/>
            <AddContactModal/>

        </div>
    );
}

export default Contacts;