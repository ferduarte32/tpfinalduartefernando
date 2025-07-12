import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ContactDetailContext } from '../../Context/ContactDetailContext'
import LoaderSpinner from '../../Component/LoaderSpinner/LoaderSpinner'

export default function ContactDetailScreen() {
  const { contact_id } = useParams()
  const { loadContact, contact_detail, isLoadingContactDetail } = useContext(ContactDetailContext)
  const navigate = useNavigate()

  useEffect(() => {
    loadContact(contact_id)
  }, [contact_id])

  if (isLoadingContactDetail) return <LoaderSpinner />

  if (!contact_detail) return <p>Contacto no encontrado</p>

  return (
    <div style={styles.container}>
      <img
        src={contact_detail.img}
        alt={`Foto de ${contact_detail.name}`}
        style={styles.img}
      />
      <h1>{contact_detail.name}</h1>
      <p>Última conexión: {contact_detail.last_time_connected}</p>
      <p>Mensajes totales: {contact_detail.messages.length}</p>
      <p>Mensajes no leídos: {contact_detail.unread_messages}</p>

      <button onClick={() => navigate(`/contacts/${contact_id}/messages`)} style={styles.button}>
        Volver al chat
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center"
  },
  img: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "1rem",
    objectFit: "cover"
  },
  button: {
    marginTop: "2rem",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer"
  }
}
