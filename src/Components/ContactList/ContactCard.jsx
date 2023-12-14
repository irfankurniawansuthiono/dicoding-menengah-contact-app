import {
  Box,
  Center,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Icon,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { IoPersonRemove } from "react-icons/io5";
import { deleteContact } from "../../api/api";
export default function ContactCard({
  email,
  id,
  imageUrl,
  name,
  phoneNumber,
  tag,
}) {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Flex
          align={"center"}
          flex={1}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Avatar size={"lg"} name={name} src={imageUrl} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Nama : {name}</Text>
              <Text color={"gray.500"}>Instagram : {tag}</Text>
              <Text color={"gray.500"}>Email : {email}</Text>
              <Text color={"gray.500"}>Phone Number : {phoneNumber}</Text>
            </Stack>
          </Stack>
          <Stack>
            <Button
              backgroundColor={"red.400"}
              size={"sm"}
              color={"white"}
              onClick={() => deleteContact(id)}
            >
              <IoPersonRemove />
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
}
