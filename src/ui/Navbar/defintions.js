import { roles } from "src/constants/roles";

export const pages = [
  { title: 'Home', path: '/' },
  { title: 'The Team', path: '/team' },
  { title: 'Syllabus', path: '/syllabus', roles: [roles.member, roles.admin]}
];
