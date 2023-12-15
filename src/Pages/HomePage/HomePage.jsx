import ContactList from "../../Components/ContactList/ContactList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { Container, Heading, Flex, Divider, Button } from "@chakra-ui/react";
import AddContact from "../../Components/Actions/AddContact";
import { useSearchParams } from "react-router-dom";
import { removeAccessToken } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { PiSignOutFill } from "react-icons/pi";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const handleLogOut = () => {
    removeAccessToken();
    navigate("/login", { replace: true });
  };
  return (
    <Container mt={8}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading as="h1" size="lg">
          Contact App
        </Heading>
        <Button
          as="h3"
          size="sm"
          onClick={() => handleLogOut()}
          leftIcon={<PiSignOutFill />}
        >
          sign out
        </Button>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent="flex-end">
        <SearchBar />
      </Flex>
      <AddContact />
      <ContactList q={q} />
    </Container>
  );
}
