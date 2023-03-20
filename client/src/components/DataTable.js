import React from 'react';
import Box from '@mui/material/Box';
import {    
            DataGrid, 
            heIL,
            gridPageCountSelector,
            gridPageSelector,
            useGridApiContext,
            useGridSelector, 
            GridToolbar,
        } from '@mui/x-data-grid';
        import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(heIL);

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    
    return (
        <div style={{direction : 'ltr'}}>
            <Pagination
                siblingCount={0}
                color="primary"
                variant="outlined" 
                count={pageCount}
                page={page + 1}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        </div>
    );
}

export default function DataTable(props) {
    return (
        <Box sx={{ height: props.height || '65vh', width: '100%'}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    sx={{ backgroundColor : '#f9f9f9' }}
                    // autoHeight // prevent overflow
                    {...props}
                    components={{
                            Toolbar : GridToolbar,
                            Pagination: CustomPagination,
                    }}
                />
            </ThemeProvider>
        </Box>
    );
}
