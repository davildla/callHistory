import React, { useState, useEffect } from 'react';
import SimpleTableComp from '../../components/SimpleTableComp';
import PaginateionComp from '../../components/Pagination';
import { getCallsHistory } from './utils';
import { TextField, Button, Grid } from '@mui/material';

function CallsHistory() {
    const [calls, setCalls] = useState([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            setLoading(true);
            return await getCallsHistory(pageNumber, search);
        };

        getData().then(
            data => {
                if (isMounted) {
                    setLoading(false);
                    setCalls(data.results);
                    setTotalPageCount(data.total);
                }
            }
        );
        return () => { isMounted = false };
    }, [pageNumber, search]);

    const columns = [
        {
            accessor: 'date',
            header: 'תאריך',
            width: '130px',
        },
        {
            accessor: 'from',
            header: 'מאת',
            width: '130px',
        },
        {
            accessor: 'to',
            header: 'עבור',
            width: '130px',
        },
        {
            accessor: 'direction',
            header: 'כיוון שיחה',
            width: '50px',
        },

    ]

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    const handleSearch = () => {
        setSearch(input);
    }

    return (
        <div>
            <br/>
            <Grid container spacing={2} alignItems='center'>

                <Grid item xs={12} sm={10}>
                    <TextField
                        fullWidth
                        value={input}
                        placeholder='חיפוש...'
                        onChange={e => setInput(e.target.value)}
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
                rows={calls}
            />
            <br />
            <PaginateionComp count={totalPageCount} page={pageNumber} handleChange={handlePageChange} />
        </div>
    );
}

export default CallsHistory;