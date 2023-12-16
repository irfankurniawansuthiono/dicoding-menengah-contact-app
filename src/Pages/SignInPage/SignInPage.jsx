import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  FormErrorMessage,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { getAccessToken, login } from "../../api/api";
import { Link } from "react-router-dom";
import { putAccessToken } from "../../api/api";
import { useEffect } from "react";
export default function SignInPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      navigate("/contacts");
    }
  });
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data = await login(values);

                  if (data.error) {
                    alert(data.message);
                    setSubmitting(false);
                    return;
                  } else {
                    putAccessToken(data.data.accessToken);
                    navigate("/contacts");
                  }

                  setSubmitting(false);
                } catch (error) {
                  alert("An error occurred during login", error);
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <>
                    <FormControl id="email" isInvalid={errors.email}>
                      <Flex justifyContent={"space-between"}>
                        <FormLabel>Email address</FormLabel>
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </Flex>
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </>
                  <FormControl id="password" isInvalid={errors.password}>
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Password</FormLabel>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </Flex>
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <Stack spacing={10} mt={5}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>
                    <Flex>
                      <Text>Don't have an account? click&nbsp;</Text>
                      <Text as={Link} to="/signup" color={"blue.400"}>
                        here
                      </Text>
                    </Flex>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
