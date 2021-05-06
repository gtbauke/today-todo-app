export interface Task {
  id: string;
  title: string;
  description: string;
  dueTo: string;
  completed: boolean;
  categories: string[];
}
