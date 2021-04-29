import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Task as TaskModel } from '../models/Task';
import { useStyle } from '../styles/Style';

interface TaskProps {
  task: TaskModel;
  isOdd: boolean;
  index: number;
  onIndicatorPress: (index: number) => void;
}

export const Task = ({
  task,
  isOdd,
  onIndicatorPress,
  index,
}: TaskProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      width: '100%',
      height: 80,
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 3,
      paddingVertical: 8,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    indicator: {
      width: 28,
      height: 28,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: isOdd ? theme.colors.accent[500] : theme.colors.primary[500],
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },

    icon: {
      color: isOdd ? theme.colors.accent[500] : theme.colors.primary[500],
    },

    text: {
      fontSize: theme.fontSizes.md,
    },
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.indicator}
        onPress={() => onIndicatorPress(index)}
      >
        {task.completed && (
          <Feather name="check" size={20} style={styles.icon} />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>{task.title}</Text>
    </View>
  );
};