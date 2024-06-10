import ThemedText from '@/components/common/ThemedText/ThemedText';
import { render } from '@testing-library/react-native';

describe('TESTING ThemedText Component', () => {
  describe('WHEN the component is rendered', () => {
    it('should match the snapshot', () => {
      const container = render(<ThemedText>Test</ThemedText>);
      expect(container).toMatchSnapshot();
    });
    it('should render without crashing', () => {
      render(<ThemedText>Test</ThemedText>);
      expect(ThemedText).toBeTruthy();
    });
  });

  describe('WHEN the variant is set to heading', () => {
    it('should match the snapshot', () => {
      const container = render(<ThemedText variant="heading">Test</ThemedText>);
      expect(container).toMatchSnapshot();
    });
    it('should render without crashing', () => {
      render(<ThemedText>Test</ThemedText>);
      expect(ThemedText).toBeTruthy();
    });
  });
});
