import React, { useContext } from "react";
import ContactItem from "../ContactItem/ContactItem";
import { ContactContext } from "../../Context/ContactContext";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import './ContactList.css';

const ContactsList = () => {
    const { contacts, isLoadingContacts, error } = useContext(ContactContext);
    
    if (isLoadingContacts) {
        return (
            <div className="contacts-list__loading">
                <LoaderSpinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="contacts-list__empty">
                <div className="contacts-list__empty-icon">⚠️</div>
                <p>Error al cargar contactos</p>
                <small>{error}</small>
            </div>
        );
    }

    if (!contacts || contacts.length === 0) {
        return (
            <div className="contacts-list__empty">
                <div className="contacts-list__empty-icon">👋</div>
                <p>No hay contactos disponibles</p>
                <small>Agrega nuevos contactos para comenzar a chatear</small>
            </div>
        );
    }

    return (
        <div className="contacts-list">
            {contacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    last_time_connected={contact.last_time_connected}
                    img={contact.img}
                    last_message={contact.last_message}
                    unread_messages={contact.unread_messages}
                />
            ))}
        </div>
    );
};

export default ContactsList;