import React from 'react';
import { ArrowLeft, MoreVertical } from 'react-feather'; // o íconos similares

export default function ChatHeader({ contactName, status }) {
  return (
    <header className="chat-header">
      <button className="back-button" aria-label="Volver">
        <ArrowLeft size={20} />
      </button>
      <div className="contact-info">
        <h2>{contactName}</h2>
        <p>{status}</p>
      </div>
      <button className="menu-button" aria-label="Menú">
        <MoreVertical size={20} />
      </button>
    </header>
  );
}