import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { IoIosPersonAdd } from "react-icons/io";
import { useRef, useState } from "react";
import { addContact as add } from "../../api/api";
import { IoAddOutline } from "react-icons/io5";
import { Formik } from "formik";
export default function AddContact() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nameRef = useRef(null);
  return (
    <>
      <Flex alignItems={"center"} gap={2} my={5}>
        <Heading as={"h3"} size="md">
          Actions :
        </Heading>
        <Button
          colorScheme="blue"
          variant="solid"
          leftIcon={<IoIosPersonAdd />}
          size={"sm"}
          onClick={onOpen}
        >
          Add
        </Button>
      </Flex>
      <Modal
        initialFocusRef={nameRef}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a contact</ModalHeader>
          <Formik
            initialValues={{ name: "", tag: "", email: "", phoneNumber: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Required for Name";
              }
              if (!values.tag) {
                errors.tag = "Required for instagram";
              }
              if (!values.email) {
                errors.email = "Required for email";
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = "Required for phone number";
              }
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!/^[0-9]+$/.test(values.phoneNumber)) {
                errors.phoneNumber = "Invalid phone number";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const { name, tag, email, phoneNumber } = values;
              const newTag = `@${tag}`;

              const newValues = {
                name,
                tag: newTag,
                email,
                phoneNumber,
              };

              try {
                const status = await add(newValues);
                if (!status.error) {
                  alert("success added the contact");
                }
                onClose();
              } catch (error) {
                console.log(error);
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
              <>
                <ModalBody pb={6}>
                  <FormControl
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    {errors.name && touched.name ? (
                      <>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel>Name</FormLabel>
                          <Text color={"red.500"}>{errors.name}</Text>
                        </Flex>
                        <Input
                          name={"name"}
                          borderColor="red.500"
                          placeholder="Enter Name"
                          _placeholder={{ color: "red.500", opacity: 0.8 }}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    ) : (
                      <>
                        <FormLabel>Name</FormLabel>
                        <Input
                          name={"name"}
                          placeholder="Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </FormControl>

                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    {errors.tag && touched.tag ? (
                      <>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel>Instagram</FormLabel>
                          <Text color={"red.500"}>{errors.tag}</Text>
                        </Flex>
                        <InputGroup>
                          <InputLeftAddon pointerEvents={"none"}>
                            @
                          </InputLeftAddon>
                          <Input
                            value={values.tag}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name={"tag"}
                            placeholder={
                              "Enter Instagram without @ (eg. instagram)"
                            }
                            _placeholder={{ color: "red.500", opacity: 0.8 }}
                            borderColor={"red.500"}
                          />
                        </InputGroup>
                      </>
                    ) : (
                      <>
                        <FormLabel>Instagram</FormLabel>
                        <InputGroup>
                          <InputLeftAddon pointerEvents={"none"}>
                            @
                          </InputLeftAddon>
                          <Input
                            name={"tag"}
                            placeholder="Enter Instagram without @ (eg. instagram)"
                            value={values.tag}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </InputGroup>
                      </>
                    )}
                  </FormControl>
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    {errors.email && touched.email ? (
                      <>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel>Email</FormLabel>
                          <Text color={"red.500"}>{errors.email}</Text>
                        </Flex>

                        <Input
                          name={"email"}
                          placeholder={"enter a valid email address"}
                          _placeholder={{ color: "red.500", opacity: 0.8 }}
                          borderColor={"red.500"}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    ) : (
                      <>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name={"email"}
                          placeholder="email@example.com"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </FormControl>
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <>
                        <Flex justifyContent={"space-between"}>
                          <FormLabel>Phone Number</FormLabel>
                          <Text color={"red.500"}>{errors.phoneNumber}</Text>
                        </Flex>
                        <Input
                          name={"phoneNumber"}
                          type={"tel"}
                          placeholder={"only numbers are allowed"}
                          _placeholder={{ color: "red.500", opacity: 0.8 }}
                          borderColor={"red.500"}
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    ) : (
                      <>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                          name={"phoneNumber"}
                          type={"tel"}
                          placeholder="Enter the Phone Number (eg. 08123456789)"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    leftIcon={<IoAddOutline />}
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                  >
                    Add
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
