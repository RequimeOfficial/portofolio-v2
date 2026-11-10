<div align="center">

<a href="https://requime.my.id">
  <img src="public/images/alif.jpg" alt="Requime" width="120" style="border-radius: 50%" />
</a>

# Ahmad Mofidur Robbiyal Aqla

<a href="https://requime.my.id">
  <img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=22&duration=3000&pause=800&color=00D1FF&center=true&vCenter=true&width=520&lines=Full+Stack+Developer;Prompt+Engineer;Game+Developer;Welcome+to+my+portfolio+%F0%9F%9A%80" alt="Typing SVG" />
</a>

**Portofolio pribadi Requime — tempat saya memamerkan proyek web, AI, dan game.**

<a href="https://requime.my.id"><img src="https://img.shields.io/badge/🌐_Live_Demo-requime.my.id-00d1ff?style=for-the-badge" alt="Live demo" /></a>
<a href="#-ambil-cv"><img src="https://img.shields.io/badge/📄_CV-Download-bd00ff?style=for-the-badge" alt="Download CV" /></a>

<br />

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Web Audio API](https://img.shields.io/badge/Web_Audio_API-FF6F00?style=flat-square&logo=audiomack&logoColor=white)

</div>

---

## 📸 Tampilan

<div align="center">
  <img src="docs/screenshots/hero.jpg" alt="Hero" width="100%" />
</div>

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/projects.jpg" alt="Projects" /><p align="center"><b>Projects</b> — filter Web / AI / Game</p></td>
    <td width="50%"><img src="docs/screenshots/ai.jpg" alt="AI Assistant" /><p align="center"><b>AI Assistant</b> — tanya apa saja, 2 bahasa</p></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/blog.jpg" alt="Blog" /><p align="center"><b>Tech Blog</b> — artikel lengkap + pencarian</p></td>
    <td width="50%" align="center"><img src="docs/screenshots/mobile-hero.jpg" alt="Mobile" width="200" /><p align="center"><b>Mobile friendly</b> 📱</p></td>
  </tr>
</table>

---

## ✨ Fitur Unggulan

|     | Fitur                 | Keterangan                                                                             |
| --- | --------------------- | -------------------------------------------------------------------------------------- |
| ⌨️  | **Hero interaktif**   | Efek mengetik, ikon teknologi melayang, latar partikel, tombol Download CV             |
| 🧑‍💻  | **About & Journey**   | Profil singkat (umur dihitung otomatis dari tanggal lahir) dan timeline perjalanan     |
| 🛠️  | **Tech Stack**        | 6 kategori skill dengan progress bar animasi                                           |
| 🚀  | **Projects**          | Filter kategori, link Live Demo & Source                                               |
| 🤖  | **AI Assistant**      | Chatbot berbasis data portofolio, paham Bahasa Indonesia & Inggris                     |
| 💬  | **Testimonials**      | Carousel auto-play + swipe, form kirim testimoni                                       |
| 📝  | **Tech Blog**         | 6 artikel lengkap, pencarian, filter, like, share, link langsung `#blog/<slug>`        |
| 📬  | **Contact**           | Form tervalidasi, tombol WhatsApp, dan Google Maps                                     |
| 🎵  | **Music player**      | Musik lo-fi **generatif** langsung di browser (tanpa file audio), 3 track + visualizer |
| 🌗  | **Dark / Light mode** | Pilihan tema tersimpan otomatis                                                        |
| 🎮  | **Easter eggs**       | Secret console `Ctrl + Alt + A` dengan mini game, plus kode Konami ↑↑↓↓←→←→BA          |
| ♿  | **Aksesibel & cepat** | Navigasi keyboard, label ARIA, dukungan _reduce motion_, gambar teroptimasi, SEO siap  |

---

## 🚀 Menjalankan di Lokal

```bash
git clone https://github.com/RequimeOfficial/portofolio-v2.git
cd portofolio-v2
npm install
npm run dev
```

Buka **http://localhost:5173** di browser.

| Script            | Fungsi                                 |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Server pengembangan dengan hot reload  |
| `npm run build`   | Type-check + build produksi ke `dist/` |
| `npm run preview` | Pratinjau hasil build                  |
| `npm run lint`    | Cek kode dengan ESLint                 |
| `npm run check`   | Typecheck + lint + build sekaligus     |
| `npm run format`  | Rapikan kode dengan Prettier           |

---

## 🗂️ Struktur Proyek

```
src/
├── components/
│   ├── sections/      # Hero, About, TechStack, Projects, AISection, Testimonials, Blog, Contact
│   └── ui/            # Komponen kecil yang dipakai ulang (Modal, Avatar, SectionHeader, ...)
├── contexts/          # Tema & music player
├── data/              # ✏️ SEMUA konten situs ada di sini
├── hooks/             # Scrollspy & easter egg
└── lib/               # Asisten AI, mesin musik, pengiriman form, utilitas
public/
├── cv/                # File CV yang bisa diunduh
└── images/            # Gambar proyek & blog
```

---

## ✏️ Mengubah Konten

Semua isi website cukup diubah di folder **`src/data/`**, tanpa menyentuh komponen:

| File              | Isi                                                                    |
| ----------------- | ---------------------------------------------------------------------- |
| `profile.ts`      | Nama, bio, tanggal lahir, kontak, lokasi & peta, sosial media, layanan |
| `projects.ts`     | Daftar proyek                                                          |
| `skills.ts`       | Tech stack, statistik, timeline                                        |
| `testimonials.ts` | Testimoni klien                                                        |
| `posts.ts`        | Artikel blog                                                           |

<a id="-ambil-cv"></a>

> 📄 **CV**: file ada di [`public/cv/Ahmad-Mofidur-Robbiyal-Aqla-CV.pdf`](public/cv/Ahmad-Mofidur-Robbiyal-Aqla-CV.pdf). Ganti dengan versi terbaru kapan saja (nama file sama).

---

## 📬 Form Kontak

Tanpa konfigurasi apa pun, form akan membuka aplikasi email pengunjung dengan pesan yang sudah terisi.
Supaya pesan **langsung masuk ke inbox**, buat access key gratis di [web3forms.com](https://web3forms.com):

```bash
cp .env.example .env
# lalu isi: VITE_WEB3FORMS_KEY=xxxxxxxx
```

Saat deploy, tambahkan environment variable `VITE_WEB3FORMS_KEY` yang sama di dashboard hosting.

---

## 🌐 Deploy

Situs ini statis dengan domain resmi **[requime.my.id](https://requime.my.id)**.

1. Import repo ini di [Vercel](https://vercel.com/new) atau [Netlify](https://app.netlify.com/start). Vite terdeteksi otomatis (build: `npm run build`, output: `dist`).
2. Tambahkan domain kustom `requime.my.id` di pengaturan **Domains**.
3. Arahkan DNS domain ke hosting sesuai petunjuk yang muncul (record `A` / `CNAME`).

---

## 📞 Kontak

<div align="center">

<a href="https://requime.my.id"><img src="https://img.shields.io/badge/Website-requime.my.id-00d1ff?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" /></a>
<a href="mailto:robbiansah363@gmail.com"><img src="https://img.shields.io/badge/Gmail-robbiansah363%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" /></a>
<a href="https://wa.me/6281252517329"><img src="https://img.shields.io/badge/WhatsApp-+62_812--5251--7329-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" /></a>
<br />
<a href="https://github.com/RequimeOfficial"><img src="https://img.shields.io/badge/GitHub-RequimeOfficial-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://instagram.com/requime__"><img src="https://img.shields.io/badge/Instagram-@requime____-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://maps.app.goo.gl/BUKFJa5YMDehFiqw8?g_st=ic"><img src="https://img.shields.io/badge/Lokasi-Sumenep,_Indonesia-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Lokasi" /></a>

<br /><br />

⭐ Kalau suka dengan portofolio ini, jangan lupa kasih **star** ya!

<sub>© 2026 Ahmad Mofidur Robbiyal Aqla · Made with ❤️ in Sumenep, Indonesia</sub>

</div>
