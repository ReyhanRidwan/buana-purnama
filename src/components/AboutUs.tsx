import { Award, Users, ShieldCheck, MapPin, Star, Clock } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export default function AboutUs() {
  const stats = [
    { label: 'Tahun Melayani', value: '14+', desc: 'Sejak Tahun 2012' },
    { label: 'Tamu Bahagia', value: '18.500+', desc: 'Domestik & Internasional' },
    { label: 'Armada Premium', value: '25+', desc: 'Toyota Alphard & HiAce' },
    { label: 'Rating Kepuasan', value: '4.9/5', desc: 'Sempurna di Google' },
  ];

  return (
    <section id="about-us" className="py-20 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Core History & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* History Details */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
              Kisah Sejarah Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Mewujudkan Standar Kemewahan Perjalanan Bali Sejak 2012
            </h2>
            <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
              CV Buana Purnama Tour & Travel didirikan di Denpasar, Bali pada tahun 2012 dengan satu visi utama: menghadirkan layanan agen perjalanan kelas atas (VVIP) yang sesungguhnya. Kami memahami bahwa liburan ke Bali adalah momen sakral dan berharga bagi setiap tamu.
            </p>
            <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
              Selama lebih dari satu dekade, kami telah dipercaya oleh ribuan keluarga, pejabat negara, pengusaha sukses, hingga turis mancanegara untuk menyusun rencana perjalanan privat mereka. Kami memadukan keramahtamahan tradisi Bali yang hangat dengan layanan profesional modern dan armada kendaraan termewah di kelasnya.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
                <div className="text-amber-500"><Award className="w-6 h-6" /></div>
                <h4 className="font-serif font-bold text-sm text-stone-900">Visi Kami</h4>
                <p className="text-xs text-stone-500 font-light">Menjadi tolok ukur utama perjalanan wisata premium berkelanjutan di Bali dengan melestarikan adat istiadat setempat.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
                <div className="text-amber-500"><ShieldCheck className="w-6 h-6" /></div>
                <h4 className="font-serif font-bold text-sm text-stone-900">Misi Kami</h4>
                <p className="text-xs text-stone-500 font-light">Menjamin keamanan penuh, privasi total, kenyamanan armada bintang lima, dan mempromosikan destinasi budaya Bali autentik.</p>
              </div>
            </div>
          </div>

          {/* Statistics Grid Frame */}
          <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 md:p-10 border border-amber-500/10 shadow-xl relative overflow-hidden">
            {/* Visual decorative ring */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-amber-500/10" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-amber-500/10" />

            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">Pencapaian Buana Purnama</span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">Sertifikat Reputasi Unggul</h3>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-3xl md:text-4xl font-mono font-bold text-amber-500 block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold text-stone-200 block">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-stone-400 font-light block">
                      {stat.desc}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center gap-3 text-xs text-stone-400 font-mono">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Pelayanan Support Reservasi Aktif 24 Jam Nonstop</span>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonials & Maps section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
              Ulasan Tamu & Lokasi Kantor
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
              Ulasan Bintang 5 Google Maps
            </h3>
            <p className="text-xs md:text-sm text-stone-500">
              Kami berlokasi di pusat pariwisata Bali, siap menjemput Anda langsung di terminal kedatangan Bandara Ngurah Rai.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Reviews list - 5 Cols */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {REVIEWS_DATA.map((rev, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-serif font-bold text-sm text-stone-900">{rev.name}</h5>
                      <span className="text-[10px] text-stone-400 block">{rev.origin} • {rev.date}</span>
                    </div>
                    <div className="flex text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic font-light">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Google Maps Iframe - 7 Cols */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-stone-200 shadow-sm h-80 lg:h-auto min-h-[300px] relative">
              <iframe
                title="Buana Purnama Tour & Travel Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.39169601002!2d115.15423184606778!3d-8.672504938640798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b9e59d95f%3A0xf64f3df9b8b209e!2sDenpasar%2C%20Bali%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-4 left-4 bg-stone-950/90 backdrop-blur-sm px-4 py-2 rounded-xl text-stone-100 flex items-center gap-2 text-xs border border-stone-800 pointer-events-none">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Denpasar, Bali, Indonesia — Kantor Operasional Utama</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
