import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dispatch,
  useCallback,
  useEffect,
  useState,
  SetStateAction,
} from 'react';

import { Category } from '../models/Category';
import { api } from '../services/api';
import { compare } from '../utils/compare';

type MutateDispatch<Model> = (newData: Model, update: boolean) => void;

interface UseCategoriesResponse {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  mutate: MutateDispatch<Category[]>;
  refresh: () => void;
}

export const useCategories = (): UseCategoriesResponse => {
  const [state, set] = useState<Category[]>([]);

  const _fetch = useCallback(async () => {
    const token = (await AsyncStorage.getItem('@token')) || '';
    const { status, data } = await api.get('/categories', {
      headers: { authorization: `Bearer ${token}` },
    });

    if (status === 200) {
      const { data: body } = data as { data: Category[] };
      set(body);
    }
  }, []);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  const mutate = useCallback(
    (newData: Category[], update = false) => {
      if (update) {
        const diff = compare(state, newData);

        diff.delete.forEach(async category => {
          const token = (await AsyncStorage.getItem('@token')) || '';
          const { status, data } = await api.delete(
            `/categories/${category.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );

          if (status !== 200) {
            _fetch();
          }
        });
      }

      set(newData);
    },
    [state, _fetch],
  );

  const refresh = useCallback(() => {
    _fetch();
  }, [_fetch]);

  return { categories: state, setCategories: set, mutate, refresh };
};
