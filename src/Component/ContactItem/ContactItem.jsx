import React from "react";
import { Link } from "react-router-dom"; // corregí import

const ContactItem = ({
  name,
  id,
  img,
  last_message,
  unread_messages,
}) => {
  return (
    <Link to={`/contacts/${id}/messages`} className="contact-item">
      <img src={img} alt={`${name} profile`} />
      <div className="info">
        <span className="name">{name}</span>
        <span className="last-message">{last_message?.text}</span>
      </div>
      {unread_messages > 0 && (
        <span className="unread-count">{unread_messages}</span>
      )}
    </Link>
  );
};

export default ContactItem;
