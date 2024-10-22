import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';

const create = async (newUserWeekStats) => {
  try {
    const userWeekStats = await addDoc(collection(db, 'userWeekStats'), newUserWeekStats);
    return userWeekStats;
  } catch (error) {
    toast.error(error.message);
  }
};

const get = async (id) => {
  try {
    const userWeekStats = await getDoc(doc(db, 'userWeekStats', id));
    return userWeekStats;
  } catch (error) {
    toast.error(error.message);
  }
};

const update = async (id, updatedWeek) => {
  try {
    await setDoc(doc(db, 'userWeekStats', id), updatedWeek);
  } catch (error) {
    toast.error(error.message);
  }
};

const remove = async (id) => {
  try {
    await deleteDoc(doc(db, 'userWeekStats', id));
  } catch (error) {
    toast.error(error.message);
  }
};

export const userWeekStatsService = {
  create,
  get,
  update,
  remove,
};
