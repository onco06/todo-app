import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import {
  ChangeEvent,
  Dispatch,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
  SetStateAction
} from "react";
import { useUpdateTodo } from "../../../hooks/useUpdateTodo";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";

type Todo = {
  id: number;
  user: number;
  title: string;
  completed: boolean;
  updated_at: string;
  created_at: string;
  user_name: string;
};

type Props = {
  selectedTodo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  myTodos: Array<Todo>;
  setMytodos: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoDetailModal: VFC<Props> = memo((props) => {
  const { selectedTodo, isOpen, onClose, myTodos, setMytodos } = props;
  const [updateTitle, setUpdateTitle] = useState<string>("");
  useEffect(() => setUpdateTitle(selectedTodo?.title || ""), [selectedTodo]);
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();

  const onChangeUpdateTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateTitle(e.target.value);

  const onClickTodoUpdate = useCallback(() => {
    updateTodo({
      id: selectedTodo?.id,
      updateTitle,
      onClose,
      myTodos,
      setMytodos
    });
  }, [selectedTodo, updateTitle, onClose, updateTodo, myTodos, setMytodos]);

  const onClickTodoDelete = useCallback(() => {
    deleteTodo({
      id: selectedTodo?.id,
      onClose: onClose,
      myTodos: myTodos,
      setMytodos: setMytodos
    });
  }, [selectedTodo, onClose, deleteTodo, myTodos, setMytodos]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Todo詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={updateTitle}
                onChange={(e) => onChangeUpdateTitle(e)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>COMPLETED</FormLabel>
              <RadioGroup defaultValue={selectedTodo?.completed.toString()}>
                <Stack spacing={4} direction="row">
                  <Radio value="true" name="completed">
                    Ture
                  </Radio>
                  <Radio value="false" name="completed">
                    False
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>CREATED_AT</FormLabel>
              <Input value={selectedTodo?.created_at} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>UPDATED_AT</FormLabel>
              <Input value={selectedTodo?.updated_at} isReadOnly />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup variant="outline" spacing="6">
            <Button colorScheme="blue" onClick={onClickTodoUpdate}>
              Save
            </Button>
            <Button colorScheme="red" onClick={onClickTodoDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
