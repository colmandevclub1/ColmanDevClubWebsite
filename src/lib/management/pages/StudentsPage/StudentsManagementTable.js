import React from 'react';
import ControlTable from '../../../../ui/ControlTable/ControlTable';
import { Box, Stack, Typography } from '@mui/material';

const presenceColorsMap = {
  missed: '#FF7675',
  approved: '#FE9210',
  arrived: '#36B176',
};

const tasksColorsMap = {
  didNotSubmit: '#FF7675',
  approved: '#FE9210',
  completed: '#36B176',
  waitForPR: '#2382DB',
};

const columnColorsMap = {
  tasks: tasksColorsMap,
  presence: presenceColorsMap,
};

const totalColCriteria = {
  tasks: 'didNotSubmit',
  presence: 'missed',
};

const totalRowCriteria = {
  tasks: 'completed',
  presence: 'arrived',
};

const StudentsManagementTable = ({ data }) => {
  return (
    <Stack gap={2} height={'90%'}>
      <Typography variant="h4">Students Management Table</Typography>
      <Box flex={1} overflow={'auto'}>
        <ControlTable
          data={data}
          columnColorsMap={columnColorsMap}
          totalColCriteria={totalColCriteria}
          totalRowCriteria={totalRowCriteria}
        />
      </Box>
    </Stack>
  );
};

export default StudentsManagementTable;
