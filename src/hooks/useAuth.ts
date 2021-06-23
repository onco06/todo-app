import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessage";

const apiUrl = "http://localhost:8000/";

type Props = {
  email: string;
  name: string;
  password: string;
};

type LoginUser = {
  id: number;
  email: string;
  name: string;
  is_superuser: boolean;
};

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loginUser, setLoginUser] = useState<LoginUser | null>({} as LoginUser);
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (props: Omit<Props, "name">) => {
      setLoading(true);
      const { email, password } = props;
      axios
        .post(
          `${apiUrl}api/auth/`,
          { username: email, password: password },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          axios
            .get(`${apiUrl}api/profile/`, {
              headers: {
                Authorization: `token ${localStorage.token}`
              }
            })
            .then((res) => {
              showMessage({ title: "ログインしました", status: "success" });
              setLoginUser(res.data);
              history.push("/home");
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              showMessage({ title: "tokenが正しくない", status: "error" });
            });
        })
        .catch((err) => {
          setLoading(false);
          showMessage({ title: "認証情報が正しくない", status: "error" });
        });
    },
    [history, showMessage]
  );

  const register = useCallback(
    (props: Props) => {
      setLoading(true);
      const { email, name, password } = props;
      axios
        .post(
          `${apiUrl}api/register/`,
          { email: email, name: name, password: password },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then((res) => {
          showMessage({ title: "登録完了", status: "success" });
          login({ email, password });
        })
        .catch((err) => {
          setLoading(false);
          showMessage({ title: "登録できない", status: "error" });
        });
    },
    [login, showMessage]
  );

  return { login, register, loginUser, loading };
};
