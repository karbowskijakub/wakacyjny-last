import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../api/api';

export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],   // Unique key for this query
    queryFn: getUserData,     // Function that fetches the data
    staleTime: 60000,         // Data remains fresh for 60 seconds
    retry: 1,                 // Retry once on failure
  });
};