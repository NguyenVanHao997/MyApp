/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '../utils/NavigationUtils';

const WelcomeScreen = () => {
  return (
    <View testID="welcome">
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
      <Text>WelcomeScreen</Text>
    </View>
  );
};

export default WelcomeScreen;
