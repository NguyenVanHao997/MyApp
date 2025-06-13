import './gesture-handler';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NotifierWrapper>
          <Navigation />
        </NotifierWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
