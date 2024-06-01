import ThemedText from '@/components/common/ThemedText';
import { TouchableOpacity } from 'react-native';

export type BottomBarItemProps = {
  Icon: React.ReactElement;
  name: string;
  onPress: () => void;
};

export default function BottomBarItem({ Icon, name, onPress }: BottomBarItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ gap: 4, alignItems: 'center' }}>
      {Icon}
      <ThemedText>{name}</ThemedText>
    </TouchableOpacity>
  );
}
