import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Phone, Clock, ArrowUp, Compass, Star } from 'lucide-react';
import NavigationHeader from './components/NavigationHeader';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import PackagesCatalog from './components/PackagesCatalog';
import AboutUs from './components/AboutUs';
import WhyUs from './components/WhyUs';
import BookingWizard from './components/BookingWizard';
import Footer from './components/Footer';
import { PACKAGES_DATA, WHY_US_DATA } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'packages' | 'why'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(undefined);

  // Scroll to top on page changes to ensure the user lands cleanly at the start of the new page view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handler to open booking wizard with optional preset package ID
  const handleOpenBooking = (packageId?: string) => {
    setSelectedPackageId(packageId);
    setIsBookingOpen(true);
  };

  // Handler to select a destination on bento card and route/open booking
  const handleSelectBentoDestination = (packageId: string) => {
    // Open booking modal directly with prefilled package
    handleOpenBooking(packageId);
  };

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col justify-between bg-stone-50 font-sans text-stone-900 selection:bg-amber-500/30 selection:text-stone-950">
      
      {/* Dynamic Transparent & Floating Navigation Header */}
      <NavigationHeader 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onOpenBooking={() => handleOpenBooking()} 
      />

      {/* Main Multi-Page Workspace with Elegant Framer-Motion Page-Level Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <div id="home-view-wrapper">
                {/* 1. Hero Slideshow + Curved Mask */}
                <div id="hero">
                  <Hero 
                    onOpenBooking={() => handleOpenBooking()} 
                    onExplorePackages={() => setCurrentPage('packages')} 
                  />
                </div>
                
                {/* 2. Bento Grid Destinations Section */}
                <div id="destinations" className="py-2 bg-stone-50">
                  <BentoGrid onSelectDestination={handleSelectBentoDestination} />
                </div>
                
                {/* 3. Tentang Kami (Home Preview) */}
                <section id="about-preview" className="py-20 bg-stone-50 border-t border-stone-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <span className="text-xs font-sans uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
                          Tentang CV Buana Purnama Tour & Travel
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                          Mewujudkan Standar Kemewahan Perjalanan Bali Sejak 2012
                        </h2>
                        <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                          CV Buana Purnama Tour & Travel didirikan di Denpasar, Bali pada tahun 2012 dengan satu visi utama: menghadirkan layanan agen perjalanan kelas atas (VVIP) yang sesungguhnya. Kami memadukan keramahtamahan tradisi Bali yang hangat dengan armada kendaraan termewah di kelasnya.
                        </p>
                        <button
                          onClick={() => setCurrentPage('about')}
                          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs tracking-wider font-bold uppercase rounded-lg transition-all duration-300 shadow-md inline-flex items-center gap-2 font-black cursor-pointer"
                        >
                          Baca Selengkapnya Tentang Kami &rarr;
                        </button>
                      </div>
                      <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 border border-amber-500/10 shadow-xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-amber-500/10" />
                        <div className="relative z-10 space-y-6">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500">Pencapaian Utama</span>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <span className="text-3xl font-mono font-bold text-amber-500 block">14+</span>
                              <span className="text-xs font-semibold text-stone-200">Tahun Melayani</span>
                            </div>
                            <div>
                              <span className="text-3xl font-mono font-bold text-amber-500 block">18.500+</span>
                              <span className="text-xs font-semibold text-stone-200">Tamu Bahagia</span>
                            </div>
                            <div>
                              <span className="text-3xl font-mono font-bold text-amber-500 block">25+</span>
                              <span className="text-xs font-semibold text-stone-200">Armada Premium</span>
                            </div>
                            <div>
                              <span className="text-3xl font-mono font-bold text-amber-500 block">4.9/5</span>
                              <span className="text-xs font-semibold text-stone-200">Rating Google</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* 4. Paket Wisata (Home Preview) */}
                <section id="packages-preview" className="py-20 bg-stone-100 border-t border-stone-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
                        Katalog Wisata Pilihan
                      </span>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                        Pilihan Paket Terpopuler
                      </h2>
                      <p className="text-xs md:text-sm text-stone-500 font-light leading-relaxed">
                        Eksplorasi destinasi terbaik Bali dengan fasilitas VVIP private tour bersama kurator terpercaya kami.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {PACKAGES_DATA.map((pkg) => (
                        <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <div className="relative h-48 bg-stone-900 overflow-hidden">
                            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover opacity-85 transition-transform duration-500 hover:scale-105" referrerPolicy="no-referrer" />
                            <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-sans text-[10px] tracking-wide font-bold py-1 px-3 rounded-full shadow-sm">
                              {pkg.category === 'car-rental' ? 'Sewa Mobil Mewah' : 
                               pkg.category === 'bus-rental' ? 'Sewa Bus Pariwisata' : 
                               pkg.category === 'study-tour' ? 'Study Tour' : 
                               pkg.category === 'luxury' ? 'Luxury Class' : 
                               pkg.category === 'cultural' ? 'Cultural Heritage' : 'Adventure'}
                            </span>
                          </div>
                          <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                              <h3 className="text-sm md:text-base font-serif font-bold text-stone-900 leading-snug">{pkg.name}</h3>
                              <p className="text-xs text-stone-500 font-light line-clamp-3 leading-relaxed">{pkg.description}</p>
                            </div>
                            <div className="pt-4 border-t border-stone-100 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[9px] text-stone-400 font-sans uppercase block">Mulai Dari</span>
                                  <span className="text-xs md:text-sm font-mono font-bold text-amber-600">
                                    IDR {pkg.price.toLocaleString('id-ID')}
                                  </span>
                                </div>
                                <span className="text-[11px] text-stone-500 font-sans font-medium">{pkg.duration}</span>
                              </div>
                              <button 
                                onClick={() => handleOpenBooking(pkg.id)}
                                className="w-full py-2.5 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white text-xs font-sans font-bold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                              >
                                Pesan Sekarang
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setCurrentPage('packages')}
                        className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs tracking-wider font-bold uppercase rounded-lg transition-all duration-300 shadow-md inline-flex items-center gap-2 font-black cursor-pointer"
                      >
                        Lihat Semua Paket Wisata ({PACKAGES_DATA.length}) &rarr;
                      </button>
                    </div>
                  </div>
                </section>
                
                {/* 5. Keunggulan (Home Preview) */}
                <section id="why-preview" className="py-20 bg-stone-50 border-t border-stone-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
                          Keunggulan Layanan
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                          Mengapa CV Buana Purnama Tour & Travel Selalu Menjadi Pilihan Utama?
                        </h2>
                        <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
                          Sebagai agen pariwisata yang telah kokoh melayani Bali sejak tahun 2012, kami memahami bahwa pelayanan premium bukan sekadar janji, melainkan sebuah eksekusi yang konsisten di lapangan.
                        </p>
                        <button
                          onClick={() => setCurrentPage('why')}
                          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-mono text-xs tracking-wider font-bold uppercase rounded-lg transition-all duration-300 shadow-md inline-flex items-center gap-2 font-black cursor-pointer"
                        >
                          Lihat Detail Keunggulan Kami &rarr;
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {WHY_US_DATA.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
                            <div>
                              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs font-mono">
                                0{idx + 1}
                              </div>
                              <h3 className="font-serif font-bold text-sm md:text-base text-stone-900 mt-2">{item.title}</h3>
                              <p className="text-xs text-stone-500 leading-relaxed font-light">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* 6. Home Page Call to Action (Mini Showcase) */}
                <section className="bg-stone-900 text-stone-100 py-16 border-t border-b border-stone-800 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/images/bali_hero_1782834200584.jpg')" }} />
                  <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
                    <Compass className="w-10 h-10 text-amber-500 mx-auto animate-spin-slow" />
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">Butuh Konsultasi Rencana Perjalanan Kustom?</h3>
                    <p className="text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
                      Tim kurator travel kami siap mendesain rencana tour eksklusif (tailor-made) yang sesuai dengan keinginan spesifik Anda dan keluarga selama di Bali.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                      <a
                        href="https://wa.me/628889780274?text=Halo%20Buana%20Purnama%20Tour%2C%20saya%20tertarik%20untuk%20konsultasi%20paket%20wisata%20kustom%20ke%20Bali.%20Mohon%20bantuannya%20%F0%9F%8C%B4"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs tracking-wider font-bold uppercase py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-950/20"
                      >
                        <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp Chat
                      </a>
                      <button
                        onClick={() => handleOpenBooking()}
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs tracking-wider font-bold uppercase py-3 px-6 rounded-lg transition-all duration-300 shadow-md font-black cursor-pointer"
                      >
                        Mulai Reservasi Cepat
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {currentPage === 'about' && (
              <div id="about-view-wrapper" className="pt-16">
                <AboutUs />
              </div>
            )}

            {currentPage === 'packages' && (
              <div id="packages-view-wrapper" className="pt-16">
                <PackagesCatalog onBookPackage={handleOpenBooking} />
              </div>
            )}

            {currentPage === 'why' && (
              <div id="why-view-wrapper" className="pt-16">
                <WhyUs />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* High-Contrast Premium Footer Component */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating Call Assistance Badge (Fixed Right Bottom) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        <a
          href="https://wa.me/628889780274"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group relative border border-emerald-400/30"
          title="Butuh Bantuan? Chat Admin"
        >
          <MessageCircle className="w-6 h-6 stroke-[2.5]" />
          <span className="absolute right-14 bg-stone-900 text-stone-100 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase">
            Chat Bantuan 24 Jam
          </span>
        </a>
      </div>

      {/* Multi-Step Wizard Booking Modal Container */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingWizard 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            initialPackageId={selectedPackageId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
