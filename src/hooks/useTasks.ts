/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Dispatch, useEffect, useState } from 'react';

import { Task } from '../models/Task';
import { api } from '../services/api';

export const useTasks = (): [
  Task[],
  Dispatch<React.SetStateAction<Task[]>>,
] => {
  const [state, set] = useState<Task[]>([]);

  useEffect(() => {
    const _fetch = async () => {
      const { getItem } = useAsyncStorage('@token');
      const token = await getItem();

      const { status, data } = await api.get('/tasks', {
        headers: { authorization: `Bearer ${token}` },
      });

      if (status === 200) {
        const { data: tasksData } = data as { data: Task[] };
        set(tasksData);
      }
    };

    _fetch();
  }, []);

  return [state, set];
};
