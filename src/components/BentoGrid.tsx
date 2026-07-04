import { Star, Eye, Sparkles } from 'lucide-react';
import { BENTO_DESTINATIONS } from '../data';

interface BentoGridProps {
  onSelectDestination: (pkgId: string) => void;
}

export default function BentoGrid({ onSelectDestination }: BentoGridProps) {
  
  // Maps a destination name to its booking package ID
  const mapPkgId = (name: string): string => {
    if (name.includes('Penida')) return 'nusa-penida';
    if (name.includes('Beratan')) return 'bedugul-lake';
    if (name.includes('Dua')) return 'nusa-dua-luxury';
    if (name.includes('Uluwatu')) return 'uluwatu-sunset';
    if (name.includes('GWK') || name.includes('Garuda')) return 'gwk-cultural';
    return 'sewa-alphard';
  };

  return (
    <section id="destinations" className="py-20 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Destinasi Terpopuler Bali</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Eksplorasi Keindahan Alam & Warisan Budaya Bali
          </h2>
          <p className="text-sm md:text-base text-stone-600 font-light max-w-2xl mx-auto">
            Dipandu oleh kurator profesional, kami menyajikan bento destinasi terbaik Bali dengan fasilitas private bintang lima untuk perjalanan tak terlupakan.
          </p>
        </div>

        {/* Bento Grid Layout - 100% Filled & Gapless */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="bento-grid-container">
          {BENTO_DESTINATIONS.map((dest) => {
            const matchedPkgId = mapPkgId(dest.name);
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(matchedPkgId)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-200/40 bg-stone-100 flex flex-col justify-end ${dest.className}`}
              >
                {/* Background Image with Slow Zoom on hover */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />

                {/* Dark Luxury Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/40 z-10 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Content Inner Card (z-20) */}
                <div className="relative z-20 p-6 md:p-8 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase font-semibold tracking-widest bg-amber-500 text-stone-950 px-2.5 py-1 rounded-full">
                      {dest.tag}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 bg-stone-950/50 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-mono">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-stone-300 font-light line-clamp-2 max-w-lg group-hover:text-stone-200 transition-colors">
                      {dest.desc}
                    </p>
                  </div>

                  {/* Hidden action text slide up on hover */}
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-4 h-4" />
                    <span>Lihat Detail Paket & Pesan</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
