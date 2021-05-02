import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStack } from './AuthStack';
import { StackParamList } from './MainRoutes';
import { Header } from '../components/Header';
import { Home } from '../screens/Home';
import { Task } from '../components/Task';
import { CreateTask } from '../screens/CreateTask';

const StackNavigator = createStackNavigator<StackParamList>();

export const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      {/* <StackNavigator.Navigator
      screenOptions={{
        headerShown: true,
        header: props => <Header {...props} />,
      }}
    >
      <StackNavigator.Screen name="Home" component={Home} />
      <StackNavigator.Screen name="Task" component={Task} />
      <StackNavigator.Screen name="CreateTask" component={CreateTask} />
    </StackNavigator.Navigator> */}
      {/* <MainNavigator /> */}
      <AuthStack />
    </NavigationContainer>
  );
};
