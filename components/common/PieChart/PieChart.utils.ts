import { colors } from '@/constants/Colors';

function polarToCartesian({
  centerX,
  centerY,
  radius,
  angleInDegrees,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  angleInDegrees: number;
}) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function createPieArc({
  radius,
  startAngle,
  endAngle,
}: {
  radius: number;
  startAngle: number;
  endAngle: number;
}) {
  const start = polarToCartesian({ centerX: 50, centerY: 50, radius, angleInDegrees: endAngle });
  const end = polarToCartesian({ centerX: 50, centerY: 50, radius, angleInDegrees: startAngle });

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L 50 50`,
  ].join(' ');

  return d;
}

export function calculatePaths({ total, current }: { total: number; current: number }) {
  // Current Path Calculation
  const isNegative = current < 0;

  const currentStartAngle = isNegative ? 0 : ((total - current) / total) * 360;
  const currentEndAngle = isNegative ? Math.min((Math.abs(current) / total) * 360, 359.9) : 360;
  const currentPath = createPieArc({
    endAngle: currentEndAngle,
    startAngle: current === total ? 0.1 : currentStartAngle,
    radius: 50,
  });
  const currentPathColor = isNegative ? colors.red : colors.black;

  // Total Path Calculation
  const totalStartAngle = isNegative ? currentEndAngle : 0;
  const totalEndAngle = isNegative
    ? 360
    : current === total
      ? 360
      : ((total - current) / total) * 360;
  const totalPath = createPieArc({
    endAngle: totalEndAngle,
    startAngle: totalStartAngle,
    radius: 50,
  });

  return { currentPath, currentPathColor, totalPath };
}
