import { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { getUserProfile, createProfile, updateProfile } from '../services/blockchain';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import '../styles/profile.css';
import '../styles/global.css';

const ProfilePage = () => {
  const { address, isConnected } = useWallet();
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (isConnected && address) {
      loadUserProfile();
    }
  }, [isConnected, address]);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const profile = await getUserProfile(address);
      setUserProfile(profile);
      if (profile && profile.username) {
        setUsername(profile.username);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setAlert({ type: 'error', message: 'Failed to load profile' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setAlert({ type: 'error', message: 'Username is required' });
      return;
    }

    setIsSaving(true);
    try {
      const success = userProfile 
        ? await updateProfile(username)
        : await createProfile(username);

      if (success) {
        setAlert({ type: 'success', message: 'Profile saved successfully!' });
        await loadUserProfile();
      } else {
        setAlert({ type: 'error', message: 'Failed to save profile' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error saving profile' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-form">
            <div className="card">
              <h2>Profile</h2>
              <p>Please connect your wallet to view and edit your profile</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-form">
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert({ type: '', message: '' })} 
          />

          <div className="card">
            <h2 style={{ marginBottom: '24px' }}>Your Profile</h2>

            {isLoading ? (
              <Loader />
            ) : (
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {isSaving ? 'Saving...' : (userProfile ? 'Update Profile' : 'Create Profile')}
                </button>
              </form>
            )}

            {userProfile && (
              <div className="profile-info" style={{ marginTop: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Profile Information</h3>
                <div className="info-item">
                  <span className="info-label">Wallet:</span>
                  <span className="info-value">{address}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Username:</span>
                  <span className="info-value">{userProfile.username || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Actions:</span>
                  <span className="info-value">{userProfile.totalActions || '0'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Premium Status:</span>
                  <span className="info-value" style={{ 
                    color: userProfile.hasPremium ? '#35d07f' : '#dc3545',
                    fontWeight: 'bold'
                  }}>
                    {userProfile.hasPremium ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
