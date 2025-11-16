import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../hooks/useWallet.js";
import { shortenAddress } from "../utils/format.js";
import logo from "../../assets/logo.svg";
import "../styles/navbar.css";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/nft", label: "NFT" },
  { path: "/profile", label: "Profile" },
];

function Navbar({ onConnect, onAlert }) {
  const location = useLocation();
  const { address, disconnect } = useWallet();
  const [showMenu, setShowMenu] = useState(false);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onAlert({ type: "success", message: "Disconnected" });
    } catch (error) {
      onAlert({ type: "error", message: error.message });
    } finally {
      setShowMenu(false);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <img src={logo} alt="CeloModuleX" />
          <span>CeloModuleX</span>
        </Link>
      </div>
      <nav className="nav-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="nav-right">
        {!address ? (
          <button className="btn primary" onClick={onConnect}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-menu">
            <button className="btn outline" onClick={() => setShowMenu(!showMenu)}>
              {shortenAddress(address)}
            </button>
            {showMenu && (
              <div className="wallet-dropdown">
                <button onClick={handleDisconnect}>Disconnect</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
