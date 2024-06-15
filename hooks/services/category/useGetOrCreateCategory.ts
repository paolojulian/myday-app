import { Category } from '@/hooks/services/category/category.types';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useSQLiteContext } from 'expo-sqlite';

export function useGetOrCreateCategory() {
  const db = useSQLiteContext();

  const getExistingCategory = async (categoryName: string) => {
    const existingCategory = await db.getFirstAsync<Category>(GET_CATEGORY_BY_NAME_STATEMENT, {
      $name: `%${categoryName}%`,
    });

    return existingCategory;
  };

  const createNewCategory = async (categoryName: string) => {
    const now_epoch = convertDateToEpoch(new Date());
    const newCategory = await db.runAsync(CREATE_CATEGORY_STATEMENT, {
      $categoryName: categoryName,
      $createdAt: now_epoch,
      $updatedAt: now_epoch,
    });

    return newCategory;
  };

  const getOrCreateCategory = async (categoryName: string) => {
    const existingCategory = await getExistingCategory(categoryName);
    if (existingCategory) {
      return existingCategory.id;
    }

    const newCategory = await createNewCategory(categoryName);

    return newCategory.lastInsertRowId;
  };

  return getOrCreateCategory;
}

const GET_CATEGORY_BY_NAME_STATEMENT = `
  SELECT id FROM category WHERE LOWER(name) LIKE LOWER($name) LIMIT 1
`;

const CREATE_CATEGORY_STATEMENT = `
  INSERT INTO category (category_name, created_at, updated_at) VALUES ($categoryName, $createdAt, $updatedAt)
`;
