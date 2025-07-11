import './LoaderSpinner.css';

export default function LoaderSpinner({ size = 'medium', color = 'primary', message }) {
  const spinnerClass = `spinner ${size} ${color} ${message ? 'with-message' : ''}`;
  
  return (
    <div className="spinner-container">
      <div 
        className={spinnerClass}
        data-message={message}
        aria-live="polite"
        aria-label={message || "Cargando contenido"}
      />
    </div>
  );
}