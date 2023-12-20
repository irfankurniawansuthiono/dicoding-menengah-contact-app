import ContactCard from "./ContactCard";
import { Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchContacts } from "../../fetchContact/fetchContact";
import { useContactsData } from "../../zustand/contactsData";
import { getContacts } from "../../api/api";

export default function ContactList({ q }) {
  const [contacts, setContacts] = useState([]);
  const contactsData = useContactsData((state) => state.contacts);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (contactsData) {
      setContacts(contactsData);
    }
  }, [contactsData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchContacts();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        // setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <ContactCard key={contact.id} {...contact} />
    ))
  ) : (
    <Text>No Contacts found in Database</Text>
  );
}
