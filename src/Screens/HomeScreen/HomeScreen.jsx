import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Chat from '../../Component/Chat/Chat';
import NewMessageForm from '../../Component/NewMessageForm/NewMessageForm';
import LoaderSpinner from '../../Component/LoaderSpinner/LoaderSpinner';
import { MessagesContext } from '../../Context/MessagesContext';
import { ContactContext } from '../../Context/ContactContext';
import './HomeScreen.css';

export default function HomeScreen() {
  const { contact_id } = useParams();
  const navigate = useNavigate();
  const { loadMessages, isMessagesLoading } = useContext(MessagesContext);
  const { contacts, isLoadingContacts } = useContext(ContactContext);

  // Obtener el contacto actual para mostrar su nombre
  const currentContact = contacts.find(
    (c) => String(c.id) === String(contact_id)
  );

  useEffect(() => {
    if (contact_id) loadMessages(contact_id);
  }, [contact_id, loadMessages]);

  if (isMessagesLoading || isLoadingContacts) {
    return <LoaderSpinner />;
  }

  return (
    <div className="home-screen">
      <header className="home-screen__header">
        <button
          className="home-screen__back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          ← Volver
        </button>
        {currentContact ? (
          <Link
            to={`/contacts/${contact_id}/detail`}
            className="home-screen__link"
            aria-label={`Detalle de ${currentContact.name}`}
          >
            {currentContact.name}
          </Link>
        ) : (
          <span className="home-screen__link--disabled">
            Contacto no encontrado
          </span>
        )}
      </header>

      <main className="chat-wrapper">
        <Chat />
        <NewMessageForm />
      </main>
    </div>
  );
}
