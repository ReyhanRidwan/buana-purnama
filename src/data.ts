import { TravelPackage, AddOn } from './types';

// Let's reference the actual generated images
export const IMAGES = {
  hero: '/images/bali_hero_1782834200584.jpg',
  nusaPenida: '/images/nusa_penida_1782834215263.jpg',
  bedugul: '/images/bedugul_lake_1782834229977.jpg',
  // Styled luxury gradients or beautiful vector representations as fallbacks if needed
  nusaDua: '/images/bedugul_lake_1782834229977.jpg', // can reuse or use visual overlays
  handaraGate: '/images/bali_hero_1782834200584.jpg',
  uluwatu: '/images/nusa_penida_1782834215263.jpg',
  gwk: '/images/bali_hero_1782834200584.jpg',
  sewaBus: '/images/sewa_bus_premium_1783173125010.jpg',
  studyTour: '/images/study_tour_bali_1783173142149.jpg',
};

export const PACKAGES_DATA: TravelPackage[] = [
  {
    id: 'nusa-penida',
    name: 'Paket Nusa Penida Adventure',
    category: 'adventure',
    price: 1250000,
    description: 'Eksplorasi petualangan magis ke pantai-pantai ikonik di Nusa Penida Timur dan Barat. Menyusuri tebing curam Kelingking Beach yang ikonik dan snorkeling di laut biru kristal.',
    rating: 4.9,
    duration: '1 Hari Penuh',
    image: IMAGES.nusaPenida,
    highlights: [
      'Kelingking Beach & T-Rex Cliff View',
      'Snorkeling di Crystal Bay & Manta Point',
      'Broken Beach & Angel’s Billabong',
      'Makan Siang Restoran Premium & Tiket Fast Boat PP',
      'Transportasi AC Private di Pulau'
    ]
  },
  {
    id: 'bedugul-lake',
    name: 'Paket Bedugul & Danau Beratan Heritage',
    category: 'cultural',
    price: 850000,
    description: 'Rasakan kedamaian udara pegunungan yang sejuk di Bali Tengah. Mengunjungi pura legendaris di atas danau, Handara Gate yang megah, serta perkebunan stroberi tradisional.',
    rating: 4.8,
    duration: '1 Hari (10 Jam)',
    image: IMAGES.bedugul,
    highlights: [
      'Pura Ulun Danu Beratan Bedugul',
      'Sesi Foto di Handara Iconic Gate',
      'Pemandangan Danau Kembar Buyan & Tamblingan',
      'Makan Siang Buffet Khas Bedugul',
      'Eksplorasi Kebun Raya Eka Karya'
    ]
  },
  {
    id: 'nusa-dua-luxury',
    name: 'Paket Nusa Dua Luxury Beach & Watersport',
    category: 'luxury',
    price: 1500000,
    description: 'Nikmati kemewahan kawasan elit Nusa Dua. Kombinasi aktivitas watersport seru di Tanjung Benoa, bersantai di beach club bintang lima, serta makan malam seafood romantis.',
    rating: 5.0,
    duration: '1 Hari (12 Jam)',
    image: IMAGES.hero, // Rich scenic visual
    highlights: [
      'Aktivitas Watersport Premium (Parasailing, Banana Boat)',
      'Akses VVIP Daybed di Beach Club Ternama Nusa Dua',
      'Bersantai di Pantai Pasir Putih Pandawa',
      'Makan Malam Premium Jimbaran Seafood Megah',
      'Layanan Penjemputan dengan Mobil Premium Private'
    ]
  },
  {
    id: 'uluwatu-sunset',
    name: 'Paket Wisata Uluwatu Sunset & Tari Kecak',
    category: 'cultural',
    price: 950000,
    description: 'Saksikan pertunjukan budaya paling dramatis di Bali. Berdiri di tebing Uluwatu setinggi 70 meter menghadap Samudra Hindia saat matahari terbenam sembari menikmati Tari Kecak.',
    rating: 4.9,
    duration: '6 Jam (Sore - Malam)',
    image: IMAGES.nusaPenida, // Cliffs and water
    highlights: [
      'Tiket VIP Pertunjukan Tari Kecak Tebing Uluwatu',
      'Eksplorasi Kompleks Pura Luhur Uluwatu',
      'Pemandangan Sunset Tebing yang Menakjubkan',
      'Makan Malam di Pantai pasir putih Jimbaran',
      'Guide Berlisensi & Sopir Pribadi'
    ]
  },
  {
    id: 'gwk-cultural',
    name: 'Paket GWK Cultural Park & Heritage Tour',
    category: 'cultural',
    price: 1100000,
    description: 'Eksplorasi taman budaya termegah di Bali dengan patung raksasa Garuda Wisnu Kencana setinggi 120 meter. Dilengkapi tarian kolosal tradisional Bali dan wisata kuliner nusantara.',
    rating: 4.7,
    duration: '8 Jam',
    image: IMAGES.hero,
    highlights: [
      'Tiket Masuk Terusan GWK Cultural Park',
      'Pemandangan Dek Utama Patung GWK',
      'Menonton Pertunjukan Animasi 3D & Tari Barong',
      'Makan Siang Prasmanan Restoran Jendela Bali',
      'Transportasi Private VIP dengan Guide Profesional'
    ]
  },
  {
    id: 'sewa-alphard',
    name: 'Layanan Sewa Toyota Alphard Premium Chauffeur',
    category: 'car-rental',
    price: 2200000,
    description: 'Nikmati perjalanan super nyaman dengan armada MPV termewah. Sangat cocok untuk perjalanan bisnis, keluarga premium, atau bulan madu romantis dengan layanan berkelas.',
    rating: 5.0,
    duration: '12 Jam per Hari',
    image: IMAGES.hero, // Luxury representative
    maxCapacityText: 'Maksimal 6 Penumpang',
    highlights: [
      'Armada Toyota Alphard Terbaru (Bersih, Wangi, & Mewah)',
      'Chauffeur / Sopir Berpengalaman & Fasih Berbahasa Inggris',
      'Termasuk Bahan Bakar (BBM) & Air Mineral Dingin Selama Tour',
      'Jadwal Perjalanan 100% Fleksibel Sesuai Keinginan Anda',
      'Proteksi Asuransi Perjalanan Lengkap untuk Semua Penumpang'
    ]
  },
  {
    id: 'sewa-bus',
    name: 'Sewa Bus Pariwisata Premium',
    category: 'bus-rental',
    price: 3500000,
    description: 'Layanan sewa bus pariwisata eksekutif terbaru untuk berbagai keperluan rombongan Anda di Bali. Dilengkapi fasilitas modern, AC dingin, sistem hiburan karaoke, dan kenyamanan suspensi udara.',
    rating: 4.9,
    duration: '12 Jam per Hari',
    image: IMAGES.sewaBus,
    maxCapacityText: 'Pilihan 25 hingga 45 Seats',
    highlights: [
      'Armada Bus Terbaru dengan Kursi Ergonomis Luas',
      'Fasilitas Full AC, TV LCD, Karaoke, & Port Charger USB',
      'Pengemudi (Driver) Profesional & Co-Driver yang Ramah',
      'Termasuk Bahan Bakar (BBM) & Proteksi Asuransi Penumpang',
      'Kapasitas Fleksibel Sesuai Jumlah Rombongan Belajar / Wisata'
    ]
  },
  {
    id: 'study-tour',
    name: 'Paket Study Tour & Edukasi Budaya Bali',
    category: 'study-tour',
    price: 450000,
    description: 'Paket wisata edukasi dan kunjungan industri untuk sekolah, universitas, maupun rombongan belajar. Menggabungkan pengenalan adat Bali, sejarah pura, kunjungan sentra kerajinan, dan pembelajaran interaktif.',
    rating: 4.9,
    duration: '3 Hari 2 Malam',
    image: IMAGES.studyTour,
    highlights: [
      'Kunjungan Edukatif ke Pura Bersejarah & Sanggar Seni',
      'Workshop Interaktif Membuat Kerajinan & Menari Bali',
      'Akomodasi Hotel Nyaman Khusus Rombongan Pelajar',
      'Konsumsi Full Board (Sarapan, Makan Siang, Makan Malam)',
      'Sertifikat Partisipasi & Pemandu Edukasi Berlisensi'
    ]
  }
];

