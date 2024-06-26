export interface Category {
  id: number;
  category_name: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export enum CategoryQueryKeys {
  list = 'category-list',
  getByName = 'category-get-by-name',
}
