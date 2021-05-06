import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Input } from '../components/Input';
import { useStyle } from '../styles/Style';
import { Button } from '../components/Button';
import { defaultTheme } from '../styles/theme';
import { Spacing } from '../components/Spacing';
import { keys } from '../utils/keys';
import { api } from '../services/api';
import { StackNavProps } from '../routes/MainRoutes';

export const CreateCategory = ({
  navigation,
}: StackNavProps<'CreateCategory'>): JSX.Element => {
  const [name, setName] = useState('');

  const styles = useStyle(theme => ({
    container: {
      paddingHorizontal: 32,
      paddingVertical: 48,
      backgroundColor: theme.colors.white,
      flex: 1,
      alignItems: 'center',
    },

    title: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: 26,
    },

    buttonText: {
      fontWeight: 'bold',
      fontSize: theme.fontSizes.md,
      color: theme.colors.white,
    },
  }));

  const handleCategoryPress = useCallback(async () => {
    const token = (await AsyncStorage.getItem(keys.token)) || '';
    const { status, data } = await api.post(
      '/categories',
      {
        name,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (status !== 201) {
      console.log(data);
    }

    navigation.navigate('Home', { shouldRefresh: true });
  }, [name, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Category</Text>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        keyboardType="ascii-capable"
        returnKeyType="done"
        autoCorrect={false}
        autoCapitalize="words"
        autoCompleteType="off"
        autoFocus
      />
      <Spacing size={52} />
      <Button
        rippleColor={defaultTheme.colors.primary[700]}
        onPress={handleCategoryPress}
      >
        <Text style={styles.buttonText}>Create</Text>
      </Button>
    </View>
  );
};
