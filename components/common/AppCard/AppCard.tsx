import React from 'react';
import { View, ViewProps } from 'react-native';

type Props = {} & ViewProps;

function AppCard({ style, ...props }: Props) {
  return <View {...props} style={[{ borderRadius: 56, padding: 16 }, style]}></View>;
}

export default AppCard;
