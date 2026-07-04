import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Compass, Calendar, Users, Layers, FileText, User, 
  CreditCard, CheckCircle2, ChevronRight, ChevronLeft, 
  Plus, Minus, Mail, Phone, Sparkles, Check, Info 
} from 'lucide-react';
import { PACKAGES_DATA, ADDONS_DATA } from '../data';
import { TravelPackage, AddOn, BookingState } from '../types';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
}

export default function BookingWizard({ isOpen, onClose, initialPackageId }: BookingWizardProps) {
  // Step manager (1 to 8)
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Validation errors
  const [errors, setErrors] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState<BookingState>({
    packageId: initialPackageId || PACKAGES_DATA[0].id,
    date: '',
    adults: 2,
    children: 0,
    addOnIds: [],
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'dp',
    orderCode: '',
  });

  // Keep package selection in sync when initialPackageId changes
  useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({ ...prev, packageId: initialPackageId }));
    }
  }, [initialPackageId]);

  // Generate order code once on step 7
  useEffect(() => {
    if (currentStep === 7 && !formData.orderCode) {
      const randomId = Math.random().toString(36).substring(2, 7).toUpperCase();
      setFormData(prev => ({
        ...prev,
        orderCode: `NRB-2026-${randomId}`
      }));
    }
  }, [currentStep, formData.orderCode]);

  if (!isOpen) return null;

  const selectedPackage = PACKAGES_DATA.find(p => p.id === formData.packageId) || PACKAGES_DATA[0];
  const isCarRental = selectedPackage.category === 'car-rental';

  // Prices and calculations
  const basePriceAdult = selectedPackage.price;
  const basePriceChild = basePriceAdult * 0.7; // 30% discount for children

  // Total participants
  const totalPax = formData.adults + formData.children;

  // Package Cost calculation
  let packageCost = 0;
  if (isCarRental) {
    // Car rental is flat rate, adults acts as "number of cars"
    packageCost = basePriceAdult * formData.adults;
  } else {
    packageCost = (formData.adults * basePriceAdult) + (formData.children * basePriceChild);
  }

  // Addon Cost calculation
  const selectedAddons = ADDONS_DATA.filter(addon => formData.addOnIds.includes(addon.id));
  const addonsCost = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  // Group Discount calculation (-Rp 150.000 if total pax >= 4)
  const groupDiscount = (!isCarRental && totalPax >= 4) ? 150000 : 0;

  // Final Total
  const finalTotal = Math.max(0, packageCost + addonsCost - groupDiscount);

  // Transfer Amount based on payment method
  const transferAmount = formData.paymentMethod === 'dp' ? finalTotal * 0.3 : finalTotal;

  // Formatter for IDR currency
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calendar setup for July 2026
  // July 2026 starting on Wednesday (3). 31 Days total.
  // Weekend dates requested: 4, 5, 11, 12, 18, 19, 25, 26 (Fully Booked)
  const disabledDates = [4, 5, 11, 12, 18, 19, 25, 26];
  
  const handleDateSelect = (dayNum: number) => {
    if (disabledDates.includes(dayNum)) return;
    const formattedDate = `2026-07-${dayNum.toString().padStart(2, '0')}`;
    setFormData(prev => ({ ...prev, date: formattedDate }));
    setErrors('');
  };

  // State handlers for counters
  const adjustAdults = (amount: number) => {
    setFormData(prev => {
      const val = prev.adults + amount;
      return { ...prev, adults: Math.max(1, val) };
    });
  };

  const adjustChildren = (amount: number) => {
    setFormData(prev => {
      const val = prev.children + amount;
      return { ...prev, children: Math.max(0, val) };
    });
  };

  const toggleAddon = (id: string) => {
    setFormData(prev => {
      const exists = prev.addOnIds.includes(id);
      const updated = exists 
        ? prev.addOnIds.filter(aId => aId !== id)
        : [...prev.addOnIds, id];
      return { ...prev, addOnIds: updated };
    });
  };

  // Step Validation logic
  const handleNext = () => {
    setErrors('');
    
    if (currentStep === 1) {
      if (!formData.packageId) {
        setErrors('Silakan pilih salah satu paket terlebih dahulu.');
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.date) {
        setErrors('Silakan tentukan tanggal keberangkatan Anda.');
        return;
      }
    }

    if (currentStep === 3) {
      if (formData.adults < 1) {
        setErrors('Jumlah peserta dewasa minimal 1 orang / unit.');
        return;
      }
      if (isCarRental && formData.adults > 3) {
        setErrors('Maksimum penyewaan adalah 3 unit mobil per transaksi secara online.');
        return;
      }
    }

    if (currentStep === 6) {
      if (!formData.name.trim()) {
        setErrors('Nama Lengkap wajib diisi.');
        return;
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        setErrors('Nomor HP/WhatsApp tidak valid (minimal 8 digit).');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        setErrors('Alamat Email tidak valid.');
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, 8));
  };

  const handleBack = () => {
    setErrors('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // WhatsApp Redirect Message Builder
  const handleWhatsAppRedirect = () => {
    const formattedDateString = formData.date 
      ? new Date(formData.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';
      
    const addonNames = selectedAddons.map(a => `• ${a.name} (${formatIDR(a.price)})`).join('%0A') || 'Tidak ada';
    const paxDetails = isCarRental 
      ? `${formData.adults} Unit Toyota Alphard`
      : `${formData.adults} Dewasa, ${formData.children} Anak-anak`;

    const paymentLabel = formData.paymentMethod === 'dp' ? 'Uang Muka / DP 30% (Sisa lunas di Bali)' : 'Lunas 100% (Full Payment)';

    const message = `Halo Admin Buana Purnama Tour 🌴%0ASaya ingin mengonfirmasi pesanan perjalanan premium saya:%0A%0A` +
      `🔑 *KODE TIKET:* \`${formData.orderCode}\`%0A` +
      `👤 *NAMA PEMESAN:* ${formData.name}%0A` +
      `📱 *NO. WHATSAPP:* ${formData.phone}%0A` +
      `✉️ *EMAIL:* ${formData.email}%0A%0A` +
      `📦 *PAKET PILIHAN:* ${selectedPackage.name}%0A` +
      `📅 *TANGGAL KEBERANGKATAN:* ${formattedDateString}%0A` +
      `👥 *JUMLAH PESERTA / ARMADA:* ${paxDetails}%0A` +
      `➕ *ADD-ONS TAMBAHAN:*%0A${addonNames}%0A%0A` +
      `💰 *RINCIAN BIAYA:*%0A` +
      `- Paket: ${formatIDR(packageCost)}%0A` +
      (groupDiscount > 0 ? `- Diskon Rombongan: -${formatIDR(groupDiscount)}%0A` : '') +
      `- Tambahan Add-ons: ${formatIDR(addonsCost)}%0A` +
      `--------------------------------%0A` +
      `⭐ *TOTAL AKHIR:* *${formatIDR(finalTotal)}*%0A` +
      `💳 *METODE BAYAR:* ${paymentLabel}%0A` +
      `📢 *JUMLAH TRANSFER (SEKARANG):* *${formatIDR(transferAmount)}*%0A%0A` +
      `Saya telah melakukan transfer ke rekening resmi Bank Buana Purnama. Mohon segera divalidasi dan dikirim e-voucher wisatanya. Terima kasih banyak! Suksma! 🙏✨`;

    const whatsappUrl = `https://wa.me/628889780274?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Helper arrays for progress display
  const stepLabels = [
    'Pilih Paket',
    'Tanggal',
    'Peserta',
    'Add-ons',
    'Invoice',
    'Data Diri',
    'Pembayaran',
    'Selesai'
  ];

  return (
    <div id="booking-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div 
        id="booking-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header Background Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold text-stone-100">Reservasi Premium Bali</h3>
              <p className="text-xs text-stone-400">CV Buana Purnama Tour & Travel — Est. 2012</p>
            </div>
          </div>
          <button 
            id="close-booking-modal"
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="px-6 pt-4 pb-2 border-b border-stone-800 bg-stone-950/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-amber-500 font-medium uppercase tracking-wider">
              Langkah {currentStep} dari 8: {stepLabels[currentStep - 1]}
            </span>
            <span className="text-xs font-mono text-stone-400">
              {Math.round((currentStep / 8) * 100)}% Selesai
            </span>
          </div>
          <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
          
          {/* Step circles for desktop */}
          <div className="hidden md:flex justify-between mt-3 text-[10px] font-medium text-stone-500">
            {stepLabels.map((label, idx) => (
              <span 
                key={idx} 
                className={`transition-colors duration-200 ${idx + 1 === currentStep ? 'text-amber-500 font-bold' : idx + 1 < currentStep ? 'text-amber-500/70' : 'text-stone-600'}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Validation Error Alert */}
        {errors && (
          <div className="mx-6 mt-4 p-3 bg-red-950/50 border border-red-500/40 rounded-lg flex items-center gap-2 text-xs text-red-200">
            <Info className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errors}</span>
          </div>
        )}

        {/* Step Body Content - Height bounded for neat layout */}
        <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* STEP 1: SELECT PACKAGE */}
              {currentStep === 1 && (
                <div id="step-1-content" className="space-y-4">
                  <label className="block text-sm font-medium text-stone-200 mb-1">
                    Silakan Pilih Paket Perjalanan Wisata Premium:
                  </label>
                  <select
                    id="package-select-dropdown"
                    value={formData.packageId}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, packageId: e.target.value }));
                      setErrors('');
                    }}
                    className="w-full bg-stone-950 border border-stone-800 text-stone-200 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  >
                    {PACKAGES_DATA.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {formatIDR(pkg.price)}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                    {PACKAGES_DATA.map(pkg => {
                      const isSelected = formData.packageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, packageId: pkg.id }));
                            setErrors('');
                          }}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-40 ${
                            isSelected 
                              ? 'bg-amber-500/10 border-amber-500 shadow-md' 
                              : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/50'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold">
                                {pkg.category === 'car-rental' ? 'Sewa Mobil' : pkg.category}
                              </span>
                              {isSelected && <span className="bg-amber-500 text-stone-900 text-[10px] px-2 py-0.5 rounded font-bold">Terpilih</span>}
                            </div>
                            <h4 className="text-sm font-serif font-semibold text-stone-100 mt-1 line-clamp-1">{pkg.name}</h4>
                            <p className="text-xs text-stone-400 mt-1 line-clamp-2">{pkg.description}</p>
                          </div>
                          <div className="text-sm font-semibold text-amber-500 mt-2">
                            {formatIDR(pkg.price)} <span className="text-xs font-normal text-stone-400">{pkg.category === 'car-rental' ? '/ Hari' : '/ Orang'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT DATE (JULY 2026 WITH DISABLED WEEKENDS) */}
              {currentStep === 2 && (
                <div id="step-2-content" className="space-y-4">
                  <div className="text-center mb-4">
                    <label className="text-sm font-medium text-stone-200">
                      Pilih Tanggal Keberangkatan Anda (Bulan Juli 2026):
                    </label>
                    <p className="text-xs text-amber-500 font-mono mt-1">
                      ⚠️ Tanggal Merah & Akhir Pekan Terarsir Penuh (Fully Booked)
                    </p>
                  </div>

                  <div className="max-w-md mx-auto bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <div className="text-center text-sm font-serif font-bold text-stone-200 mb-3 uppercase tracking-wider">
                      Juli 2026
                    </div>
                    {/* Weekday headers starting Wed */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-stone-500 mb-2">
                      <span>Min</span>
                      <span>Sen</span>
                      <span>Sel</span>
                      <span>Rab</span>
                      <span>Kam</span>
                      <span>Jum</span>
                      <span>Sab</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {/* Empty slots for Wed start. Sun, Mon, Tue are empty slots. July 1, 2026 is Wednesday */}
                      {/* Let's skip Sun, Mon, Tue -> 3 empty blocks */}
                      <div className="h-9" />
                      <div className="h-9" />
                      <div className="h-9" />
                      
                      {/* Generating 31 days */}
                      {Array.from({ length: 31 }).map((_, index) => {
                        const dayNum = index + 1;
                        const dateStr = `2026-07-${dayNum.toString().padStart(2, '0')}`;
                        const isBooked = disabledDates.includes(dayNum);
                        const isSelected = formData.date === dateStr;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            disabled={isBooked}
                            onClick={() => handleDateSelect(dayNum)}
                            className={`h-9 w-full rounded-lg text-xs font-semibold flex items-center justify-center transition-all relative ${
                              isBooked 
                                ? 'bg-red-950/20 text-red-700 cursor-not-allowed line-through border border-red-900/30' 
                                : isSelected
                                  ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20'
                                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800 hover:border-stone-700'
                            }`}
                          >
                            <span>{dayNum}</span>
                            {/* Visual indicator for booked */}
                            {isBooked && (
                              <span className="absolute bottom-1 text-[7px] text-red-500 font-bold uppercase tracking-tighter">Full</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {formData.date && (
                    <div className="text-center p-2 bg-amber-500/5 rounded-lg max-w-xs mx-auto border border-amber-500/20">
                      <span className="text-xs text-stone-300">Tanggal Terpilih: </span>
                      <span className="text-xs font-semibold text-amber-500">
                        {new Date(formData.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: NUMBER OF PARTICIPANTS */}
              {currentStep === 3 && (
                <div id="step-3-content" className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-base font-serif font-semibold text-stone-100">
                      {isCarRental ? 'Jumlah Unit Sewa Mobil' : 'Jumlah Peserta Perjalanan'}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1">
                      {isCarRental 
                        ? 'Tentukan berapa banyak unit mobil mewah Alphard yang ingin Anda sewa.' 
                        : 'Biaya dihitung per kepala. Anak-anak mendapatkan diskon spesial 30%.'}
                    </p>
                  </div>

                  {isCarRental ? (
                    /* Car Rental Selection Interface */
                    <div className="max-w-md mx-auto bg-stone-950 p-6 rounded-xl border border-stone-800 text-center">
                      <div className="mb-4">
                        <span className="text-xs uppercase font-mono tracking-wider bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full font-semibold">
                          Layanan Sewa Mobil (Flat Rate)
                        </span>
                        <p className="text-sm font-serif font-bold text-stone-200 mt-3">
                          {selectedPackage.name}
                        </p>
                        <p className="text-xs text-stone-400 mt-1">
                          🚗 {selectedPackage.maxCapacityText}
                        </p>
                        <p className="text-sm font-mono text-amber-500 mt-2 font-bold">
                          {formatIDR(selectedPackage.price)} / Hari per Unit
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-6 mt-6">
                        <button
                          type="button"
                          onClick={() => adjustAdults(-1)}
                          disabled={formData.adults <= 1}
                          className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <div className="text-center">
                          <span className="text-3xl font-mono font-bold text-stone-100">{formData.adults}</span>
                          <span className="block text-xs text-stone-400 mt-1">Unit Mobil</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => adjustAdults(1)}
                          disabled={formData.adults >= 3}
                          className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-6 p-3 bg-stone-900/60 rounded-lg text-xs text-stone-400 flex items-start gap-2 text-left">
                        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>Sewa Alphard premium sudah mencakup penjemputan gratis, bahan bakar minyak (BBM), sopir berpengalaman, dan air mineral. Tidak ada biaya tambahan tersembunyi.</span>
                      </div>
                    </div>
                  ) : (
                    /* Standard Head Count counters */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                      {/* Adults Counter */}
                      <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 flex flex-col items-center">
                        <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 mb-3">
                          <User className="w-6 h-6" />
                        </div>
                        <h5 className="text-sm font-semibold text-stone-200">Peserta Dewasa</h5>
                        <p className="text-xs text-stone-500 mt-0.5 font-mono">Usia 12+ tahun</p>
                        <p className="text-xs text-amber-500 font-mono mt-2 font-bold">{formatIDR(basePriceAdult)} / pax</p>
                        
                        <div className="flex items-center gap-5 mt-5">
                          <button
                            type="button"
                            onClick={() => adjustAdults(-1)}
                            disabled={formData.adults <= 1}
                            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 disabled:opacity-30 transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-2xl font-mono font-bold text-stone-100 w-8 text-center">{formData.adults}</span>
                          <button
                            type="button"
                            onClick={() => adjustAdults(1)}
                            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Children Counter */}
                      <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 flex flex-col items-center">
                        <div className="p-3 bg-amber-500/10 rounded-full text-amber-500 mb-3">
                          <Users className="w-6 h-6" />
                        </div>
                        <h5 className="text-sm font-semibold text-stone-200">Peserta Anak</h5>
                        <p className="text-xs text-stone-500 mt-0.5 font-mono">Usia 2 - 11 tahun</p>
                        <p className="text-xs text-amber-500 font-mono mt-2 font-bold">{formatIDR(basePriceChild)} (Diskon 30%)</p>

                        <div className="flex items-center gap-5 mt-5">
                          <button
                            type="button"
                            onClick={() => adjustChildren(-1)}
                            disabled={formData.children <= 0}
                            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 disabled:opacity-30 transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-2xl font-mono font-bold text-stone-100 w-8 text-center">{formData.children}</span>
                          <button
                            type="button"
                            onClick={() => adjustChildren(1)}
                            className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isCarRental && totalPax >= 4 && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg max-w-md mx-auto text-center text-xs text-amber-400">
                      🎉 <strong>Diskon Rombongan Terdeteksi!</strong> Karena Anda memesan untuk {totalPax} orang (min 4 orang), Anda berhak mendapatkan diskon otomatis sebesar <strong>-Rp 150.000</strong> pada rincian harga nanti.
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: OPTIONAL ADD-ONS */}
              {currentStep === 4 && (
                <div id="step-4-content" className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-base font-serif font-semibold text-stone-100">Layanan Tambahan Opsional (Add-ons)</h4>
                    <p className="text-xs text-stone-400 mt-1">Sempurnakan liburan impian Anda di Bali dengan layanan premium tambahan kami.</p>
                  </div>

                  <div className="space-y-3 max-w-xl mx-auto">
                    {ADDONS_DATA.map(addon => {
                      const isChecked = formData.addOnIds.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isChecked
                              ? 'bg-amber-500/10 border-amber-500'
                              : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                              isChecked ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-700 text-transparent'
                            }`}>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-stone-200">{addon.name}</h5>
                              <p className="text-xs text-stone-400 mt-0.5">{addon.description}</p>
                            </div>
                          </div>
                          <span className="text-sm font-mono font-bold text-amber-500 shrink-0 ml-4">
                            +{formatIDR(addon.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: AUTOMATIC INVOICE */}
              {currentStep === 5 && (
                <div id="step-5-content" className="space-y-4">
                  <div className="text-center mb-2">
                    <h4 className="text-base font-serif font-semibold text-stone-100">Ringkasan Invoice Otomatis</h4>
                    <p className="text-xs text-stone-400 mt-1">Berikut adalah transparansi rincian biaya pesanan Anda secara real-time.</p>
                  </div>

                  <div className="max-w-md mx-auto bg-stone-950/70 border border-amber-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
                    {/* Watermark */}
                    <div className="absolute -right-10 -bottom-10 text-stone-900/20 transform rotate-12 select-none pointer-events-none">
                      <Compass className="w-48 h-48" />
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                      <div>
                        <h5 className="text-xs uppercase font-mono tracking-widest text-amber-500 font-semibold">Struk Pesanan Wisata</h5>
                        <p className="text-sm font-serif font-bold text-stone-200 mt-1">CV Buana Purnama Tour & Travel</p>
                      </div>
                      <div className="text-right text-xs font-mono text-stone-400">
                        {formData.date ? new Date(formData.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                      </div>
                    </div>

                    <div className="py-4 space-y-3 text-xs border-b border-stone-800">
                      <div className="flex justify-between items-start">
                        <div className="text-stone-300">
                          <p className="font-semibold text-stone-200">{selectedPackage.name}</p>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {isCarRental 
                              ? `Sewa Mobil: ${formData.adults} Unit` 
                              : `Pax: ${formData.adults} Dewasa × ${formatIDR(basePriceAdult)}`}
                          </p>
                        </div>
                        <span className="font-mono text-stone-200">
                          {isCarRental ? formatIDR(formData.adults * basePriceAdult) : formatIDR(formData.adults * basePriceAdult)}
                        </span>
                      </div>

                      {!isCarRental && formData.children > 0 && (
                        <div className="flex justify-between items-start">
                          <div className="text-stone-300">
                            <p className="font-medium text-stone-200">Harga Khusus Anak-Anak</p>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              Pax: {formData.children} Anak × {formatIDR(basePriceChild)} (30% Diskon)
                            </p>
                          </div>
                          <span className="font-mono text-stone-200">{formatIDR(formData.children * basePriceChild)}</span>
                        </div>
                      )}

                      {selectedAddons.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <p className="font-semibold text-[11px] text-stone-400 uppercase tracking-wider">Layanan Tambahan (Add-ons):</p>
                          {selectedAddons.map(addon => (
                            <div key={addon.id} className="flex justify-between pl-2">
                              <span className="text-stone-400">• {addon.name}</span>
                              <span className="font-mono text-stone-300">+{formatIDR(addon.price)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {groupDiscount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-medium pt-2">
                          <span>Diskon Rombongan (Min. 4 Orang)</span>
                          <span className="font-mono">-{formatIDR(groupDiscount)}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <span className="text-sm font-serif font-bold text-stone-100">Total Akhir Bersih:</span>
                      <span className="text-lg font-mono font-bold text-amber-500">{formatIDR(finalTotal)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: PERSONAL DETAILS FORM */}
              {currentStep === 6 && (
                <div id="step-6-content" className="space-y-4 max-w-md mx-auto">
                  <div className="text-center mb-2">
                    <h4 className="text-base font-serif font-semibold text-stone-100">Informasi Kontak Pemesan</h4>
                    <p className="text-xs text-stone-400 mt-1">Lengkapi data diri Anda secara akurat agar pemesanan dapat terintegrasi ke WhatsApp kami.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Name field */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="input-full-name"
                          placeholder="Masukkan Nama Lengkap Anda"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, name: e.target.value }));
                            setErrors('');
                          }}
                          className="w-full bg-stone-950 border border-stone-800 text-stone-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-amber-500 text-sm placeholder:text-stone-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone field */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wider">No. HP / WhatsApp Aktif</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="input-phone-number"
                          placeholder="Contoh: 08512345678"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, phone: e.target.value }));
                            setErrors('');
                          }}
                          className="w-full bg-stone-950 border border-stone-800 text-stone-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-amber-500 text-sm placeholder:text-stone-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wider">Alamat Email Valid</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          id="input-email-address"
                          placeholder="Contoh: nama@domain.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, email: e.target.value }));
                            setErrors('');
                          }}
                          className="w-full bg-stone-950 border border-stone-800 text-stone-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-amber-500 text-sm placeholder:text-stone-600"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: PAYMENT METHOD */}
              {currentStep === 7 && (
                <div id="step-7-content" className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-base font-serif font-semibold text-stone-100">Metode Pembayaran Resmi</h4>
                    <p className="text-xs text-stone-400 mt-1">Kami menyediakan opsi cicilan uang muka maupun pelunasan penuh demi kenyamanan Anda.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                    {/* DP 30% Option */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'dp' }))}
                      className={`p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        formData.paymentMethod === 'dp'
                          ? 'bg-amber-500/10 border-amber-500'
                          : 'bg-stone-950/50 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold uppercase font-mono tracking-wider text-stone-400">Opsi Pembayaran</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            formData.paymentMethod === 'dp' ? 'border-amber-500' : 'border-stone-600'
                          }`}>
                            {formData.paymentMethod === 'dp' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                          </div>
                        </div>
                        <h5 className="text-sm font-serif font-bold text-stone-100 mt-3">Uang Muka / DP 30%</h5>
                        <p className="text-xs text-stone-400 mt-1">Bayar 30% sekarang untuk mengunci tiket & tanggal. Sisa pelunasan dibayar saat sampai di Bali.</p>
                      </div>
                      <div className="mt-4 border-t border-stone-800/60 pt-3">
                        <span className="block text-[11px] text-stone-500">Harus Transfer Sekarang:</span>
                        <span className="text-base font-mono font-bold text-amber-500">{formatIDR(finalTotal * 0.3)}</span>
                      </div>
                    </div>

                    {/* Full Payment Option */}
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'full' }))}
                      className={`p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        formData.paymentMethod === 'full'
                          ? 'bg-amber-500/10 border-amber-500'
                          : 'bg-stone-950/50 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold uppercase font-mono tracking-wider text-stone-400">Opsi Pembayaran</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            formData.paymentMethod === 'full' ? 'border-amber-500' : 'border-stone-600'
                          }`}>
                            {formData.paymentMethod === 'full' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                          </div>
                        </div>
                        <h5 className="text-sm font-serif font-bold text-stone-100 mt-3">Pelunasan Penuh (100%)</h5>
                        <p className="text-xs text-stone-400 mt-1">Pelunasan 100% langsung untuk menghindari antrean transaksi keuangan saat masa liburan di Bali.</p>
                      </div>
                      <div className="mt-4 border-t border-stone-800/60 pt-3">
                        <span className="block text-[11px] text-stone-500">Harus Transfer Sekarang:</span>
                        <span className="text-base font-mono font-bold text-amber-500">{formatIDR(finalTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bank Account Details */}
                  <div className="max-w-xl mx-auto bg-stone-950 p-5 rounded-xl border border-stone-800 text-xs text-stone-300">
                    <p className="font-serif font-semibold text-stone-100 mb-2 uppercase tracking-wider text-center text-amber-500">
                      Rekening Transfer Resmi CV Buana Purnama
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-3">
                      <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg">
                        <p className="font-bold text-stone-200 text-sm">BANK BCA</p>
                        <p className="font-mono text-amber-500 text-base font-bold my-1">762-094-8111</p>
                        <p className="text-[10px] text-stone-500">A/N Nurrbalitravel</p>
                      </div>
                      <div className="p-3 bg-stone-900 border border-stone-800 rounded-lg">
                        <p className="font-bold text-stone-200 text-sm">BANK MANDIRI</p>
                        <p className="font-mono text-amber-500 text-base font-bold my-1">145-00-1288-9999</p>
                        <p className="text-[10px] text-stone-500">A/N Nurrbalitravel</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-500/5 rounded border border-amber-500/10 text-[11px] text-stone-400">
                      📝 <strong>Kode Tiket Unik Anda:</strong> <code className="bg-stone-900 text-amber-500 px-2 py-0.5 rounded font-mono font-bold text-xs">{formData.orderCode}</code> (Tercatat otomatis). Mohon lampirkan kode ini saat mengonfirmasi transfer via WhatsApp nanti.
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: CONFIRMATION & REDIRECT WHATSAPP */}
              {currentStep === 8 && (
                <div id="step-8-content" className="space-y-6 max-w-md mx-auto text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-serif font-bold text-stone-100">Reservasi Hampir Selesai!</h4>
                    <p className="text-xs text-stone-400 mt-2">Satu langkah terakhir untuk mengonfirmasi liburan impian Anda ke Bali.</p>
                  </div>

                  <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 text-left space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-stone-800 pb-2">
                      <span className="text-stone-400 uppercase tracking-widest font-mono text-[10px]">Kode Unik Tiket:</span>
                      <span className="font-mono text-amber-500 font-bold text-sm bg-stone-900 px-2 py-0.5 rounded">{formData.orderCode}</span>
                    </div>

                    <div className="text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Nama Pemesan:</span>
                        <span className="text-stone-200 font-semibold">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Paket Terpilih:</span>
                        <span className="text-stone-200 font-medium truncate max-w-[200px]">{selectedPackage.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Tanggal Keberangkatan:</span>
                        <span className="text-stone-200">
                          {formData.date ? new Date(formData.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Jumlah Peserta / Armada:</span>
                        <span className="text-stone-200 font-mono">
                          {isCarRental ? `${formData.adults} Unit Mobil` : `${formData.adults} Dewasa, ${formData.children} Anak`}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-stone-800/60 pt-2 font-semibold">
                        <span className="text-stone-300">Total Harga Akhir:</span>
                        <span className="text-stone-200 font-mono">{formatIDR(finalTotal)}</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-800 pt-2 text-sm font-bold">
                        <span className="text-amber-500">Jumlah Transfer (Sekarang):</span>
                        <span className="text-amber-500 font-mono">{formatIDR(transferAmount)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.805-9.799.002-2.618-1.015-5.08-2.863-6.93C16.371 2.025 13.91 1.01 11.29 1.01 5.885 1.01 1.485 5.405 1.483 10.81c-.001 1.543.414 3.047 1.2 4.386l-.418 1.526-.816 2.98 3.059-.802.139-.036zm10.996-7.5c-.29-.146-1.72-.85-1.987-.946-.266-.097-.46-.146-.653.146-.193.29-.747.946-.916 1.14-.168.193-.337.218-.627.073-.29-.146-1.223-.45-2.33-1.44-.86-.767-1.44-1.716-1.609-2.007-.168-.29-.018-.447.127-.592.13-.13.29-.34.435-.51.145-.168.193-.29.29-.485.096-.193.048-.364-.024-.51-.072-.146-.653-1.577-.895-2.158-.236-.569-.475-.492-.653-.501-.17-.008-.364-.01-.557-.01-.193 0-.507.073-.772.364-.266.29-1.015.992-1.015 2.422 0 1.43 1.039 2.81 1.184 3.002.145.193 2.044 3.12 4.953 4.377.692.298 1.233.477 1.654.61.696.222 1.33.191 1.83.116.557-.082 1.72-.703 1.962-1.382.242-.678.242-1.26.168-1.38-.073-.12-.266-.193-.556-.34z"/>
                    </svg>
                    Konfirmasi & Kirim via WhatsApp
                  </button>

                  <p className="text-[10px] text-stone-500 italic">
                    Sistem akan mengalihkan Anda ke WhatsApp resmi MbjTourBali secara otomatis dengan pesan rincian pesanan terisi rapi. Admin kami aktif 24/7 dan akan segera merespons konfirmasi Anda.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex justify-between items-center p-5 border-t border-stone-800 bg-stone-950/40">
          {currentStep > 1 && currentStep < 8 ? (
            <button
              id="booking-back-btn"
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-100 transition-all font-medium py-2 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
          ) : (
            <div />
          )}

          {currentStep < 8 && (
            <button
              id="booking-next-btn"
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 text-xs text-stone-900 bg-amber-500 hover:bg-amber-400 transition-all font-bold py-2 px-5 rounded-lg shadow-md shadow-amber-500/10"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
