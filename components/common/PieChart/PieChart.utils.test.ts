import { PieChartPaths } from '@/components/common/PieChart/PieChart.utils';
import { colors } from '@/constants/Colors';

describe('TESTING PieChartPaths class', () => {
  describe('GIVEN total is 100 and current is 50', () => {
    const total = 100;
    const current = 50;
    const pieChartPaths = new PieChartPaths({ total, current });

    describe('WHEN calculatePaths is called', () => {
      it('THEN it should return currentPath, currentPathColor and totalPath', () => {
        const { currentPath, currentPathColor, totalPath } = pieChartPaths.calculatePaths();
        expect(currentPath).toBeDefined();
        expect(currentPathColor).toBeDefined();
        expect(totalPath).toBeDefined();
      });
      it('THEN the current path color should be black', () => {
        const { currentPathColor } = pieChartPaths.calculatePaths();
        expect(currentPathColor).toBe(colors.black);
      });
    });

    describe('WHEN getCurrentAngles is called', () => {
      it('THEN it should be from 6 oclock(180deg) position to 12 oclock(360deg) position', () => {
        const { startAngle, endAngle } = pieChartPaths.getCurrentAngles();
        expect(startAngle).toBe(180);
        expect(endAngle).toBe(360);
      });
    });
    describe('WHEN getTotalAngles is called', () => {
      it('THEN it should be from 12 oclock(0deg) to 6 oclock(180deg) position', () => {
        const { startAngle, endAngle } = pieChartPaths.getTotalAngles();
        expect(startAngle).toBe(0);
        expect(endAngle).toBe(180);
      });
    });
  });

  describe('GIVEN total is 100 and current is negative(-) 50', () => {
    const total = 100;
    const current = -50;
    const pieChartPaths = new PieChartPaths({ total, current });
    describe('WHEN calculatePaths is called', () => {
      it('THEN the current path color should be red', () => {
        const { currentPathColor } = pieChartPaths.calculatePaths();
        expect(currentPathColor).toBe(colors.red);
      });
    });

    describe('WHEN getCurrentAngles is called', () => {
      it('THEN it should be from 12 oclock(0deg) position to 6 oclock(180deg) position', () => {
        const { startAngle, endAngle } = pieChartPaths.getCurrentAngles();
        expect(startAngle).toBe(0);
        expect(endAngle).toBe(180);
      });
    });
    describe('WHEN getTotalAngles is called', () => {
      it('THEN it should be from 6 oclock(180deg) to 12 oclock(360deg) position', () => {
        const { startAngle, endAngle } = pieChartPaths.getTotalAngles();
        expect(startAngle).toBe(180);
        expect(endAngle).toBe(360);
      });
    });
  });

  describe('GIVEN current is equal to total', () => {
    const pieChartPaths = new PieChartPaths({ total: 100, current: 100 });
    describe('WHEN getCurrentAngles is called', () => {
      it('THEN it should be full circle from 0.1 to 360', () => {
        const { startAngle, endAngle } = pieChartPaths.getCurrentAngles();
        expect(startAngle).toBe(0.1);
        expect(endAngle).toBe(360);
      });
    });
    describe('WHEN getTotalAngles is called', () => {
      it('THEN it should be empty, 0 to 0', () => {
        const { startAngle, endAngle } = pieChartPaths.getTotalAngles();
        expect(startAngle).toBe(0);
        expect(endAngle).toBe(0);
      });
    });
  });

  describe('GIVEN current is 0', () => {
    const pieChartPaths = new PieChartPaths({ total: 100, current: 0 });
    describe('WHEN getCurrentAngles is called', () => {
      it('THEN it be empty, startAngle of 0 and endAngle of 0', () => {
        const { startAngle, endAngle } = pieChartPaths.getCurrentAngles();
        expect(startAngle).toBe(0);
        expect(endAngle).toBe(0);
      });
    });
    describe('WHEN getTotalAngles is called', () => {
      it('THEN it should be full, startAngle of 0 and endAngle of 359.9', () => {
        const { startAngle, endAngle } = pieChartPaths.getTotalAngles();
        expect(startAngle).toBe(0);
        expect(endAngle).toBe(359.9);
      });
    });
  });
});
