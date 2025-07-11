import React from "react";
import { Link } from "react-router-dom"; // Cambiado a react-router-dom
import './ContactItem.css'; // Asegúrate de tener este archivo

const ContactItem = ({ name, id, last_time_connected, img, last_message, unread_messages }) => {
  return (
    <Link 
      to={`/contacts/${id}/messages`} 
      className="contact-item"
      aria-label={`Chat con ${name}. ${unread_messages > 0 ? `${unread_messages} mensajes no leídos` : ''}`}
    >
      <img 
        src={img} 
        alt={`Foto de perfil de ${name}`} 
        className="contact-item__avatar"
      />
      
      <div className="contact-item__content">
        <h3 className="contact-item__name">{name}</h3>
        <p className="contact-item__last-message">
          {last_message?.text || "Sin mensajes recientes"}
        </p>
        <span className="contact-item__time">Últ. conexión: {last_time_connected}</span>
      </div>
      
      {unread_messages > 0 && (
        <span className="contact-item__unread">
          {unread_messages > 9 ? '9+' : unread_messages}
        </span>
      )}
    </Link>
  );
};

export default ContactItem;