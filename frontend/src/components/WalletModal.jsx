import '../styles/global.css'
import { useWallet } from '../hooks/useWallet'

const WalletModal = ({ isOpen, onClose }) => {
  const { connectMetaMask, connectWalletConnect, disconnect, isConnected, address, chainError } = useWallet()

  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'grid', placeItems: 'center', zIndex: 40 }}>
      <div className="card" style={{ width: 'min(420px, 94%)' }}>
        <div className="section-title">
          <h3 style={{ margin: 0 }}>Wallet</h3>
          <button className="secondary-btn" onClick={onClose}>Close</button>
        </div>
        {chainError ? <p style={{ color: '#c0392b' }}>{chainError}</p> : null}
        <div className="grid">
          <button className="primary-btn" onClick={connectMetaMask}>Connect MetaMask</button>
          <button className="secondary-btn" onClick={connectWalletConnect}>WalletConnect</button>
        </div>
        {isConnected ? (
          <div style={{ marginTop: 14 }}>
            <p style={{ margin: '4px 0' }}>Connected: {address}</p>
            <button style={{ marginTop: 10 }} className="secondary-btn" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default WalletModal
