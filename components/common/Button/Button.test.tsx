import Button from '@/components/common/Button/Button';
import { render, screen } from '@testing-library/react-native';

describe('TESTING Button Component', () => {
  describe('GIVEN a text', () => {
    const text = 'Save';
    describe('WHEN the component is rendered', () => {
      it('THEN it should match the snapshot', () => {
        const component = render(<Button text="Save" />);
        expect(component).toMatchSnapshot();
      });
      it('THEN it should render the given text', () => {
        render(<Button text={text} />);
        expect(screen.getByText(text)).toBeTruthy();
      });
    });
  });
});
