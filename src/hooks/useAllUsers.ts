import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";

type User = {
  id: number;
  email: string;
  name: string;
  is_superuser: boolean;
};

const apiUrl = "http://localhost:8000/";

export const useAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const { showMessage } = useMessage();
  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>(`${apiUrl}api/users/`, {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch(() => {
        setLoading(false);
        showMessage({ title: "権限がありません", status: "warning" });
      });
  }, [showMessage]);
  return { getUsers, loading, users };
};
