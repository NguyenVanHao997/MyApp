/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {View} from 'react-native';
import * as Sentry from '@sentry/react-native';
import {getActiveRouteName} from '../helpers';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

const Navigation = () => {
  const routeNameRef = useRef<string | undefined>(undefined);

  return (
    <View style={{flex: 1}}>
      <NavigationContainer
        onReady={() => {
          routeNameRef.current = navigationRef.current
            ? navigationRef.current.getCurrentRoute()?.name
            : undefined;
        }}
        ref={navigationRef}
        onStateChange={state => {
          const previousRouteName = routeNameRef.current;
          const currentRoute = getActiveRouteName(state);

          Sentry.addBreadcrumb({
            category: 'navigation',
            message: `Navigated from ${previousRouteName} to ${currentRoute}`,
            level: 'info',
          });
          routeNameRef.current = currentRoute;
        }}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
