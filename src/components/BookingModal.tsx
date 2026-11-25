import { useState, useEffect, FormEvent } from 'react';
import { X, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MODAL_BACKDROP_IMAGE,
  SAFARI_PACKAGES,
  SafariPackage,
} from '../data/safariData';
import { ResilientImage } from './ResilientImage';

export interface BookingModalPrefill {
  packageId?: SafariPackage['id'];
  date?: string;
  guests?: string;
  departureTime?: '5:30 AM (Full Day / Morning)' | '2:30 PM (Sunset & Dusk)';
}

interface BookingModalProps {
  isOpen: boolean;
  prefill?: BookingModalPrefill;
  onClose: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function BookingModal({ isOpen, prefill, onClose }: BookingModalProps) {
  const [packageId, setPackageId] = useState<SafariPackage['id']>('full-day');
  const [date, setDate] = useState('2026-12-14');
  const [departureTime, setDepartureTime] = useState(
    '5:30 AM (Full Day / Morning)'
  );
  const [guests, setGuests] = useState('2 Guests (Private 4x4 Jeep)');
  const [fullName, setFullName] = useState('Clara Vance');
  const [contact, setContact] = useState('+44 7700 900123');
  const [hotelPickup, setHotelPickup] = useState('Wild Coast Tented Lodge, Palatupana');
  const [gimbalMount, setGimbalMount] = useState(true);
  const [vegetarianPicnic, setVegetarianPicnic] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setConfirmedRef(null);
    const targetPkgId = prefill?.packageId || 'full-day';
    setPackageId(targetPkgId);
    const pkg = SAFARI_PACKAGES.find((p) => p.id === targetPkgId) || SAFARI_PACKAGES[1];
    setDepartureTime(prefill?.departureTime || pkg.defaultDeparture);
    if (prefill?.date) {
      setDate(prefill.date);
    }
    if (prefill?.guests) {
      if (prefill.guests.includes('1 Guest')) {
        setGuests('1 Guest (Solo Tracker)');
      } else if (prefill.guests.includes('3') || prefill.guests.includes('4')) {
        setGuests('3–4 Guests (Private 4x4 Jeep)');
      } else if (prefill.guests.includes('5')) {
        setGuests('5–6 Guests (Extended 4x4)');
      } else {
        setGuests('2 Guests (Private 4x4 Jeep)');
      }
    }
  }, [isOpen, prefill]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activePackage =
    SAFARI_PACKAGES.find((p) => p.id === packageId) || SAFARI_PACKAGES[1];

