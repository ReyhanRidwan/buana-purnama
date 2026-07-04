import { Compass, Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'about' | 'packages' | 'why') => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNav = (page: 'home' | 'about' | 'packages' | 'why') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-stone-950 text-stone-100 pt-16 pb-8 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNav('home')}>
              <div className="p-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="font-serif font-bold text-lg uppercase tracking-wider text-white">
                Buana<span className="text-amber-500"> Purnama</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Pelopor agen pariwisata VVIP privat di pulau Bali sejak 2012. Menyediakan liburan mewah, tenang, aman, dan berkesan tinggi.
            </p>
            <div className="text-[10px] font-mono tracking-widest text-stone-500">
              KREATIVITAS • BUDAYA • KEAMANAN
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Navigasi Cepat</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-500 transition-colors">Halaman Utama</button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-500 transition-colors">Tentang Profil Kami</button>
              </li>
              <li>
                <button onClick={() => handleNav('packages')} className="hover:text-amber-500 transition-colors">Daftar Paket Wisata</button>
              </li>
              <li>
                <button onClick={() => handleNav('why')} className="hover:text-amber-500 transition-colors">Keunggulan & Armada</button>
              </li>
            </ul>
          </div>

          {/* Contacts Col */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Kontak & Reservasi</h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="font-mono">
                  <a href="tel:+628889780274" className="hover:text-white block">+62 888-9780-274</a>
                  <span className="text-[10px] text-stone-500 block">WhatsApp Chat 24 Jam</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@buanapurnamatour.com" className="hover:text-white block">info@buanapurnamatour.com</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Jl. Raya Denpasar No. 12, Denpasar Selatan, Bali, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Jam Operasional</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Setiap Hari (Senin - Minggu)</span>
              </div>
              <p className="pl-6 text-stone-400">07.00 WITA – 22.00 WITA</p>
              <div className="pt-2">
                <span className="inline-block bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                  Sistem Booking Online Aktif 24 Jam
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Border & Credits */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <p>© {new Date().getFullYear()} CV Buana Purnama Tour & Travel. Hak Cipta Dilindungi. Berdiri sejak 2012 di Bali.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-all hover:border-stone-700"
              title="Scroll ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
