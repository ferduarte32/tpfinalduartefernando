index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MessagesContextProvider from './Context/MessagesContext.jsx'
import { BrowserRouter } from 'react-router'
import ContactContextProvider from './Context/ContactContext.jsx'
import ContactDetailContextProvider from './Context/ContactDetailContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContactContextProvider>
      <MessagesContextProvider >
        <ContactDetailContextProvider>
          <App />
        </ContactDetailContextProvider>
      </MessagesContextProvider>
    </ContactContextProvider>
  </BrowserRouter>
  
)

src/App.jsx
import React, { useState } from 'react'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import {Routes, Route} from 'react-router'
import ContactScreen from './Screens/ContactScreen/ContactScreen'
import ContactDetailScreen from './Screens/ContactDetailScreen/ContactDetailScreen'
import { getContactList } from './services/contactService'
import { getMessagesByContactId } from './services/messagesService'
function App() {
	
	

	return (
		<div>
			
			<Routes>
				<Route
					path='/' 
					element={<ContactScreen/>} 
				/>
				<Route
					path='/contacts/:contact_id/messages' /* Configuramos el prametro de busqueda :contact_id */
					element={<HomeScreen/>} 
				/>
				<Route 
					path='/contacts'
					element={<ContactScreen/>}
				/>
				<Route
					path='/contacts/:contact_id/detail'
					element={<ContactDetailScreen/>}
				/>
			</Routes>
		</div>
	)
}

export default App
src/services/contactService.js
import mook_data from "../data/contact-mook"


export const getMessagesByContactId = (contact_id) => {
    for(const contact of mook_data.contacts){
        if(Number(contact.id) === Number(contact_id)){
            return contact.messages
        }
    }
    return null
}

src/services/contactService.js
import mook_data from "../data/contact-mook"


export const getContactList = () => {
    return mook_data.contacts
}

export const getContactById = (contact_id) => {
    for(const contact of mook_data.contacts){
        if(Number(contact.id) === Number(contact_id) ){
            return contact
        }
    }
    return null
}

(src/Screens/HomeScreen)
import React, { useContext, useEffect } from 'react'
import Chat from '../../Component/Chat/Chat'
import NewMessageForm from '../../Component/NewMessageForm/NewMessageForm'
import { IoIosBody, IoIosBackspace } from "react-icons/io";
import Swal from 'sweetalert2'
import { Link, useParams } from 'react-router';
import { MessagesContext } from '../../Context/MessagesContext';
import LoaderSpinner from '../../Component/LoaderSpinner/LoaderSpinner';

