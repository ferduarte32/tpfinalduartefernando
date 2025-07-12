import React, { useContext, useEffect, useRef } from "react";
import Message from "../Message/Message";
import { MessagesContext } from "../../Context/MessagesContext";
import "./Chat.css";

export default function Chat() {
  const { messages } = useContext(MessagesContext);
  const messagesEndRef = useRef(null);

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="chat-container">
        <div className="chat-messages">
          <span>No hay mensajes!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            emisor={message.emisor}
            id={message.id}
            hora={message.hora}
            texto={message.texto}
            status={message.status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
