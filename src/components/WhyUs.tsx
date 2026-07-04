import { Shield, Sparkles, CheckCircle, Award, Compass, HeartHandshake } from 'lucide-react';
import { WHY_US_DATA, IMAGES } from '../data';

export default function WhyUs() {
  const fleet = [
    {
      name: 'Toyota Alphard Executive VVIP',
      capacity: 'Maks. 6 Penumpang',
      type: 'Luxury MPV Class',
      desc: 'Sempurna untuk kenyamanan paripurna. Kursi kapten kulit premium dengan pemanas/pendingin, sandaran kaki elektrik, tirai privasi penuh, dan suspensi udara super empuk.',
      features: ['Pilot Seats', 'Panoramic Sunroof', 'Dual AC Climate Control', 'Layanan Air Mineral & Handuk Dingin']
    },
    {
      name: 'Toyota HiAce Premio Luxury Class',
      capacity: 'Maks. 9 Penumpang',
      type: 'Premium Microbus Class',
      desc: 'Cocok untuk liburan keluarga besar atau rombongan VIP. Ruang kabin ekstra tinggi yang lega, jok kapten yang dapat berputar, sistem audio karaoke premium, dan charger port lengkap.',
      features: ['Spacious Cabin', 'Karaoke Audio Sound System', 'Captains Seats', 'USB Charger di setiap Baris']
    },
    {
      name: 'Toyota Innova Zenix Hybrid Luxury',
      capacity: 'Maks. 5 Penumpang',
      type: 'Eco Luxury Crossover',
      desc: 'Modern, hening, dan ramah lingkungan. Dilengkapi Toyota Safety Sense mutakhir, Captain Seat baris kedua dengan sandaran betis, dan sirkulasi udara interior steril.',
      features: ['Quiet Hybrid Engine', 'Toyota Safety Sense TSS', 'Leather Captain Seats', 'Udara Interior Nanoe-X Steril']
    }
  ];

  return (
    <section id="why-us-page" className="py-20 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Why Choose Us Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
              Standar Kualitas Tertinggi
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Mengapa CV Buana Purnama Tour & Travel Selalu Menjadi Pilihan Utama?
            </h2>
            <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
              Sebagai agen pariwisata yang telah kokoh melayani Bali sejak tahun 2012, kami memahami bahwa pelayanan premium bukan sekadar janji, melainkan sebuah eksekusi yang konsisten di lapangan.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600 shrink-0 h-11 w-11 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">Standar Proteksi Asuransi Jiwa Komprehensif</h4>
                  <p className="text-xs text-stone-500 font-light mt-1">Setiap paket perjalanan kami sudah mencakup premi asuransi perlindungan jiwa Jasa Raharja dan proteksi medis penuh untuk seluruh peserta tanpa terkecuali.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600 shrink-0 h-11 w-11 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">Layanan Jaminan Refund Transparan</h4>
                  <p className="text-xs text-stone-500 font-light mt-1">Kami menjamin kebijakan refund uang muka (DP) penuh jika terjadi pembatalan akibat force majeure cuaca buruk demi mengutamakan keselamatan jiwa Anda.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advantage Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_US_DATA.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900 mt-3">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-light mt-1.5">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-600 uppercase font-mono tracking-wider font-bold pt-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Premium Certified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Fleet Gallery */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full font-semibold">
              Galeri Armada Premium
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">
              Pilihan Kendaraan Kelas Mewah
            </h3>
            <p className="text-xs md:text-sm text-stone-500">
              Seluruh armada kami selalu dijaga dalam performa mesin prima, kebersihan interior tanpa celah, dan dipandu oleh driver profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fleet.map((car, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                
                {/* Visual placeholder card design styled elegantly */}
                <div className="relative h-48 bg-stone-900 flex flex-col justify-between p-6 overflow-hidden">
                  {/* Decorative faint background image representation using our generated high class asset */}
                  <div 
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${IMAGES.hero})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest bg-amber-500 text-stone-950 py-1 px-2.5 rounded-full uppercase font-bold">
                      {car.type}
                    </span>
                    <span className="text-xs font-mono text-stone-300 bg-stone-950/40 backdrop-blur-sm px-2.5 py-1 rounded">
                      {car.capacity}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-lg font-serif font-bold text-white tracking-tight leading-none">
                      {car.name}
                    </h4>
                    <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase mt-1 block">
                      VVIP Standard Service
                    </span>
                  </div>
                </div>

                {/* Specs and specs list */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {car.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-400">Keunggulan Armada:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {car.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-stone-600 font-light">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
