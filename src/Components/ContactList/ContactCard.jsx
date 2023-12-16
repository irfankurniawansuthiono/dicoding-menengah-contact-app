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
import DeleteButton from "../Button/DeleteButton";
import { MdPermIdentity, MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
export default function ContactCard({
  email,
  id,
  imageUrl,
  name,
  phoneNumber,
  tag,
}) {
  return (
    <Center py={2}>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={3}
        overflow={"hidden"}
      >
        <Flex
          align={"center"}
          flex={1}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Avatar
              size={{ base: "md", md: "lg" }}
              name={name}
              src={imageUrl}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Flex alignItems={"center"}>
                <Icon mr={2} as={MdPermIdentity} boxSize={4} />
                <Text fontWeight={600}>{name}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Icon mr={2} as={AiFillInstagram} boxSize={4} />
                <Text color={"gray.500"}>{tag}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Icon mr={2} as={MdEmail} boxSize={4} />
                <Text color={"gray.500"}>{email}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Icon mr={2} as={FaPhone} boxSize={4} />
                <Text color={"gray.500"}>{phoneNumber}</Text>
              </Flex>
            </Stack>
          </Stack>
          <Stack>
            <DeleteButton id={id} />
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
}
