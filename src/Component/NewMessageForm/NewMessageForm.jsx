import React, { useContext, useState, useRef } from 'react'
import { MessagesContext } from '../../Context/MessagesContext'
import { FaSmile, FaPaperclip, FaMicrophone, FaPaperPlane } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react' // Opcional: si querés usarlo, sino quitá esta parte
import './NewMessageForm.css'

export default function NewMessageForm() {
  const { addNewMessage } = useContext(MessagesContext)
  const [text, setText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef(null)

  const onEmojiClick = (emojiData, event) => {
    setText((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length >= 1) {
      addNewMessage(text)
      setText('')
    }
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((val) => !val)
  }

  const handleClipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      alert(`Archivo seleccionado: ${file.name}`)
    }
    e.target.value = null
  }

  return (
    <form className="message-form" onSubmit={handleSubmit} style={{ position: 'relative' }}>
      {/* Emoji button */}
      <button
        type="button"
        className="icon-button"
        onClick={toggleEmojiPicker}
        aria-label="Seleccionar emoji"
      >
        <FaSmile />
      </button>

      {/* Clip button */}
      <button
        type="button"
        className="icon-button"
        onClick={handleClipClick}
        aria-label="Adjuntar archivo"
      >
        <FaPaperclip />
      </button>

      {/* Input oculto para archivo */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div style={{ position: 'absolute', bottom: '50px', left: '10px', zIndex: 100 }}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* Input de texto */}
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      {/* Botón enviar o micrófono según texto */}
      {text.trim().length === 0 ? (
        <button type="button" className="icon-button" aria-label="Grabar mensaje de voz">
          <FaMicrophone />
        </button>
      ) : (
        <button type="submit" className="icon-button" aria-label="Enviar mensaje">
          <FaPaperPlane />
        </button>
      )}
    </form>
  )
}
