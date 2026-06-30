# 💕 Clara Beauty Salon — Website Resmi

Website profesional untuk Clara Beauty Salon yang menawarkan sulam alis, facial, dan perawatan kecantikan di Malang.

## 🛠 Tech Stack

- **React 18** + **Vite** — bundler cepat
- **TanStack Router** — routing modern berbasis file
- **Tailwind CSS** — utility-first styling
- **Axios** — HTTP client untuk API
- **React Helmet Async** — SEO meta tags dinamis

## 🚀 Cara Menjalankan

```bash
# 1. Clone atau download project ini

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env dan isi nomor WhatsApp kamu

# 4. Jalankan development server
npm run dev

# 5. Build untuk production
npm run build
```

## 📁 Struktur Project

```
src/
├── api/
│   ├── client.js          # Axios instance + interceptors
│   └── services.js        # API endpoint functions
├── components/
│   ├── Layout.jsx          # Root layout (Navbar + Footer + WA Float)
│   ├── Navbar.jsx          # Sticky responsive navbar
│   ├── Footer.jsx          # Footer dengan info kontak
│   ├── WhatsAppFloat.jsx   # Tombol WA mengambang
│   ├── ServiceCard.jsx     # Card untuk setiap layanan
│   ├── TestimonialCard.jsx # Card untuk ulasan pelanggan
│   └── SeoHead.jsx         # Reusable SEO meta component
├── data/
│   └── constants.js        # Data statis (services, testimonials, dll)
├── lib/
│   └── utils.js            # Helper functions (openWhatsApp, formatRupiah)
├── pages/
│   ├── Home.jsx            # Halaman utama
│   ├── Services.jsx        # Semua layanan + filter
│   ├── Gallery.jsx         # Galeri foto + filter
│   ├── Testimonials.jsx    # Semua ulasan pelanggan
│   ├── Contact.jsx         # Form booking + info kontak
│   └── NotFound.jsx        # Halaman 404
├── routeTree.jsx           # TanStack Router setup
├── main.jsx                # Entry point
└── index.css               # Tailwind + custom styles
```

## ✏️ Kustomisasi Cepat

### Ganti Nomor WhatsApp
Di file `.env`:
```
VITE_WHATSAPP_NUMBER=6281234567890
```

### Ganti Info Salon
Di file `src/data/constants.js`, edit objek `SALON_INFO`.

### Tambah/Ubah Layanan
Di file `src/data/constants.js`, edit array `SERVICES`.

### Ganti Warna Pink
Di `tailwind.config.js`, edit objek `colors.clara`.

## 🔍 SEO

- Meta tags dinamis per halaman via `react-helmet-async`
- Schema.org `BeautySalon` JSON-LD di `index.html`
- URL canonical di setiap halaman
- Open Graph + Twitter Card support
- Sitemap: tambahkan `vite-plugin-sitemap` untuk sitemap.xml otomatis

## 📸 Menambahkan Foto Galeri

Ganti placeholder di `src/pages/Gallery.jsx` dengan gambar nyata:

```jsx
// Contoh dengan gambar lokal
import foto1 from '../assets/images/sulam-alis-1.jpg'

// Di array GALLERY_ITEMS:
{
  id: 1,
  category: 'sulam',
  label: 'Sulam Alis',
  image: foto1,  // ganti colors dengan image
}
```

## 🌐 Deploy ke Vercel

```bash
npm run build
# Upload folder dist ke Vercel atau jalankan:
npx vercel --prod
```

---

Made with 💕 for Clara Beauty Salon
