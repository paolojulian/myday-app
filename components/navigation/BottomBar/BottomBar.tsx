import Container from '@/components/common/Container';
import AddButton from '@/components/navigation/BottomBar/AddButton';
import BottomBarItem from '@/components/navigation/BottomBar/BottomBarItem';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { ComponentProps } from 'react';
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
  const pathname = usePathname();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.whiteSmoke,
      }}
    >
      <Container
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 8,
        }}
      >
        <BottomBarItem
          name="Home"
          onPress={onHomePress}
          isActive={pathname === '/'}
          ActiveIcon={<WrappedIcon name="home-variant" color={colors.black} />}
          InactiveIcon={<WrappedIcon name="home-variant-outline" color={colors.darkGrey} />}
        />
        <BottomBarItem
          name="Expenses"
          onPress={onExpensePress}
          isActive={pathname === '/expenses'}
          ActiveIcon={<WrappedIcon name="credit-card" color={colors.black} />}
          InactiveIcon={<WrappedIcon name="credit-card-outline" color={colors.darkGrey} />}
        />

        <AddButton onPress={onAddPress} />

        <BottomBarItem
          name="Todo"
          onPress={onTodoPress}
          isActive={pathname === '/todos'}
          ActiveIcon={<WrappedIcon name="format-list-bulleted" color={colors.black} />}
          InactiveIcon={<WrappedIcon name="format-list-bulleted" color={colors.darkGrey} />}
        />

        <BottomBarItem
          name="Journal"
          onPress={onJournalPress}
          isActive={pathname === '/journal'}
          ActiveIcon={<WrappedIcon name="notebook" color={colors.black} />}
          InactiveIcon={<WrappedIcon name="notebook-outline" color={colors.darkGrey} />}
        />
      </Container>
    </SafeAreaView>
  );
}

function WrappedIcon(props: ComponentProps<typeof MaterialCommunityIcons>) {
  return <MaterialCommunityIcons {...props} size={28} />;
}