export const ADDONS_DATA: AddOn[] = [
  {
    id: 'hotel',
    name: 'Malam Extra Hotel Bintang 4',
    price: 450000,
    description: 'Tambahan 1 malam di hotel rekanan bintang 4 di Kuta/Seminyak, termasuk sarapan.'
  },
  {
    id: 'airport',
    name: 'Airport Transfer PP (Antar-Jemput Bandara)',
    price: 250000,
    description: 'Layanan antar-jemput pribadi dari Bandara Ngurah Rai ke hotel Anda (PP).'
  },
  {
    id: 'guide',
    name: 'Private Guide & Fotografer Profesional',
    price: 350000,
    description: 'Pendampingan pemandu wisata bersertifikat sekaligus fotografer yang siap mengabadikan momen liburan Anda.'
  }
];

export const BENTO_DESTINATIONS = [
  {
    id: '1',
    name: 'Nusa Penida',
    desc: 'Surga tebing dramatis dan laut biru kristal',
    rating: 4.9,
    reviews: '1.200+',
    tag: 'Focal Point',
    image: IMAGES.nusaPenida,
    className: 'md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[500px]'
  },
  {
    id: '2',
    name: 'Nusa Dua',
    desc: 'Pantai eksklusif dengan resort mewah & watersport',
    rating: 4.8,
    reviews: '850+',
    tag: 'Luxury',
    image: IMAGES.hero,
    className: 'md:col-span-1 md:row-span-1 min-h-[220px]'
  },
  {
    id: '3',
    name: 'Danau Beratan Bedugul',
    desc: 'Keindahan pura mistis di atas danau pegunungan',
    rating: 4.8,
    reviews: '980+',
    tag: 'Heritage',
    image: IMAGES.bedugul,
    className: 'md:col-span-1 md:row-span-1 min-h-[220px]'
  },
  {
    id: '4',
    name: 'Handara Gate',
    desc: 'Gerbang batu ikonik dengan latar perbukitan hijau',
    rating: 4.7,
    reviews: '740+',
    tag: 'Iconic',
    image: IMAGES.hero, // Reusing high-quality asset
    className: 'md:col-span-1 md:row-span-2 min-h-[350px] md:min-h-[460px]'
  },
  {
    id: '5',
    name: 'Pura Uluwatu',
    desc: 'Pura tebing samudra dengan matahari terbenam legendaris',
    rating: 4.9,
    reviews: '1.400+',
    tag: 'Culture',
    image: IMAGES.nusaPenida, // Cliffs landscape
    className: 'md:col-span-2 md:row-span-1 min-h-[220px]'
  },
  {
    id: '6',
    name: 'GWK Cultural Park',
    desc: 'Taman budaya patung raksasa termegah di Asia Tenggara',
    rating: 4.7,
    reviews: '910+',
    tag: 'Monumental',
    image: IMAGES.hero, // Warm skies
    className: 'md:col-span-2 md:row-span-1 min-h-[220px]'
  }
];

