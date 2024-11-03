import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';

const create = async ({ userCredential, first_name, last_name, role, card_id, appliciant_data }) => {
  const userDocRef = doc(db, 'users-v2', userCredential.uid);
  const userDoc = {
    first_name,
    last_name,
    role,
    card_id,
    appliciant_data,
  };

  try {
    await setDoc(userDocRef, userDoc);
    return userDoc;
  } catch (e) {
    console.error('Error in create user:', e);
    toast.error(e.message);
  }
};

const getById = async (id) => {
  try {
    const userDocRef = doc(db, 'users-v2', id);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) return null;

    return userDocSnap.data();
  } catch (e) {
    console.error('Error in get user by id:', e);
    toast.error(e.message);
  }
};

export const UserService = {
  create,
  getById,
};
