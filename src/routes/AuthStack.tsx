/* eslint-disable import/no-cycle */
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { Signup } from '../screens/SignUp';

export type AuthParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

const Auth = createStackNavigator<AuthParamList>();

export const AuthStack = (): JSX.Element => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="SignUp" component={Signup} />
    </Auth.Navigator>
  );
};
