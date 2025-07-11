import { createContext, useState } from "react";
import {
  getMessagesByContactId,
  addMessageToContact,
  deleteMessageFromContact,
  clearMessagesByContactId
} from "../services/messagesService";

export const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentContactId, setCurrentContactId] = useState(null); // Para recordar el contacto actual

  const loadMessages = (contact_id) => {
    setIsLoading(true);
    setError(null);
    setCurrentContactId(contact_id);

    setTimeout(() => {
      try {
        const messagesData = getMessagesByContactId(contact_id) || [];
        setMessages(messagesData);
      } catch (err) {
        setError("Error al cargar mensajes");
      } finally {
        setIsLoading(false);
      }
    }, 500); // puede ser 0 si no querés simular delay
  };

  const addMessage = (text) => {
    const newMessage = {
      emisor: "YO",
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      texto: text,
      status: "no-visto",
      id: Date.now()
    };

    if (!currentContactId) return;

    addMessageToContact(currentContactId, newMessage);
    setMessages(prev => [...prev, newMessage]);
  };

  const deleteMessage = (messageId) => {
    if (!currentContactId) return;
    deleteMessageFromContact(currentContactId, messageId);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const clearMessages = () => {
    if (!currentContactId) return;
    clearMessagesByContactId(currentContactId);
    setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isLoadingMessages: isLoading,
        error,
        loadMessages,
        addMessage,
        deleteMessage,
        clearMessages
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
