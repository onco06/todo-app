import {
  Box,
  Flex,
  Wrap,
  WrapItem,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useAllTodos } from "../../hooks/useAllTodos";
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

export const Todos: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllTodos, allTodos, setAllTodos } = useAllTodos();
  const { onSelectTodo, selectedTodo } = useSelectTodo();

  useEffect(() => getAllTodos(), [getAllTodos]);

  const onClickCard = useCallback(
    (id) => {
      onSelectTodo({ id, todos: allTodos, onOpen });
    },
    [onOpen, allTodos, onSelectTodo]
  );

  return (
    <>
      <Flex justify="center" m={{ base: 2, md: 4 }}>
        <Box bg="purple.50" flexGrow={1} minWidth="240px">
          <Heading textAlign="center" color="gray.600">
            未完了
          </Heading>
          <Wrap p={{ base: 4, md: 10 }} justify="center">
            {allTodos
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
            {allTodos
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
        myTodos={allTodos}
        setMytodos={setAllTodos}
      />
    </>
  );
});
