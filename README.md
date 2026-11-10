# Requime Portfolio — Ahmad Mofidur Robbiyal Aqla

Website portofolio pribadi (Full Stack Developer · Prompt Engineer · Game Dev) yang dibangun dengan
**React 18 + TypeScript + Vite 7 + Tailwind CSS 3 + Framer Motion**.

## Fitur

- **Hero** dengan efek mengetik, tombol **Download CV** (PDF di `public/cv/`), dan tautan sosial.
- **About & Journey** — profil dan timeline perjalanan karier.
- **Tech Stack** — kategori skill dengan progress bar animasi.
- **Projects** — filter Web / AI / Game, tautan Live Demo & Source (otomatis disembunyikan bila kosong).
- **AI Assistant** — chatbot berbasis data portofolio (Inggris & Indonesia), dengan tombol pintas ke section terkait.
- **Testimonials** — carousel (auto-play, swipe, keyboard) + form kirim testimoni.
- **Blog** — pencarian, filter kategori, pembaca artikel (modal) dengan deep-link `#blog/<slug>`, like (tersimpan di browser), share, newsletter.
- **Contact** — form tervalidasi, tombol WhatsApp, dan peta Google Maps.
- **Music player** — musik lo-fi/ambient **generatif** (Web Audio API, tanpa file audio) dengan 3 track, visualizer real-time, dan volume.
- Mode **gelap / terang** (tersimpan), kursor kustom (hanya di perangkat mouse), latar partikel, **secret console** (`Ctrl + Alt + A`) berisi mini game, dan easter egg kode Konami.
- Responsif, aksesibel (label ARIA, fokus keyboard, skip link) dan menghormati pengaturan *reduce motion*.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | Fungsi                                               |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Server pengembangan                                  |
| `npm run build`     | Type-check + build produksi ke `dist/`               |
| `npm run preview`   | Pratinjau hasil build                                |
| `npm run lint`      | ESLint                                               |
| `npm run typecheck` | Pemeriksaan TypeScript                               |
| `npm run check`     | Typecheck + lint + build sekaligus                   |

## Mengubah konten

Semua konten ada di **`src/data/`** — tidak perlu menyentuh komponen:

| File              | Isi                                                                 |
| ----------------- | ------------------------------------------------------------------- |
| `profile.ts`      | Nama, bio, kontak, sosial media (kosongkan `href` untuk menyembunyikan), menu, layanan |
| `projects.ts`     | Daftar proyek                                                       |
| `skills.ts`       | Tech stack, statistik, timeline                                     |
| `testimonials.ts` | Testimoni klien                                                     |
| `posts.ts`        | Artikel blog (judul, ringkasan, isi lengkap)                        |

- **CV**: ganti `public/cv/Ahmad-Mofidur-Robbiyal-Aqla-CV.pdf` dengan CV Anda sendiri (nama file sama, atau ubah `cvUrl` di `profile.ts`).
- **Gambar**: simpan di `public/images/` lalu rujuk sebagai `/images/nama-file.jpg`.

## Form kontak, testimoni & newsletter

Secara default, form membuka aplikasi email pengunjung dengan isi yang sudah terisi otomatis (tanpa backend).
Agar pesan **langsung masuk ke inbox**, buat access key gratis di [web3forms.com](https://web3forms.com), lalu:

```bash
cp .env.example .env
# isi VITE_WEB3FORMS_KEY=xxxxxxxx
```

Saat deploy (Vercel/Netlify), tambahkan variabel lingkungan `VITE_WEB3FORMS_KEY` yang sama.

## Deploy

Situs ini statis. Jalankan `npm run build` lalu unggah folder `dist/` ke Vercel, Netlify, GitHub Pages,
atau hosting statis lainnya (Vercel/Netlify mendeteksi Vite secara otomatis).
