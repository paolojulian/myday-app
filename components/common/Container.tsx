import ThemedView from '@/components/common/ThemedView';
import { StyleSheet } from 'react-native';

export type ContainerProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof ThemedView>;

export default function Container({ children, ...props }: ContainerProps) {
  return <ThemedView style={[props.style, styles.container]}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
