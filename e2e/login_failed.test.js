const {device, expect, element, by, waitFor} = require('detox');

// Định nghĩa mock data
const mockCredentials = {
  email: 'hao@gmail.com',
  password: '12345',
};

const mockInvalidCredentials = {
  email: 'wrong@email.com',
  password: 'wrongpass',
};

describe('Example navigation flow with login failed and loading', () => {
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

  it('should fail to navigate from login with incorrect credentials', async () => {
    console.log('Navigating to login screen');
    await waitFor(element(by.id('press_to_login')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('press_to_login')).tap();
    await waitFor(element(by.id('login_screen')))
      .toBeVisible()
      .withTimeout(5000);
    console.log('Entering mock invalid credentials');
    await element(by.id('login_screen')).tap();
    await element(by.id('email_input')).replaceText(
      mockInvalidCredentials.email,
    );
    await element(by.id('password_input')).replaceText(
      mockInvalidCredentials.password,
    );
    await waitFor(element(by.id('on_press_login')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('on_press_login')).tap();
    console.log('Tapped with wrong credentials, waiting for loading');
    await waitFor(element(by.text('Loading...')))
      .toBeVisible()
      .withTimeout(3000);
    await waitFor(element(by.id('login_screen')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('home_screen'))).not.toBeVisible();
  });
});
