import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePackages: () => void;
}

export default function Hero({ onOpenBooking, onExplorePackages }: HeroProps) {
  // Slideshow images of real generated high-quality assets
  const slides = [
    {
      image: IMAGES.hero,
      title: 'Sentuhan Kemewahan Liburan di Pulau Dewata',
      subtitle: 'Rasakan petualangan terbaik dengan layanan VVIP berkelas sejak 2012 bersama CV Buana Purnama.'
    },
    {
      image: IMAGES.nusaPenida,
      title: 'Pesona Nusa Penida yang Eksotis & Magis',
      subtitle: 'Menjelajahi keindahan laut biru kristal dan tebing megah yang belum pernah Anda saksikan sebelumnya.'
    },
    {
      image: IMAGES.bedugul,
      title: 'Ketenangan Jiwa di Danau Pegunungan Sunyi',
      subtitle: 'Menikmati udara dingin nan berkabut Bedugul dan keindahan pura terapung bersejarah.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section 
      id="hero" 
      className="relative h-[92vh] sm:h-[95vh] md:h-screen w-full bg-stone-950 overflow-hidden flex items-center justify-center text-center"
    >
      {/* Background Slideshow Container */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        
        {/* Dark Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/80" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-500 text-xs font-sans font-medium tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Premium Travel Agent Bali — Est. 2012</span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-none">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-300 font-sans max-w-2xl mx-auto font-light leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <button
            id="hero-cta-booking"
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans text-sm tracking-wide font-semibold py-3 px-8 rounded-xl shadow-lg shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Mulai Perjalanan Impian
          </button>
          
          <button
            id="hero-cta-packages"
            onClick={onExplorePackages}
            className="w-full sm:w-auto bg-stone-900/60 hover:bg-stone-800/80 text-stone-200 hover:text-white border border-stone-700 font-sans text-sm tracking-wide font-semibold py-3 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer"
          >
            Katalog Paket Wisata
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-stone-400 font-sans text-[11px] font-medium tracking-wide">
        <span>Gulir ke bawah</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-500" />
      </div>

      {/* CURVED BOTTOM MASK / WAVE (SVG) */}
      {/* Absolute positioned path to cut cleanly into bg-stone-50 of Bento grid below */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none translate-y-[1px]">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-[50px] md:h-[80px]"
        >
          <path 
            d="M0 120H1440V40C1200 110 900 120 720 120C540 120 240 110 0 40V120Z" 
            fill="#f9f8f6" // matches Tailwind bg-stone-50 (putih gading)
          />
        </svg>
      </div>
    </section>
  );
}
