import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export const addUser = async (user) => {
  try {
    // const userWithoutPassword = { ...user };
    // delete userWithoutPassword.password;
    const docRef = await addDoc(collection(db, 'users'), user);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    //TODO : send to Google Analytics an event with the user.
    console.error('Error adding document: ', e);
  }
};

export const addMemberToTeam = async (user) => {
  try {
    const docRef = await addDoc(collection(db, 'team'), user);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    //TODO : send to Google Analytics an event with the user.
    console.error('Error adding document: ', e);
  }
};

export const fetchData = async (dbCollection) => {
  const collectionRef = collection(db, dbCollection);
  const querySnapshot = await getDocs(collectionRef);

  const fetchedCards = querySnapshot.docs.map((doc) => doc.data());
  return fetchedCards;
};
