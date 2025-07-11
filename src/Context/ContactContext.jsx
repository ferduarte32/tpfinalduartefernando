import { createContext, useState, useEffect } from "react";
import { getContactList } from "../services/contactService";

export const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = () => {
      setTimeout(() => {
        try {
          const contactList = getContactList();
          setContacts(contactList);
        } catch (error) {
          console.error("Error loading contacts:", error);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    };

    loadContacts();
  }, []);

  const refreshContacts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setContacts(getContactList());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ContactContext.Provider value={{ contacts, isLoading, refreshContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;