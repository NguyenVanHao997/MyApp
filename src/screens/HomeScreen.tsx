import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '../utils/NavigationUtils';

const HomeScreen = () => {
  return (
    <View testID="home_screen">
      <TouchableOpacity
        onPress={() => {
          navigate('Welcome');
        }}
        testID="go_back_home">
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
