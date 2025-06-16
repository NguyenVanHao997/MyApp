import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import * as NavigationUtils from '../../src/utils/NavigationUtil';

jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const {getByTestId, getByText} = render(<HomeScreen />);
    expect(getByTestId('home_screen')).toBeTruthy();
    expect(getByText('HomeScreen')).toBeTruthy();
  });

  it('calls navigate to Welcome when back button is pressed', () => {
    const {getByTestId} = render(<HomeScreen />);
    fireEvent.press(getByTestId('go_back_home'));
    expect(NavigationUtils.navigate).toHaveBeenCalledWith('Welcome');
  });
});
