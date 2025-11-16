const Alert = ({ type = 'info', message }) => {
  const colors = {
    success: '#35d07f',
    error: '#c0392b',
    warning: '#f39c12',
    info: '#0b1f15',
  }

  if (!message) return null

  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: 12,
        background: '#ffffff',
        border: `1px solid ${colors[type] || colors.info}`,
        color: colors[type] || colors.info,
        marginTop: 10,
      }}
    >
      {message}
    </div>
  )
}

export default Alert
