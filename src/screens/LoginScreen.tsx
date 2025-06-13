/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import React from 'react';
import {navigate} from '../utils/NavigationUtils';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleLogin = () => {
    setLoading(true);
    const testEmail = 'hao@gmail.com';
    const testPassword = '12345';
    setTimeout(() => {
      if (email === testEmail && password === testPassword) {
        setLoading(false);
        navigate('home');
      } else {
        setLoading(false);
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    }, 2000);
  };
  return (
    <View testID="login_screen">
      <TouchableOpacity
        onPress={() => {
          navigate('Welcome');
        }}
        testID="go_back_home">
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>LoginScreen</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{marginTop: 24}}>
          <TextInput
            testID="email_input"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              marginBottom: 12,
              marginHorizontal: 24,
            }}
          />
          <TextInput
            testID="password_input"
            value={password}
            onChangeText={setPassword}
            style={{
              borderWidth: 1,
              marginBottom: 12,
              marginHorizontal: 24,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              //   navigate('home');
              handleLogin();
            }}
            testID="on_press_login"
            style={{
              marginHorizontal: 24,
              backgroundColor: 'green',
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 12,
                color: 'white',
                fontSize: 16,
              }}>
              login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
