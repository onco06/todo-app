import { useCallback, useState } from "react";

type Todo = {
  id: number;
  user: number;
  title: string;
  updated_at: string;
  completed: boolean;
  created_at: string;
  user_name: string;
};

type Props = {
  id: number;
  todos: Array<Todo>;
  onOpen: () => void;
};

export const useSelectTodo = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const onSelectTodo = useCallback((props: Props) => {
    const { id, todos, onOpen } = props;
    const targetTodo = todos.find((todo) => todo.id === id);
    setSelectedTodo(targetTodo ?? null);
    onOpen();
  }, []);
  return { onSelectTodo, selectedTodo };
};
