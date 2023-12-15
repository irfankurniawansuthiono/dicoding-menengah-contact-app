import ContactCard from "./ContactCard";
import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getContacts } from "../../api/api";

export default function ContactList({ q }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsDBValue = await getContacts();
        setContacts(contactsDBValue.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  });

  const filteredContacts = q
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(q.toLowerCase())
      )
    : contacts;

  return isLoading ? (
    <Text>Loading...</Text>
  ) : filteredContacts.length > 0 ? (
    filteredContacts.map((contact) => (
      <ContactCard key={contact.id} {...contact} />
    ))
  ) : (
    <Text>No Contacts found in Database</Text>
  );
}
