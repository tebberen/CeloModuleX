import { useEffect, useState } from 'react'
import '../styles/home.css'
import '../styles/global.css'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import { useWallet } from '../hooks/useWallet'
import { getMainHubContract, getRpcProvider } from '../services/blockchain'
import { shortenAddress } from '../utils/format'
import { getAccessNftContract } from '../services/blockchain'

const Home = () => {
  const { address, signer, isConnected } = useWallet()
  const [profile, setProfile] = useState({ username: 'Guest', totalActions: 0, hasPremium: false })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProfile = async () => {
    try {
      setError('')
      const provider = signer || getRpcProvider()
      const contract = getMainHubContract(provider)
      const [username, totalActions, hasPremium] = await contract.getUserProfile(address || '0x0000000000000000000000000000000000000000')
      setProfile({ username: username || 'Guest', totalActions: Number(totalActions), hasPremium })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const ensurePassStatus = async () => {
    try {
      const provider = signer || getRpcProvider()
      const contract = getAccessNftContract(provider)
      const owns = address ? await contract.hasNFT(address) : false
      setProfile((p) => ({ ...p, hasPremium: owns }))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadProfile()
    ensurePassStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (loading) return <Loader label="Loading dashboard" />

  return (
    <div className="main-container">
      <div className="hero card">
        <div>
          <div className="badge">Connected {isConnected ? shortenAddress(address) : 'Guest'}</div>
          <h1>Welcome back{profile.username ? `, ${profile.username}` : ''}.</h1>
          <p>Track your module usage, manage your access NFT, and keep your profile synced on-chain.</p>
          <div className="action-row">
            <a className="primary-btn" href="/CeloModuleX/#/profile">Manage Profile</a>
            <a className="secondary-btn" href="/CeloModuleX/#/nft">Mint Access NFT</a>
          </div>
        </div>
        <div className="card module-card">
          <strong>Module Highlights</strong>
          <ul>
            <li>Wallet-aware navigation</li>
            <li>On-chain profiles via MainHub</li>
            <li>Premium access NFT minting</li>
          </ul>
          <button className="primary-btn" style={{ alignSelf: 'flex-start' }}>Start Using Modules</button>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginTop: 16 }}>
        <div className="kpi">
          <small>Total Actions</small>
          <strong style={{ fontSize: 24 }}>{profile.totalActions}</strong>
        </div>
        <div className="kpi">
          <small>Premium Status</small>
          <strong style={{ fontSize: 24 }}>{profile.hasPremium ? 'NFT Holder' : 'Free User'}</strong>
        </div>
        <div className="kpi">
          <small>Username</small>
          <strong style={{ fontSize: 24 }}>{profile.username || 'Not set'}</strong>
        </div>
      </div>

      {error ? <Alert type="error" message={error} /> : null}
    </div>
  )
}

export default Home
