import ContactCard from "./ContactCard";
import { Text } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { getContacts } from "../../api/api";

export default function ContactList({ q }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchContacts = useCallback(async () => {
    try {
      const contactsDBValue = await getContacts();
      setContacts(contactsDBValue.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  });
  useEffect(() => {
    fetchContacts();
  });

  const filteredData = q
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(q.toLowerCase())
      )
    : null;
  const filteredContacts = q ? (filteredData ? filteredData : null) : contacts;

  return isLoading ? (
    <Text>Loading...</Text>
  ) : filteredContacts.length > 0 ? (
    filteredContacts.map((contact) => (
      <ContactCard
        onRefetch={() => fetchContacts()}
        key={contact.id}
        {...contact}
      />
    ))
  ) : (
    <Text>No Contacts found in Database</Text>
  );
}
