// ControlTable.js
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, Paper } from '@mui/material';
import { generateRows } from './generateRows';
import { generateColumns } from './generateColumns';
import TableHeader from './TableHeader.js';
import TableBodyContent from './TableBodyContent.js';

const ControlTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (Array.isArray(props.data) && props.data.length > 0) {
      const newColumns = generateColumns(props.data, props.totalColCriteria, props.totalRowCriteria);
      const newRows = generateRows(props.data, props.totalColCriteria, props.totalRowCriteria);
      setColumns(newColumns);
      setRows(newRows);
    }
  }, [props.data]);

  const totalWidth = columns.reduce((sum, column) => sum + column.width + 20, 0);

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#121231', width: `${totalWidth}px`,height:'80vh' }}>
      <Table sx={{tableLayout: 'fixed',borderCollapse: 'separate',borderSpacing: '3px'}}>
        <TableHead>
          <TableHeader columns={columns} />
        </TableHead>
        <TableBody>
          <TableBodyContent rows={rows} columns={columns} columnColorsMap={props.columnColorsMap} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ControlTable;
