# Clon WhatsApp Web - Proyecto Final

## Descripción

Este proyecto es un clon simplificado de WhatsApp Web desarrollado en React como parte del trabajo práctico final del curso. La aplicación permite:

- Listar contactos.
- Visualizar mensajes por contacto.
- Enviar nuevos mensajes con soporte para emojis.
- Ver detalle de contacto.
- Navegación con React Router.
- Diseño responsivo para dispositivos móviles y desktop.

El objetivo principal fue replicar la estructura básica y funcionalidad del chat, manteniendo un diseño claro, accesible y con buena experiencia de usuario.

---

## Librerías utilizadas

- **React**: para la construcción de la interfaz y manejo de estados.
- **React Router DOM**: para el enrutamiento entre pantallas.
- **React Icons**: para los íconos en botones y elementos visuales.
- **Emoji Picker React**: para seleccionar emojis en el chat.
- **SweetAlert2**: para mostrar alertas interactivas.
- **Vite**: para la configuración y desarrollo rápido del proyecto.

---

## Dificultades encontradas

- Implementar la responsividad completa para varios tamaños de pantalla, especialmente para mantener un diseño funcional en móviles.
- Manejo correcto del estado global usando Context API para compartir datos entre componentes.
- Integrar el selector de emojis y hacer que su apertura/cierre no interfiera con la experiencia de escritura.
- Navegación con parámetros dinámicos para cargar mensajes y detalles de contacto.
- Mantener una estructura de carpetas y código limpio siguiendo principios como DRY y KISS.

---

## Uso

Para correr el proyecto:

```bash
npm install
npm run dev
