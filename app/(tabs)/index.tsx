import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';

export default function Home() {
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
      <ThemedText variant="heading">Home</ThemedText>
    </Stack>
  );
}
