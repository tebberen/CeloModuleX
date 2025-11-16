import { useEffect } from "react";
import { useWallet } from "../hooks/useWallet.js";

function WalletModal({ isOpen, onClose, onAlert }) {
  const { connectMetamask, connectWalletConnect, isConnecting } = useWallet();

  useEffect(() => {
    const onEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const handleConnect = async (connector) => {
    try {
      if (connector === "metamask") {
        await connectMetamask();
      } else {
        await connectWalletConnect();
      }
      onAlert({ type: "success", message: "Wallet connected" });
      onClose();
    } catch (error) {
      onAlert({ type: "error", message: error.message });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Connect Wallet</h3>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-content">
          <button
            className="btn primary full"
            onClick={() => handleConnect("metamask")}
            disabled={isConnecting}
          >
            MetaMask
          </button>
          <button
            className="btn outline full"
            onClick={() => handleConnect("walletconnect")}
            disabled={isConnecting}
          >
            WalletConnect v2
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletModal;
