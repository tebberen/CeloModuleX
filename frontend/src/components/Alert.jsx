import '../styles/global.css';

const Alert = ({ type, message, onClose }) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
      case 'error':
        return { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
      case 'warning':
        return { background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' };
      default:
        return { background: '#d1ecf1', color: '#0c5460', border: '1px solid #bee5eb' };
    }
  };

  if (!message) return null;

  return (
    <div style={{
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '16px',
      position: 'relative',
      ...getAlertStyle()
    }}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: 'inherit'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
