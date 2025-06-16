import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import WelcomeScreen from '../../src/screens/WelcomeScreen';
import * as NavigationUtils from '../../src/utils/NavigationUtil';

jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

describe('WelcomeScreen', () => {
  it('renders welcome screen correctly', () => {
    const {getByTestId, getByText} = render(<WelcomeScreen />);

    expect(getByTestId('welcome')).toBeTruthy();
    expect(getByText('Home Screen')).toBeTruthy();
    expect(getByText('Login Screen')).toBeTruthy();
    expect(getByText('WelcomeScreen')).toBeTruthy();
  });

  it('navigates to Home screen when pressing Home button', () => {
    const {getByTestId} = render(<WelcomeScreen />);
    fireEvent.press(getByTestId('press_to_home'));

    expect(NavigationUtils.navigate).toHaveBeenCalledWith('home');
  });

  it('navigates to Login screen when pressing Login button', () => {
    const {getByTestId} = render(<WelcomeScreen />);
    fireEvent.press(getByTestId('press_to_login'));

    expect(NavigationUtils.navigate).toHaveBeenCalledWith('login');
  });
});
