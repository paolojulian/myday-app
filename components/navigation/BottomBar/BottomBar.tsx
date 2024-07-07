import Container from '@/components/common/Container';
import AddButton from '@/components/navigation/BottomBar/AddButton';
import BottomBarItem from '@/components/navigation/BottomBar/BottomBarItem';
import { colors } from '@/constants/Colors';
import { usePathname } from 'expo-router';
import { Image, SafeAreaView } from 'react-native';

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
  const pathname = usePathname();

  return (
    <SafeAreaView
      style={{
        elevation: 8,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 24,
        shadowOffset: {
          width: 0,
          height: -3,
        },
        backgroundColor: colors.white,
      }}
    >
      <Container
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <BottomBarItem
          name="Home"
          onPress={onHomePress}
          isActive={pathname === '/'}
          ActiveIcon={<WrappedImage source={require('../../../assets/icons/home-active.png')} />}
          InactiveIcon={
            <WrappedImage source={require('../../../assets/icons/home-inactive.png')} />
          }
        />
        <BottomBarItem
          name="Expenses"
          onPress={onExpensePress}
          isActive={pathname === '/expenses'}
          ActiveIcon={<WrappedImage source={require('../../../assets/icons/expense-active.png')} />}
          InactiveIcon={
            <WrappedImage source={require('../../../assets/icons/expense-inactive.png')} />
          }
        />

        <AddButton onPress={onAddPress} />

        <BottomBarItem
          name="Tasks"
          onPress={onTodoPress}
          isActive={pathname === '/todos'}
          ActiveIcon={<WrappedImage source={require('../../../assets/icons/todo-active.png')} />}
          InactiveIcon={
            <WrappedImage source={require('../../../assets/icons/todo-inactive.png')} />
          }
        />

        <BottomBarItem
          name="Journal"
          onPress={onJournalPress}
          isActive={pathname === '/journal'}
          ActiveIcon={<WrappedImage source={require('../../../assets/icons/journal-active.png')} />}
          InactiveIcon={
            <WrappedImage source={require('../../../assets/icons/journal-inactive.png')} />
          }
        />
      </Container>
    </SafeAreaView>
  );
}

const ICON_SIZE = 20;
function WrappedImage(props: { source: number }) {
  return <Image style={{ width: ICON_SIZE, height: ICON_SIZE }} {...props} />;
}
