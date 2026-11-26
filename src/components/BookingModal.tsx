import { useState, useEffect, useRef, FormEvent } from 'react';
import { X, CheckCircle2, ChevronDown, MessageCircle, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MODAL_BACKDROP_IMAGE,
  SAFARI_PACKAGES,
  SafariPackage,
  OWNER_WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from '../data/safariData';
import { ResilientImage } from './ResilientImage';

export interface BookingModalPrefill {
  packageId?: SafariPackage['id'];
  date?: string;
  guests?: string;
  departureTime?: '5:30 AM (Full Day / Morning)' | '2:30 PM (Sunset & Dusk)';
  charterType?: 'Private Safari' | 'Sharing Safari';
  tierLabel?: string;
  sharingPrice?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  prefill?: BookingModalPrefill;
  onClose: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const SHARING_RATE_BY_PACKAGE: Record<SafariPackage['id'], number> = {
  morning: 53,
  sunset: 58,
  'full-day': 69,
};

export function BookingModal({ isOpen, prefill, onClose }: BookingModalProps) {
  const [packageId, setPackageId] = useState<SafariPackage['id']>('full-day');
  const [charterType, setCharterType] = useState<'Private Safari' | 'Sharing Safari'>(
    'Private Safari'
  );
  const [customTierLabel, setCustomTierLabel] = useState<string | undefined>(undefined);
  const [customSharingPrice, setCustomSharingPrice] = useState<number | undefined>(undefined);
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
  const [confirmedBooking, setConfirmedBooking] = useState<{
    ref: string;
    waUrl: string;
    messageText: string;
  } | null>(null);
  const [copiedDetails, setCopiedDetails] = useState(false);

  const hiddenWaLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setConfirmedBooking(null);
    setCopiedDetails(false);
    const targetPkgId = prefill?.packageId || 'full-day';
    setPackageId(targetPkgId);
    const pkg = SAFARI_PACKAGES.find((p) => p.id === targetPkgId) || SAFARI_PACKAGES[1];
    setDepartureTime(prefill?.departureTime || pkg.defaultDeparture);
    setCharterType(prefill?.charterType || 'Private Safari');
    setCustomTierLabel(prefill?.tierLabel);
    setCustomSharingPrice(prefill?.sharingPrice);
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

  const displayPackageTitle = customTierLabel || activePackage.title;
  const displayPrice =
    charterType === 'Sharing Safari'
      ? customSharingPrice ?? SHARING_RATE_BY_PACKAGE[activePackage.id]
      : activePackage.price;

  const handlePackageChange = (newId: SafariPackage['id']) => {
    setPackageId(newId);
    setCustomTierLabel(undefined);
    setCustomSharingPrice(undefined);
    const pkg = SAFARI_PACKAGES.find((p) => p.id === newId);
    if (pkg) {
      setDepartureTime(pkg.defaultDeparture);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `LY-2026-${randomCode}`;

    const preferences: string[] = [];
    if (gimbalMount) preferences.push('Gimbal & Beanbag Camera Mount');
    if (vegetarianPicnic) preferences.push('Vegetarian Bush Picnic Menu');

    const rateLabel =
      charterType === 'Sharing Safari'
        ? `Starts from $${displayPrice} / guest`
        : `$${displayPrice} Private Jeep`;

    const messageText = [
      `*New Safari Booking Request — Leapordsee Yala*`,
      `Booking Ref: ${ref}`,
      `Charter Type: ${charterType}`,
      `Package: ${displayPackageTitle} (${rateLabel})`,
      `Date: ${date}`,
      `Departure: ${departureTime}`,
      `Guests: ${guests}`,
      `Guest Name: ${fullName}`,
      `Guest Contact: ${contact}`,
      `Hotel Pickup: ${hotelPickup}`,
      `Preferences: ${preferences.length > 0 ? preferences.join(', ') : 'Standard'}`,
    ].join('\n');

    const waUrl = buildWhatsAppUrl(messageText);
    setConfirmedBooking({ ref, waUrl, messageText });

    // Trigger direct WhatsApp handoff from the user's submit click
    if (hiddenWaLinkRef.current) {
      hiddenWaLinkRef.current.href = waUrl;
      hiddenWaLinkRef.current.click();
    }
  };

  const handleCopyBooking = async () => {
    if (!confirmedBooking) return;
    try {
      await navigator.clipboard.writeText(confirmedBooking.messageText);
      setCopiedDetails(true);
      window.setTimeout(() => setCopiedDetails(false), 2000);
    } catch {
      setCopiedDetails(true);
    }
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

          {/* Hidden anchor for synchronous WhatsApp launch on booking confirmation */}
          <a
            ref={hiddenWaLinkRef}
            href={confirmedBooking?.waUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          >
            Open WhatsApp
          </a>

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
                  {charterType === 'Sharing Safari' ? 'Sharing 4x4 Seat' : 'Private Jeep Charter'}
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
              {/* Safari Charter Type */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Safari Charter Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['Private Safari', 'Sharing Safari'] as const).map((option) => {
                    const selected = charterType === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCharterType(option)}
                        className={`px-4 py-2.5 rounded font-label text-[13px] leading-[20px] font-semibold transition-colors duration-150 cursor-pointer border ${
                          selected
                            ? 'bg-leopard-amber text-on-leopard-amber border-leopard-amber'
                            : 'bg-sand-elevated text-on-sand-elevated border-sand-muted hover:border-leopard-amber'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

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
                    {charterType === 'Sharing Safari'
                      ? `${displayPackageTitle} · Sharing Seat`
                      : `Total Private Jeep Charter`}
                  </span>
                  <span className="font-body text-[13px] leading-[20px] text-text-muted-light">
                    {charterType === 'Sharing Safari'
                      ? 'Per-guest starting rate · Free 48h cancellation'
                      : 'No prepayment required today · Free 48h cancellation'}
                  </span>
                </div>
                <motion.span
                  key={`${charterType}-${displayPrice}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  className="font-headline text-[36px] leading-[44px] font-semibold text-on-warm-sand tabular-nums shrink-0"
                >
                  ${displayPrice}
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
                {confirmedBooking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="rounded-lg bg-sage-tint border border-sage-green/35 p-4 flex flex-col gap-3 text-sage-green"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex flex-col gap-0.5 font-body text-[13px] leading-[20px]">
                        <p className="font-semibold">
                          Booking request prepared (
                          <span className="tabular-nums">{confirmedBooking.ref}</span>)!
                        </p>
                        <p>
                          Sending directly to Hirusha on WhatsApp (
                          <span className="font-semibold tabular-nums">
                            {OWNER_WHATSAPP_DISPLAY}
                          </span>
                          ). If WhatsApp did not open automatically, click below to send your booking details.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pl-6">
                      <a
                        href={confirmedBooking.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-jungle-charcoal text-on-jungle-charcoal font-label text-[12px] font-semibold hover:bg-charcoal-elevated transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-leopard-amber" aria-hidden="true" />
                        <span>Send via WhatsApp ({OWNER_WHATSAPP_DISPLAY})</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyBooking}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-sage-green/40 bg-sand-elevated text-sage-green font-label text-[12px] font-semibold hover:bg-warm-sand transition-colors cursor-pointer"
                      >
                        {copiedDetails ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>
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
