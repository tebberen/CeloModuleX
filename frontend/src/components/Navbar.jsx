import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/navbar.css'
import { useWallet } from '../hooks/useWallet'

const Navbar = ({ onOpenWallet }) => {
  const { address, isConnected } = useWallet()

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <img src={logo} alt="Celo Module X" width={36} height={36} />
          <span>Celo Module X</span>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/nft" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            NFT
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Profile
          </NavLink>
          <div className="wallet-button">
            {isConnected && address ? (
              <span className="address-pill">{address.slice(0, 6)}...{address.slice(-4)}</span>
            ) : null}
            <button className="primary-btn" onClick={onOpenWallet}>
              {isConnected ? 'Manage Wallet' : 'Connect Wallet'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
