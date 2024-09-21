import { useQuery } from '@tanstack/react-query';
import { getSubscriptionPlans } from '../api/api';

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscriptionPlans'],   // Unique key for this query
    queryFn: getSubscriptionPlans,     // Function that fetches the data
    staleTime: 60000,                  // Data remains fresh for 60 seconds
    retry: 1,                          // Retry once on failure
  });
};