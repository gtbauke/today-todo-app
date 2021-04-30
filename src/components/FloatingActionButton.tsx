import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Dimensions } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { useStyle } from '../styles/Style';

const { width } = Dimensions.get('screen');

interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton = ({
  onPress,
}: FloatingActionButtonProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      position: 'absolute',
      backgroundColor: theme.colors.primary[500],
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      bottom: 48,
      left: width - 96,
    },

    button: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },

    icon: {
      color: theme.colors.white,
    },
  }));

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={onPress}
        style={styles.button}
        background={TouchableNativeFeedback.Ripple('#231FAE', false, 28)}
      >
        <Feather name="plus" size={32} style={styles.icon} />
      </TouchableNativeFeedback>
    </View>
  );
};
