import { create } from "zustand";

export const useContactsData = create((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
}));
