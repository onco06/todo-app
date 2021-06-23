import {
  Button,
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
  Stack
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
import { useMessage } from "../../../hooks/useMessage";

const apiUrl = "http://localhost:8000/";

type User = {
  id: number;
  email: string;
  name: string;
  is_superuser: boolean;
};

type Props = {
  isOpenSetting: boolean;
  onCloseSetting: () => void;
  user: User | null;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
  const { showMessage } = useMessage();
  const { isOpenSetting, onCloseSetting, user } = props;

  const [updateMail, setUpdateMail] = useState("");
  const [updateName, setUpdateName] = useState("");
  useEffect(() => {
    setUpdateMail(user?.email || "");
    setUpdateName(user?.name || "");
  }, [user]);

  const onChangeUpdateMail = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateMail(e.target.value);
  const onChangeUpdateName = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateName(e.target.value);

  const onClickUserUpdate = useCallback(() => {
    axios
      .patch(
        `${apiUrl}api/profile/`,
        { email: updateMail, name: updateName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`
          }
        }
      )
      .then(() => showMessage({ title: "更新完了", status: "success" }))
      .catch(() =>
        showMessage({ title: "更新できませんでした", status: "error" })
      );
  }, [updateMail, updateName, showMessage]);

  return (
    <Modal
      isOpen={isOpenSetting}
      onClose={onCloseSetting}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <FormControl>
              <FormLabel>MAIL</FormLabel>
              <Input
                value={updateMail}
                onChange={(e) => onChangeUpdateMail(e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>NAME</FormLabel>
              <Input
                value={updateName}
                onChange={(e) => onChangeUpdateName(e)}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClickUserUpdate}>
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
