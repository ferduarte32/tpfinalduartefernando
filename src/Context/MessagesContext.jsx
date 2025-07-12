import { createContext, useEffect, useState } from "react";
import { getMessagesByContactId } from "../services/messagesService";
import { useParams } from "react-router";



//Creamos un contexto con la funcion createContext()
export const MessagesContext = createContext(
    {
        messages: [],
        isMessagesLoading: true, 
        addNewMessage: (text) => { },
        handleEliminarMensaje: (id_mensaje) => { },
        loadMessages: (contact_id) => {}
    }
)

//children prop: es el contenido que anida mi componente MessagesContextProvider
const MessagesContextProvider = ({ children }) => {
   


    const [messages, setMessages] = useState([])
    const [isMessagesLoading, setIsMessagesLoading] = useState(true)


    const handleEliminarMensaje = (id_mensaje) => {
        const listaMensajeActualizada = []
        for (const mensaje of messages) {
            if (mensaje.id !== id_mensaje) {
                listaMensajeActualizada.push(mensaje)
            }
        }
        setMessages(listaMensajeActualizada)
    }
    const addNewMessage = (text) => {
        //Esta funcion actualiza el estado de mensajes para agregar un nuevo mensaje
        const new_message = { emisor: 'YO', hora: '23:13', texto: text, status: 'no-recibido', id: messages.length + 1 }
        const clon_messages = [...messages]
        clon_messages.push(new_message)
        setMessages(clon_messages)
    }

    const loadMessages = (contact_id) => {
        //Antes de cargar pasamos el cargando a verdadero asi se muestra el loader
        setIsMessagesLoading(true)

        //Dentro de 2 segundos ocurrira esto
        setTimeout(
            () => {
                const messages = getMessagesByContactId(contact_id)
                setMessages(messages)
                setIsMessagesLoading(false)
            },
            1000
        )
        
    }

    return (
        <MessagesContext.Provider
            value={
                {
                    messages: messages,
                    isMessagesLoading: isMessagesLoading, 
                    addNewMessage: addNewMessage,
                    handleEliminarMensaje: handleEliminarMensaje,
                    loadMessages: loadMessages
                }
            }
        >
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContextProvider