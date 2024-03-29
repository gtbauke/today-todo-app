import { User } from '../models/User';
import { api } from './api';

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SignupResponse {
  user: User;
}

export interface AuthResponse<Data> {
  data?: Data;
  errors?: string[];
}

export const auth = {
  login: async (
    email: string,
    password: string,
  ): Promise<AuthResponse<LoginResponse>> => {
    const { status, data } = await api.post('/users/auth', {
      email,
      password,
    });

    if (status !== 200) {
      const { message } = data as { message: string | string[] };

      if (Array.isArray(message)) return { errors: message };
      return { errors: [message] };
    }

    return { data: data.data };
  },

  signup: async (
    email: string,
    name: string,
    password: string,
  ): Promise<AuthResponse<SignupResponse>> => {
    const { status, data } = await api.post('/users', {
      email,
      name,
      password,
    });

    if (status !== 200) {
      const { message } = data as { message: string | string[] };

      if (Array.isArray(message)) return { errors: message };
      return { errors: [message] };
    }

    return { data: data.data };
  },
};
