/* eslint-disable import/no-cycle */
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
import { AuthContext } from '../contexts/AuthContext';
import { AuthNavProps } from '../routes/AuthStack';

export const Signup = ({ navigation }: AuthNavProps<'SignUp'>): JSX.Element => {
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
  const [name, setName] = useState('');

  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const { signup } = useContext(AuthContext);

  const handleEmailBlur = () => {
    nameRef.current?.focus();
  };

  const handleNameBlur = () => {
    passwordRef.current?.focus();
  };

  const handleSignup = async () => {
    const { data, errors } = await signup({ email, name, password });

    if (errors) {
      console.log(errors);
    }

    if (data) {
      console.log(data);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Signup to continue</Text>

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
          ref={nameRef}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="ascii-capable"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="words"
          autoCompleteType="name"
          onBlur={handleNameBlur}
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
          onPress={handleSignup}
        >
          <Text style={styles.text}>Signup</Text>
        </Button>
        <Spacing size={8} />
        <Text style={styles.linkText}>
          Already have an account?{' '}
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.link}>Login Now</Text>
          </TouchableOpacity>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};
