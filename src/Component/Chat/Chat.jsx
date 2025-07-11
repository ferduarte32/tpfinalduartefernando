import React, { useContext, useEffect, useRef } from 'react';
import Message from '../Message/Message';
import NewMessageForm from '../NewMessageForm/NewMessageForm';
import { MessagesContext } from '../../Context/MessagesContext';
import './Chat.css';

export default function Chat() {
    const { messages, isLoadingMessages } = useContext(MessagesContext);
    const chatEndRef = useRef(null);

    // Auto-scroll optimizado
    useEffect(() => {
        if (messages.length > 0) {
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }, [messages]);

    // Contenido del chat
    const renderChatContent = () => {
        if (isLoadingMessages) {
            return (
                <div className="chat-empty">
                    <div className="chat-empty-icon">⏳</div>
                    <p>Cargando mensajes...</p>
                </div>
            );
        }

        if (messages.length === 0) {
            return (
                <div className="chat-empty">
                    <div className="chat-empty-icon">💬</div>
                    <p>No hay mensajes</p>
                    <small>Envía un mensaje para comenzar la conversación</small>
                </div>
            );
        }

        return (
            <div className="chat-messages">
                {messages.map((message) => (
                    <Message 
                        key={`msg-${message.id}`} 
                        emisor={message.emisor}
                        id={message.id}
                        hora={message.hora}
                        texto={message.texto}
                        status={message.status}
                    />
                ))}
                <div ref={chatEndRef} />
            </div>
        );
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-container">
                {renderChatContent()}
            </div>
            <NewMessageForm />
        </div>
    );
}