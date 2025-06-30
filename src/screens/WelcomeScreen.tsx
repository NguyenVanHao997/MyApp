/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {navigate} from '../utils/NavigationUtil';
import {useScreenPerformanceTracking} from '../hooks/useScreenPerformanceTracking';
import DeviceInfo from 'react-native-device-info';
// import {cu} from '@hot-updater/react-native';
import {HotUpdater} from '@hot-updater/react-native';

// You can replace the value below with your actual app version or import it from a config file
const __APP_VERSION__ = DeviceInfo.getVersion();

const WelcomeScreen = () => {
  const loadTime = useScreenPerformanceTracking({
    screenName: 'welcome_screen',
  });
  const [targetVersion, setTargetVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdateInfo = async () => {
      try {
        const info = await HotUpdater.checkForUpdate({
          source:
            'https://hot-updater-e4nrvxfcuq-as.a.run.app/api/check-update', // ← thay bằng URL của bạn
        });

        if (info?.target_app_version) {
          setTargetVersion(info.target_app_version);
        } else {
          setTargetVersion(null);
        }
      } catch (error) {
        console.log('❌ Error checking for update:', error);
        setTargetVersion(null);
      }
    };

    fetchUpdateInfo();
  }, []);
  // const [info, setInfo] = React.useState<any>(null);

  // React.useEffect(() => {
  //   const fetchUpdateInfo = async () => {
  //     const updateInfo = await hotUpdater.getAppVersion();
  //     setInfo(updateInfo);
  //   };
  //   fetchUpdateInfo();
  // }, []);

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
      <Text>version : {targetVersion}</Text>
    </View>
  );
};

export default WelcomeScreen;
