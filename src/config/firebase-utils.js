import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import { createUserWithEmailAndPassword, updateProfile, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export const signupWithFirebase = async ({ email, password, displayName, photoURL }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName,
      photoURL,
    });
    return user;
  } catch (e) {
    console.error('Error in signupWithFirebase: ', e);
    toast.error(e.message);
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
