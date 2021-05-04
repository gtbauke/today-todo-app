/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import { Dispatch, useCallback, useEffect, useState } from 'react';

import { Task } from '../models/Task';
import { api } from '../services/api';

interface UseTasksResponse {
  tasks: Task[];
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
  mutate: (newData: Task[], update: boolean) => void;
  mutateSingle: (newData: Task, update: boolean) => void;
}

interface DiffAction {
  update: Task[];
  delete: Task[];
}

const isEqual = (a: Task, b: Task): boolean => {
  if (
    a.title !== b.title ||
    a.completed !== b.completed ||
    a.description !== b.description ||
    a.dueDate !== b.dueDate
  )
    return false;

  return true;
};

const compare = (old: Task[], updated: Task[]): DiffAction => {
  const diff: DiffAction = {
    update: [],
    delete: [],
  };

  const find = (id: string, inUpdated = false): Task => {
    if (inUpdated) return updated.find(elem => elem.id === id)!;

    return old.find(elem => elem.id === id)!;
  };

  const updatedIds = updated.map(u => u.id);
  diff.delete = old
    .map(o => o.id)
    .filter(id => !updatedIds.includes(id))
    .map(id => find(id));

  const oldWithoutDelete = old.filter(o => !diff.delete.includes(o));
  for (let i = 0; i < oldWithoutDelete.length; i++) {
    const equals = isEqual(oldWithoutDelete[i], updated[i]);

    if (!equals) diff.update.push(updated[i]);
  }

  return diff;
};

// [
//   Task[],
//   Dispatch<React.SetStateAction<Task[]>>,
// ]

export const useTasks = (): UseTasksResponse => {
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
            console.log(data);
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
            console.log(data);
          }
        });
      }

      set(newData);
    },
    [state],
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
            console.log(data);
          }
        };

        _update();
      }

      const newTasks = state.map(s => (s.id === newData.id ? newData : s));
      set(newTasks);
    },
    [state, set],
  );

  return { tasks: state, setTasks: set, mutate, mutateSingle };
};
