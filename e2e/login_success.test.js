const {device, expect, element, by, waitFor} = require('detox');

const mockCredentials = {
  email: 'hao@gmail.com',
  password: '12345',
};

describe('Example navigation flow with login success and loading', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await waitFor(element(by.id('welcome')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should navigate from welcome to login screen', async () => {
    console.log('Trying to tap press_to_login');
    await waitFor(element(by.id('press_to_login')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('press_to_login')).tap();
    console.log('Tapped press_to_login, waiting for login_screen');
    await waitFor(element(by.id('login_screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should navigate from login to home screen with correct credentials', async () => {
    console.log('Navigating to login screen');
    await waitFor(element(by.id('press_to_login')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('press_to_login')).tap();
    await waitFor(element(by.id('login_screen')))
      .toBeVisible()
      .withTimeout(5000);
    console.log('Entering mock credentials');
    await element(by.id('login_screen')).tap();
    await element(by.id('email_input')).replaceText(mockCredentials.email);
    await element(by.id('password_input')).replaceText(
      mockCredentials.password,
    );
    console.log('Trying to tap on_press_login');
    await waitFor(element(by.id('on_press_login')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('on_press_login')).tap();
    console.log('Tapped on_press_login, waiting for loading');
    await waitFor(element(by.text('Loading...')))
      .toBeVisible()
      .withTimeout(3000);
    await waitFor(element(by.id('home_screen')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
