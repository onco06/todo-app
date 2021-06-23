import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
  onClickTodos: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    onClickHome,
    onClickUserManagement,
    onClickSetting,
    onClickTodos
  } = props;
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent bg="gray.100">
        <DrawerHeader
          onClick={onClickHome}
          _hover={{ cursor: "pointer", opacity: 0.8 }}
        >
          TodoApp
        </DrawerHeader>
        <DrawerCloseButton />

        <DrawerBody p={0}>
          <Button onClick={onClickTodos} w="100%">
            TODO一覧
          </Button>
          <Button onClick={onClickUserManagement} w="100%">
            ユーザー一覧
          </Button>
          <Button onClick={onClickSetting} w="100%">
            設定
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
