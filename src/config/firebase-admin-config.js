import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from './firebase-config';

initializeApp({
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL,
});

export const getAllUsers = async () => {
  const users = await getAuth().getUsers();
  console.log(users);
};
