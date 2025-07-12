import React, { useContext, useEffect } from 'react'
import Chat from '../../Component/Chat/Chat'
import NewMessageForm from '../../Component/NewMessageForm/NewMessageForm'
import { useParams } from 'react-router-dom'
import { MessagesContext } from '../../Context/MessagesContext'
import LoaderSpinner from '../../Component/LoaderSpinner/LoaderSpinner'
import ChatHeader from '../../Component/ChatHeader/ChatHeader'
import { ContactDetailContext } from '../../Context/ContactDetailContext'

export default function HomeScreen() {
  const { contact_id } = useParams()
  const { loadMessages, isMessagesLoading } = useContext(MessagesContext)
  const { loadContact } = useContext(ContactDetailContext)

  useEffect(() => {
    loadMessages(contact_id)
    loadContact(contact_id)
  }, [contact_id])

  if (isMessagesLoading) {
    return <LoaderSpinner />
  }

  return (
    <div className="chat-container">
      <ChatHeader />
      <Chat />
      <NewMessageForm />
    </div>
  )
}
