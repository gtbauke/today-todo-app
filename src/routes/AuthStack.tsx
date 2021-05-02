import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import { Login } from '../screens/Login';

export type AuthParamList = {
  Login: undefined;
  SignUp: { email: string; password: string } | undefined;
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
    </Auth.Navigator>
  );
};
