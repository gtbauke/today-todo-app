/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Theme, ThemeContext } from '../contexts/ThemeContext';

export type StyleFactory<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
> = (theme: Theme) => T | StyleSheet.NamedStyles<T>;

export const useStyle = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  factory: StyleFactory<T>,
): T | StyleSheet.NamedStyles<T> => {
  const theme = useContext(ThemeContext);
  const styles = factory(theme);

  return useMemo(() => StyleSheet.create(styles), [styles]);
};
