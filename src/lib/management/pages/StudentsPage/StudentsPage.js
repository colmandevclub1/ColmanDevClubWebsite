import React from 'react';
import ManagementTablePage from './StudentsManagementTable';

const StudentsPage = () => {
  
  const studentsData = [
  {
    person: {
      title: 'Bob',
      subtitle: 'Grade 10',
      details: 'High achiever in mathematics',
      img: '',
    },
    week1: {
      tasks: 'didNotSubmit',
      presence: 'missed',
    },
    week2: {
      tasks: 'approved',
      presence: 'missed',
    },
    week3: {
      tasks: 'completed',
      presence: 'missed',
    },
  },
  {
    person: {
      title: 'Alice',
      subtitle: 'Grade 11',
      details: 'Science enthusiast',
      img: 'https://example.com/.jpg',
    },
    week1: {
      tasks: 'waitForPR',
      presence: 'approved',
    },
    week2: {
      tasks: 'completed',
      presence: 'missed',
    },
    week3: {
      tasks: 'didNotSubmit',
      presence: 'arrived',
    },
  },
];

  return (
    <div>
      <h1>Students Table</h1>
      <ManagementTablePage data={studentsData} />
    </div>
  );
};

export default StudentsPage;

