import React from 'react';
import ControlTable from '../../../../ui/ControlTable/ControlTable'; 

const StudentsManagementTable = ( {data}) => {

  const presenceColorsMap = {
    missed: '#FF7675',
    approved: '#FE9210',
    arrived: '#36B176',
};

const tasksColorsMap = {
    didNotSubmit: '#FF7675',
    approved: '#FE9210',
    completed: '#36B176',
    waitForPR: '#2382DB'
};

const columnColorsMap = {
    tasks: tasksColorsMap,
    presence: presenceColorsMap
};

const totalColCriteria = {
  tasks: 'didNotSubmit',
  presence: 'missed',
};
const totalRowCriteria = {
  tasks: 'completed',
  presence: 'arrived',
};
  return (
    <div style={{ padding: '20px' }}>
      <h1>Management Table</h1>
      <ControlTable data={data} columnColorsMap={columnColorsMap} totalColCriteria={totalColCriteria}  totalRowCriteria={totalRowCriteria}/>
    </div>
  );
};

export default StudentsManagementTable;
