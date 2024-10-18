import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    onError: () => {
      toast.error('Error fetching users.');
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => {
      addDoc(collection(db, 'users'), user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User created');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error creating user');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, updatedData }) => {
      const userDoc = doc(db, 'users', userId);
      updateDoc(userDoc, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error updating user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => {
      const userDoc = doc(db, 'users', user.id);
      deleteDoc(userDoc);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error deleting user');
    },
  });
};
