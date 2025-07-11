// src/Screens/ContactDetailScreen/ContactDetailScreen.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactDetailContext } from '../../Context/ContactDetailContext';
import LoaderSpinner from '../../Component/LoaderSpinner/LoaderSpinner'; // Asegúrate de tener este componente o reemplaza con un loading simple
import './ContactDetailScreen.css';

export default function ContactDetailScreen() {
  const { contact_id } = useParams();
  const navigate = useNavigate();

  const {
    contactDetail,
    isLoading,
    error,
    loadContact,
  } = useContext(ContactDetailContext);

  useEffect(() => {
    if (contact_id) loadContact(contact_id);
  }, [contact_id, loadContact]);

  if (isLoading) return <LoaderSpinner />;

  if (error) {
    return (
      <div className="contact-detail-error">
        <p>{error}</p>
        <button onClick={() => loadContact(contact_id)}>Reintentar</button>
      </div>
    );
  }

  if (!contactDetail) {
    return <p>Contacto no encontrado.</p>;
  }

  return (
    <div className="contact-detail-container">
      <header className="contact-detail-header">
        <button
          className="contact-detail-back"
          onClick={() => navigate(-1)}
          aria-label="Volver"
          title="Volver"
        >
          ←
        </button>

        <img
          src={contactDetail.img}
          alt={`Foto de ${contactDetail.name}`}
          className="contact-detail-avatar"
        />
        <h1 className="contact-detail-name">{contactDetail.name}</h1>
        <p className="contact-detail-status">
          Última conexión: {contactDetail.last_time_connected || 'desconocida'}
        </p>
      </header>

      <section className="contact-detail-info">
        <div className="info-section">
          <h2>Información del contacto</h2>
          <p><strong>Email:</strong> {contactDetail.email || 'No disponible'}</p>
          <p><strong>Teléfono:</strong> {contactDetail.phone || 'No disponible'}</p>
          {/* Agrega más campos si los tienes */}
        </div>
      </section>
    </div>
  );
}
