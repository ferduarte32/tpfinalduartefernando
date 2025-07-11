import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../Context/MessagesContext';
import './NewMessageForm.css';

export default function NewMessageForm() {
  const { addMessage, isLoading } = useContext(MessagesContext);
  const [messageText, setMessageText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!messageText.trim()) {
      setError('Por favor escribe un mensaje');
      return;
    }

    addMessage(messageText);
    setMessageText('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <div className="form-group">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="message-input"
          disabled={isLoading}
          rows="1"
          aria-label="Escribe tu mensaje"
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      <button
        type="submit"
        className="send-button"
        disabled={isLoading || !messageText.trim()}
        aria-label="Enviar mensaje"
      >
        {isLoading ? (
          <div className="send-spinner"></div>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
          </svg>
        )}
      </button>
    </form>
  );
}