import { createContext, useState } from "react";
import { getMessagesByContactId } from "../services/messagesService";

export const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMessages = (contact_id) => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const messagesData = getMessagesByContactId(contact_id) || [];
        setMessages(messagesData);
      } catch (err) {
        setError("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const addMessage = (text) => {
    const newMessage = { 
      emisor: 'YO', 
      hora: new Date().toLocaleTimeString(), 
      texto: text, 
      status: 'no-recibido', 
      id: Date.now() // Mejor ID único
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isLoading,
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