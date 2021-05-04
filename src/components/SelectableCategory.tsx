/* eslint-disable react/require-default-props */
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Text } from 'react-native';

import { Category } from '../models/Category';
import { useStyle } from '../styles/Style';

interface SelectableCategoryProps {
  category: Category;
  isSelected: boolean;
  onPress: (id: string) => void;
}

export const SelectableCategory = ({
  category,
  isSelected,
  onPress,
}: SelectableCategoryProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      borderColor: isSelected ? theme.colors.gray[400] : theme.colors.gray[100],
      borderWidth: 2,
      borderRadius: 10,
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: 200,
      height: 48,
    },

    title: {
      color: theme.colors.gray[600],
      fontSize: theme.fontSizes.md,
      fontWeight: 'bold',
    },

    icon: {
      color: theme.colors.gray[600],
    },
  }));

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category.id)}
    >
      <Text style={styles.title}>{category.name}</Text>
      <Feather name={isSelected ? 'x' : 'plus'} size={24} style={styles.icon} />
    </TouchableOpacity>
  );
};
