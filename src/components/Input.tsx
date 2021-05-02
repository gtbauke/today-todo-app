/* eslint-disable react/require-default-props */
import React, { forwardRef, useContext, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useStyle } from '../styles/Style';
import { ThemeContext } from '../contexts/ThemeContext';

interface Props {
  icon: 'email' | 'eye' | 'eye-off';
  onIconPress?: () => void;
}

type InputProps = Props & TextInputProps;

// export const Input = (;

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      icon,
      onIconPress,
      onFocus,
      onBlur,
      value,
      onChangeText,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const defaultTheme = useContext(ThemeContext);

    const [isFocused, setIsFocused] = useState(false);
    const placeholderLeft = useSharedValue(8);
    const placeholderTop = useSharedValue(8);
    const placeholderSize = useSharedValue(defaultTheme.fontSizes.md);

    const styles = useStyle(theme => ({
      input: {
        backgroundColor: '#fff',
        width: '90%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: isFocused
          ? theme.colors.gray[900]
          : theme.colors.gray[200],
        borderBottomWidth: 2,
        paddingHorizontal: 8,
        position: 'relative',
      },

      textInput: {
        height: '100%',
        flex: 1,
        fontSize: theme.fontSizes.sm,
        paddingHorizontal: 8,
        paddingTop: 16,
      },

      icon: {
        color: isFocused ? theme.colors.gray[900] : theme.colors.gray[200],
      },

      placeholder: {
        position: 'absolute',
        color: isFocused ? theme.colors.gray[900] : theme.colors.gray[200],
      },
    }));

    const placeholderStyles = useAnimatedStyle(() => ({
      left: placeholderLeft.value,
      top: placeholderTop.value,
      fontSize: placeholderSize.value,
    }));

    const handleInputFocus = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      placeholderLeft.value = withTiming(4, { duration: 250 });
      placeholderTop.value = withTiming(4, { duration: 250 });
      placeholderSize.value = withTiming(10, {
        duration: 250,
      });

      setIsFocused(true);
      onFocus?.(event);
    };

    const handleInputBlur = (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      placeholderLeft.value = withTiming(8, { duration: 250 });
      placeholderTop.value = withTiming(8, { duration: 250 });
      placeholderSize.value = withTiming(defaultTheme.fontSizes.md, {
        duration: 250,
      });

      setIsFocused(false);
      onBlur?.(event);
    };

    return (
      <View style={styles.input}>
        <Animated.Text style={[styles.placeholder, placeholderStyles]}>
          {placeholder}
        </Animated.Text>
        <TextInput
          ref={ref}
          style={styles.textInput}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />
        {icon !== 'email' ? (
          <TouchableOpacity onPress={onIconPress}>
            <MaterialCommunityIcons
              name={icon as any}
              style={styles.icon}
              size={28}
            />
          </TouchableOpacity>
        ) : (
          <MaterialCommunityIcons
            name={icon as any}
            style={styles.icon}
            size={28}
          />
        )}
      </View>
    );
  },
);
