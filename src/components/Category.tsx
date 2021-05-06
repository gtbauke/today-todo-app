/* eslint-disable react/require-default-props */
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { useStyle } from '../styles/Style';
import { Category as CategoryModel } from '../models/Category';

interface CategoryProps {
  category: CategoryModel;
  isOdd: boolean;
  isSelected: boolean;
  onPress: () => void;
  addCard?: boolean;
}

export const Category = ({
  category,
  isOdd,
  isSelected,
  onPress,
  addCard = false,
}: CategoryProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      backgroundColor: isSelected ? '#fff' : '#f6f6f6',
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
      width: `${(100 * category.completedTasks) / category.tasks}%`,
      height: '100%',
      borderRadius: 100,
      backgroundColor: isOdd
        ? theme.colors.accent[500]
        : theme.colors.primary[500],
    },
  }));

  if (addCard) {
    return (
      <TouchableNativeFeedback
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#f7f7f7', false)}
      >
        <Text style={styles.title}>Add category</Text>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableNativeFeedback
      style={styles.container}
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#f7f7f7', false)}
    >
      <Text style={styles.taskCount}>
        {category.tasks} {category.tasks === 1 ? 'Task' : 'Tasks'}
      </Text>
      <Text style={styles.title}>{category.name}</Text>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
    </TouchableNativeFeedback>
  );
};
