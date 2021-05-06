/* eslint-disable react/require-default-props */
import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Dimensions, Text } from 'react-native';

import { useStyle } from '../styles/Style';

const { width } = Dimensions.get('screen');

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  rippleColor: string;
  variant?: 'filled' | 'outlined';
}

export const Button = ({
  children,
  onPress,
  rippleColor,
  variant = 'filled',
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
      elevation: 3,
    },

    outlined: {
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 10,
      elevation: 3,
      width: 0.75 * width,
      height: 48,
      borderWidth: 4,
      borderColor: theme.colors.primary[500],
    },

    outlinedText: {
      color: theme.colors.primary[500],
      fontSize: theme.fontSizes.lg,
      fontWeight: 'bold',
    },
  }));

  if (variant === 'outlined') {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(rippleColor, false, 150)}
        onPress={onPress}
        style={styles.outlined}
      >
        {typeof children === 'string' ? (
          <Text style={styles.outlinedText}>{children}</Text>
        ) : (
          children
        )}
      </TouchableNativeFeedback>
    );
  }

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
