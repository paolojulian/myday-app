import { View } from 'react-native';
import Stack from '../components/common/Stack';
import Typography from '../components/common/Typography';
import ExpensesList from '../components/expenses/ExpensesList';

export default function ExpenseScreen() {
  return (
    <Stack
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 16,
        }}
      >
        <Typography variant='heading'>Expenses</Typography>
      </View>

      <ExpensesList />
    </Stack>
  );
}
