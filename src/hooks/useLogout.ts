import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useLogout = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const logout = useCallback(() => {
    showMessage({ title: "ログアウトしました", status: "success" });
    localStorage.setItem("token", "");
    history.push("/");
    // loginUser情報を削除する
  }, [history, showMessage]);
  return { logout };
};
