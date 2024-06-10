import ThemedView from '@/components/common/ThemedView/ThemedView';
import { render } from '@testing-library/react-native';

describe('TESTING ThemedView Component', () => {
  describe('WHEN the component is rendered', () => {
    it('should match the snapshot', () => {
      const container = render(<ThemedView></ThemedView>);
      expect(container).toMatchSnapshot();
    });
    it('should render without crashing', () => {
      render(<ThemedView>Test</ThemedView>);
      expect(ThemedView).toBeTruthy();
    });
  });
});
