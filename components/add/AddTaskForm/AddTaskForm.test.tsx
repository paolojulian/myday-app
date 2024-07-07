import { act, fireEvent, render, screen } from '@testing-library/react-native';
import AddTaskForm from './AddTaskForm';

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useNavigation: jest.fn(),
}));

jest.mock('@/hooks/services/task/useCreateTask', () => ({
  useCreateTask: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

describe('TESTING AddTaskForm', () => {
  describe('GIVEN the AddTaskForm component', () => {
    describe('WHEN it is rendered', () => {
      it('THEN should match the snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
      });
      it('THEN it should display the form', () => {
        renderComponent();

        const title = screen.getByLabelText('Title');
        expect(title).toBeDefined();

        const description = screen.getByLabelText('Note (Optional)');
        expect(description).toBeDefined();

        const reminderDate = screen.getByLabelText('Reminder Date (Optional)');
        expect(reminderDate).toBeDefined();

        expect(screen.getByLabelText('To Buy')).toBeDefined();

        act(() => {
          fireEvent(screen.getByLabelText('To Buy'), 'press');
        });

        const amount = screen.getByLabelText('Expected amount (Optional)');
        expect(amount).toBeDefined();
      });
    });
  });
});

function renderComponent() {
  return render(<AddTaskForm />);
}
