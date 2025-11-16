import { useEffect, useState } from 'react'
import '../styles/profile.css'
import '../styles/global.css'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import { useWallet } from '../hooks/useWallet'
import { getMainHubContract, getRpcProvider } from '../services/blockchain'

const Profile = () => {
  const { signer, address, isConnected } = useWallet()
  const [profile, setProfile] = useState({ username: '', totalActions: 0, hasPremium: false })
  const [formValue, setFormValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const provider = signer || getRpcProvider()
      const contract = getMainHubContract(provider)
      const [username, totalActions, hasPremium] = await contract.getUserProfile(address || '0x0000000000000000000000000000000000000000')
      setProfile({ username, totalActions: Number(totalActions), hasPremium })
      setFormValue(username)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const getUserProfile = fetchProfile

  const createProfile = async () => {
    if (!signer) return setMessage('Connect wallet to create profile')
    try {
      setLoading(true)
      setMessage('')
      const contract = getMainHubContract(signer)
      const tx = await contract.createProfile(formValue || 'User')
      await tx.wait()
      await fetchProfile()
      setMessage('Profile created successfully')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    if (!signer) return setMessage('Connect wallet to update profile')
    try {
      setLoading(true)
      setMessage('')
      const contract = getMainHubContract(signer)
      const tx = await contract.updateProfile(formValue || 'User')
      await tx.wait()
      await fetchProfile()
      setMessage('Profile updated successfully')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader label="Syncing profile" />

  return (
    <div className="main-container">
      <div className="section-title">
        <h2>Profile</h2>
        <span className="badge">{isConnected ? 'On-chain' : 'Connect wallet'}</span>
      </div>

      <div className="profile-grid">
        <div className="card profile-summary">
          <h2>{profile.username || 'No username set'}</h2>
          <p>Total Actions: {profile.totalActions}</p>
          <p>Premium: {profile.hasPremium ? 'Yes' : 'No'}</p>
          <button className="secondary-btn" onClick={getUserProfile}>Refresh</button>
        </div>

        <div className="card">
          <div className="profile-form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              value={formValue}
              placeholder="Your on-chain handle"
              onChange={(e) => setFormValue(e.target.value)}
            />
            <div className="action-row">
              <button className="primary-btn" onClick={createProfile} disabled={!isConnected}>
                Create Profile
              </button>
              <button className="secondary-btn" onClick={updateProfile} disabled={!isConnected}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {message ? <Alert type={message.includes('success') ? 'success' : 'info'} message={message} /> : null}
    </div>
  )
}

export default Profile
