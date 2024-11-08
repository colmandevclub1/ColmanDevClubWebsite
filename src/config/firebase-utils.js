import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import { toast } from 'react-toastify';

export const signupWithFirebase = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (e) {
    console.error('Error in signupWithFirebase: ', e);
    toast.error(e.message);
  }
};

export const getAllUsers = async () => {
  const users = getAuth().getUsers;
};

export const updateUser = async (user, data) => {
  try {
    await updateProfile(user, data);
  } catch (error) {
    toast.error('Failed to update user');
    console.error(`Failed to update user: ${error}`);
  }
};

export const signInWithFirebase = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (e) {
    console.error('Error in signInWithFirebase: ', e);
    toast.error(e.message);
  }
};

export const deleteUserFromFirebase = async (user) => {
  try {
    await deleteUser(user);
  } catch (e) {
    console.error('Error in deleteUserFromFirebase: ', e);
    toast.error(e.message);
  }
};

export const fetchData = async (dbCollection) => {
  const collectionRef = collection(db, dbCollection);
  const querySnapshot = await getDocs(collectionRef);

  const fetchedCards = querySnapshot.docs.map((doc) => doc.data());
  return fetchedCards;
};
