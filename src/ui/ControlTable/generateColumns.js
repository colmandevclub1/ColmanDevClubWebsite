import React from 'react';
import MainColumnItem from './MainColumnItem';

const TotalRowComponent = ({ data }) => {
  return (
    <div>
      <strong>Total Count: {data.totalCount}</strong>
    </div>
  );
};

export const generateColumns = (data, totalColCriteria) => {
  const firstRow = data[0];
  const mainColumnKey = Object.keys(firstRow)[0];

  const mainColumn = {
    field: mainColumnKey,
    headerName: mainColumnKey,
    width: 250,
    renderCell: (row) => {
      const mainColumnData = row[mainColumnKey];
      if (row.id === 'total') {
        return <TotalRowComponent data={mainColumnData} />;
      } else {
        return <MainColumnItem data={mainColumnData} />;
      }
    },
  };

  const columns = [mainColumn];

  Object.keys(firstRow).forEach((key) => {
    if (key !== mainColumnKey) {
      const subColumnsData = firstRow[key];
      if (typeof subColumnsData === 'object') {
        const subColumns = Object.keys(subColumnsData).map((subKey) => ({
          field: `${key}_${subKey}`,
          headerName: subKey,
          width: 60,
          type: subKey,
          id:''
        }));
        columns.push({
          headerName: key,
          subColumns: subColumns,
          width: subColumns.reduce((sum, subCol) => sum + subCol.width, 0),
          id:''
        });
      } else {
        columns.push({
          field: key,
          headerName: key,
          width: 80,
          type: key,
          id:''
        });
      }
    }
  });

  const totalColumn = {
    headerName: 'Total',
    subColumns: Object.entries(totalColCriteria).map(([key]) => ({
      field: `total_${key}`,
      headerName: `Total ${key}`,
      width: 80,
    })),
    width: Object.keys(totalColCriteria).length * 150,
  };

  columns.push(totalColumn);

  return columns;
};
