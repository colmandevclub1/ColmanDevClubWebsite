import React, {useState,useEffect} from 'react';
import ControlTable from '../../../../ui/ControlTable/ControlTable';
import { Box, Stack, Typography } from '@mui/material';
import { userStatusService } from 'src/services/userStatusData.service';
import { userWeekStatsService } from 'src/services/userWeekStats.service';     
import { toast } from 'react-toastify';

const defaultProgram = 'F8YNTTQXhB1nUxfcFgxG'

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

const convertToControlTableStructure = (data) => {
  return data.map(member => {
    const person = {
      title: `${member.user.first_name} ${member.user.last_name}`,
      subtitle: 'Student', 
      details: 'Student details can be added here.',
      img: member.user.profile_photo || '',
    };

    const weekData = {};
    member.weeks.forEach((week, index) => {
      weekData[`week${index + 1}`] = {
        tasks: week.project_status,
        presence: week.presnce_status,
      };
    });

    return {
      person,
      ...weekData,
    };
  });
};




const StudentsManagementTable = ({ }) => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await userStatusService.getAllByProgram(defaultProgram);
      const formattedData = convertToControlTableStructure(data);

      setStudentsData(formattedData);
    };
    fetchData();
  }, []);

const onChangeHandler = async ( statsId, statusKey, statusValue ) => {
  try {
    const updatedStats = {
      [statusKey]: statusValue,
      updated_at: new Date(),
    };
    await userWeekStatsService.update(statsId, updatedStats);

    setStudentsData((prevData) =>
      prevData.map((member) => {
        const updatedMember = { ...member };

        Object.keys(updatedMember).forEach((key) => {
          if (key !== 'member') {
            const weekData = updatedMember[key];

            if (weekData && weekData.id === statsId) {
              updatedMember[key] = {
                ...weekData,
                [statusKey]: statusValue, 
              };
            }
          }
        });

        return updatedMember;
      })
    );
  } catch (error) {
    console.error('Error updating stats:', error);
    toast.error('Failed to update stats');
  }
};


  return (
    <Stack gap={2} height={'90%'}>
      <Typography variant="h4">Students Management Table</Typography>
      <Box flex={1} overflow={'auto'}>
        <ControlTable
          data={studentsData}
          columnColorsMap={columnColorsMap}
          totalColCriteria={totalColCriteria}
          totalRowCriteria={totalRowCriteria}
          onChangeHandler={onChangeHandler}
        />
      </Box>
    </Stack>
  );
};

export default StudentsManagementTable;
