import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Home: undefined;
  Task: undefined; // ?: change this later
  CreateTask: undefined;
};

export type StackNavProps<T extends keyof StackParamList> = {
  navigation: StackNavigationProp<StackParamList, T>;
  route: RouteProp<StackParamList, T>;
};
