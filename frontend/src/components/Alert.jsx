function Alert({ type = "info", message, onClose }) {
  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close alert">
        ×
      </button>
    </div>
  );
}

export default Alert;
