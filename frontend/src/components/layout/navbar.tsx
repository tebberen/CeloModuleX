'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ConnectButton } from '@/components/wallet/connect-button'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/modules', label: 'Modules' },
  { href: '/nft', label: 'NFT' },
  { href: '/profile', label: 'Profile' },
  { href: '/stats', label: 'Stats' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-30">
      <div className="container-layout flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#FBCC5C] text-black font-black text-xl flex items-center justify-center">
            XM
          </div>
          <div>
            <div className="text-lg font-semibold text-white">CeloModuleX</div>
            <div className="text-xs text-white/60">Modular On-Chain Launcher</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`uppercase tracking-wide ${pathname === item.href ? 'text-[#FBCC5C]' : 'text-white/70 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ConnectButton />
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md">
          <div className="container-layout py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block text-sm ${pathname === item.href ? 'text-[#FBCC5C]' : 'text-white/80'}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
