import Row from '../common/Row';
import Typography from '../common/Typography';

type ExpenseItemProps = {
  id: string;
  name: string;
  notes: string;
  date: string;
};
export default function ExpenseItem({
  id,
  name,
  notes,
  date,
}: ExpenseItemProps) {
  return (
    <Row
      style={{
        paddingVertical: 16,
        justifyContent: 'space-between',
      }}
    >
      <Typography>{name}</Typography>
      <Typography>{date}</Typography>
    </Row>
  );
}
