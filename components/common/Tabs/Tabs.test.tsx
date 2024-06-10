import Tabs from '@/components/common/Tabs/Tabs';
import { render } from '@testing-library/react-native';

describe('TESTING Tabs', () => {
  const items: string[] = ['item1', 'item2', 'item3'];
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
    it('should call onSelect with the selected item', () => {});
  });
});
