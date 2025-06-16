const {device, element, by, waitFor} = require('detox');

const mockCredentials = {
  email: 'hao@gmail.com',
  password: '123456',
};

describe('Login flow with success and error', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();

    // Đảm bảo đang ở Welcome screen
    await waitFor(element(by.id('welcome')))
      .toBeVisible()
      .withTimeout(5000);

    // Điều hướng tới Login screen
    await element(by.id('button_navigate_login')).tap();

    await waitFor(element(by.id('login_screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should navigate from login to home screen with correct credentials', async () => {
    await element(by.id('email_input')).replaceText(mockCredentials.email);
    await element(by.id('password_input')).replaceText(
      mockCredentials.password,
    );

    await element(by.id('submit_button')).tap();

    // Có thể bỏ dòng này nếu loading quá nhanh:
    // await waitFor(element(by.text('Loading...')))
    //   .toBeVisible()
    //   .withTimeout(2000);

    await waitFor(element(by.id('home_screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show error when login with incorrect credentials', async () => {
    await element(by.id('email_input')).replaceText('wrong@email.com');
    await element(by.id('password_input')).replaceText('wrongpass');

    await element(by.id('submit_button')).tap();

    await waitFor(element(by.id('error_text')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
