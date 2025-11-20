# CeloModuleX – Web3'ün Merkezi Aksiyon Katmanı

CeloModuleX, onlarca farklı on-chain etkileşimi tek bir yüzeyde toplayan, modüler ve çok zincirli bir aksiyon platformudur. Kullanıcılar, yüzlerce akıllı sözleşme fonksiyonunu tek tıkla çalıştırabilirken yatırımcılar sürdürülebilir bir gelir modeline ortak olur.

## 1. Problem → Çözüm → Vizyon

| Problem | Çözüm | Vizyon |
| --- | --- | --- |
| Kullanıcılar swap, bridge, mint gibi birkaç temel işlemle sınırlı kalıyor; yüzlerce niş aksiyon parçalanmış durumda. | MainHub + modül mimarisi, tüm aksiyonları tek arayüzde birleştiriyor. | CeloModuleX'i Celo'dan başlayıp tüm Web3'e yayılan küresel bir on-chain engagement katmanına dönüştürmek. |

## 2. Teknik Derinlik

- **MainHub.sol** tüm modül kaydı, profil yönetimi, ücret toplama ve liderlik skoru mantığını yürütür. Ayrıntılar için [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
- **Modüller** yalnızca kendi işlevlerini uygular, ücret ve erişim kontrolü MainHub tarafından yapılır.
- **Çok Zincirli Tasarım** her zincirde aynı MainHub mimarisinin dağıtılmasıyla risk dağılımı sağlar.

## 3. Ekonomik Model

1. **Premium NFT Access Pass** – 5 CELO'dan başlayan ve her 50 yeni modülde 2 CELO artan dinamik fiyatlı üyelik. Premium kullanıcılar işlem başına 0.01 CELO öder.
2. **İşlem Komisyonları** – Standart kullanıcılar 0.1 CELO öder. Tüm ücretler MainHub'da toplanır ve sürdürülebilir gelir yaratır.

Detaylı tablo: [`docs/ECONOMICS.md`](docs/ECONOMICS.md).

## 4. Veri Katmanı ve Liderlik

- MainHub, kullanıcı profilleri ve aksiyon istatistiklerini kaydeder.
- Liderlik skoru formülü: `Score = (Unique Modules × 5) + (Total Actions × 1) + (Premium Actions × 10)`.
- Tüm zamanlar, haftalık, aylık ve modül bazlı sıralamalar mevcuttur.

Bkz. [`docs/DATA_LAYER.md`](docs/DATA_LAYER.md).

## 5. Entegrasyonlar ve Yol Haritası

- Celo AI Partner Programı, Talent Protocol, Self XYZ gibi partnerler aracılığıyla yeni modül tipleri eklenir.
- Yol haritası üç aşamadan oluşur: Başlangıç (50 modül), Genişleme (100 modül, multi-chain testleri), Büyüme (200+ modül, geliştirici programı).

Detaylar: [`docs/ROADMAP.md`](docs/ROADMAP.md).

## 6. Proje Yapısı

```
contracts/        # MainHub + modül sözleşmeleri (Hardhat)
frontend/         # Web arayüzü (Next.js + TypeScript)
scripts/          # Deploy ve yardımcı script'ler
docs/             # Mimari, ekonomi ve yol haritası dokümantasyonu
```

## 7. Hızlı Başlangıç

1. `npm install`
2. `.env.example` → `.env`
3. `npm run deploy:testnet` ile Alfajores'e kontratları dağıtın
4. `npm run dev` ile frontend'i başlatın

## 8. Katkıda Bulunma

- Yeni bir modül eklemek için sadece MainHub'a adres kaydı yapmak yeterli.
- PR'larınızda modülün `execute` imzasını ve gerekli veri şemasını açıklamayı unutmayın.

## 9. Lisans

Bu depo varsayılan olarak MIT lisansı kullanır; farklı lisans gereksinimleri için proje sahibine ulaşın.

## 10. Canlı Ağ ve Adresler

- **Varsayılan ağ:** Celo Mainnet (`chainId 42220`). Uygulama, cüzdan bağlanırken otomatik olarak bu ağa geçmenizi ister.
- **MainHub (aksiyon yöneticisi):** `0xece90BaADe9340826f1D4c77f5A42E6aA95F9B9f`
- **NFTAccess (premium erişim):** `0xA246446F7E1C5b68C10673dfdf06e3961B1CE325`

Frontend, işlem ücretlerini (`basicFee` / `premiumFee`) ve NFT mint fiyatını zincirden okur; bu nedenle ücret değişiklikleri arayüze anında yansır ve GitHub Pages üzerinde statik barındırmada dahi doğru değerler gösterilir.
