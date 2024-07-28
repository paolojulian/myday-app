import { useState, useEffect, useCallback } from 'react';

export function useQuery<T>(callback: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<unknown>();

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await callback();
      setData(result);
    } catch (e) {
      setErrors(e);
    } finally {
      setIsLoading(false);
    }
  }, [callback]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { isLoading, error, data, refetch };
}

export default useQuery;
