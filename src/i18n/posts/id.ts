import en from './en';
import type { ContentBlock, PostSlug, PostTexts } from './types';

/** Code samples are language-neutral, so they are reused from the English articles. */
const code = (slug: PostSlug): ContentBlock => en[slug].content.find((b) => b.type === 'code')!;

const id: PostTexts = {
  'scalable-react-applications': {
    title: 'Membangun Aplikasi React yang Scalable: Best Practice 2024',
    excerpt:
      'Pelajari teknik terbaru untuk membuat aplikasi React yang mudah dirawat dan scalable dengan pola modern dan optimasi performa.',
    content: [
      {
        type: 'p',
        text: 'Aplikasi React jarang menjadi sulit dirawat karena satu keputusan buruk. Semuanya terjadi perlahan: sebuah komponen bertambah beberapa props, state diangkat "sekali lagi saja", lalu tiba-tiba setiap perubahan menyentuh lima file. Berikut praktik yang saya andalkan agar proyek tetap sehat saat terus berkembang.',
      },
      { type: 'h', text: '1. Kelompokkan berdasarkan fitur, bukan jenis file' },
      {
        type: 'p',
        text: 'Daripada folder components/, hooks/, dan utils/ yang raksasa, kelompokkan kode per fitur. Semua yang berkaitan dengan checkout berada di features/checkout. Saat sebuah fitur dihapus, kamu cukup menghapus satu folder tanpa harus mencari ke seluruh struktur proyek.',
      },
      { type: 'h', text: '2. Simpan state sedekat mungkin dengan tempat ia dipakai' },
      {
        type: 'p',
        text: 'State global memang praktis tapi mahal: setiap konsumen ikut render ulang saat nilainya berubah. Mulailah dengan state lokal, angkat hanya jika dua komponen bersaudara benar-benar membutuhkannya, dan gunakan context atau store hanya untuk kebutuhan seluruh aplikasi seperti autentikasi, tema, atau keranjang belanja.',
      },
      { type: 'h', text: '3. Pisahkan server state dari UI state' },
      {
        type: 'p',
        text: 'Data dari API punya kebutuhan yang berbeda — caching, refetching, invalidasi — dibanding sekadar status modal terbuka. Library seperti TanStack Query mengelola server state sehingga komponenmu cukup fokus pada tampilan.',
      },
      code('scalable-react-applications'),
      { type: 'h', text: '4. Ukur dulu sebelum mengoptimasi' },
      {
        type: 'ul',
        items: [
          'Gunakan React DevTools Profiler untuk menemukan komponen yang terlalu sering render ulang.',
          'Bungkus komponen anak yang berat dengan React.memo hanya setelah masalahnya terukur.',
          'Pecah kode per route dan widget berat dengan React.lazy dan Suspense.',
          'Gunakan virtualisasi untuk daftar panjang daripada merender ribuan baris.',
        ],
      },
      { type: 'h', text: '5. Beri tipe pada batas-batas aplikasi' },
      {
        type: 'p',
        text: 'TypeScript paling terasa manfaatnya di tepi aplikasi: respons API, props komponen, dan utilitas bersama. Tipe yang kuat di sana membuat refactor aman dan mengubah banyak bug runtime menjadi error saat kompilasi.',
      },
      {
        type: 'p',
        text: 'Skalabilitas bukan soal trik cerdas, melainkan konsistensi. Tentukan konvensi sejak awal, tuliskan, lalu biarkan tooling (ESLint, Prettier, TypeScript) yang menegakkannya.',
      },
    ],
  },
  'unity-concept-to-launch': {
    title: 'Pengembangan Game dengan Unity: Dari Konsep hingga Rilis',
    excerpt:
      'Panduan lengkap mengembangkan dan merilis game pertamamu dengan Unity, mulai dari desain hingga monetisasi.',
    content: [
      {
        type: 'p',
        text: 'Menyelesaikan sebuah game adalah keterampilan tersendiri. Kebanyakan proyek pertama gagal bukan karena idenya buruk, tetapi karena cakupannya terlalu besar. Inilah alur kerja yang saya pakai untuk membawa game Unity dari konsep satu kalimat hingga build yang dirilis.',
      },
      { type: 'h', text: 'Mulai dari core loop' },
      {
        type: 'p',
        text: 'Tuliskan apa yang dilakukan pemain setiap 10 detik. Melompat dan mengumpulkan? Mencocokkan dan menghapus? Buat prototipe grey-box yang hanya berisi loop itu — tanpa art, tanpa menu — lalu mainkan sampai terasa seru. Kalau tidak seru dengan kubus, game itu juga tidak akan seru dengan grafis yang indah.',
      },
      { type: 'h', text: 'Susun struktur proyek sejak awal' },
      {
        type: 'ul',
        items: [
          'Gunakan ScriptableObject untuk data seperti statistik musuh, level, dan item.',
          'Jaga MonoBehaviour tetap kecil; satu tanggung jawab per komponen.',
          'Gunakan prefab dan prefab variant daripada menduplikasi objek.',
          'Simpan proyek di version control (Git + Git LFS untuk aset besar) sejak hari pertama.',
        ],
      },
      code('unity-concept-to-launch'),
      { type: 'h', text: 'Polesan adalah yang dirasakan pemain' },
      {
        type: 'p',
        text: 'Getaran layar, partikel, efek suara, dan animasi kecil ("juice") membuat mekanik sederhana terasa luar biasa. Sisihkan fase khusus untuk memoles dan lakukan playtest dengan orang yang belum pernah melihat game-mu.',
      },
      { type: 'h', text: 'Rilis dan monetisasi' },
      {
        type: 'p',
        text: 'Pilih satu platform dulu. Untuk mobile, uji di perangkat kelas bawah dan jaga ukuran build tetap kecil. Tentukan model monetisasi (berbayar, iklan, atau pembelian dalam aplikasi) sebelum rilis, karena hal itu memengaruhi desain game. Terakhir, siapkan halaman toko dengan screenshot yang jelas dan video gameplay singkat — itulah aset pemasaran terpentingmu.',
      },
    ],
  },
  'ai-in-web-development-prompt-engineering': {
    title: 'Masa Depan AI dalam Pengembangan Web: Dasar-dasar Prompt Engineering',
    excerpt:
      'Jelajahi bagaimana AI merevolusi pengembangan web dan pelajari keterampilan penting untuk prompt engineering yang efektif di 2024.',
    content: [
      {
        type: 'p',
        text: 'Large language model kini menjadi bagian biasa dari perangkat kerja developer web: membuat draf kode, menulis test, merangkum dokumentasi, hingga menjadi fitur di dalam produk kita. Namun, hasil yang andal sangat bergantung pada cara kita bertanya.',
      },
      { type: 'h', text: 'Jelaskan tujuan dan konteks secara spesifik' },
      {
        type: 'p',
        text: 'Model hanya tahu apa yang kamu sampaikan. Jelaskan perannya, audiensnya, batasannya, dan format output yang diharapkan. "Buatkan fungsi" itu terlalu umum; "Buatkan fungsi TypeScript yang memvalidasi nomor telepon Indonesia dan mengembalikan boolean, lengkap dengan unit test di Vitest" barulah bisa dikerjakan.',
      },
      { type: 'h', text: 'Berikan contoh' },
      {
        type: 'p',
        text: 'Few-shot prompting — memberi satu atau dua contoh input/output — adalah salah satu cara paling efektif untuk mendapatkan format, gaya bahasa, dan struktur yang konsisten.',
      },
      { type: 'h', text: 'Minta output yang terstruktur' },
      code('ai-in-web-development-prompt-engineering'),
      { type: 'h', text: 'Pasang pengaman di aplikasimu' },
      {
        type: 'ul',
        items: [
          'Validasi output model (misalnya dengan JSON schema) sebelum dipakai.',
          'Jangan pernah menaruh API key di kode front-end — panggil model dari backend.',
          'Catat prompt dan respons agar mudah di-debug dan diperbaiki.',
          'Libatkan manusia untuk tindakan yang punya konsekuensi nyata.',
        ],
      },
      {
        type: 'p',
        text: 'Prompt engineering bukan soal kalimat ajaib, melainkan komunikasi yang jelas. Developer yang terbiasa merumuskan masalah dengan tepat akan mendapat manfaat terbesar dari AI — sekaligus menulis kode yang lebih baik.',
      },
    ],
  },
  'nodejs-performance-optimization': {
    title: 'Optimasi Performa Node.js: Tips dan Trik',
    excerpt: 'Temukan teknik lanjutan untuk mengoptimasi aplikasi Node.js agar lebih cepat dan scalable.',
    content: [
      {
        type: 'p',
        text: 'Node.js sudah cepat secara bawaan, tetapi beberapa kesalahan umum bisa membuat server lambat saat beban tinggi. Berikut optimasi yang memberi dampak terbesar di proyek nyata.',
      },
      { type: 'h', text: 'Jangan pernah memblokir event loop' },
      {
        type: 'p',
        text: 'Node menjalankan JavaScript-mu di satu thread. Membaca file secara sinkron, parsing JSON yang berat, atau loop yang boros CPU akan menahan semua request lain. Gunakan API asinkron, dan pindahkan pekerjaan berat ke worker thread atau job queue.',
      },
      { type: 'h', text: 'Jalankan pekerjaan independen secara paralel' },
      code('nodejs-performance-optimization'),
      { type: 'h', text: 'Manfaatkan cache semaksimal mungkin' },
      {
        type: 'ul',
        items: [
          'Cache query yang mahal di memori atau Redis dengan TTL yang wajar.',
          'Gunakan header caching HTTP (ETag, Cache-Control) untuk respons publik.',
          'Gunakan ulang koneksi database dengan connection pool.',
        ],
      },
      { type: 'h', text: 'Pakai semua core CPU dan stream data besar' },
      {
        type: 'p',
        text: 'Jalankan beberapa proses dengan modul cluster atau process manager seperti PM2. Untuk file atau ekspor berukuran besar, gunakan stream alih-alih memuat semuanya ke memori.',
      },
      {
        type: 'p',
        text: 'Terakhir, ukurlah: alat seperti autocannon untuk load testing dan clinic.js untuk profiling menunjukkan dengan tepat di mana waktu terbuang, sehingga kamu mengoptimasi bagian yang benar.',
      },
    ],
  },
  'immersive-vr-experiences': {
    title: 'Menciptakan Pengalaman VR yang Imersif: Perjalanan Seorang Developer',
    excerpt:
      'Pengalaman saya mengembangkan aplikasi VR dan tantangan yang dihadapi saat menciptakan pengalaman realitas virtual yang imersif.',
    content: [
      {
        type: 'p',
        text: 'Membangun untuk virtual reality mengubah cara saya memandang desain interaksi. Di layar datar pemain menyaksikan dunia; di VR pemain berada di dalamnya, dan setiap kesalahan kecil terasa secara fisik.',
      },
      { type: 'h', text: 'Kenyamanan adalah yang utama' },
      {
        type: 'p',
        text: 'Mabuk gerak adalah alasan nomor satu orang melepas headset. Jaga frame rate tetap stabil (72–90 FPS atau lebih), hindari menggerakkan kamera tanpa input pemain, dan sediakan opsi gerakan teleport serta snap turning.',
      },
      { type: 'h', text: 'Anggaran performa' },
      {
        type: 'ul',
        items: [
          'Gunakan baked lighting sebisa mungkin daripada cahaya real-time.',
          'Gunakan LOD dan occlusion culling untuk mengurangi draw call.',
          'Lakukan profiling di perangkat aslinya — editor tidak mewakili kondisi sebenarnya.',
        ],
      },
      { type: 'h', text: 'Rancang untuk tangan, bukan tombol' },
      {
        type: 'p',
        text: 'Interaksi terasa paling baik saat meniru dunia nyata: menarik tuas, menekan tombol, melempar benda. XR Interaction Toolkit di Unity menyediakan fondasi yang kokoh untuk grab, socket, dan UI ray.',
      },
      { type: 'h', text: 'Pelajaran yang saya dapat' },
      {
        type: 'p',
        text: 'Lakukan playtest sejak awal dan sesering mungkin dengan orang yang baru mengenal VR. Hal yang terasa wajar bagi developer yang memakai headset setiap hari bisa membingungkan atau tidak nyaman bagi orang lain. Detail kecil — posisi suara, umpan balik haptik, skala — jauh lebih penting dibanding di medium lain.',
      },
    ],
  },
  'integrating-chatgpt-api': {
    title: 'Integrasi API ChatGPT: Membangun Aplikasi Web yang Cerdas',
    excerpt:
      'Panduan langkah demi langkah mengintegrasikan API ChatGPT dari OpenAI ke aplikasi web untuk pengalaman pengguna yang lebih baik.',
    content: [
      {
        type: 'p',
        text: 'Menambahkan asisten percakapan ke aplikasi web kini lebih mudah dari sebelumnya, tetapi melakukannya dengan aman dan hemat biaya membutuhkan sedikit arsitektur. Inilah susunan yang saya gunakan.',
      },
      { type: 'h', text: '1. Simpan API key di server' },
      {
        type: 'p',
        text: 'Jangan pernah memanggil API OpenAI langsung dari browser — siapa pun bisa membaca key-mu dari tab network. Buat endpoint backend kecil yang menerima pesan pengguna, memanggil API, lalu mengembalikan jawabannya.',
      },
      code('integrating-chatgpt-api'),
      { type: 'h', text: '2. Beri model system prompt yang jelas' },
      {
        type: 'p',
        text: 'System message menentukan kepribadian, cakupan, dan aturan. Beri tahu asisten apa yang boleh dan tidak boleh dijawab, serta gaya bahasa yang digunakan.',
      },
      { type: 'h', text: '3. Kendalikan biaya dan penyalahgunaan' },
      {
        type: 'ul',
        items: [
          'Tambahkan rate limiting per IP atau per pengguna.',
          'Batasi riwayat percakapan hanya beberapa pesan terakhir.',
          'Atur max_tokens untuk membatasi panjang respons.',
          'Gunakan streaming agar UI terasa lebih cepat.',
        ],
      },
      {
        type: 'p',
        text: 'Dengan dasar-dasar ini, kamu bisa membangun bot layanan pelanggan, asisten menulis, atau pencarian pintar di atas produkmu dalam satu sore.',
      },
    ],
  },
};

export default id;
