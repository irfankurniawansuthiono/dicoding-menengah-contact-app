import { getContacts } from "../api/api";

import { useContactsData } from "../zustand/contactsData";
export const fetchContacts = async () => {
  try {
    const contactsDBValue = await getContacts();
    useContactsData.setState({ contacts: contactsDBValue.data });
    return true;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return false;
  }
};
