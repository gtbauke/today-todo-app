import React, { useContext, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useStyle } from '../styles/Style';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ThemeContext } from '../contexts/ThemeContext';
import { Spacing } from '../components/Spacing';
import { auth } from '../services/AuthService';

export const Login = (): JSX.Element => {
  const styles = useStyle(theme => ({
    container: {
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: theme.colors.white,
      flex: 1,
      paddingVertical: 64,
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

    text: {
      color: theme.colors.white,
      fontSize: theme.fontSizes.md,
      fontWeight: 'bold',
    },

    form: {
      marginTop: 48,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1,
    },

    linkText: {
      color: theme.colors.black,
    },

    linkButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 14,
    },

    link: {
      color: theme.colors.accent[500],
    },
  }));

  const defaultTheme = useContext(ThemeContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const handleEmailBlur = () => {
    passwordRef.current?.focus();
  };

  const handleLoginButtonPress = async () => {
    const { data, errors } = await auth.login(email, password);

    if (errors) {
      console.log(errors);
    }

    if (data) {
      console.log(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Login to continue</Text>

      <KeyboardAvoidingView style={styles.form} behavior="padding">
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
        <Spacing size={32} />
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
        <Spacing size={64} />
        <Button
          rippleColor={defaultTheme.colors.primary[700]}
          onPress={handleLoginButtonPress}
        >
          <Text style={styles.text}>Login</Text>
        </Button>
        <Spacing size={8} />
        <Text style={styles.linkText}>
          Do not have an account?{' '}
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.link}>Create one now</Text>
          </TouchableOpacity>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};
