import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Validators } from './validators.service';
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
const getAllUsers = async () => {
  try {
    const userCollection = collection(db, 'users-v2');
    const userSnapshot = await getDocs(userCollection);
    const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    toast.error('Failed to fetch users');
  }
};

const getAllUsersByProgram = async (program) => {
  try {
    const userCollection = collection(db, 'users-v2');
    const q = query(userCollection, where('appliciant_data.programRef', '==', program));
    const userSnapshot = await getDocs(q);
    const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error('Error fetching users by program:', error);
    toast.error('Failed to fetch users by program');
  }
};

const updateUserProgramRef = async (userId, programRef) => {
  try {
    const userDocRef = doc(db, 'users-v2', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      const updatedApplicantData = {
        ...userData.appliciant_data,
        programRef: programRef,
      };

      await setDoc(userDocRef, {
        appliciant_data: updatedApplicantData,
      }, { merge: true });
    } else {
      throw new Error('User document does not exist');
    }
  } catch (error) {
    console.error('Error updating user program reference:', error);
    toast.error('Failed to update user program reference');
  }
};

export const UserService = {
  create,
  getAllUsers,
  getAllUsersByProgram,
  updateUserProgramRef,
  getById,
};
