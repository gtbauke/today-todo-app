import React, { useState, useCallback } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';

import { useStyle } from '../../styles/Style';
import { categories, tasks as inititalTasks } from '../../services/fakeData';
import { Category } from '../../components/Category';
import { Task } from '../../components/Task';

export const Home: React.FC = () => {
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

  const [tasks, setTasks] = useState(inititalTasks);

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

      setTasks(newTasks);
    },
    [tasks],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, Gustavo!</Text>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
          paddingVertical: 16,
          width: Dimensions.get('screen').width,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: '100%', height: 24 }} />
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
    </View>
  );
};
