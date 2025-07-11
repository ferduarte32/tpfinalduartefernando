import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Importación corregida
import MessagesContextProvider from './Context/MessagesContext.jsx';
import ContactContextProvider from './Context/ContactContext.jsx';
import ContactDetailContextProvider from './Context/ContactDetailContext.jsx';

// Crea primero el archivo src/styles/main.css
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContactContextProvider>
        <MessagesContextProvider>
          <ContactDetailContextProvider>
            <App />
          </ContactDetailContextProvider>
        </MessagesContextProvider>
      </ContactContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);