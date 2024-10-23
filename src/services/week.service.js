import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import { UserService } from './user.service';
import UserWeekStats from 'src/classes/UserWeekStats';
import { roles } from 'src/constants/roles';

const create = async (newWeek) => {
  try {
    const week = await addDoc(collection(db, 'weeks'), newWeek);
    const users = await UserService.getAll();
    users
      .filter((user) => user.role === roles.member)
      .forEach(async (user) => {
        const userWeekStats = new UserWeekStats({
          weekRef: week.id,
          userRef: user.id,
          created_at: new Date(),
        });
        await UserWeekStats.create({ ...userWeekStats });
      });
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
