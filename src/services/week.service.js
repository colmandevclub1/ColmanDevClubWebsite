import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';

const create = async (newWeek) => {
  console.log(newWeek);
  try {
    const week = await addDoc(collection(db, 'weeks'), newWeek);
    return week;
  } catch (error) {
    toast.error(error.message);
  }
};

const get = async (id) => {
  try {
    const week = await getDoc(doc(db, 'weeks', id));
    return week;
  } catch (error) {
    toast.error(error.message);
  }
};

const getAllByProgram = async (programId) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'weeks'));
    const weeks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return weeks.filter((week) => week.programRef === programId);
  } catch (error) {
    toast.error(error.message);
  }
};

const update = async (id, updatedWeek) => {
  try {
    await setDoc(doc(db, 'weeks', id), updatedWeek);
  } catch (error) {
    toast.error(error.message);
  }
};

const remove = async (id) => {
  try {
    await deleteDoc(doc(db, 'weeks', id));
  } catch (error) {
    toast.error(error.message);
  }
};

export const weekService = {
  create,
  get,
  update,
  remove,
  getAllByProgram,
};
