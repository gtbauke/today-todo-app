/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch, useCallback, useEffect, useState } from 'react';

import { Task } from '../models/Task';
import { api } from '../services/api';
import { compare } from '../utils/compare';

interface UseTasksResponse {
  tasks: Task[];
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
  mutate: (newData: Task[], update: boolean) => void;
  mutateSingle: (newData: Task, update: boolean) => void;
}

export const useTasks = (): UseTasksResponse => {
  const [state, set] = useState<Task[]>([]);

  const _fetch = useCallback(async () => {
    const token = (await AsyncStorage.getItem('@token')) || '';
    const { status, data } = await api.get('/tasks', {
      headers: { authorization: `Bearer ${token}` },
    });

    if (status === 200) {
      const { data: body } = data as { data: Task[] };
      set(body);
    }
  }, []);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  const mutate = useCallback(
    (newData: Task[], update = false) => {
      if (update) {
        const diff = compare(state, newData);

        diff.update.forEach(async task => {
          const token = (await AsyncStorage.getItem('@token')) || '';
          const { status, data } = await api.put(`/tasks/${task.id}`, task, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (status !== 200) {
            set(data.data);
          }
        });

        diff.delete.forEach(async task => {
          const token = (await AsyncStorage.getItem('@token')) || '';
          const { status, data } = await api.delete(`/tasks/${task.id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (status !== 200) {
            _fetch();
          }
        });
      }

      set(newData);
    },
    [state, _fetch],
  );

  const mutateSingle = useCallback(
    (newData: Task, update = false) => {
      if (update) {
        const _update = async () => {
          const token = (await AsyncStorage.getItem('@token')) || '';
          const { status, data } = await api.put(
            `/tasks/${newData.id}`,
            newData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );

          if (status !== 200) {
            _fetch();
          }
        };

        _update();
      }

      const newTasks = state.map(s => (s.id === newData.id ? newData : s));
      set(newTasks);
    },
    [state, set, _fetch],
  );

  return { tasks: state, setTasks: set, mutate, mutateSingle };
};
