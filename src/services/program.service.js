import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';

const create = async (newProgram) => {
  try {
    const program = await addDoc(collection(db, 'programs'), newProgram);
    return program;
  } catch (error) {
    toast.error(error.message);
  }
};

const get = async (id) => {
  try {
    const program = await getDoc(doc(db, 'programs', id));
    return program;
  } catch (error) {
    toast.error(error.message);
  }
};

const update = async (id, updatedProgram) => {
  try {
    await setDoc(doc(db, 'programs', id), updatedProgram);
  } catch (error) {
    toast.error(error.message);
  }
};

const remove = async (id) => {
  try {
    await deleteDoc(doc(db, 'programs', id));
  } catch (error) {
    toast.error(error.message);
  }
};

export const ProgramService = {
  create,
  get,
  update,
  remove,
};
