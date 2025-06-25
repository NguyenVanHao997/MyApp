/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '../utils/loginSchema';
import {navigate} from '../utils/NavigationUtil';
import {useScreenPerformanceTracking} from '../hooks/useScreenPerformanceTracking';
const LoginScreen = () => {
  const loadTime = useScreenPerformanceTracking({
    screenName: 'login_screen',
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    clearErrors,
  } = useForm({resolver: yupResolver(loginSchema), mode: 'onChange'});

  const [loading, setLoading] = React.useState(false);

  const onSubmit = (data: any) => {
    clearErrors();
    setLoading(true);
    const {email, password} = data;

    setTimeout(() => {
      if (email === 'hao@gmail.com' && password === '123456') {
        setLoading(false);
        navigate('home');
      } else {
        setLoading(false);
        setError('root', {type: 'manual', message: 'Invalid credentials'});
      }
    }, 1000);
  };

  return (
    <View testID="login_screen">
      <TouchableOpacity
        onPress={() => navigate('Welcome')}
        testID="go_back_home">
        <Text>Back</Text>
      </TouchableOpacity>

      <Text>LoginScreen</Text>

      {loading ? (
        <View testID="view_loading">
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={{marginTop: 24}}>
          <View>
            {errors.root?.message && (
              <Text testID="error_text" style={{color: 'red'}}>
                {errors.root.message}
              </Text>
            )}

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value}}) => (
                <>
                  <TextInput
                    testID="email_input"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{
                      marginBottom: 12,
                      borderWidth: 1,
                      marginHorizontal: 12,
                    }}
                  />
                  {errors.email && (
                    <Text testID="email_error" style={{color: 'red'}}>
                      {errors.email.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value}}) => (
                <>
                  <TextInput
                    testID="password_input"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    style={{
                      marginBottom: 12,
                      borderWidth: 1,
                      marginHorizontal: 12,
                    }}
                  />
                  {errors.password && (
                    <Text testID="password_error" style={{color: 'red'}}>
                      {errors.password.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Submit Button */}
            <TouchableOpacity
              testID="submit_button"
              onPress={handleSubmit(onSubmit)}>
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loadTime !== null ? <Text>⏱ Dev Load: {loadTime}ms</Text> : null}
    </View>
  );
};

export default LoginScreen;
