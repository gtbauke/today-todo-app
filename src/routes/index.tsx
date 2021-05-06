import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStack } from './AuthStack';
import { StackParamList } from './MainRoutes';
import { Header, CreateTaskHeader } from '../components/Header';
import { Home } from '../screens/Home';
import { Task } from '../screens/Task';
import { CreateTask } from '../screens/CreateTask';
import { AuthContext } from '../contexts/AuthContext';

const StackNavigator = createStackNavigator<StackParamList>();

export const Routes = (): JSX.Element => {
  const { isSigned } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isSigned ? (
        <StackNavigator.Navigator
          screenOptions={{
            headerShown: true,
            header: props => <Header {...props} />,
          }}
        >
          <StackNavigator.Screen name="Home" component={Home} />
          <StackNavigator.Screen name="Task" component={Task} />
          <StackNavigator.Screen
            name="CreateTask"
            component={CreateTask}
            options={{
              header: props => <CreateTaskHeader {...props} />,
            }}
          />
        </StackNavigator.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
