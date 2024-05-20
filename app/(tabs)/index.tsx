import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import useExpense from '@/hooks/services/expenses/useExpense';
import { useSQLiteContext } from 'expo-sqlite';

export default function Home() {
  const db = useSQLiteContext();
  let keyword:string = '%gamb%'
  const {data: expenses, isLoading, error} = useExpense([{columnName: "description", condition: "LIKE", value: keyword}]);
  console.log(expenses);
  return (
    <Stack>
      <ThemedText variant="heading">Home</ThemedText>
    </Stack>
  );
}
