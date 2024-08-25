import { useCallback, useState } from 'react';

export function useMutation<T, P>(callback: (params: P) => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<unknown>();

  const mutate = useCallback(
    async (params: P) => {
      try {
        setIsLoading(true);
        const result = await callback(params);
        setData(result);
      } catch (e) {
        setErrors(e);
      } finally {
        setIsLoading(false);
      }
    },
    [callback],
  );

  return { isLoading, error, data, mutate };
}

export default useMutation;
