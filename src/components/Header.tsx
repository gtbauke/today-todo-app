import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { View, Platform, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../styles/Style';

export const Header = ({
  scene,
  navigation,
}: StackHeaderProps): JSX.Element => {
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
      {scene.route.name === 'Task' ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={styles.icon} size={24} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Feather name="menu" style={styles.icon} size={24} />
        </TouchableOpacity>
      )}
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

export const CreateTaskHeader = ({
  navigation,
}: StackHeaderProps): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      backgroundColor: theme.colors.white,
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      paddingHorizontal: 32,
      paddingVertical: 16,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    icon: {
      color: theme.colors.black,
    },

    button: {
      borderColor: theme.colors.black,
      borderWidth: 2,
      borderRadius: 100,
    },
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Feather name="x" style={styles.icon} size={24} />
      </TouchableOpacity>
    </View>
  );
};
