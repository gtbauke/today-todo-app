/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import {
  auth,
  AuthResponse,
  LoginResponse,
  SignupResponse,
} from '../services/AuthService';
import { keys } from '../utils/keys';

interface IAuthContext {
  isSigned: boolean;
  login: (data: {
    email: string;
    password: string;
  }) => Promise<AuthResponse<LoginResponse>>;
  logout: () => Promise<void>;
  signup: (data: {
    email: string;
    name: string;
    password: string;
  }) => Promise<AuthResponse<SignupResponse>>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [userToken, setUserToken] = useState('');
  const { setItem, getItem } = useAsyncStorage(keys.token);

  const authContext = useMemo<IAuthContext>(
    () => ({
      isSigned: !!userToken,

      login: async loginData => {
        const { errors, data } = await auth.login(
          loginData.email,
          loginData.password,
        );

        if (!errors && data) {
          await setItem(data.token);
          setUserToken(data.token);
        }

        return { errors, data };
      },

      logout: async () => {
        await setItem('');
        setUserToken('');
      },

      signup: async signupData => {
        const { errors, data } = await auth.signup(
          signupData.email,
          signupData.name,
          signupData.password,
        );

        return { errors, data };
      },
    }),
    [setItem, userToken],
  );

  useEffect(() => {
    const fetchToken = async () => {
      const token = (await getItem()) || '';
      setUserToken(token);
    };

    fetchToken();
  }, [getItem]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
