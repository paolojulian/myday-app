import Container from '@/components/common/Container';
import AddButton from '@/components/navigation/BottomBar/AddButton';
import BottomBarItem from '@/components/navigation/BottomBar/BottomBarItem';
import { colors } from '@/constants/Colors';
import { Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, usePathname, useRouter } from 'expo-router';
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
        backgroundColor: colors.lightGrey,
      }}
    >
      <Container
        style={{
          backgroundColor: colors.lightGrey,
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
          ActiveIcon={<MaterialCommunityIcons name="home-variant" size={24} color={colors.black} />}
          InactiveIcon={
            <MaterialCommunityIcons name="home-variant-outline" size={24} color={colors.darkGrey} />
          }
        />
        <BottomBarItem
          name="Expenses"
          onPress={onExpensePress}
          isActive={pathname === '/expenses'}
          ActiveIcon={<MaterialCommunityIcons name="credit-card" size={24} color={colors.black} />}
          InactiveIcon={
            <MaterialCommunityIcons name="credit-card-outline" size={24} color={colors.darkGrey} />
          }
        />

        <AddButton onPress={onAddPress} />

        <BottomBarItem
          name="Todo"
          onPress={onTodoPress}
          isActive={pathname === '/todos'}
          ActiveIcon={
            <MaterialCommunityIcons name="clipboard-list" size={24} color={colors.black} />
          }
          InactiveIcon={
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={24}
              color={colors.darkGrey}
            />
          }
        />

        <BottomBarItem
          name="Journal"
          onPress={onJournalPress}
          isActive={pathname === '/journal'}
          ActiveIcon={<MaterialCommunityIcons name="notebook" size={24} color={colors.black} />}
          InactiveIcon={
            <MaterialCommunityIcons name="notebook-outline" size={24} color={colors.darkGrey} />
          }
        />
      </Container>
    </SafeAreaView>
  );
}
