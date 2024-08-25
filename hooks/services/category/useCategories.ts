import { Category, CategoryQueryKeys } from '@/hooks/services/category/category.types';
import { useQuery } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';

const useCategories = () => {
  const db = useSQLiteContext();

  async function setup() {
    const result = await db.getAllAsync<Category>('SELECT * FROM category');
    return result;
  }

  return useQuery({
    queryKey: [CategoryQueryKeys.list],
    queryFn: setup,
    initialData: [],
    refetchOnMount: true,
  });
};

export default useCategories;
