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
  updateTitle?: string;
  onClose: () => void;
  myTodos: Array<Todo>;
  setMytodos: Dispatch<SetStateAction<Todo[]>>;
};

export const useUpdateTodo = () => {
  const apiUrl = "http://localhost:8000/";
  const { showMessage } = useMessage();
  let completed: boolean | null = null;

  const updateTodo = useCallback((props: Props) => {
    const { id, updateTitle, onClose, myTodos, setMytodos } = props;
    const completedRadios = document.querySelectorAll(
      "input[name='completed']"
    );
    completedRadios.forEach((radio) => {
      if (radio.checked) {
        completed = radio.value;
      }
    });
    console.log(updateTitle, completed);
    console.log(myTodos);
    axios
      .patch(
        `${apiUrl}api/todos/${id}/`,
        { title: updateTitle, completed: completed },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`
          }
        }
      )
      .then((res) => {
        showMessage({ title: "更新完了", status: "success" });
        myTodos.map((todo) => {
          if (todo.id === res.data.id) {
            todo.title = res.data.title;
            todo.completed = res.data.completed;
            todo.updated_at = res.data.updated_at;
          }
        });
        setMytodos(myTodos);
        onClose();
      })
      .catch(() =>
        showMessage({ title: "更新できませんでした", status: "error" })
      );
  }, []);
  return { updateTodo };
};
