import { useEffect, useState } from 'react'
import '../styles/nft.css'
import '../styles/global.css'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import { useWallet } from '../hooks/useWallet'
import { useAccessPass } from '../hooks/useAccessPass'
import { formatCelo } from '../utils/format'

const Nft = () => {
  const { isConnected } = useWallet()
  const { price, hasPass, metadata, mint } = useAccessPass()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setStatus('')
  }, [isConnected])

  const handleMint = async () => {
    setStatus('')
    setLoading(true)
    try {
      await mint()
      setStatus('Mint successful! Access granted.')
    } catch (err) {
      setStatus(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-container">
      <div className="section-title">
        <h2>NFT Access Pass</h2>
        <span className="badge">Chain: CELO</span>
      </div>
      <div className="nft-grid">
        <div className="card nft-card">
          <strong>Premium Access NFT</strong>
          <p>Prove membership to unlock premium modules. Mint on Celo mainnet.</p>
          <div className="nft-meta">
            <p>Price: {price ? `${formatCelo(price)} CELO` : 'Loading...'}</p>
            <p>Status: {hasPass ? 'Already minted' : 'Not minted'}</p>
          </div>
          <div className="action-row">
            <button className="primary-btn" disabled={loading || hasPass || !isConnected} onClick={handleMint}>
              {loading ? 'Minting...' : hasPass ? 'Minted' : 'Mint NFT'}
            </button>
            {!isConnected ? <span>Connect wallet to mint</span> : null}
          </div>
        </div>

        <div className="card">
          <strong>NFT Metadata</strong>
          {metadata ? (
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(metadata, null, 2)}</pre>
          ) : (
            <p>Loading metadata...</p>
          )}
        </div>
      </div>

      {status ? <Alert type={status.includes('success') ? 'success' : 'error'} message={status} /> : null}
      {loading ? <Loader label="Processing mint" /> : null}
    </div>
  )
}

export default Nft
