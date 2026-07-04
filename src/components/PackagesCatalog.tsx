import { useState, useMemo } from 'react';
import { Search, Filter, Star, Clock, CheckCircle2, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PACKAGES_DATA } from '../data';
import { TravelPackage } from '../types';

interface PackagesCatalogProps {
  onBookPackage: (pkgId: string) => void;
}

type CategoryFilter = 'all' | 'adventure' | 'cultural' | 'luxury' | 'car-rental' | 'bus-rental' | 'study-tour';

export default function PackagesCatalog({ onBookPackage }: PackagesCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const categories = [
    { label: 'Semua Paket', value: 'all' as const },
    { label: 'Petualangan', value: 'adventure' as const },
    { label: 'Budaya & Sejarah', value: 'cultural' as const },
    { label: 'Kemewahan (Luxury)', value: 'luxury' as const },
    { label: 'Sewa Mobil Mewah', value: 'car-rental' as const },
    { label: 'Sewa Bus Pariwisata', value: 'bus-rental' as const },
    { label: 'Study Tour & Edukasi', value: 'study-tour' as const },
  ];

  // Dynamic search and filter processing
  const filteredPackages = useMemo(() => {
    return PACKAGES_DATA.filter((pkg) => {
      const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="packages-catalog" className="py-20 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
              Katalog Wisata Premium
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Pilihan Liburan Eksklusif Anda
            </h2>
            <p className="text-sm text-stone-600 max-w-xl font-light">
              CV Buana Purnama Tour & Travel menawarkan paket wisata berkelas dengan kendaraan pribadi, asuransi penuh, dan layanan kustom sesuai selera Anda.
            </p>
          </div>

          {/* Smart Search Bar */}
          <div className="relative w-full md:w-96 shrink-0 bg-stone-300 p-2.5 rounded-[1.25rem] border border-stone-300 shadow-sm">
            <div className="relative flex items-center bg-white rounded-lg overflow-hidden border border-stone-100 shadow-inner">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="package-search-input"
                placeholder="Cari destinasi atau aktivitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-stone-900 pl-9 pr-4 py-2 text-xs focus:outline-none transition-all placeholder:text-stone-400 font-sans font-medium"
              />
            </div>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <div className="p-1 bg-stone-100 rounded-xl flex items-center gap-1 shrink-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wider uppercase transition-all shrink-0 ${
                    isActive
                      ? 'bg-white text-amber-600 shadow-sm font-bold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
            <SlidersHorizontal className="w-8 h-8 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-800 font-serif font-bold">Tidak ada paket yang cocok</p>
            <p className="text-stone-500 text-xs mt-1">Cobalah menggunakan kata kunci pencarian yang berbeda atau reset kategori filter Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 bg-amber-500 hover:bg-amber-400 text-stone-900 text-xs font-mono font-bold py-2 px-4 rounded-lg shadow"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              {/* Card Banner */}
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
                
                {/* Visual Category Label */}
                <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-[10px] font-mono tracking-wider font-bold uppercase py-1 px-3 rounded-full">
                  {pkg.category === 'car-rental' ? 'Sewa Mobil' : 
                   pkg.category === 'bus-rental' ? 'Sewa Bus' : 
                   pkg.category === 'study-tour' ? 'Study Tour' : 
                   pkg.category === 'luxury' ? 'Luxury Class' : 
                   pkg.category === 'cultural' ? 'Cultural Heritage' : 'Adventure'}
                </span>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-stone-950/70 backdrop-blur-sm text-amber-400 py-1 px-2.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1 border border-stone-800">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{pkg.rating.toFixed(1)}</span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-stone-100 bg-stone-950/65 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-medium">{pkg.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {pkg.name}
                  </h3>
                  
                  {pkg.maxCapacityText && (
                    <span className="inline-block bg-stone-100 text-stone-600 text-[10px] font-mono uppercase px-2 py-0.5 rounded mt-1 font-semibold">
                      🚗 {pkg.maxCapacityText}
                    </span>
                  )}

                  <p className="text-xs text-stone-600 font-light mt-3 line-clamp-3">
                    {pkg.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="pt-4 border-t border-stone-100 mt-4 space-y-2">
                    <p className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">Termasuk Dalam Paket:</p>
                    {pkg.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] text-stone-400 uppercase tracking-wider font-mono">Mulai Dari</span>
                    <span className="text-lg font-mono font-bold text-amber-600">
                      {formatIDR(pkg.price)}
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      {pkg.category === 'car-rental' || pkg.category === 'bus-rental' ? 'per unit / hari' : 'per orang'}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg.id)}
                    className="bg-stone-900 hover:bg-amber-500 text-stone-100 hover:text-stone-950 text-xs font-mono font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-amber-500/10"
                  >
                    Booking <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
