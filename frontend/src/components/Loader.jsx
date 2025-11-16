const Loader = ({ label = 'Loading...' }) => (
  <div style={{ display: 'grid', placeItems: 'center', padding: 20 }}>
    <div style={{ width: 36, height: 36, borderRadius: '50%', border: '4px solid #d9efe5', borderTopColor: '#35d07f', animation: 'spin 1s linear infinite' }} />
    <p style={{ marginTop: 10 }}>{label}</p>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
)

export default Loader
