Desafío: Web de Mensajería tipo WhatsApp

Este proyecto consiste en el desarrollo de una aplicación web de mensajería inspirada en la interfaz de WhatsApp Web. La aplicación permite visualizar una lista de contactos, acceder al detalle de cada contacto y simular una experiencia de usuario fluida y responsiva.
🧩 Descripción del desafío

El objetivo fue desarrollar una aplicación totalmente responsiva que funcione correctamente desde dispositivos con pantallas pequeñas (320px) hasta pantallas grandes (2000px), con estilos accesibles, uso de React como framework principal y una estructura similar a WhatsApp Web, tanto a nivel visual como funcional.
📚 Librerías utilizadas

    React: Para la construcción de la UI y manejo de componentes.

    React Router DOM: Para el manejo de rutas dinámicas entre pantallas (como el detalle del contacto).

    Context API: Para el manejo del estado global (contactos, detalles, mensajes).

    CSS (modo claro/oscuro): Se trabajó con estilos custom en main.css y otros archivos CSS individuales por pantalla, con soporte para prefers-color-scheme.

📁 Estructura general

src/
├── App.jsx
├── index.js
├── Context/
│   └── ContactContext.jsx
│   └── ContactDetailContext.jsx
├── Screens/
│   ├── ContactScreen/
│   │   └── ContactScreen.jsx
│   │   └── ContactScreen.css
│   ├── ContactDetailScreen/
│   │   └── ContactDetailScreen.jsx
│   │   └── ContactDetailScreen.css
├── data/
│   └── contact-mook.js
├── services/
│   └── contactService.js
├── styles/
│   └── main.css

⚙️ Funcionalidades implementadas

    ✅ Lista de contactos con última conexión y mensaje reciente

    ✅ Redirección al hacer clic en un contacto

    ✅ Pantalla de detalle con nombre, imagen, y datos adicionales

    ✅ Botón para volver desde el detalle

    ✅ Estilo inspirado en WhatsApp Web

    ✅ Diseño responsivo y accesible

🧪 Dificultades presentadas (opcional)

    Al principio, los detalles del contacto no se cargaban correctamente porque el contact_id no se pasaba como parámetro o el contexto no estaba bien sincronizado.

    También fue necesario ajustar las rutas en React Router y asegurarse de que useParams() funcionara con el contexto de detalles.

    Asegurar que los estilos fueran accesibles tanto en modo claro como oscuro fue un desafío interesante, ya que se usaron media queries con prefers-color-scheme.