export const WHY_US_DATA = [
  {
    title: 'Pelayanan VVIP Premium',
    desc: 'Dari penjemputan bandara hingga kepulangan, kami memperlakukan setiap tamu layaknya keluarga bangsawan dengan armada premium yang selalu bersih.'
  },
  {
    title: 'Keamanan & Proteksi Asuransi',
    desc: 'Keselamatan adalah prioritas utama. Seluruh perjalanan kami dilindungi oleh asuransi perjalanan premium dan dipandu oleh kru bersertifikasi keselamatan.'
  },
  {
    title: 'Sejak 2012 di Bali',
    desc: 'Dengan pengalaman lebih dari satu dekade, kami menguasai setiap sudut Bali dan memiliki jaringan lokal terkuat untuk memberikan pengalaman autentik terbaik.'
  },
  {
    title: 'Garansi Harga Terbaik',
    desc: 'Tanpa biaya tersembunyi. Semua harga paket tertera secara transparan dengan kualitas akomodasi dan pelayanan bintang lima.'
  }
];

export const REVIEWS_DATA = [
  {
    name: 'Robert & Clarissa',
    origin: 'Jakarta, Indonesia',
    rating: 5,
    text: 'Sangat puas dengan Paket Nusa Penida dari MbjTourBali! Sopirnya ramah sekali, pandai mengambil foto, dan mobil Alphard-nya super nyaman. Rekomendasi bintang 5!',
    date: 'Juni 2026'
  },
  {
    name: 'Wayan Sudarta',
    origin: 'Surabaya, Indonesia',
    rating: 5,
    text: 'Sewa mobil mewah di MbjTourBali sangat memuaskan untuk mengantar tamu bisnis kami. Sopir tahu rute jalan tikus menghindari macet, sangat tepat waktu dan profesional.',
    date: 'Mei 2026'
  },
  {
    name: 'Emily Watson',
    origin: 'Sydney, Australia',
    rating: 5,
    text: 'Beautiful Bedugul tour! The lake temple was misty and magical. The guide explained the Balinese history wonderfully. High class service!',
    date: 'Juni 2026'
  }
];
