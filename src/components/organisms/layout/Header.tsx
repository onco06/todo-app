import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC
} from "react";
import { useHistory } from "react-router-dom";
import { MenuIconBtn } from "../../atoms/btn/MenuIconBtn";
import { MenuDrawer } from "../../molucules/MenuDrawer";
import { useLogout } from "../../../hooks/useLogout";

import { UserDetailModal } from "../user/UserDetailModal";
import axios from "axios";
import { useMessage } from "../../../hooks/useMessage";

const apiUrl = "http://localhost:8000/";

type User = {
  id: number;
  email: string;
  name: string;
  is_superuser: boolean;
};

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage } = useMessage();
  const {
    isOpen: isOpenSetting,
    onOpen: onOpenSetting,
    onClose: onCloseSetting
  } = useDisclosure();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/home"), [history]);
  const onClickSetting = useCallback(() => onOpenSetting(), [onOpenSetting]);
  const onClickUserManagement = useCallback(
    () => history.push("/home/user_management"),
    [history]
  );
  const onClickTodos = useCallback(() => history.push("/home/todos"), [
    history
  ]);

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    // loginUserを取得
    axios
      .get<User>(`${apiUrl}api/profile/`, {
        headers: {
          Authorization: `token ${localStorage.token}`
        }
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        showMessage({ title: "User情報の取得に失敗", status: "warning" });
      });
  }, [showMessage]);
  console.log(user);

  const { logout } = useLogout();
  const onClickLogout = useCallback(() => {
    logout();
  }, [logout]);

  const onClickLogin = useCallback(() => {
    history.push("/");
  }, [history]);

  const linkStyle = {
    textDecoration: "none"
  };

  return (
    <>
      <Flex
        as="nav"
        bg="green.300"
        color="gray.200"
        align="center"
        justify="space-between"
        padding={{ base: 2, md: 4 }}
      >
        <Heading as="h1" fontSize={{ base: "lg", md: "2xl" }} mr={8}>
          <Link onClick={onClickHome} style={linkStyle}>
            TodoApp
          </Link>
        </Heading>
        <Flex
          fontSize="md"
          align="center"
          justify="end"
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={6}>
            <Link onClick={onClickTodos} style={linkStyle}>
              Todo一覧
            </Link>
          </Box>
          <Box pr={6}>
            <Link onClick={onClickUserManagement} style={linkStyle}>
              ユーザー一覧
            </Link>
          </Box>

          <Box pr={6}>
            <Link onClick={onClickSetting} style={linkStyle}>
              設定
            </Link>
          </Box>

          {localStorage.token ? (
            <Box pr={6}>
              <Link onClick={onClickLogout} style={linkStyle}>
                ログアウト
              </Link>
            </Box>
          ) : (
            <Box pr={6}>
              <Link onClick={onClickLogin} style={linkStyle}>
                ログイン
              </Link>
            </Box>
          )}
        </Flex>
        <MenuIconBtn onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
        onClickTodos={onClickTodos}
      />
      <UserDetailModal
        isOpenSetting={isOpenSetting}
        onCloseSetting={onCloseSetting}
        user={user}
      />
    </>
  );
});
