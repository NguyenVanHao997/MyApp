import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {navigate} from '../utils/NavigationUtil';
import {useScreenPerformanceTracking} from '../hooks/useScreenPerformanceTracking';
import * as Sentry from '@sentry/react-native';
import collectSystemInfo from '../helpers/collectSystemInfo';

const HomeScreen = () => {
  const loadTime = useScreenPerformanceTracking({
    screenName: 'home_screen',
  });

  return (
    <View testID="home_screen">
      <TouchableOpacity
        onPress={() => {
          navigate('Welcome');
        }}
        testID="go_back_home">
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>HomeScreen 123 45</Text>

      <Button
        title="Test Crash"
        onPress={() => {
          collectSystemInfo();
          throw new Error('Test crash from release build');
        }}
      />

      <Button
        title="Send test error"
        onPress={() => {
          collectSystemInfo();
          Sentry.captureException(
            new Error('🔁 Test crash from release build'),
          );
        }}
      />
      {loadTime !== null ? <Text>⏱ Dev Load: {loadTime}ms</Text> : null}
    </View>
  );
};

export default HomeScreen;
