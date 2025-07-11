import React, { useContext } from 'react';
import { MessagesContext } from '../../Context/MessagesContext';
import './Message.css';

export default function Message({ emisor, hora, id, texto, status }) {
  const { deleteMessage } = useContext(MessagesContext);

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      deleteMessage(id);
    }
  };

  return (
    <div className={`message ${emisor === 'YO' ? 'message--own' : 'message--other'}`}>
      <div className="message__content">
        <p className="message__text">{texto}</p>
        <div className="message__meta">
          <span className="message__time">{hora}</span>
          <span className="message__status">
            {status === 'visto' ? '✓✓' : status === 'no-visto' ? '✓' : '◌'}
          </span>
          {emisor === 'YO' && (
            <button 
              className="message__delete"
              onClick={handleDelete}
              aria-label="Eliminar mensaje"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}