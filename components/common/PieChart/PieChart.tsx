import { PieChartPaths } from '@/components/common/PieChart/PieChart.utils';
import { colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

type PieChartProps = {
  total: number;
  current: number;
};

function PieChart({ total, current }: PieChartProps) {
  const { currentPath, currentPathColor, totalPath } = useMemo(() => {
    return new PieChartPaths({ total, current }).calculatePaths();
  }, [total, current]);

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ transform: [{ rotateZ: '0deg' }] }}
      >
        <Path d={totalPath} fill={colors.slateGrey[300]}></Path>
        <Path d={currentPath} fill={currentPathColor}></Path>
        <Circle cx="50" cy="50" r="40" fill={colors.slateGrey[100]} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 86,
    height: 86,
  },
});

export default PieChart;
