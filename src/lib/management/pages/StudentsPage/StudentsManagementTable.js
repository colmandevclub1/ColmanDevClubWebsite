import React, { useState, useEffect } from 'react';
import ControlTable from '../../../../ui/ControlTable/ControlTable';
import { Box, Stack, Typography, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { userStatusService } from 'src/services/userStatusData.service';
import { userWeekStatsService } from 'src/services/userWeekStats.service';
import { ProgramService } from 'src/services/program.service';
import { weekService } from 'src/services/week.service';
import { toast } from 'react-toastify';
import EditWeekDialog from './EditWeekDialog';
import AddMemberDialog from './AddMemberDialog';

const defaultProgram = 'F8YNTTQXhB1nUxfcFgxG';

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

const titlesMap = {
  tasks: 'project_status',
  presence: 'presnce_status',
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
      weekData[`${week.title}`] = {
        tasks: week.project_status,
        presence: week.presnce_status,
        id: week.id,
        column_id: week.weekRef,
      };
    });

    return {
      person,
      ...weekData,
    };
  });
};

const StudentsManagementTable = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [openWeekModal, setOpenWeekModal] = useState(false);
  const [editingWeekId, setEditingWeekId] = useState(null); 
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(defaultProgram); 
  const [newWeek, setNewWeek] = useState({
    title: '',
    subject: '',
    presantaion_links: '',
    youtube_links: '',
    project_link: '',
    exercise_link: '',
    other_links: '',
    is_visible: true,
  });

  const fetchData = async (programRef) => {
    const data = await userStatusService.getAllByProgram(programRef);
    const formattedData = convertToControlTableStructure(data);
    setStudentsData(formattedData);
  };

  const fetchPrograms = async () => {
    const programsData = await ProgramService.getAll(); 
    setPrograms(programsData); 
  };

  useEffect(() => {
    fetchPrograms();
    fetchData(selectedProgram);
  }, []);

  const onChangeHandler = async (statsId, statusKey, statusValue) => {
    try {
      const updatedStats = {
        [titlesMap[statusKey]]: statusValue,
      };
      await userWeekStatsService.update(statsId, updatedStats);
  
      setStudentsData((prevData) =>
        prevData.map((member) => {
          const updatedMember = { ...member };
  
          Object.keys(updatedMember).forEach((key) => {
            if (key !== 'person') {
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



  const handleCloseWeekModal = () => {
    setOpenWeekModal(false);
    setNewWeek({
      title: '',
      subject: '',
      presantaion_links: '',
      youtube_links: '',
      project_link: '',
      exercise_link: '',
      other_links: '',
      is_visible: true,
    });
  };

  const handleOpenMemberModal = () => {
    setOpenMemberModal(true);
  };

  const handleCloseMemberModal = (hasChanges) => {
    setOpenMemberModal(false);
    if (hasChanges) fetchData(selectedProgram);
  };

  const handleEditWeek = async (weekId) => {
    const weekData = await weekService.get(weekId);
    const weekDataWithId = {...weekData, id: weekId};
    setNewWeek(weekDataWithId);
    setEditingWeekId(weekId);
    setOpenWeekModal(true);
  };

  const handleAddWeek = async () => {
    const weekObj = {
      ...newWeek,
      programRef: selectedProgram,
      created_at: new Date(),
    };

    try {
      await weekService.createByProgram(weekObj, selectedProgram);
      toast.success('Week added successfully!');
      fetchData(selectedProgram);
      handleCloseWeekModal();
    } catch (error) {
      toast.error('Failed to add week');
    }
  };

  const handleUpdateWeek = async () => {
    const { id, ...weekObj } = {
      ...newWeek,
      programRef: selectedProgram,
      created_at: new Date(),
    };
  
    try {
      await weekService.update(editingWeekId, weekObj); // Pass the object without `id`
      toast.success('Week updated successfully!');
      fetchData(selectedProgram);
      handleCloseWeekModal();
      setEditingWeekId(null);
    } catch (error) {
      toast.error('Failed to update week');
    }
  };
  

  const handleDeleteWeek = async (weekId) => {
    try {
      await weekService.remove(weekId);
      toast.success('Week deleted successfully!');
      fetchData(selectedProgram);
    } catch (error) {
      toast.error('Failed to delete week');
    }
  };

  return (
    <Stack gap={2} height={'90%'}>
      <Typography variant="h4">Students Management Table</Typography>
      <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="program-select-label">Select Program</InputLabel>
          <Select
            labelId="program-select-label"
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              fetchData(e.target.value); 
            }}
            label="Select Program"
          >
            {programs.map((program) => (
              <MenuItem key={program.id} value={program.id}>
                {program.value} 
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Chip
          label="Add Week"
          onClick={() => {
            setNewWeek({
              title: '',
              subject: '',
              presantaion_links: '',
              youtube_links: '',
              project_link: '',
              exercise_link: '',
              other_links: '',
              is_visible: true,
            });
            setOpenWeekModal(true);
          }}
          color="primary"
          variant="outlined"
          sx={{
            cursor: 'pointer',
            width: 'fit-content',
            borderColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              borderColor: (theme) => theme.palette.primary.dark,
            },
          }}
        />

        {/* Chip for adding member */}
        <Chip
          label="Add Member"
          onClick={handleOpenMemberModal}
          color="primary"
          variant="outlined"
          sx={{
            cursor: 'pointer',
            width: 'fit-content',
            borderColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              borderColor: (theme) => theme.palette.primary.dark,
            },
          }}
        />
      </Stack>
      
      <EditWeekDialog
        open={openWeekModal}
        onClose={handleCloseWeekModal}
        onAddWeek={handleAddWeek}
        onUpdateWeek={handleUpdateWeek}
        newWeek={newWeek}
        setNewWeek={setNewWeek}
      />

      <AddMemberDialog 
        open={openMemberModal} 
        onClose={handleCloseMemberModal} 
        programRef={selectedProgram} // Pass the selected program reference
      />

      <Box flex={1} overflow={'auto'}>
        <ControlTable
          data={studentsData}
          columnColorsMap={columnColorsMap}
          totalColCriteria={totalColCriteria}
          totalRowCriteria={totalRowCriteria}
          onChangeHandler={onChangeHandler}
          onEditColumnHandler={handleEditWeek} // Add this line

        />
      </Box>
    </Stack>
  );
};

export default StudentsManagementTable;
