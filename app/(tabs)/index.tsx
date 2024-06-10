import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import useExpense from '@/hooks/services/expense/useExpense';

export default function Home() {
  let keyword: string = '%gamb%';
  const { data: expenses } = useExpense([
    { columnName: 'description', condition: 'LIKE', value: keyword },
  ]);
  console.log(expenses);
  return (
    <Stack>
      <ThemedText variant="heading">Home</ThemedText>
    </Stack>
  );
}
