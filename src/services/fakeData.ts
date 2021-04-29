import { Category } from '../models/Category';
import { Task } from '../models/Task';

export const categories: Category[] = [
  {
    id: 'c46cae50-cef9-4624-90ee-32a285c3f609',
    name: 'School',
    taskCount: 40,
    completedTasks: 15,
  },
  {
    id: 'e50faf26-3ae6-43df-9d44-a57befabe6ac',
    name: 'Exercises',
    taskCount: 23,
    completedTasks: 20,
  },
];

export const tasks: Task[] = [
  {
    id: '5bc451f1-e3fc-496e-b566-83fc114fac4c',
    title: 'Finish Project',
    description: '',
    completed: false,
    dueDate: new Date(),
  },
  {
    id: '7b27e5e9-9f58-4334-bcfe-20467800c25d',
    title: 'Study for the test',
    description: '',
    completed: false,
    dueDate: new Date(),
  },
  {
    id: '560c480f-687a-43f5-9e59-323b3b2cc076',
    title: 'Run 5 miles',
    description: '',
    completed: true,
    dueDate: new Date(),
  },
];
