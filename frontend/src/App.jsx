import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nft from './pages/Nft'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import WalletModal from './components/WalletModal'
import { useState } from 'react'

const App = () => {
  const [walletOpen, setWalletOpen] = useState(false)

  return (
    <>
      <Navbar onOpenWallet={() => setWalletOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nft" element={<Nft />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <WalletModal isOpen={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  )
}

export default App
