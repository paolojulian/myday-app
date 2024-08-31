import {
  PieChartPaths,
  calculatePercentageText,
} from '@/components/common/PieChart/PieChart.utils';
import { colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, Path, Svg, Text } from 'react-native-svg';

type PieChartVariants = 'default' | 'sm';

type PieChartProps = {
  total: number;
  current: number;
  variant?: PieChartVariants;
};

function PieChart({ total, current, variant = 'default' }: PieChartProps) {
  const pieChartPaths = useMemo(() => new PieChartPaths({ total, current }), [total, current]);
  const { currentPath, currentPathColor, totalPath } = useMemo(() => {
    return pieChartPaths.calculatePaths();
  }, [pieChartPaths]);

  const resolvedStyles = variant === 'default' ? defaultStyles : smStyles;
  const remainingPercentageText = calculatePercentageText({ total, current });

  if (!remainingPercentageText) {
    return null;
  }

  return (
    <View style={resolvedStyles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ transform: [{ rotateZ: '0deg' }] }}
      >
        <Path d={totalPath} fill={colors.v2.grayLight}></Path>
        <Path d={currentPath} fill={currentPathColor}></Path>
        <Circle cx="50" cy="50" r="42" fill={colors.v2.teal} />
        <Text
          x="50"
          y="50"
          fill={colors.v2.black}
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          dy=".3em"
        >
          {remainingPercentageText}
        </Text>
      </Svg>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    width: 86,
    height: 86,
  },
});
const smStyles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
  },
});

export default PieChart;
