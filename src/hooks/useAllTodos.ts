import axios from "axios";
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

const apiUrl = "http://localhost:8000/";

export const useAllTodos = () => {
  const [allTodos, setAllTodos] = useState<Array<Todo>>([]);
  const getAllTodos = useCallback(() => {
    axios
      .get(`${apiUrl}api/todos/`, {
        headers: {
          "Content-Type": "applicaton/json",
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((res) => setAllTodos(res.data))
      .catch(() => alert("ログインしてください"));
  }, []);
  return { getAllTodos, allTodos, setAllTodos };
};
