import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

type StackProps = ComponentProps<typeof View>;

export default function Stack({ style, ...props }: StackProps) {
  return (
    <View {...props} style={[style, styles.container]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
