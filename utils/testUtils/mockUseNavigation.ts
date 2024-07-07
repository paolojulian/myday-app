export function mockUseNavigation() {
  jest.mock('expo-router', () => ({
    ...jest.requireActual('expo-router'),
    useNavigation: jest.fn(),
  }));
}
