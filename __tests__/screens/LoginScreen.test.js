import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import {navigate} from '../../src/utils/NavigationUtil';

jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
});
// afterEach(() => {
//   jest.runOnlyPendingTimers();
//   jest.useRealTimers();
//   jest.clearAllMocks();
//   jest.clearAllTimers();
// });

describe('LoginScreen', () => {
  it('navigates to home on correct credentials', async () => {
    const {getByTestId, queryByTestId} = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('email_input'), 'hao@gmail.com');
    fireEvent.changeText(getByTestId('password_input'), '123456');
    fireEvent.press(getByTestId('submit_button'));

    await act(async () => {
      jest.advanceTimersByTime(1000);
      await Promise.resolve(); // flush
    });
    await act(async () => {
      jest.runAllTimers(); // chạy hết setTimeout
    });

    expect(queryByTestId('view_loading')).toBeNull();
    expect(navigate).toHaveBeenCalledWith('home');
  });

  it('shows email required error when empty', async () => {
    const {getByTestId, findByText} = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('email_input'), '');
    fireEvent.changeText(getByTestId('password_input'), '12345');
    fireEvent.press(getByTestId('submit_button'));

    expect(await findByText('Email là bắt buộc')).toBeTruthy();
  });

  it('shows email validation error on invalid format', async () => {
    const {getByTestId, findByText} = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('email_input'), 'invalid-email');
    fireEvent.changeText(getByTestId('password_input'), '12345');
    fireEvent.press(getByTestId('submit_button'));

    expect(await findByText('Email không hợp lệ')).toBeTruthy();
  });

  it('shows password too short error', async () => {
    const {getByTestId, findByText} = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('email_input'), 'hao@gmail.com');
    fireEvent.changeText(getByTestId('password_input'), '123');
    fireEvent.press(getByTestId('submit_button'));

    expect(await findByText('Mật khẩu phải có ít nhất 6 ký tự')).toBeTruthy();
  });

  it('shows root error on invalid credentials', async () => {
    const {getByTestId, findByText} = render(<LoginScreen />);

    fireEvent.changeText(getByTestId('email_input'), 'wrong@gmail.com');
    fireEvent.changeText(getByTestId('password_input'), 'wrongpass');
    fireEvent.press(getByTestId('submit_button'));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await act(async () => {
      jest.runAllTimers(); // giả lập chờ timeout
    });

    expect(await findByText('Invalid credentials')).toBeTruthy();
  });
  it('navigates to Welcome screen when back button is pressed', () => {
    const {getByTestId} = render(<LoginScreen />);

    fireEvent.press(getByTestId('go_back_home'));

    expect(navigate).toHaveBeenCalledWith('Welcome');
  });

  it('clears root error after successful login', async () => {
    const {getByTestId, queryByText} = render(<LoginScreen />);

    // Nhập sai trước
    fireEvent.changeText(getByTestId('email_input'), 'wrong@gmail.com');
    fireEvent.changeText(getByTestId('password_input'), 'wrongpass');
    fireEvent.press(getByTestId('submit_button'));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    await act(async () => {
      jest.runAllTimers(); // giả lập chờ timeout
    });

    expect(queryByText('Invalid credentials')).toBeTruthy();

    // Nhập đúng sau
    fireEvent.changeText(getByTestId('email_input'), 'hao@gmail.com');
    fireEvent.changeText(getByTestId('password_input'), '123456');
    fireEvent.press(getByTestId('submit_button'));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    await act(async () => {
      jest.runAllTimers(); // chạy hết setTimeout
    });

    expect(navigate).toHaveBeenCalledWith('home');
    expect(queryByText('Invalid credentials')).toBeNull();
  });
});
