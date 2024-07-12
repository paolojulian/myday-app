import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { Category } from '@/hooks/services/category/category.types';
import { useState } from 'react';
import { ScrollView } from 'react-native';

type ExpensesListCategoriesProps = {
  onSelectCategory: (category: Category['id'] | null) => void;
  categories: {
    category_id: Category['id'];
    category_name: Category['category_name'];
  }[];
};

export default function ExpensesListFilter({
  onSelectCategory,
  categories,
}: ExpensesListCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category['id'] | null>(null);
  const categoryItems =
    categories?.map(({ category_id, category_name }) => ({
      key: category_id,
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
