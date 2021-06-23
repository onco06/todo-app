import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  onOpen: () => void;
};

export const MenuIconBtn: VFC<Props> = memo((props) => {
  const { onOpen } = props;
  return (
    <IconButton
      icon={<HamburgerIcon />}
      aria-label="menuBtn"
      size="md"
      variant="unstyled"
      display={{ base: "block", md: "none" }}
      onClick={onOpen}
    />
  );
});
