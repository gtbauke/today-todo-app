/* eslint-disable react/require-default-props */
import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Dimensions } from 'react-native';

import { useStyle } from '../styles/Style';

const { width } = Dimensions.get('screen');

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  rippleColor: string;
}

export const Button = ({
  children,
  onPress,
  rippleColor,
}: ButtonProps): JSX.Element => {
  const styles = useStyle(theme => ({
    button: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 0.75 * width,
      height: 48,
    },
  }));

  return (
    <TouchableNativeFeedback
      style={styles.button}
      background={TouchableNativeFeedback.Ripple(rippleColor, false, 150)}
      onPress={onPress}
    >
      {children}
    </TouchableNativeFeedback>
  );
};