export default function HomeScreen() {

    const { contact_id } = useParams()
    const { loadMessages, isMessagesLoading } = useContext(MessagesContext)

    useEffect(
        () => {
            loadMessages(contact_id)
        },
        [contact_id]
    )

    if (isMessagesLoading) {
        return <LoaderSpinner />
    }
    const handleClickAlertButton = () => {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    return (
        <div>
            <Link to={`/contacts/${contact_id}/detail`}>Ir a detalle de contacto</Link>
            <Chat />
            <NewMessageForm />
        </div>

    )
}

[text](src/Screens/ContactScreen/ContactScreen.jsx)
import React, { useContext } from 'react'
import { ContactContext } from '../../Context/ContactContext'
import ContactsList from '../../Component/ContactList/ContactList'

export default function ContactScreen() {
    const {contacts} = useContext(ContactContext)
    
    return (
        <div>
            <ContactsList/>
        </div>
    )
}
[text](src/Screens/ContactDetailScreen/ContactDetailScreen.jsx)
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { ContactDetailContext } from '../../Context/ContactDetailContext'
import LoaderSpinner from '../../Component/LoaderSpinner/LoaderSpinner'

export default function ContactDetailScreen() {
    const {contact_id} = useParams()
    const {loadContact, contact_detail, isLoadingContactDetail} = useContext(ContactDetailContext)
    useEffect(
        () => {
            loadContact(contact_id)
        },
        [contact_id]
    )

    if(isLoadingContactDetail){
        return <LoaderSpinner/>
    }
    return (
        <div>
            <h1>{contact_detail.name}</h1>
        </div>
    )
}
[text](src/data/contact-mook.js)
const mook_data = {
    contacts: [
        {
            id: 1,
            name: 'Pepe',
            last_time_connected: '14:19',
            img: "https://resizing.flixster.com/HyNT-XNfqIkd0KbeP0zrKyDQQro=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p90510_p_v10_aa.jpg",
            last_message: {
                id: 1,
                text: 'Que tal, tanto tiempo!'
            },
            unread_messages: 1,
            messages: [
                {
                    emisor: 'YO',
                    hora: '23:10',
                    id: 1,
                    texto: 'Hola que tal?',
                    status: 'visto'
                },
            ]
        },
        {
            id: 2,
            name: 'Lucia',
            last_time_connected: '15:19',
            img: "https://resizing.flixster.com/HyNT-XNfqIkd0KbeP0zrKyDQQro=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p90510_p_v10_aa.jpg",
            last_message: {
                id: 1,
                text: 'Que tal, tanto tiempo!'
            },
            unread_messages: 0,
            messages: [
                {
                    emisor: 'USUARIO',
                    hora: '23:11',
                    id: 2,
                    texto: 'Si, hoy aprendi estados',
                    status: 'visto'
                },
            ]
        },
        {
            id: 3,
            name: 'Carlos',
            last_time_connected: '17:19',
            img: "https://resizing.flixster.com/HyNT-XNfqIkd0KbeP0zrKyDQQro=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p90510_p_v10_aa.jpg",
            last_message: {
                id: 1,
                text: 'Que tal, tanto tiempo!'
            },
            unread_messages: 20,
            messages: [
                {
                    emisor: 'YO',
                    hora: '23:12',
                    id: 3,
                    texto: 'Eso que significa 🤓?',
                    status: 'no-visto'
                },
            ]
        }
    ]
}

export default mook_data


[text](src/Context/MessagesContext.jsx)
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

(src/Context/ContactDetailContext.jsx)
import { createContext, useState } from "react";
import { getContactById } from "../services/contactService";

export const ContactDetailContext = createContext(
    {
        contact_detail: null,
        isLoadingContactDetail: true,
        loadContact: (contact_id) => {},
    }
)

const ContactDetailContextProvider = ({children}) => {
    const [contact_detail, setContactDetail] = useState(null)
    const [isLoadingContactDetail, setIsLoadingContactDetail] = useState(true)

    const loadContact = (contact_id) => {
        setIsLoadingContactDetail(true)
        setTimeout(
            () => {
                const contact_selected = getContactById(contact_id)
                setContactDetail(contact_selected)
                setIsLoadingContactDetail(false)
            },
            1000
        )
    }
    return (
        <ContactDetailContext.Provider

            value={
                {
                    contact_detail: contact_detail,
                    isLoadingContactDetail: isLoadingContactDetail,
                    loadContact: loadContact
                }
            }
        >
            {children}
        </ContactDetailContext.Provider>
    )
}

export default ContactDetailContextProvider

[text](src/Context/ContactContext.jsx)
import { createContext, useState } from "react";
import { getContactList } from "../services/contactService";



export const ContactContext = createContext({
    contacts: [],
    isLoadingContacts: true
})

const ContactContextProvider = ({children}) => {
    
    const [contacts, setContacts] = useState(
        [] 
    )
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)
    setTimeout(
        () => {
            const contact_list = getContactList() 
            setContacts(contact_list)
            setIsLoadingContacts(false)
        }, 
        1000
    )


    return (
        <ContactContext.Provider
            value={
                {
                    contacts: contacts,
                    isLoadingContacts: isLoadingContacts
                }
            }
        >
            {children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider
[text](src/Component/NewMessageForm/NewMessageForm.jsx)
import React, { useContext } from 'react'
import { MessagesContext } from '../../Context/MessagesContext'
export default function NewMessageForm() {
    const {addNewMessage} = useContext(MessagesContext)
    const handleSubmitNewMessage = (e) => {
        e.preventDefault()
        let new_text = e.target.text.value
        addNewMessage(new_text)
        e.target.text.value = '' 
    }
    return (
        <form onSubmit={handleSubmitNewMessage}>
            <div>
                <label htmlFor="text">Nuevo mensaje:</label>
                <textarea id='text' name='text' minLength={5} required ></textarea>
            </div>
            <button type='submit'>Enviar mensaje</button>
        </form>
    )
}
[text](src/Component/Message/Message.jsx)
import React, { useContext } from 'react'
import { MessagesContext } from '../../Context/MessagesContext'

export default function Message({ emisor, hora, id, texto, status}) {
    
    const {handleEliminarMensaje} = useContext(MessagesContext)

    const classNames = {
        message: 'chat-dialog'
    }
    if(emisor === 'YO'){
        classNames.message = classNames.message + ' chat-dialog__my-message'
    }
    return (
        <div className={classNames.message}>
            <span> {texto} </span>
            <div>
                <span>{hora}</span>
                <span >✔✔</span>
                {}
                <button onClick={() => {handleEliminarMensaje(id)}} >Eliminar</button>
            </div>
        </div>
    )
}

[text](src/Component/LoaderSpinner/LoaderSpinner.jsx)
import './LoaderSpinner.css'
export default function LoaderSpinner() {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    )
}
[text](src/Component/ContactList/ContactList.jsx)
import React, { useContext } from "react"
import ContactItem from "../ContactItem/ContactItem"
import { ContactContext } from "../../Context/ContactContext"
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner"

const ContactsList = () => {
    const {contacts, isLoadingContacts} = useContext(ContactContext)
    if(isLoadingContacts){
        return (
            <LoaderSpinner/>
        )
    }
    return (
        <div>
            {
                contacts.map(
                    (contact) => {
                        return <ContactItem
                            key={contact.id}
                            id={contact.id}
                            name={contact.name}
                            last_time_connected={contact.last_time_connected}
                            img={contact.img}
                            last_message={contact.last_message}
                            unread_messages={contact.unread_messages}
                        />
                    }
                )
            }
        </div>
    )
}

export default ContactsList
[text](src/Component/ContactItem/ContactItem.jsx)
import React from "react"
import { Link} from "react-router"

const ContactItem = ({name, id, last_time_connected, img, last_message, unread_messages}) => {
    
    return (
        <Link to={`/contacts/${id}/messages`}>
            {}
            <img src={img} alt={`${name} image profile`} />
            <h3>{name}</h3>
            <div>
                {last_message.text}
            </div>
            <span>{unread_messages}</span>
            <span>Ultima conexion: {last_time_connected}</span>
            <hr/>
        </Link>
        
        
    )
}

export default ContactItem
[text](src/Component/Chat/Chat.jsx)
import React, { useContext } from 'react'
import Message from '../Message/Message'
import { MessagesContext } from '../../Context/MessagesContext'

export default function Chat() {
    const {messages} = useContext(MessagesContext)
    if(messages.length === 0){
        return (
            <div>
                <span>No hay mensajes!</span>
            </div>
        )
    }
    return (
        <div>
            {
                messages.map((message) => {
                    return (
                        <Message 
                            key={message.id} 
                            emisor={message.emisor}
                            id={message.id}
                            hora={message.hora}
                            texto={message.texto}
                            status={message.status}
                        />
                    )
                })
            }
        </div>
    )
}
