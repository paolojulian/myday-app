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
        shadowColor: colors.v2.black,
        shadowOpacity: 0.8,
        shadowRadius: 40,
        shadowOffset: {
          width: 0,
          height: -30,
        },
        backgroundColor: colors.v2.black,
        zIndex: 50,
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
          activeColor={colors.v2.white}
          name="Home"
          onPress={onHomePress}
          isActive={pathname === '/'}
          ActiveIcon={<WrappedImage source={require('../../../assets/icons/home-active.png')} />}
          InactiveIcon={
            <WrappedImage source={require('../../../assets/icons/home-inactive.png')} />
          }
        />
        <BottomBarItem
          activeColor={colors.v2.teal}
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
          activeColor={colors.v2.yellow}
          name="Tasks"
          onPress={onTodoPress}
          isActive={pathname === '/todos'}
          ActiveIcon={<WrappedImage source={require('../../../assets/icons/todo-active.png')} />}
          InactiveIcon={
            <WrappedImage source={require('../../../assets/icons/todo-inactive.png')} />
          }
        />

        <BottomBarItem
          activeColor={colors.v2.red}
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
