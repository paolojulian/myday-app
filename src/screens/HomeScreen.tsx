import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import Stack from '../components/common/Stack';
import Typography from '../components/common/Typography';

export default function HomeScreen() {
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const result = await db.getAllAsync('SELECT * FROM Expenses', []);
        console.log('Expenses:', result);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [db]);

  return (
    <Stack>
      <Typography variant='heading'>Home</Typography>
    </Stack>
  );
}
