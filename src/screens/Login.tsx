import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useStyle } from '../styles/Style';
import { Input } from '../components/Input';

const { width, height } = Dimensions.get('screen');

export const Login = (): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: theme.colors.white,
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 32,
    },

    title: {
      color: theme.colors.black,
      fontSize: theme.fontSizes.xl,
      fontWeight: 'bold',
    },

    subTitle: {
      color: theme.colors.gray[900],
      fontSize: theme.fontSizes.md,
      fontWeight: 'bold',
    },

    form: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flex: 1,
    },
  }));

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const handleEmailBlur = () => {
    passwordRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Login to continue</Text>

      <View style={styles.form}>
        <Input
          placeholder="E-mail Address"
          icon="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="email"
          onBlur={handleEmailBlur}
        />
        <Input
          ref={passwordRef}
          placeholder="Password"
          icon={showPassword ? 'eye-off' : 'eye'}
          secureTextEntry={!showPassword}
          onIconPress={() => setShowPassword(!showPassword)}
          value={password}
          onChangeText={setPassword}
          keyboardType="ascii-capable"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
        />
      </View>
    </View>
  );
};
