import React, { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext";

export default function Message({ emisor, hora, id, texto, status }) {
  const { handleEliminarMensaje } = useContext(MessagesContext);

  const classNames = {
    message: "chat-dialog",
  };
  if (emisor === "YO") {
    classNames.message += " chat-dialog__my-message";
  }
  return (
    <div className={classNames.message}>
      <span>{texto}</span>
      <div>
        <span>{hora}</span>
        <span>✔✔</span>
        <button onClick={() => handleEliminarMensaje(id)}>Eliminar</button>
      </div>
    </div>
  );
}
