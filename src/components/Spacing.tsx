/* eslint-disable react/require-default-props */
import React from 'react';
import { View } from 'react-native';

interface SpacingProps {
  size: React.ReactText;
  horizontal?: boolean;
}

export const Spacing = ({
  size,
  horizontal = false,
}: SpacingProps): JSX.Element => {
  if (horizontal) {
    return <View style={{ width: size, height: '100%' }} />;
  }

  return <View style={{ height: size, width: '100%' }} />;
};
