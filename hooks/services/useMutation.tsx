import { useState } from 'react';

export function useMutation<T>(callback: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<unknown>();

  async function mutate() {
    try {
      setIsLoading(true);
      const result = await callback();
      setData(result);
      return result;
    } catch (e) {
      setErrors(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, data, mutate };
}

export default useMutation;
