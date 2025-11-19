'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ConnectWalletModal } from '@/components/wallet/connect-wallet-modal'
import { useNFTContract } from '@/hooks/use-nft-contract'

const faqs = [
  {
    title: 'Proje Nedir?',
    description:
      'CeloModuleX, cüzdanınızı bağlayıp tek tıklama ile zincir üstü modülleri çalıştırmanızı sağlayan modüler bir Web3 aracıdır.',
  },
  {
    title: 'Ne İşe Yarar?',
    description:
      'Projeyi, profilinizi ve NFT erişim biletinizi kullanarak özel modülleri açabilir, topluluğa bağış yapabilir ve ağdaki itibarınızı güçlendirebilirsiniz.',
  },
  {
    title: 'Nasıl Başlarım?',
    description:
      'Cüzdanınızı bağlayın, profilinizi oluşturun ve premium NFT ile tüm özellikleri açın. Tüm adımlar basit, hızlı ve Celo uyumlu.',
  },
]

export default function Home() {
  const { mintNFT, loading: minting } = useNFTContract()
  const [mintMessage, setMintMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleMint = async () => {
    setMintMessage(null)
    try {
      await mintNFT()
      setMintMessage({ type: 'success', text: 'NFT başarıyla basıldı. Premium özellikler açıldı!' })
    } catch (error: any) {
      setMintMessage({ type: 'error', text: error?.message || 'Mint başarısız oldu. Lütfen tekrar deneyin.' })
    }
  }

  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout space-y-8 py-12">
        <div className="space-y-3 max-w-3xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#FFF3CF] px-4 py-2 text-xs font-semibold uppercase text-[#A46900]">
            Projeyi Tanıyın
          </span>
          <h1 className="text-4xl font-bold leading-tight text-[#1C1205] sm:text-5xl">CeloModuleX hakkında</h1>
          <p className="text-lg text-[#58452F] sm:text-xl">
            Hızlı, güvenli ve kullanıcı dostu bir Celo deneyimi için tasarlanan modüler araç seti. Soruları yanıtlayın, ardından premium NFT ile tam erişimi açın.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-[#F2D8AE] bg-white p-6 shadow-[0_16px_50px_rgba(250,204,92,0.18)]"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#C78B16]">{item.title}</p>
              <p className="text-base leading-relaxed text-[#3F301E]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-layout py-6">
        <div className="grid items-center gap-10 rounded-3xl border border-[#F2D8AE] bg-gradient-to-br from-[#FFFDF5] via-[#FFF7E1] to-[#FFE4A8] p-8 shadow-[0_24px_80px_rgba(250,204,92,0.25)] lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex w-fit rounded-full bg-[#FFF1C9] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#BD7A03]">
              Premium erişimi aç
            </span>
            <h2 className="text-4xl font-bold leading-tight text-[#0F0C07] sm:text-5xl">Mint a premium NFT, unlock exclusive features</h2>
            <p className="text-lg text-[#4C3723]">
              Cüzdanınızı bağlayın, erişim NFT&apos;sini basın ve modüller arasında geçiş yaparak zincir üstü ayrıcalıkları keşfedin. Tüm deneyim, paylaştığınız görseldeki sıcak tonlarla uyumlu.
            </p>
            <div className="grid gap-3 text-base text-[#3F301E]">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#AD7B00] shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#35D07F]"></span>
                Celo uyumlu, tek tıkla işlem
              </div>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#AD7B00] shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7C5DFA]"></span>
                Premium NFT ile kilitli modüller
              </div>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#AD7B00] shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FBCC5C]"></span>
                Hızlı kurulum, canlı istatistikler
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ConnectWalletModal />
              <Link href="/modules">
                <Button className="rounded-full bg-white text-[#C78B16] shadow-[0_12px_30px_rgba(12,15,13,0.08)] ring-1 ring-[#F4D58A] hover:bg-[#FFF7D6]">
                  Modülleri Gör
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white/90 p-6 shadow-[0_20px_90px_rgba(12,15,13,0.08)]">
            <div className="flex items-start justify-between rounded-2xl border border-[#F0D8A0] bg-[#FFF5D8] p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#C78B16]">Premium</p>
                <h3 className="text-2xl font-bold text-[#1C1205]">Access NFT</h3>
                <p className="mt-2 text-sm text-[#5C432A]">Özel modüller ve zincir üstü ayrıcalıklar için premium erişim NFT&apos;sini basın.</p>
              </div>
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[#1C1205]">Yeni</span>
            </div>

            <div className="mt-6 rounded-2xl border border-[#F0D8A0] bg-[#FFF3CF] p-6">
              <div className="flex justify-center">
                <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-white shadow-[0_12px_40px_rgba(250,204,92,0.28)]">
                  <Image src="/images/nft-preview.png" alt="CeloModuleX premium NFT" width={160} height={160} className="drop-shadow-lg" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleMint}
                  disabled={minting}
                  className="w-full rounded-full bg-[#F6D371] text-[#3C2500] shadow-[0_12px_40px_rgba(246,211,113,0.45)] hover:bg-[#F4C756]"
                >
                  {minting ? 'Minting…' : 'Mint NFT'}
                </Button>
                {mintMessage && (
                  <div
                    className={`w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm ${
                      mintMessage.type === 'success'
                        ? 'bg-[#E7F7ED] text-[#1B8A57]'
                        : 'bg-[#FFE4AE] text-[#8A5C05]'
                    }`}
                  >
                    {mintMessage.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
