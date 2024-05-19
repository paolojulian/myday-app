import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import Stack from '../components/common/Stack';
import Typography from '../components/common/Typography';
import useExpense from '../hooks/services/expenses/useExpense';


export default function HomeScreen() {
  const db = useSQLiteContext();
  let keyword:string = '%gamb%'
  const {data: expenses, isLoading, error} = useExpense([{columnName: "description", condition: "LIKE", value: keyword}]);
  console.log(expenses);
  return (
    <Stack>
      <Typography variant='heading'>Home</Typography>
    </Stack>
  );
}
