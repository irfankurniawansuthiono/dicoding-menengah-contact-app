import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { login } from "../../api/api";
import { Link } from "react-router-dom";
import { putAccessToken } from "../../api/api";
export default function SignInPage() {
  const navigate = useNavigate();

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
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && errors.email}
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && errors.password}
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
