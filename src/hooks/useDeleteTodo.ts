import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useMessage } from "./useMessage";

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
  id: number | undefined;
  onClose: () => void;
  myTodos: Array<Todo>;
  setMytodos: Dispatch<SetStateAction<Todo[]>>;
};

export const useDeleteTodo = () => {
  const apiUrl = "http://localhost:8000/";
  const { showMessage } = useMessage();

  const deleteTodo = useCallback((props: Props) => {
    const { id, onClose, myTodos, setMytodos } = props;

    console.log(myTodos);
    axios
      .delete(`${apiUrl}api/todos/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((res) => {
        showMessage({ title: "削除完了", status: "success" });
        const newMyTodos = myTodos.filter((todo) => todo.id !== id);
        setMytodos(newMyTodos);
        onClose();
      })
      .catch(() =>
        showMessage({ title: "削除できませんでした", status: "error" })
      );
  }, []);
  return { deleteTodo };
};
