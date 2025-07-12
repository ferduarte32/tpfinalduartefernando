import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ContactScreen from './Screens/ContactScreen/ContactScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import ContactDetailScreen from './Screens/ContactDetailScreen/ContactDetailScreen'
import useIsMobile from './hooks/useIsMobile'

function App() {
  const location = useLocation()
  const isChatRoute = location.pathname.includes('/messages')
  const isMobile = useIsMobile()

  // Si es mobile y está en una conversación, solo muestra el chat
  if (isMobile) {
    return (
      <div className="app-container-mobile">
        <Routes>
          <Route path="/" element={<ContactScreen />} />
          <Route path="/contacts" element={<ContactScreen />} />
          <Route path="/contacts/:contact_id/messages" element={<HomeScreen />} />
          <Route path="/contacts/:contact_id/detail" element={<ContactDetailScreen />} />
        </Routes>
      </div>
    )
  }

  // Si no es mobile, vista dividida
  return (
    <div className="app-container">
      <ContactScreen />
      <Routes>
        <Route path="/contacts/:contact_id/messages" element={<HomeScreen />} />
        <Route path="/contacts/:contact_id/detail" element={<ContactDetailScreen />} />
        <Route path="*" element={<EmptyScreen />} />
      </Routes>
    </div>
  )
}

function EmptyScreen() {
  return (
    <div style={{
      backgroundColor: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '1.2rem'
    }}>
      Seleccioná un contacto para comenzar a chatear
    </div>
  )
}

export default App
