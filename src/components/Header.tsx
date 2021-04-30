import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { View, Platform, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../styles/Style';

export const Header = (props: StackHeaderProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      backgroundColor: theme.colors.white,
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      paddingHorizontal: 16,
      paddingVertical: 8,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    text: {
      fontSize: theme.fontSizes.larger,
      fontWeight: 'bold',
      color: theme.colors.black,
    },

    icon: {
      color: theme.colors.black,
    },

    iconGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 'auto',
      width: '16%',
    },
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="menu" style={styles.icon} size={24} />
      </TouchableOpacity>
      <View style={styles.iconGroup}>
        <TouchableOpacity>
          <Feather name="search" style={styles.icon} size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bell" style={styles.icon} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
