/* eslint-disable @typescript-eslint/no-unused-vars */
import './gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {
  listenToForegroundNotifications,
  setupFCM,
} from './src/firebase/notifications';
import * as Sentry from '@sentry/react-native';
import {VERSION_CODE} from './src/build_info';

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

const App = () => {
  useEffect(() => {
    const init = async () => {
      await setupFCM();
    };

    init();

    const unsubscribe = listenToForegroundNotifications();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NotifierWrapper>
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <Navigation />
            {/* </PersistGate> */}
          </Provider>
        </NotifierWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Sentry.wrap(App);
