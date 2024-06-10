import { View, ViewProps } from 'react-native';

type ThemedViewProps = ViewProps;

export default function ThemedView(props: ThemedViewProps) {
  return <View {...props}></View>;
}
