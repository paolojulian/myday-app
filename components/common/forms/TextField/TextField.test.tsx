import TextField, { TEXT_FIELD_TEST_IDS } from '@/components/common/forms/TextField/TextField';
import { act, render, screen } from '@testing-library/react-native';

describe('TESTING TextField component', () => {
  describe('WHEN the TextField component is rendered', () => {
    it('THEN it should match the snapshot', () => {
      const component = render(
        <TextField
          onChangeText={jest.fn()}
          label="Title"
          value="test"
          placeholder="Search field"
        />,
      );
      expect(component).toMatchSnapshot();
    });
    it('THEN it should not crash', () => {
      const component = render(
        <TextField
          onChangeText={jest.fn()}
          label="Title"
          value="test"
          placeholder="Search field"
        />,
      );
      expect(component).toBeTruthy();
    });
  });

  describe('WHEN the TextField is focused', () => {
    it('THEN it should call the onFocus prop', () => {
      const spyFocus = jest.fn();
      render(
        <TextField
          onChangeText={jest.fn()}
          onFocus={spyFocus}
          label="Title"
          value="test"
          placeholder="Search field"
        />,
      );
      const textInput = screen.getByTestId(TEXT_FIELD_TEST_IDS.textInput);
      expect(textInput).toBeTruthy();
      act(() => {
        textInput.props.onFocus();
      });

      expect(spyFocus).toHaveBeenCalled();
    });
  });

  describe('WHEN the TextField has errors', () => {
    it('THEN it should match the snapshot', () => {
      const component = render(
        <TextField
          onChangeText={jest.fn()}
          label="Title"
          value=""
          placeholder="Search field"
          isError
          errorMessage="Title is required."
        />,
      );
      expect(component).toMatchSnapshot();
    });
    it('THEN it should display the error message', () => {
      const spyFocus = jest.fn();
      render(
        <TextField
          onChangeText={jest.fn()}
          onFocus={spyFocus}
          label="Title"
          value=""
          placeholder="Search field"
          isError
          errorMessage="Title is required."
        />,
      );
      const errorMessage = screen.getByTestId(TEXT_FIELD_TEST_IDS.errorMessage);
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.children).toHaveLength(1);
      expect(errorMessage.children[0]).toBe('Title is required.');
    });
  });
});
