import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';

export const fetchData = async (dbCollection) => {
  const collectionRef = collection(db, dbCollection);
  const querySnapshot = await getDocs(collectionRef);

  const fetchedCards = querySnapshot.docs.map((doc) => doc.data());
  return fetchedCards;
};

export const useFirestoreFetch = (dbCollection) => {
  return useQuery({
    queryKey: [dbCollection],
    queryFn: async () => {
      return fetchData(dbCollection);
    },
    onError: () => {
      toast.error('Error fetching data.');
    },
  });
};
