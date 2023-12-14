import ContactCard from "./ContactCard";
import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getContacts } from "../../api/api";

export default function ContactList({ q }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsDBValue = await getContacts();
        setContacts(contactsDBValue.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        // Handle the error appropriately (e.g., show an error message)
      }
    };

    fetchContacts();
  });

  const filteredContacts = q
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(q.toLowerCase())
      )
    : contacts;

  return filteredContacts.length > 0 ? (
    filteredContacts.map((contact) => (
      <ContactCard key={contact.id} {...contact} />
    ))
  ) : (
    <Text>No Contacts found in Database</Text>
  );
}
