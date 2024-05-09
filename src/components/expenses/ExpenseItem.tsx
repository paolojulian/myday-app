import Row from '../common/Row';
import Stack from '../common/Stack';
import Typography from '../common/Typography';

type ExpenseItemProps = {
  id: string;
  amount: number;
  date: string;
  name: string;
  notes: string;
};
export default function ExpenseItem({
  id,
  amount,
  date,
  name,
  notes,
}: ExpenseItemProps) {
  return (
    <Row
      style={{
        paddingVertical: 16,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Stack>
        <Typography variant='body-lg'>{name}</Typography>
        <Typography>{date}</Typography>
      </Stack>
      <Typography variant='body-lg'>${amount}</Typography>
    </Row>
  );
}
