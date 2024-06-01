import Container from '@/components/common/Container';
import AddButton from '@/components/navigation/BottomBar/AddButton';
import BottomBarItem from '@/components/navigation/BottomBar/BottomBarItem';
import { colors } from '@/constants/Colors';
import { Foundation } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

export type BottomBarProps = {
  onAddPress: () => void;
  onExpensePress: () => void;
  onHomePress: () => void;
  onJournalPress: () => void;
  onTodoPress: () => void;
};

export default function BottomBar({
  onAddPress,
  onExpensePress,
  onHomePress,
  onJournalPress,
  onTodoPress,
}: BottomBarProps) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.lightGrey,
      }}
    >
      <Container
        style={{
          backgroundColor: colors.lightGrey,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8,
        }}
      >
        <BottomBarItem
          name="Home"
          onPress={onHomePress}
          Icon={<Foundation name="home" size={24} color={colors.black} />}
        />

        <BottomBarItem
          name="Expense"
          onPress={onExpensePress}
          Icon={<Foundation name="dollar-bill" size={24} color={colors.black} />}
        />

        <AddButton onPress={onAddPress} />

        <BottomBarItem
          name="Todo"
          onPress={onTodoPress}
          Icon={<Foundation name="list-bullet" size={24} color={colors.black} />}
        />

        <BottomBarItem
          name="Journal"
          onPress={onJournalPress}
          Icon={<Foundation name="clipboard-notes" size={24} color={colors.black} />}
        />
      </Container>
    </SafeAreaView>
  );
}
