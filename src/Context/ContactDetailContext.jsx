// src/Context/ContactDetailContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import { getContactById } from '../services/contactService';

export const ContactDetailContext = createContext();

const ContactDetailContextProvider = ({ children }) => {
  const [contactDetail, setContactDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadContact = useCallback((contact_id) => {
    setIsLoading(true);
    setError(null);

    try {
      const contact = getContactById(contact_id);
      if (!contact) throw new Error('Contacto no encontrado');
      setContactDetail(contact);
    } catch (e) {
      setContactDetail(null);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ContactDetailContext.Provider
      value={{ contactDetail, isLoading, error, loadContact }}
    >
      {children}
    </ContactDetailContext.Provider>
  );
};

export default ContactDetailContextProvider;
