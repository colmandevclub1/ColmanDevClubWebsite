import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Validators } from './validators.service';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import { deleteUserFromFirebase, signupWithFirebase } from 'src/config/firebase-utils';

const validateUser = ({ email, password, first_name, last_name, role, card_id, phone_number }) => {
  try {
    if (!email || !password || !first_name || !last_name || !role || !card_id)
      throw new Error('Missing required fields');
    if (!Validators.validateName(first_name)) throw new Error('Invalid first name');
    if (!Validators.validateName(last_name)) throw new Error('Invalid last name');
    if (!Validators.validateRole(role)) throw new Error('Invalid role');
    if (!Validators.validateCardId(card_id)) throw new Error('Invalid card ID');
    if (!Validators.validateEmail(email)) throw new Error('Invalid email');
    if (!Validators.validatePassword(password)) throw new Error('Invalid password');
    if (!Validators.validatePhone(phone_number)) throw new Error('Invalid phone number');
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

const validateApplicantData = ({ field_of_study, school_year, program, experience, experience_details, test_day }) => {
  try {
    if (!field_of_study || !school_year || !program || !experience || !experience_details || !test_day)
      throw new Error('Missing required fields');
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

const create = async ({
  email,
  password,
  profile_photo,
  first_name,
  last_name,
  role,
  card_id,
  phone_number,
  appliciant_data,
}) => {
  const isUserValid = validateUser({
    email,
    password,
    profile_photo,
    first_name,
    last_name,
    role,
    card_id,
    phone_number,
  });
  const isApplicantDataValid = validateApplicantData(appliciant_data);

  if (!isUserValid || !isApplicantDataValid) return;

  const authUser = await signupWithFirebase({
    email,
    password,
    displayName: `${first_name} ${last_name}`,
    photoURL: profile_photo,
  });
  if (!authUser) return;

  try {
    const userDocRef = await addDoc(collection(db, 'users-v2'), {
      id: authUser.uid,
      auth_id: authUser.uid,
      first_name,
      last_name,
      role,
      card_id,
      appliciant_data,
    });

    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      console.log('User document:', userData);
      return userData;
    } else {
      throw new Error('User document does not exist');
    }
  } catch (e) {
    console.error('Error in create new user:', e);
    toast.error(e.message);
    await deleteUserFromFirebase(authUser);
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
  updateUserProgramRef
};
