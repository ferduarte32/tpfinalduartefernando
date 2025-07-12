import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ContactDetailContext } from "../../Context/ContactDetailContext"
import "./ChatHeader.css"

export default function ChatHeader() {
  const navigate = useNavigate()
  const { contact_id } = useParams()
  const { contact_detail } = useContext(ContactDetailContext)

  const handleGoToDetail = () => {
    navigate(`/contacts/${contact_id}/detail`)
  }

  if (!contact_detail) return null

  return (
    <div className="chat-header" onClick={handleGoToDetail} style={styles.header}>
      <img src={contact_detail.img} alt="avatar" style={styles.img} />
      <div style={styles.info}>
        <strong>{contact_detail.name}</strong>
        <small>Última conexión: {contact_detail.last_time_connected}</small>
      </div>
    </div>
  )
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.8rem",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    background: "#f0f2f5"
  },
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  info: {
    display: "flex",
    flexDirection: "column"
  }
}