  const handlePackageChange = (newId: SafariPackage['id']) => {
    setPackageId(newId);
    const pkg = SAFARI_PACKAGES.find((p) => p.id === newId);
    if (pkg) {
      setDepartureTime(pkg.defaultDeparture);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setConfirmedRef(`LY-2026-${randomCode}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="safari-modal-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-jungle-charcoal/95"
        >
          {/* Dimmed Backdrop Image + Blur */}
          <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
            <ResilientImage
              src={MODAL_BACKDROP_IMAGE}
              alt="Yala National Park safari backdrop"
              fallbackLabel="Yala National Park"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-jungle-charcoal/80 backdrop-blur-md" />
          </div>

          {/* Backdrop click target */}
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

          {/* Centered Booking Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="relative z-10 w-full max-w-2xl rounded-lg bg-warm-sand text-on-warm-sand border border-sand-muted overflow-hidden my-auto shadow-2xl"
          >
            {/* Modal Header */}
            <header className="bg-jungle-charcoal text-on-jungle-charcoal px-6 py-6 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
                  Private Jeep Charter
                </span>
                <h2
                  id="safari-modal-heading"
                  className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] tracking-[-0.25px] font-semibold text-on-jungle-charcoal"
                >
                  Reserve Your Safari
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Close booking modal"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-charcoal-muted bg-charcoal-elevated text-on-charcoal-elevated hover:border-leopard-amber transition-colors duration-150 ease-out cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </header>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
              {/* Package & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                    Safari Package
                  </span>
                  <div className="relative flex items-center">
                    <select
                      name="package"
                      value={packageId}
                      onChange={(e) => handlePackageChange(e.target.value as SafariPackage['id'])}
                      className="w-full appearance-none rounded bg-sand-elevated border border-sand-muted pl-3 pr-9 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none cursor-pointer"
                    >
                      {SAFARI_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} (${pkg.price})
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 absolute right-3 text-text-muted-light pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                    Preferred Date
                  </span>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="input-light-scheme w-full rounded bg-sand-elevated border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                  />
                </label>
              </div>

              {/* Time & Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                    Departure Time
                  </span>
                  <div className="relative flex items-center">
                    <select
                      name="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="w-full appearance-none rounded bg-sand-elevated border border-sand-muted pl-3 pr-9 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none cursor-pointer"
                    >
                      <option value="5:30 AM (Full Day / Morning)">
                        5:30 AM (Full Day / Morning)
                      </option>
                      <option value="2:30 PM (Sunset & Dusk)">2:30 PM (Sunset &amp; Dusk)</option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 absolute right-3 text-text-muted-light pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                    Guests
                  </span>
                  <div className="relative flex items-center">
                    <select
                      name="guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full appearance-none rounded bg-sand-elevated border border-sand-muted pl-3 pr-9 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none cursor-pointer"
                    >
                      <option value="2 Guests (Private 4x4 Jeep)">
                        2 Guests (Private 4x4 Jeep)
                      </option>
                      <option value="1 Guest (Solo Tracker)">1 Guest (Solo Tracker)</option>
                      <option value="3–4 Guests (Private 4x4 Jeep)">
                        3–4 Guests (Private 4x4 Jeep)
                      </option>
                      <option value="5–6 Guests (Extended 4x4)">
                        5–6 Guests (Extended 4x4)
                      </option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 absolute right-3 text-text-muted-light pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </label>
              </div>

              {/* Guest Contact & Pickup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                    Full Name
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded bg-sand-elevated border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                    WhatsApp or Email
                  </span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full rounded bg-sand-elevated border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Tissamaharama / Yala Hotel Pickup
                </span>
                <input
                  type="text"
                  value={hotelPickup}
                  onChange={(e) => setHotelPickup(e.target.value)}
                  required
                  className="w-full rounded bg-sand-elevated border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                />
              </label>

              {/* Complimentary Gear & Dietary Options */}
              <div className="flex flex-col gap-2">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Complimentary Preferences
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-3 rounded bg-sand-elevated border border-sand-muted cursor-pointer hover:border-sage-green/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={gimbalMount}
                      onChange={(e) => setGimbalMount(e.target.checked)}
                      className="w-4 h-4 rounded border-sage-green accent-leopard-amber focus:ring-leopard-amber"
                    />
                    <span className="font-body text-[13px] leading-[20px] text-on-sand-elevated">
                      Gimbal &amp; Beanbag Camera Mount
                    </span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded bg-sand-elevated border border-sand-muted cursor-pointer hover:border-sage-green/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={vegetarianPicnic}
                      onChange={(e) => setVegetarianPicnic(e.target.checked)}
                      className="w-4 h-4 rounded border-sage-green accent-leopard-amber focus:ring-leopard-amber"
                    />
                    <span className="font-body text-[13px] leading-[20px] text-on-sand-elevated">
                      Vegetarian Bush Picnic Menu
                    </span>
                  </label>
                </div>
              </div>

              {/* Summary Bar */}
              <div className="rounded-lg bg-sand-muted p-4 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-title text-[17px] leading-[24px] font-semibold text-on-warm-sand">
                    Total Private Jeep Charter
                  </span>
                  <span className="font-body text-[13px] leading-[20px] text-text-muted-light">
                    No prepayment required today · Free 48h cancellation
                  </span>
                </div>
                <motion.span
                  key={activePackage.price}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  className="font-headline text-[36px] leading-[44px] font-semibold text-on-warm-sand tabular-nums"
                >
                  ${activePackage.price}
                </motion.span>
              </div>

              {/* Modal Actions */}
              <footer className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded border border-sage-green text-on-warm-sand font-label text-[14px] leading-[20px] font-semibold hover:bg-sage-green hover:text-on-sage-green transition-colors duration-150 ease-out cursor-pointer"
                >
                  <span>Cancel</span>
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out cursor-pointer"
                >
                  <span>Confirm Safari Request</span>
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                </motion.button>
              </footer>

              <AnimatePresence>
                {confirmedRef && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="rounded bg-sage-tint border border-sage-green/30 p-4 flex items-start gap-2.5 text-sage-green"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex flex-col gap-0.5 font-body text-[13px] leading-[20px]">
                      <p className="font-semibold">
                        Request confirmed (<span className="tabular-nums">{confirmedRef}</span>)!
                      </p>
                      <p>
                        Your assigned tracker will message{' '}
                        <span className="font-medium">{contact}</span> with Palatupana gate
                        coordinates for <span className="tabular-nums">{date}</span> (
                        {activePackage.title}).
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
