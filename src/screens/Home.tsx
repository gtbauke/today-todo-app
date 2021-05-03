/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useContext } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useStyle } from '../styles/Style';
import { categories } from '../services/fakeData';
import { Category } from '../components/Category';
import { Task } from '../components/Task';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { StackNavProps } from '../routes/MainRoutes';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTasks } from '../hooks/useTasks';
import { AuthContext } from '../contexts/AuthContext';

const { width } = Dimensions.get('screen');

export const Home = ({ navigation }: StackNavProps<'Home'>): JSX.Element => {
  const defaultTheme = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const styles = useStyle(theme => ({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.white,
      paddingVertical: 24,
    },

    text: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
      marginLeft: 16,
    },

    heading: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.larger,
      fontWeight: 'bold',
      marginBottom: 16,
      marginLeft: 16,
    },

    subHeading: {
      color: theme.colors.gray[800],
      fontSize: theme.fontSizes.sm,
      marginBottom: 8,
      marginLeft: 16,
    },
  }));

  const { tasks, setTasks, mutate } = useTasks();

  const handleTaskIndicatorPress = useCallback(
    (index: number) => {
      const newTasks = tasks.map((task, i) =>
        index === i
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      );

      mutate(newTasks, true);
    },
    [tasks, mutate],
  );

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.heading}>Hello, Gustavo!</Text>
        </TouchableOpacity>
        <Text style={styles.subHeading}>Categories</Text>
        <FlatList
          style={{
            height: 150,
            flexGrow: 0,
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ width: 24, height: '100%' }} />
          )}
          renderItem={({ item, index }) => (
            <Category
              name={item.name}
              tasks={item.taskCount}
              completedTasks={item.completedTasks}
              isOdd={index % 2 !== 0}
            />
          )}
        />
        <Text style={styles.subHeading}>Today&apos;s tasks</Text>
        {tasks ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 16,
              width,
            }}
            ItemSeparatorComponent={() => (
              <View style={{ width: '100%', height: 16 }} />
            )}
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Task
                task={item}
                isOdd={index % 2 !== 0}
                index={index}
                onIndicatorPress={handleTaskIndicatorPress}
              />
            )}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color={defaultTheme.colors.accent[500]}
          />
        )}
      </View>
      <FloatingActionButton onPress={() => navigation.navigate('CreateTask')} />
    </>
  );
};
