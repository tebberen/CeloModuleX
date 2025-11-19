'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ConnectWalletModal } from '@/components/wallet/connect-wallet-modal'

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
    <header className="sticky top-0 z-40 w-full border-b border-[#F4D58A]/60 bg-white/90 backdrop-blur-xl">
      <div className="container-layout flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBCC5C] text-lg font-black text-[#0c0f0d] shadow-md">
            XM
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold text-[#1C1205]">CeloModuleX</div>
            <div className="text-xs uppercase tracking-wide text-[#8A6B33]">Celo action launcher</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative pb-1 transition-colors ${
                pathname === item.href ? 'text-[#C78B16]' : 'text-[#5B4128] hover:text-[#1C1205]'
              }`}
            >
              {item.label}
              {pathname === item.href && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#C78B16]"></span>}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ConnectWalletModal />
        </div>

        <button
          className="flex items-center justify-center rounded-full p-2 text-[#5B4128] hover:bg-black/5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#F4D58A]/60 bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="container-layout space-y-4 py-4">
            <nav className="grid gap-3 text-sm font-semibold text-[#1C1205]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`${pathname === item.href ? 'text-[#C78B16]' : 'text-[#5B4128]'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2">
              <ConnectWalletModal />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
