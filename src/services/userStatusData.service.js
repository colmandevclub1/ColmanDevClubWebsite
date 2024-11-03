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

    const weeksMap = weeks.reduce((acc, week) => {
      acc[week.id] = { title: week.title, order_num: week.order_num };
      return acc;
    }, {});

    const data = [];
    for (const member of members) {
      const userWeekStats = allUserWeekStats.filter((stat) => stat.userRef === member.id);

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
          return { ...defaultStats, title: weeksMap[week.id].title, id: newStatRef.id, order_num: week.order_num };
        }

        return { title: weeksMap[week.id].title, ...userStat, order_num: weeksMap[week.id].order_num };
      });

      const resolvedUserWeeks = await Promise.all(userWeeks);
      const sortedUserWeeks = resolvedUserWeeks
        .sort((a, b) => a.order_num - b.order_num)
        .map(({ order_num, ...rest }) => rest); // Remove order_num from each item

      data.push({
        id: member.id,
        user: member,
        weeks: sortedUserWeeks,
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
