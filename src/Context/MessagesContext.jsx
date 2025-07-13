import { createContext, useState } from "react"
import { getMessagesByContactId } from "../services/messagesService"
import mook_data from "../data/contact-mook"

// Creamos el contexto
export const MessagesContext = createContext({
  messages: [],
  isMessagesLoading: true,
  addNewMessage: (text, contact_id) => {},
  handleEliminarMensaje: (id_mensaje) => {},
  loadMessages: (contact_id) => {},
})

const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(true)

  const handleEliminarMensaje = (id_mensaje) => {
    const listaMensajeActualizada = messages.filter(
      (mensaje) => mensaje.id !== id_mensaje
    )
    setMessages(listaMensajeActualizada)
  }

  const getIAResponse = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })

    const data = await response.json()
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 No entendí, ¿podés repetirlo?"
    )
  }

  const addNewMessage = async (text, contact_id) => {
    const horaActual = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    const newMessage = {
      emisor: "YO",
      hora: horaActual,
      texto: text,
      status: "no-recibido",
      id: messages.length + 1,
    }

    const mensajesActualizados = [...messages, newMessage]
    setMessages(mensajesActualizados)

    const contacto = mook_data.contacts.find(
      (c) => c.id === parseInt(contact_id)
    )

    if (contacto?.nombreIA?.includes("🤖")) {
      const prompt = `Sos ${contacto.nombreIA}. Respondé de forma simpática y breve al siguiente mensaje del usuario: "${text}"`

      try {
        const respuestaIA = await getIAResponse(prompt)

        const iaMessage = {
          emisor: contacto.nombreIA,
          hora: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          texto: respuestaIA,
          status: "enviado",
          id: mensajesActualizados.length + 1,
        }

        setMessages((prev) => [...prev, iaMessage])
      } catch (error) {
        console.error("Error al obtener respuesta de la IA:", error)
      }
    }
  }

  const loadMessages = (contact_id) => {
    setIsMessagesLoading(true)

    setTimeout(() => {
      const mensajes = getMessagesByContactId(contact_id)
      setMessages(mensajes)
      setIsMessagesLoading(false)
    }, 1000)
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessagesLoading,
        addNewMessage,
        handleEliminarMensaje,
        loadMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export default MessagesContextProvider
