import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const SimpleTableComp = ({ columns = [], rows = [], maxLines = 8, showSelection = false, selectState, loading }) => {
    const [allRowsSelected, setAllRowsSelected] = useState(false);
    const [selectedRows, setSelectedRows] = selectState || [null, () => { }];

    // Use useEffect hook to update allRowsSelected when selectedRows changes
    useEffect(() => {
        setAllRowsSelected((selectedRows?.length === rows?.length) && (selectedRows?.length !== 0));
    }, [selectedRows, rows]);

    const handleCheckboxChange = (row) => {
        if (selectedRows?.includes(row)) {
            setSelectedRows(selectedRows => {
                let res = selectedRows.filter(r => r !== row);
                return res;
            });
        } else {
            setSelectedRows(selectedRows => {
                let res = [...selectedRows, row];
                return res;
            });
        }
        setAllRowsSelected(selectedRows.length === rows.length);
    };

    const handleSelectAllChange = (event) => {
        setSelectedRows(event.target.checked ? rows : []);
        setAllRowsSelected(event.target.checked);
    };

    const overflowStyle = maxLines > 0 ? {
        overflowY: 'scroll',
        minHeight: `${57 + (maxLines * 53.02)}px`,
        maxHeight: showSelection ? `${57 + ((maxLines - 1) * 54.02)}px` : `${57 + (maxLines * 53.02)}px`,
    } : {}; // 50px is an estimate of the row height

    return (
        <Paper style={overflowStyle}>
            <Table>
                <TableHead style={{ position: 'sticky', top: '0', backgroundColor: 'white' }}>
                    <TableRow>
                        {showSelection &&
                            <TableCell align="center">
                                <input
                                    type="checkbox"
                                    checked={allRowsSelected}
                                    onChange={handleSelectAllChange}
                                />
                            </TableCell>
                        }
                        {columns.map(column => (
                            <TableCell key={column.accessor} >
                                <b>{column.header}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={showSelection ? columns.length + 1 : columns.length}
                                rowSpan={maxLines}
                                align="center"
                            >
                                <CircularProgress style={{ position: 'relative', top: `${((maxLines - 1) / 2) * 53.02}px` }} />
                            </TableCell>
                        </TableRow>
                    ) : rows.length > 0 ? (
                        rows.map((row, index) => (
                            <TableRow key={index}>
                                {showSelection &&
                                    <TableCell align="center">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows?.includes(row)}
                                            onChange={() => handleCheckboxChange(row)}
                                        />
                                    </TableCell>
                                }
                                {columns.map(column => {
                                    let value = row;
                                    column.accessor.split('.').forEach(prop => {
                                        value = value[prop];
                                    });
                                    return (
                                        <TableCell key={column.accessor} style={{ minWidth: column.width || '100px' }}>
                                            {column.renderCell ? <>{column.renderCell(row)}</> : <>{value}</>}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell rowSpan={maxLines} colSpan={showSelection ? columns.length + 1 : columns.length} align="center">
                                <h3 style={{ position: 'relative', top: `${((maxLines) / 3) * 53.02}px` }}>
                                    הטבלה ריקה
                                </h3>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default SimpleTableComp;
