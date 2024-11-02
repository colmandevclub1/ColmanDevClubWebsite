import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { auth } from 'src/config/firebase-config.js';
import { UserService } from 'src/services/user.service';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //TODO: not need to be here, move to a service
  const createUser = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
      return userCredential;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogleIfUserExist = async () => {
    const userCredential = await googleSignIn();
    const id = userCredential.user.uid;
    const userData = await UserService.getById(id);
    if (!userData) {
      await logout();
      await deleteUser(userCredential.user);
    }
    navigate('/');
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      console.log('You have been logged out');
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const fetchUserData = async () => {
          try {
            const userData = await UserService.getById(currentUser.uid);
            setUser(userData ? { ...currentUser, userData } : currentUser);
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchUserData();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        createUser,
        logout,
        signIn,
        googleSignIn,
        signInWithGoogleIfUserExist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
