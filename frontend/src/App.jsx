import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import WalletModal from "./components/WalletModal.jsx";
import Alert from "./components/Alert.jsx";
import Home from "./pages/Home.jsx";
import Nft from "./pages/Nft.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const closeAlert = () => setAlert({ type: "", message: "" });

  return (
    <div className="app-shell">
      <Navbar onConnect={() => setIsWalletModalOpen(true)} onAlert={setAlert} />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home onAlert={setAlert} />} />
          <Route path="/nft" element={<Nft onAlert={setAlert} />} />
          <Route path="/profile" element={<Profile onAlert={setAlert} />} />
        </Routes>
      </main>
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onAlert={setAlert}
      />
      {alert.message && (
        <Alert type={alert.type} message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
}

export default App;
