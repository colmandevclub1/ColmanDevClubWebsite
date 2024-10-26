import { toast } from 'react-toastify';
import { UserService } from './user.service';
import { weekService } from './week.service';
import { userWeekStatsService } from './userWeekStats.service';
import { ProgramService } from './program.service';
import { roles } from 'src/constants/roles';

const getAllByProgram = async (program = '1') => {
  try {
    const members = await UserService.getAllUsersByProgram(program);
    const weeks = await weekService.getAllByProgram(program);
    const allUserWeekStats = await userWeekStatsService.getAll();
    const allMembers = await UserService.getAllUsers();
    const allWeeks = await weekService.getAll();

    const weeksMap = weeks.reduce((acc, week) => {
      acc[week.id] = week.title;
      return acc;
    }, {});

    const data = [];
    for (const member of members) {
      const userWeekStats = allUserWeekStats.filter((userWeekStats) => userWeekStats.userRef === member.id);

      const userWeeks = weeks.map(async (week) => {
        const userStat = userWeekStats.find((stat) => stat.weekRef === week.id);
        
        if (!userStat) {
          const defaultStats = {
            weekRef: week.id,
            userRef: member.id,
            project_status: 'didNotSubmit',
            presnce_status: 'missed',
            created_at: new Date(),
            updated_at: new Date(),
            updated_by: '',
          };
          
          const newStatRef = await userWeekStatsService.create(defaultStats);
          return { ...defaultStats, title: week.title, id: newStatRef.id }; 
        }

        return { title: weeksMap[week.id], ...userStat };
      });

      const resolvedUserWeeks = await Promise.all(userWeeks);
      
      data.push({
        id: member.id,
        user: member,
        weeks: resolvedUserWeeks,
      });
    }

    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const userStatusService = {
  getAllByProgram,
};
