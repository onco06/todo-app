import {
  Box,
  Flex,
  Wrap,
  WrapItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC
} from "react";
import { useMyTodos } from "../../hooks/useMyTodos";
import { TodoCard } from "../organisms/todo/TodoCard";
import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { useSelectTodo } from "../../hooks/useSelectTodo";

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

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getMyTodos, myTodos, setMytodos } = useMyTodos();
  const [title, setTitle] = useState("");
  const { onSelectTodo, selectedTodo } = useSelectTodo();

  useEffect(() => getMyTodos(), [getMyTodos]);

  const onClickTodoCreate = () => {
    // apiでクリエイト
    axios
      .post(
        `${apiUrl}api/todos/`,
        { title: title },
        {
          headers: {
            // "Content-Type": "applicaton/json",
            Authorization: `token ${localStorage.token}`
          }
        }
      )
      .then((res) => {
        setTitle("");
        setMytodos([res.data, ...myTodos]);
      })
      .catch((err) => console.log(err));
  };
  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    []
  );

  const onClickCard = useCallback(
    (id) => {
      onSelectTodo({ id, todos: myTodos, onOpen });
    },
    [onOpen, myTodos, onSelectTodo]
  );

  return (
    <>
      <InputGroup size="md" w="xl" m={4}>
        <Input
          placeholder="title"
          value={title}
          onChange={(e) => onChangeTitle(e)}
        />
        <InputRightElement width="4.5rem">
          <Button onClick={onClickTodoCreate}>登録</Button>
        </InputRightElement>
      </InputGroup>
      <Flex justify="center" m={{ base: 2, md: 4 }}>
        <Box bg="purple.50" flexGrow={1} minWidth="240px">
          <Heading textAlign="center" color="gray.600">
            未完了
          </Heading>
          <Wrap p={{ base: 4, md: 10 }} justify="center">
            {myTodos
              .filter((todo) => !todo.completed)
              .map((todo) => (
                <WrapItem key={todo.id}>
                  <TodoCard
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onClick={onClickCard}
                  />
                </WrapItem>
              ))}
          </Wrap>
        </Box>
        <Box bg="blue.50" flexGrow={1} minWidth="240px">
          <Heading textAlign="center" color="gray.600">
            完了
          </Heading>
          <Wrap p={{ base: 4, md: 10 }} justify="center">
            {myTodos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <WrapItem key={todo.id}>
                  <TodoCard
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onClick={onClickCard}
                  />
                </WrapItem>
              ))}
          </Wrap>
        </Box>
      </Flex>
      <TodoDetailModal
        isOpen={isOpen}
        onClose={onClose}
        selectedTodo={selectedTodo}
        myTodos={myTodos}
        setMytodos={setMytodos}
      />
    </>
  );
});
