import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = {
  id: number;
  title: string;
  completed: boolean;
  onClick: (id: number) => void;
};

export const TodoCard: VFC<Props> = memo((props) => {
  const { id, title, completed, onClick } = props;
  return (
    <Box
      w="240px"
      bg="whiteAlpha.800"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        {completed ? (
          <Text fontSize="lg" color="purple.500">
            完了
          </Text>
        ) : (
          <Text ontSize="lg" color="purple.500">
            未完了
          </Text>
        )}
      </Stack>
    </Box>
  );
});
