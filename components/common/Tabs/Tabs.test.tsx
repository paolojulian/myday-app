import Tabs from '@/components/common/Tabs/Tabs';
import { TabItem, TABS_ITEM_TEST_IDS } from '@/components/common/Tabs/TabsItem';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('TESTING Tabs', () => {
  const items: TabItem<string>[] = [
    {
      key: 'item1',
      value: 'item1',
    },
    {
      key: 'item2',
      value: 'item2',
    },
    {
      key: 'item3',
      value: 'item3',
    },
  ];

  describe('WHEN rendering', () => {
    it('should match snapshot', () => {
      const component = render(
        <Tabs<string> items={items} onSelect={jest.fn} selectedItem={'item1'} />,
      );
      expect(component).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const component = render(
        <Tabs<string> items={items} onSelect={jest.fn} selectedItem={'item1'} />,
      );
      expect(component).toBeTruthy();
    });
  });

  describe('WHEN selecting an item', () => {
    it('should call onSelect with the selected item', () => {
      const onSelect = jest.fn();
      render(<Tabs<string> items={items} onSelect={onSelect} selectedItem={'item1'} />);
      const isSelected = false;
      const item2 = screen.getByTestId(TABS_ITEM_TEST_IDS.containerBtn('item2', isSelected));
      fireEvent.press(item2);
      expect(onSelect).toHaveBeenCalledWith('item2');
    });

    it('should display the selected item as active', () => {
      const isSelected = true;
      render(<Tabs<string> items={items} onSelect={jest.fn} selectedItem={'item2'} />);
      const item2Container = screen.getByTestId(
        TABS_ITEM_TEST_IDS.containerBtn('item2', isSelected),
      );
      expect(item2Container).toBeTruthy();
      expect(screen.getByTestId(TABS_ITEM_TEST_IDS.text('item2')).children[0]).toBe('item2');
    });
  });
});
