import './gesture-handler';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {Text, View} from 'react-native';

const App = () => {
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
