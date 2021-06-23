import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type User = {
  id: number;
  email: string;
  name: string;
  is_superuser: boolean;
};

export const UserCard: VFC<User> = memo((props) => {
  const { id, email, name, is_superuser } = props;
  return (
    <Box
      w="260px"
      h="160px"
      bg="whiteAlpha.800"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          {id}
        </Text>
        <Text ontSize="lg" color="purple.500">
          {email}
        </Text>
        <Text ontSize="lg" color="purple.500">
          {name}
        </Text>
        {is_superuser ? (
          <Text fontSize="lg" color="purple.500" fontWeight="bold">
            SuperUser
          </Text>
        ) : null}
        <Text ontSize="lg" color="purple.500">
          {is_superuser}
        </Text>
      </Stack>
    </Box>
  );
});
