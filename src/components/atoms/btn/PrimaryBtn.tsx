import { Button } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const PrimaryBtn: VFC<Props> = memo((props) => {
  const { children, onClick, disabled = false, loading = false } = props;
  return (
    <Button
      onClick={onClick}
      bg="blue.400"
      color="white"
      disabled={disabled || loading}
      isLoading={loading}
      _hover={{ opacity: 0.8 }}
    >
      {children}
    </Button>
  );
});
