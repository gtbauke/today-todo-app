import React from 'react';
import { Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { useStyle } from '../styles/Style';

interface CategoryProps {
  name: string;
  tasks: number;
  completedTasks: number;
  isOdd: boolean;
}

export const Category = ({
  name,
  tasks,
  completedTasks,
  isOdd,
}: CategoryProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      backgroundColor: '#fff',
      elevation: 3,
      height: 125,
      width: 250,
      borderRadius: 10,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },

    taskCount: {
      color: theme.colors.gray[900],
      fontSize: theme.fontSizes.sm,
      marginBottom: 4,
    },

    title: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: 8,
    },

    progressBar: {
      width: '100%',
      height: 5,
      borderRadius: 100,
      backgroundColor: theme.colors.gray[400],
    },

    progress: {
      width: `${(100 * completedTasks) / tasks}%`,
      height: '100%',
      borderRadius: 100,
      backgroundColor: isOdd
        ? theme.colors.accent[500]
        : theme.colors.primary[500],
    },
  }));

  return (
    <TouchableNativeFeedback
      style={styles.container}
      background={TouchableNativeFeedback.Ripple('#f7f7f7', false)}
    >
      <Text style={styles.taskCount}>
        {tasks} {tasks === 1 ? 'Task' : 'Tasks'}
      </Text>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
    </TouchableNativeFeedback>
  );
};
