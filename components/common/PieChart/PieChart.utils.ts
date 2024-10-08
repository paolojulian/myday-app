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
  radius = 50,
  startAngle,
  endAngle,
}: {
  radius?: number;
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

export function calculatePercentageText({ total, current }: { total: number; current: number }) {
  if (!total || !current) {
    return null;
  }
  const remainingPercentage = 100 - ((total - current) / total) * 100;
  if (remainingPercentage < -100) {
    return '---';
  }
  return `${remainingPercentage.toFixed(0)}%`;
}

export class PieChartPaths {
  total: number;
  current: number;

  constructor({ total, current }: { total: number; current: number }) {
    this.total = total;
    this.current = current;
  }

  calculatePaths() {
    const currentPath = createPieArc({
      ...this.getCurrentAngles(),
    });

    const totalPath = createPieArc({
      ...this.getTotalAngles(),
    });

    const currentPathColor = this.getCurrentPathColor();

    return {
      currentPath,
      currentPathColor,
      totalPath,
    };
  }

  getCurrentPathColor() {
    return this.current < 0 ? colors.v2.black : colors.v2.black;
  }

  getCurrentAngles() {
    if (this.current === this.total) {
      return { startAngle: 0.1, endAngle: 360 };
    }
    if (this.current === 0) {
      return { startAngle: 0, endAngle: 0 };
    }

    const isNegative = this.current < 0;

    const startAngle = isNegative ? 0 : ((this.total - this.current) / this.total) * 360;
    const endAngle = isNegative
      ? Math.min((Math.abs(this.current) / this.total) * 360, 359.9)
      : 360;

    return { startAngle, endAngle };
  }

  getTotalAngles() {
    if (this.current === 0) {
      return { startAngle: 0, endAngle: 359.9 };
    }
    if (this.current === this.total) {
      return { startAngle: 0, endAngle: 0 };
    }

    const isNegative = this.current < 0;

    const startAngle = isNegative ? this.getCurrentAngles().endAngle : 0;
    const endAngle = isNegative
      ? 360
      : this.current === this.total
        ? 360
        : ((this.total - this.current) / this.total) * 360;

    return { startAngle, endAngle };
  }
}
