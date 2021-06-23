import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Link
} from "@chakra-ui/react";
import { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import {} from "react-router-dom";

import { PrimaryBtn } from "../atoms/btn/PrimaryBtn";
import { useAuth } from "../../hooks/useAuth";

export const Login: VFC = memo(() => {
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const onClickRegisterOpen = useCallback(
    () => setRegisterOpen(!registerOpen),
    [registerOpen]
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    [email]
  );
  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [password]
  );
  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [name]
  );

  const { login, register, loading } = useAuth();
  const onClickLogin = useCallback(() => login({ email, password }), [
    email,
    password,
    login
  ]);
  const onClickRegister = useCallback(
    () => register({ email, name, password }),
    [email, password, name, register]
  );

  return (
    <>
      {registerOpen ? (
        <Flex align="center" justify="center" height="100vh">
          <Box
            bg="white"
            w="sm"
            p={4}
            borderRadius="md"
            shadow="md"
            textAlign="end"
          >
            <Heading as="h1" size="lg" textAlign="center">
              TodoApp
            </Heading>
            <Divider my={4} />
            <Stack spacing={4} py={4} px={4}>
              <Input
                placeholder="email"
                value={email}
                onChange={(e) => onChangeEmail(e)}
              />
              <Input
                placeholder="name"
                value={name}
                onChange={(e) => onChangeName(e)}
              />
              <Input
                placeholder="password"
                value={password}
                onChange={(e) => onChangePassword(e)}
              />
              <PrimaryBtn
                onClick={onClickRegister}
                disabled={email === "" || name === "" || password === ""}
                loading={loading}
              >
                登録
              </PrimaryBtn>
            </Stack>
            <Link onClick={onClickRegisterOpen}>ログイン</Link>
          </Box>
        </Flex>
      ) : (
        <Flex align="center" justify="center" direction="column" height="100vh">
          <Box
            bg="white"
            w="sm"
            p={4}
            borderRadius="md"
            shadow="md"
            textAlign="end"
          >
            <Heading as="h1" size="lg" textAlign="center">
              TodoApp
            </Heading>
            <Divider my={4} />
            <Stack spacing={4} py={4} px={4}>
              <Input
                placeholder="email"
                value={email}
                onChange={(e) => onChangeEmail(e)}
              />
              <Input
                placeholder="password"
                value={password}
                onChange={(e) => onChangePassword(e)}
              />
              <PrimaryBtn
                onClick={onClickLogin}
                disabled={email === "" || password === ""}
                loading={loading}
              >
                ログイン
              </PrimaryBtn>
            </Stack>
            <Link onClick={onClickRegisterOpen}>登録</Link>
          </Box>
        </Flex>
      )}
    </>
  );
});
