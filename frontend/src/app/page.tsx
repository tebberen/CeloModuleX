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
    <main className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#FFE48B] via-[#FFC640] to-[#F0A600] pb-16 text-[#2B1A06]">
      <section className="w-full py-16">
        <div className="mx-auto flex w-full flex-col gap-10 px-4 sm:px-8 lg:px-12">
          <div className="space-y-4 rounded-3xl border border-[#F3B932]/70 bg-gradient-to-r from-[#FFEAA1]/85 via-[#FFD458]/80 to-[#F6B81C]/80 p-8 shadow-[0_18px_60px_rgba(201,123,0,0.25)]">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F6D766] px-4 py-2 text-xs font-semibold uppercase text-[#7A4E00] shadow-[0_10px_30px_rgba(158,106,0,0.25)]">
              Projeyi Tanıyın
            </span>
            <h1 className="text-4xl font-bold leading-tight text-[#1C1205] sm:text-5xl">CeloModuleX hakkında</h1>
            <p className="text-lg text-[#4A3011] sm:text-xl">
              Hızlı, güvenli ve kullanıcı dostu bir Celo deneyimi için tasarlanan modüler araç seti. Soruları yanıtlayın, ardından premium NFT ile tam erişimi açın.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {faqs.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col gap-3 rounded-3xl border border-[#F3B932] bg-gradient-to-br from-[#FFE89A] via-[#FFD564] to-[#F6B81C] p-7 shadow-[0_18px_60px_rgba(201,123,0,0.25)]"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-[#885400]">{item.title}</p>
                <p className="text-base leading-relaxed text-[#3A2408]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-4">
        <div className="mx-auto w-full px-4 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 rounded-3xl border border-[#F0AE1C]/80 bg-gradient-to-r from-[#FFD86B] via-[#FFC63C] to-[#F9B21F] p-10 shadow-[0_26px_90px_rgba(169,93,0,0.28)] lg:grid-cols-2">
            <div className="space-y-6 text-[#2B1A06]">
              <span className="inline-flex w-fit rounded-full bg-[#F8E7A0] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#6C4300] shadow-[0_12px_34px_rgba(124,76,0,0.25)]">
                Premium erişimi aç
              </span>
              <h2 className="text-4xl font-bold leading-tight text-[#0F0C07] sm:text-5xl">Mint a premium NFT, unlock exclusive features</h2>
              <p className="text-lg text-[#3D250A]">
                Cüzdanınızı bağlayın, erişim NFT&apos;sini basın ve modüller arasında geçiş yaparak zincir üstü ayrıcalıkları keşfedin. Tüm deneyim, paylaştığınız görseldeki sıcak tonlarla uyumlu.
              </p>
              <div className="grid gap-3 text-base text-[#3F301E]">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#FDECB3] px-4 py-2 text-sm font-semibold text-[#7A4E00] shadow-[0_10px_22px_rgba(136,84,0,0.16)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#35D07F]"></span>
                  Celo uyumlu, tek tıkla işlem
                </div>
                <div className="inline-flex items-center gap-3 rounded-full bg-[#FDECB3] px-4 py-2 text-sm font-semibold text-[#7A4E00] shadow-[0_10px_22px_rgba(136,84,0,0.16)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7C5DFA]"></span>
                  Premium NFT ile kilitli modüller
                </div>
                <div className="inline-flex items-center gap-3 rounded-full bg-[#FDECB3] px-4 py-2 text-sm font-semibold text-[#7A4E00] shadow-[0_10px_22px_rgba(136,84,0,0.16)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E59400]"></span>
                  Hızlı kurulum, canlı istatistikler
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <ConnectWalletModal />
                <Link href="/modules">
                  <Button className="rounded-full bg-[#FDF6D0] text-[#9B6400] shadow-[0_12px_30px_rgba(99,62,0,0.2)] ring-1 ring-[#F7D15A] hover:bg-[#FFEFA8]">
                    Modülleri Gör
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF7DF]/90 p-6 shadow-[0_20px_90px_rgba(99,62,0,0.22)]">
              <div className="flex items-start justify-between rounded-2xl border border-[#F7C54C] bg-gradient-to-r from-[#FFEDA3] to-[#FFD86C] p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8A5600]">Premium</p>
                  <h3 className="text-2xl font-bold text-[#1C1205]">Access NFT</h3>
                  <p className="mt-2 text-sm text-[#4C2D0B]">Özel modüller ve zincir üstü ayrıcalıklar için premium erişim NFT&apos;sini basın.</p>
                </div>
                <span className="rounded-full bg-[#FDF6D0] px-3 py-1 text-xs font-semibold text-[#1C1205]">Yeni</span>
              </div>

              <div className="mt-6 rounded-2xl border border-[#F7C54C] bg-[#FFE9A8] p-6">
                <div className="flex justify-center">
                  <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-[#FFF7DF] shadow-[0_14px_42px_rgba(201,123,0,0.28)]">
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
        </div>
      </section>
    </main>
  )
}
