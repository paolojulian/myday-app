import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Row from '../common/Row';
import Stack from '../common/Stack';
import Typography from '../common/Typography';
import { colors } from '../../utils/theme/colors';

type TodoItemProps = {
  id: string;
  name: string;
  notes: string;
  reminderDate?: string;
};

export default function TodoItem({
  id,
  name,
  notes,
  reminderDate,
}: TodoItemProps) {
  return (
    <TouchableHighlight>
      <Row
        style={{
          padding: 16,
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              marginTop: 4,
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: colors.primary[900],
              borderRadius: 9999,
            }}
          ></View>
        </TouchableOpacity>
        <Stack>
          <Typography variant='body-lg'>{name}</Typography>
          {!!notes && <Typography>{notes}</Typography>}
          {!!reminderDate && <Typography>Reminder - {reminderDate}</Typography>}
        </Stack>
      </Row>
    </TouchableHighlight>
  );
}
