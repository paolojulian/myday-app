import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import DatePicker from '@/components/common/forms/DatePicker/DatePicker';
import { DATE_PICKER_TEST_IDS } from '@/components/common/forms/DatePicker/DatePicker.constants';
import { DATE_PICKER_ITEM_TEST_IDS } from '@/components/common/forms/DatePicker/DatePickerItem.contants';
import dayjs from 'dayjs';

describe('TESTING DatePicker', () => {
  describe('WHEN the component is rendered', () => {
    it('should match snapshot', () => {
      const component = render(<DatePicker />);
      expect(component).toMatchSnapshot();
    });
    it('renders without crashing', () => {
      render(<DatePicker />);
    });
    it('displays the label correctly', () => {
      const { getByText, rerender } = render(<DatePicker label="Select Date" />);
      expect(getByText('Select Date')).toBeTruthy();

      rerender(<DatePicker label="New Label" />);
      expect(getByText('New Label')).toBeTruthy();
    });
  });

  describe('WHEN the date picker is expanded', () => {
    it('should display the current month', () => {
      render(<DatePicker />);
      expandDatePicker();
      expect(screen.getByText(dayjs().format('MMM'))).toBeTruthy();
    });
  });

  describe('WHEN a date is selected', () => {
    it('calls onSelectDate when a date is selected', () => {
      const handleSelectDate = jest.fn();
      const { rerender } = render(<DatePicker onSelectDate={handleSelectDate} />);
      expandDatePicker();
      // Simulate selecting a date
      const dateToSelect = dayjs();
      fireEvent.press(
        screen.getByTestId(
          DATE_PICKER_ITEM_TEST_IDS.containerBtn(dateToSelect.format('YYYY-MM-DD')),
        ),
      );
      expect(handleSelectDate).toHaveBeenCalled();

      // should display the selected date
      rerender(<DatePicker value={dateToSelect.toDate()} />);
      expect(screen.getByTestId(DATE_PICKER_TEST_IDS.value).children[0]).toBe(
        `Today, ${dateToSelect.format('MMM D,YYYY')}`,
      );
    });
  });

  describe('WHEN there is no date selected', () => {
    it('should not display a selected date', () => {
      render(<DatePicker value={undefined} />);
      expandDatePicker();

      const today = dayjs().format('YYYY-MM-DD');
      const isActive = false;
      expect(screen.getByTestId(DATE_PICKER_ITEM_TEST_IDS.isActive(today, isActive)));
    });
  });

  describe('WHEN the date picker is collapsed', () => {
    it('should hide the calendar', () => {
      render(<DatePicker />);
      expandDatePicker();
      expect(screen.getByTestId(DATE_PICKER_TEST_IDS.calendar)).toBeTruthy();
      collapseDatePicker();
      expect(screen.queryByTestId(DATE_PICKER_TEST_IDS.calendar)).toBeNull();
    });
  });
});

function expandDatePicker() {
  fireEvent.press(screen.getByTestId(DATE_PICKER_TEST_IDS.headerBtn));
}

function collapseDatePicker() {
  fireEvent.press(screen.getByTestId(DATE_PICKER_TEST_IDS.headerBtn));
}
