import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';

const validateApplicantData = ({
  field_of_study,
  school_year,
  program,
  experience,
  experience_details,
  test_day,
}) => {
  try {
    if (
      !field_of_study ||
      !school_year ||
      !program ||
      !experience ||
      !experience_details ||
      !test_day
    )
      throw new Error('Missing required fields');
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

const create = async ({
  userCredential,
  first_name,
  last_name,
  role,
  card_id,
  appliciant_data,
}) => {
  console.log(userCredential);
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
    console.log('User document created:', userDoc);
    return userDoc;
  } catch (e) {
    console.error('Error in create user:', e);
    toast.error(e.message);
  }
};

const getById = async (id) => {
  try {
    const userDocRef = await getDoc(collection(db, 'users-v2', id));
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      console.log('User document:', userData);
      return userData;
    } else {
      throw new Error('User document does not exist');
    }
  } catch (e) {
    console.error('Error in get user by id:', e);
    toast.error(e.message);
  }
};

const getByAuthId = async (auth_id) => {
  try {
    const userDocRef = await getDoc(collection(db, 'users-v2', auth_id));
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      console.log('User document:', userData);
      return userData;
    } else {
      throw new Error('User document does not exist');
    }
  } catch (e) {
    console.error('Error in get user by auth id:', e);
    toast.error(e.message);
  }
};

export const UserService = {
  create,
  getById,
};
