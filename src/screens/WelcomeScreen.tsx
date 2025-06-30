/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '../utils/NavigationUtil';
import {useScreenPerformanceTracking} from '../hooks/useScreenPerformanceTracking';
import DeviceInfo from 'react-native-device-info';

// You can replace the value below with your actual app version or import it from a config file
const __APP_VERSION__ = DeviceInfo.getVersion();

const WelcomeScreen = () => {
  const loadTime = useScreenPerformanceTracking({
    screenName: 'welcome_screen',
  });
  return (
    <View testID="welcome">
      <View testID="button_navigate_home">
        <TouchableOpacity
          testID="press_to_home"
          style={{borderWidth: 1, marginBottom: 12}}
          onPress={() => {
            navigate('home');
          }}>
          <Text style={{color: 'red', marginVertical: 8, marginHorizontal: 24}}>
            Home Screen
          </Text>
        </TouchableOpacity>
      </View>
      <View testID="button_navigate_login">
        <TouchableOpacity
          testID="press_to_login"
          style={{borderWidth: 1, marginBottom: 12}}
          onPress={() => {
            navigate('login');
          }}>
          <Text style={{color: 'red', marginVertical: 8, marginHorizontal: 24}}>
            Login Screen
          </Text>
        </TouchableOpacity>
      </View>
      <Text>WelcomeScreen</Text>
      {loadTime !== null ? <Text>⏱ Dev Load: {loadTime}ms</Text> : null}
      <Text>version : {__APP_VERSION__}</Text>
    </View>
  );
};

export default WelcomeScreen;
