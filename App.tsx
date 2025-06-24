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

export default App;
