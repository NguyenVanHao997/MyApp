/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useEffect} from 'react';
import {navigate} from '../utils/NavigationUtil';
import {useScreenPerformanceTracking} from '../hooks/useScreenPerformanceTracking';
import * as Sentry from '@sentry/react-native';
import collectSystemInfo from '../helpers/collectSystemInfo';
import {VERSION_CODE} from '../build_info';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import {requestNotificationPermission} from '../hooks/PermissionNotification';

const HomeScreen = () => {
  const loadTime = useScreenPerformanceTracking({
    screenName: 'home_screen',
  });

  return (
    <View testID="home_screen">
      <TouchableOpacity
        onPress={() => {
          navigate('welcome');
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
      <Button
        title="manual sent error"
        onPress={() => {
          throw new Error('🔥 Manual crash at dev_' + VERSION_CODE);
        }}
      />
      {loadTime !== null ? <Text>⏱ Dev Load: {loadTime}ms</Text> : null}
    </View>
  );
};

export default HomeScreen;
