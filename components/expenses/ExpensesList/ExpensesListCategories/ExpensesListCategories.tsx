import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { Category } from '@/hooks/services/category/category.types';
import useCategories from '@/hooks/services/category/useCategories';
import { useState } from 'react';
import { ScrollView } from 'react-native';

type ExpensesListCategoriesProps = {
  onSelectCategory: (category: Category['id'] | null) => void;
};

export default function ExpensesListCategories({ onSelectCategory }: ExpensesListCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category['id'] | null>(null);
  const { data: categories } = useCategories();
  const categoryItems =
    categories?.map(({ id, category_name }) => ({
      key: id,
      value: category_name,
    })) ?? [];

  const isCategoryId = (categoryId: string | Category['id']): categoryId is Category['id'] => {
    return typeof categoryId === 'number';
  };

  const handleSelectItem = (categoryId: string | Category['id']) => {
    if (!isCategoryId(categoryId)) {
      onSelectCategory(null);
      setSelectedCategory(null);
      return;
    }

    onSelectCategory(categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal directionalLockEnabled>
      <Container style={{ paddingVertical: 8 }}>
        <Tabs<Category['id'] | string>
          items={[
            {
              key: 'all',
              value: 'All',
            },
            ...categoryItems,
          ]}
          onSelect={handleSelectItem}
          selectedItem={selectedCategory ?? 'all'}
          variant="default-separated"
          isCompact
        ></Tabs>
      </Container>
    </ScrollView>
  );
}
