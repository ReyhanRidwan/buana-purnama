import { useState, useEffect } from 'react';
import { Compass, Menu, X, PhoneCall } from 'lucide-react';

interface NavigationHeaderProps {
  currentPage: 'home' | 'about' | 'packages' | 'why';
  setCurrentPage: (page: 'home' | 'about' | 'packages' | 'why') => void;
  onOpenBooking: () => void;
}

export default function NavigationHeader({ currentPage, setCurrentPage, onOpenBooking }: NavigationHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect to transition transparent to solid
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we are in Hero (Condition 1): Home page and scroll is at top
  const isHeroActive = currentPage === 'home' && !isScrolled;

  const navItems = [
    { label: 'Home', page: 'home' as const, hash: 'hero' },
    { label: 'Tentang Kami', page: 'about' as const, hash: 'about' },
    { label: 'Paket Wisata', page: 'packages' as const, hash: 'packages' },
    { label: 'Keunggulan', page: 'why' as const, hash: 'why' },
  ];

  const handleNavClick = (item: typeof navItems[number]) => {
    setCurrentPage(item.page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-navigation-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isHeroActive 
          ? 'bg-transparent border-b border-transparent py-5 text-white' 
          : 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 py-3 shadow-lg text-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          
          {/* LOGO BRAND */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick({ label: 'Home', page: 'home', hash: 'hero' })}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="p-1.5 rounded-full bg-stone-900 text-amber-500 border border-amber-500/80 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300">
              <Compass className="animate-spin-slow w-4 h-4 md:w-5 h-5" />
            </div>
            <div className="leading-none">
              <span className="font-sans font-black uppercase tracking-wider text-xs md:text-sm lg:text-base text-white">
                BUANA<span className="text-amber-500"> PURNAMA</span>
              </span>
              <span className="block text-[7px] md:text-[8px] font-sans font-medium tracking-[0.2em] text-stone-400 mt-0.5">EST. 2012</span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION & ACTIONS (7-Column flat layout) */}
          <div className="hidden md:flex items-center justify-between flex-grow ml-4 lg:ml-8 xl:ml-12 gap-x-2 lg:gap-x-4 max-w-5xl">
            
            {/* HOME */}
            <button
              onClick={() => handleNavClick({ label: 'Home', page: 'home', hash: 'hero' })}
              className={`font-sans text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 py-1 ${
                currentPage === 'home' ? 'text-amber-500' : 'text-stone-300 hover:text-amber-500'
              }`}
            >
              Home
            </button>

            {/* TENTANG KAMI */}
            <button
              onClick={() => handleNavClick({ label: 'Tentang Kami', page: 'about', hash: 'about' })}
              className={`font-sans text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 py-1 ${
                currentPage === 'about' ? 'text-amber-500' : 'text-stone-300 hover:text-amber-500'
              }`}
            >
              Tentang Kami
            </button>

            {/* PAKET WISATA */}
            <button
              onClick={() => handleNavClick({ label: 'Paket Wisata', page: 'packages', hash: 'packages' })}
              className={`relative font-sans text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 py-1 ${
                currentPage === 'packages' ? 'text-amber-500' : 'text-stone-300 hover:text-amber-500'
              }`}
            >
              Paket Wisata
              {currentPage === 'packages' && (
                <span className="absolute bottom-[-4px] left-0 right-0 h-[2.5px] bg-amber-500" />
              )}
            </button>

            {/* KEUNGGULAN */}
            <button
              onClick={() => handleNavClick({ label: 'Keunggulan', page: 'why', hash: 'why' })}
              className={`font-sans text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 py-1 ${
                currentPage === 'why' ? 'text-amber-500' : 'text-stone-300 hover:text-amber-500'
              }`}
            >
              Keunggulan
            </button>

            {/* PHONE CONTACT */}
            <a 
              href="tel:+628889780274"
              className="font-sans text-xs font-medium tracking-wide text-stone-300 hover:text-amber-500 transition-colors leading-tight text-right shrink-0"
            >
              <span className="text-stone-400 text-[10px] block font-light">+62 888-9780-</span>
              <span className="flex items-center justify-end gap-1 mt-0.5 font-semibold">
                <PhoneCall className="w-3 h-3 text-amber-500 shrink-0" />
                <span>274</span>
              </span>
            </a>

            {/* BOOKING CTA BUTTON */}
            <button
              id="header-booking-cta"
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-sans font-bold tracking-wide rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all duration-300 text-center shrink-0 shadow-md active:scale-95 cursor-pointer"
            >
              Pesan Sekarang
            </button>

          </div>

          {/* MOBILE RESPONSIVE HAMBURGER */}
          <button
            id="mobile-menu-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-stone-400 hover:text-amber-500 transition-all focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-panel" className="md:hidden bg-stone-950/98 backdrop-blur-lg border-b border-stone-800 p-6 space-y-4 text-center">
          <div className="space-y-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full py-2 font-sans text-sm tracking-wide hover:text-amber-500 transition-all ${
                    isActive ? 'text-amber-500 font-bold' : 'text-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <div className="pt-4 border-t border-stone-800/60 space-y-3">
            <a 
              href="tel:+628889780274"
              className="flex items-center justify-center gap-2 text-xs text-stone-400 font-sans"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" /> +62 888-9780-274
            </a>
            
            <button
              id="mobile-header-booking-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-sans font-bold tracking-wide py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
