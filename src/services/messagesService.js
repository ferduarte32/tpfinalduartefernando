import mook_data from '../data/contact-mook';

// Buscar mensajes de un contacto
export const getMessagesByContactId = (contact_id) => {
  const contact = mook_data.contacts.find(c => Number(c.id) === Number(contact_id));
  return contact?.messages || [];
};

// Agregar mensaje a un contacto
export const addMessageToContact = (contact_id, newMessage) => {
  const contact = mook_data.contacts.find(c => Number(c.id) === Number(contact_id));
  if (contact) {
    contact.messages.push(newMessage);

    // También actualizamos el last_message (opcional)
    contact.last_message = {
      id: newMessage.id,
      text: newMessage.texto
    };
  }
};

// Eliminar un mensaje por ID de un contacto
export const deleteMessageFromContact = (contact_id, messageId) => {
  const contact = mook_data.contacts.find(c => Number(c.id) === Number(contact_id));
  if (contact) {
    contact.messages = contact.messages.filter(msg => msg.id !== messageId);
  }
};

// Limpiar todos los mensajes de un contacto
export const clearMessagesByContactId = (contact_id) => {
  const contact = mook_data.contacts.find(c => Number(c.id) === Number(contact_id));
  if (contact) {
    contact.messages = [];
  }
};
