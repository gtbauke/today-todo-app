import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Task } from '../screens/Task';
import { Header } from '../components/Header';
import { CreateTask } from '../screens/CreateTask';
import { StackParamList } from './MainRoutes';

const StackNavigator = createStackNavigator<StackParamList>();

export const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        screenOptions={{
          headerShown: true,
          header: props => <Header {...props} />,
        }}
      >
        <StackNavigator.Screen name="Home" component={Home} />
        <StackNavigator.Screen name="Task" component={Task} />
        <StackNavigator.Screen name="CreateTask" component={CreateTask} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
