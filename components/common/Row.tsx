import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

type RowProps = ComponentProps<typeof View>;

export default function Row({ style, ...props }: RowProps) {
  return (
    <View {...props} style={[style, styles.container]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
