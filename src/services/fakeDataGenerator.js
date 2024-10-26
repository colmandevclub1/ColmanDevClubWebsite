import { UserService } from './user.service';
import { ProgramService } from './program.service';
import { weekService } from './week.service';
import { userWeekStatsService } from './userWeekStats.service';
import User from 'src/classes/User.class';
import Program from 'src/classes/Program.class';
import Week from 'src/classes/Week.class';
import UserWeekStats from 'src/classes/UserWeekStats';
import { roles } from 'src/constants/roles';
export const fakeDataGenerator = async () => {

  const programId = 'F8YNTTQXhB1nUxfcFgxG';
  const programDoc = await ProgramService.get(programId);  
  const programRef = programDoc.exists() ? programDoc.id : null; // Get the ID of the program

  if (!programRef) {
    throw new Error('Program not found');
  }
  // Create users
  const usersData = [
    {
      email: 'user1@example.com',
      password: 'password1',
      profile_photo: 'https://example.com/photo1.jpg',
      first_name: 'User',
      last_name: 'three',
      phone_number: '1234567890',
      role: roles.member,
      card_id: '123456727',
      appliciant_data: {
        team: 'Team 1',
        field_of_study: 'Computer Science',
        school_year: '2024',
        program: programRef,
        experience: '3 year',
        experience_details: 'Worked on several projects.',
        test_day: new Date(),
      },
    },
    {
      email: 'user2@example.com',
      password: 'password2',
      profile_photo: 'https://example.com/photo2.jpg',
      first_name: 'User',
      last_name: 'four',
      phone_number: '0987654321',
      role: roles.member,  
      card_id: '123456726',
      appliciant_data: {
        team: 'Team 2',
        field_of_study: 'Mathematics',
        school_year: '2024',
        program: programRef,
        experience: '4 years',
        experience_details: 'Tutored high school students.',
        test_day: new Date(),
      },
    },
  ];

  // Create users and store their IDs
  const userRefs = [];
  for (const userData of usersData) {
    const user = new User(userData);
    const createdUser = await UserService.create({...user});
    userRefs.push(createdUser);
  }

  // Create weeks
  const weeksData = [
      {
        title: 'Week 1',
        programRef: programRef,
        subject: 'Mathematics',
        presantaion_links: 'https://example.com/presentation',
        youtube_links: 'https://youtube.com/example',
        project_link: 'https://example.com/project',
        exercise_link: 'https://example.com/exercise',
        other_links: 'https://example.com/other',
        is_visible: true,
        created_at: new Date(),
      },
      {
        title: 'Week 2',
        programRef: programRef,
        subject: 'Mathematics',
        presantaion_links: 'https://example.com/presentation',
        youtube_links: 'https://youtube.com/example',
        project_link: 'https://example.com/project',
        exercise_link: 'https://example.com/exercise',
        other_links: 'https://example.com/other',
        is_visible: true,
        created_at: new Date(),
      },
  ];

  const weekRefs = [];
  for (const weekData of weeksData) {
    const week = new Week(weekData);
    const createdWeek = await weekService.createByProgram({...week}, programRef);
    weekRefs.push(createdWeek);
  }

//   // Create user week stats
//   for (const userRef of userRefs) {
//     for (const weekRef of weekRefs) {
//       const userWeekStatsData = {
//         weekRef: weekRef,
//         userRef: userRef,
//         project_status: 'didNotSubmit',
//         presnce_status: 'missed',
//         created_at: new Date(),
//         updated_at: new Date(),
//         updated_by: '',
//       };
//       const userWeekStats = new UserWeekStats(userWeekStatsData);
//       await userWeekStatsService.create(userWeekStats);
//     }
//   }
};

// fakeDataGenerator().then(() => {
//   console.log('Fake data generation complete!');
// }).catch(err => {
//   console.error('Error generating fake data:', err);
// });
