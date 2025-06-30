/* eslint-disable react-native/no-inline-styles */
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import React, {useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import './gesture-handler';
import {VERSION_CODE} from './src/build_info';
import Navigation from './src/navigation/Navigation';
import {store} from './src/redux/store';
import {
  checkInitialNotification,
  registerBackgroundNotificationHandler,
  registerForegroundNotificationHandler,
} from './src/services/notificationHandler';
import {handleIncomingMessage} from './src/services/notificationService';
import {setupFCM} from './src/firebase/notifications';
import {HotUpdater, getUpdateSource} from '@hot-updater/react-native';
import {ActivityIndicator, Text, View} from 'react-native';

Sentry.init({
  dsn: 'https://3f97d227a0f0d01dae318f53bfff85a5@o4509557492482048.ingest.us.sentry.io/4509557494644736',
  sendDefaultPii: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],
  release: `myapp@dev_${VERSION_CODE}`,
  dist: `${VERSION_CODE}`,
  environment: 'development',
});

Sentry.setUser({
  id: `hao_VSmart_${DeviceInfo.getDeviceId()}`,
  email: 'hao@gmail.com',
  username: 'hao',
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 [Background] FCM received:', remoteMessage);
  await handleIncomingMessage(remoteMessage);
});

registerBackgroundNotificationHandler();

const App = () => {
  useEffect(() => {
    const init = async () => {
      await setupFCM();
    };
    init();
  }, []);

  useEffect(() => {
    checkInitialNotification();
  }, []);

  useEffect(() => {
    registerForegroundNotificationHandler();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await handleIncomingMessage(remoteMessage);
    });

    return unsubscribe;
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NotifierWrapper>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </NotifierWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
const WrappedApp = HotUpdater.wrap({
  source: getUpdateSource(
    'https://hot-updater-e4nrvxfcuq-as.a.run.app/api/check-update',
    {
      updateStrategy: 'appVersion',
    },
  ),
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },
  onUpdateProcessCompleted: () => {
    // if you want to do something after the update, you can do it here
  },

  fallbackComponent: ({progress, status}) => (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      {/* You can put a splash image here. */}
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator color="white" size="large" />
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {status === 'UPDATING' ? 'Updating...' : 'Checking for Update...'}
        </Text>
        {progress > 0 ? (
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            {Math.round(progress * 100)}%
          </Text>
        ) : null}
      </View>
    </View>
  ),
})(App);
export default Sentry.wrap(
  WrappedApp as React.ComponentType<Record<string, unknown>>,
);
