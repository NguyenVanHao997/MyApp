const {device, element, by, waitFor} = require('detox');

describe('Flow navigate to home', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('welcome')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('press_to_home')).tap();

    await waitFor(element(by.id('home_screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should navigate to home screen', async () => {
    await element(by.id('go_back_home')).tap();
    await waitFor(element(by.id('welcome')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
