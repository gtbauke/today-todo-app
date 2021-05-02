import { User } from '../models/User';
import { api } from './api';

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthResponse<Data> {
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

    return { data };
  },
};
