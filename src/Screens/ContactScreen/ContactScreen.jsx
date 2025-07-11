// src/Screens/ContactScreen/ContactScreen.jsx
import React, { useContext } from 'react';
import { ContactContext } from '../../Context/ContactContext';
import ContactsList from '../../Component/ContactList/ContactList';

import './ContactScreen.css';

export default function ContactScreen() {
  const { contacts } = useContext(ContactContext);

  return (
    <div className="contact-screen">
      <header className="contact-screen__header">
        <h2>Contactos</h2>
        <p>Total: {contacts.length}</p>
      </header>

      <main className="contact-screen__content">
        <ContactsList />
      </main>
    </div>
  );
}
