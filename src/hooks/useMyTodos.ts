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

export const useMyTodos = () => {
  const [myTodos, setMytodos] = useState<Array<Todo>>([]);
  const getMyTodos = useCallback(() => {
    axios
      .get(`${apiUrl}api/todos/mytodos/`, {
        headers: {
          "Content-Type": "applicaton/json",
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((res) => setMytodos(res.data))
      .catch(() => alert("ログインしてください"));
  }, []);
  return { getMyTodos, myTodos, setMytodos };
};
