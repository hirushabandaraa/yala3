import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Car,
  Users,
  MapPin,
  CheckCircle2,
  Info,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SAFARI_PACKAGES, SafariPackage } from '../data/safariData';
import { ResilientImage } from './ResilientImage';

interface PackageDetailViewProps {
  selectedPackage: SafariPackage;
  onSelectPackage: (pkgId: SafariPackage['id']) => void;
  onBackToPackages: () => void;
  onOpenBooking: (pkgId: SafariPackage['id']) => void;
  onOpenWhatsAppConcierge: (prefillMessage?: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function PackageDetailView({
  selectedPackage,
  onSelectPackage,
  onBackToPackages,
  onOpenBooking,
  onOpenWhatsAppConcierge,
}: PackageDetailViewProps) {
  return (
    <>
      {/* Package Hero Banner */}
      <section className="relative min-h-[480px] flex flex-col justify-end bg-jungle-charcoal overflow-hidden">
        <motion.div
          key={selectedPackage.id}
          initial={{ scale: 1.06, opacity: 0.75 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="absolute inset-0"
        >
          <ResilientImage
            src={selectedPackage.heroImage}
            alt={selectedPackage.heroImageAlt}
            fallbackLabel={selectedPackage.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-jungle-charcoal/95 via-jungle-charcoal/70 to-jungle-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle-charcoal via-transparent to-jungle-charcoal/50" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-8 pt-32 pb-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackToPackages}
              className="inline-flex w-fit items-center gap-1.5 text-text-muted-dark hover:text-leopard-amber transition-colors duration-150 cursor-pointer group"
            >
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span className="font-label text-[12px] leading-[16px] font-semibold uppercase tracking-wider">
                Back to Safari Packages
              </span>
            </button>

            {/* Quick Expedition Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-jungle-charcoal/80 border border-charcoal-muted">
              {SAFARI_PACKAGES.map((pkg) => {
                const isActive = pkg.id === selectedPackage.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`relative px-3 py-1.5 rounded text-[12px] font-label font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-on-leopard-amber'
                        : 'text-text-muted-dark hover:text-on-jungle-charcoal'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="expedition-switcher-pill"
                        transition={{ duration: 0.22, ease: EASE_OUT }}
                        className="absolute inset-0 rounded bg-leopard-amber"
                      />
                    )}
                    <span className="relative z-10">{pkg.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={`tags-${selectedPackage.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-2"
          >
            {selectedPackage.featuredTag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-leopard-amber text-on-leopard-amber font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold">
                {selectedPackage.featuredTag}
              </span>
            )}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-charcoal-elevated/90 border border-sage-green/60 text-on-charcoal-elevated font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold">
              {selectedPackage.id === 'full-day'
                ? '12 Hours | Picnic Breakfast & Lunch Included'
                : selectedPackage.badgeText}
            </span>
          </motion.div>

          <motion.div
            key={`title-${selectedPackage.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease: EASE_OUT }}
            className="max-w-3xl flex flex-col gap-2"
          >
            <h1 className="font-display text-[32px] leading-[38px] tracking-[-0.5px] md:text-[64px] md:leading-[72px] md:tracking-[-1px] font-bold text-on-jungle-charcoal text-balance">
              {selectedPackage.title}
            </h1>
            <p className="font-body text-[16px] leading-[26px] text-on-jungle-charcoal/90 max-w-2xl text-pretty">
              {selectedPackage.heroDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-6 pt-2 text-text-muted-dark"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
              <span className="font-body text-[13px] leading-[20px] tabular-nums">
                {selectedPackage.timeRange}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
              <span className="font-body text-[13px] leading-[20px]">
                Private 4x4 Land Cruiser
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
              <span className="font-body text-[13px] leading-[20px]">
                {selectedPackage.guestsLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
              <span className="font-body text-[13px] leading-[20px]">
                {selectedPackage.pickupLabel}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Detail Content (Warm Sand #F7F5F0) */}
      <section className="bg-warm-sand text-on-warm-sand py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Itinerary & Inclusions */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green uppercase tracking-widest">
                  Expedition Timeline
                </span>
                <h2 className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] tracking-[-0.25px] font-semibold text-on-warm-sand">
                  Hour-by-Hour Field Itinerary
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {selectedPackage.itinerary.map((stop, idx) => (
                  <motion.div
                    key={`${selectedPackage.id}-${stop.time}-${stop.title}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06, ease: EASE_OUT }}
                    whileHover={{ x: 3 }}
                    className="bg-sand-elevated rounded-lg border border-sand-muted p-6 flex flex-col sm:flex-row gap-4 items-start transition-colors duration-150 hover:border-sage-green/40"
                  >
                    <span className="shrink-0 px-3 py-1 rounded-full bg-sage-tint text-sage-green font-label text-[14px] leading-[20px] font-semibold tabular-nums">
                      {stop.time}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated">
                        {stop.title}
                      </h3>
                      <p className="font-body text-[15px] leading-[24px] text-text-muted-light text-pretty">
                        {stop.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What's Included vs Park Permits & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="bg-sand-elevated rounded-lg border border-sand-muted p-6 flex flex-col gap-4"
              >
                <h3 className="font-title text-[20px] leading-[28px] font-semibold text-on-sand-elevated">
                  Included in Charter
                </h3>
                <ul className="flex flex-col gap-2 text-[13px] leading-[20px] text-text-muted-light">
                  {selectedPackage.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-sage-green shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.08, ease: EASE_OUT }}
                className="bg-sand-elevated rounded-lg border border-sand-muted p-6 flex flex-col gap-4"
              >
                <h3 className="font-title text-[20px] leading-[28px] font-semibold text-on-sand-elevated">
                  Park Permits &amp; Notes
                </h3>
                <ul className="flex flex-col gap-2 text-[13px] leading-[20px] text-text-muted-light">
                  {selectedPackage.permitsAndNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <Info
                        className="w-4 h-4 text-leopard-amber shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Right 4 Columns: Sticky Reservation Summary Card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT }}
            className="lg:col-span-4 lg:sticky lg:top-8 bg-sand-elevated text-on-sand-elevated rounded-lg border-2 border-leopard-amber p-6 flex flex-col gap-6"
          >
            <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-sand-muted">
              <div>
                <motion.span
                  key={selectedPackage.price}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="font-headline text-[36px] leading-[44px] font-semibold text-on-sand-elevated tabular-nums inline-block"
                >
                  ${selectedPackage.price}
                </motion.span>
                <span className="font-body text-[13px] leading-[20px] text-text-muted-light">
                  {' '}
                  / private jeep
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-sage-tint text-sage-green font-label text-[12px] leading-[16px] font-semibold shrink-0 tabular-nums">
                {selectedPackage.sightingRate}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-[13px] leading-[20px]">
                <span className="text-text-muted-light">Duration</span>
                <span className="font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                  {selectedPackage.durationLabel}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px] leading-[20px]">
                <span className="text-text-muted-light">Vehicle</span>
                <span className="font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                  {selectedPackage.vehicleLabel}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px] leading-[20px]">
                <span className="text-text-muted-light">Dining</span>
                <span className="font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                  {selectedPackage.diningLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <motion.button
                type="button"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                onClick={() => onOpenBooking(selectedPackage.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out cursor-pointer"
              >
                <span>Reserve This Safari</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                onClick={() =>
                  onOpenWhatsAppConcierge(
                    `Hello Leapordsee Yala tracker team, I have a question about the ${selectedPackage.title} ($${selectedPackage.price}).`
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded border border-sage-green text-on-sand-elevated font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-sage-green hover:text-on-sage-green transition-colors duration-150 ease-out cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Ask Tracker on WhatsApp</span>
              </motion.button>
            </div>

            <p className="font-body text-[13px] leading-[20px] text-text-muted-light text-center text-balance">
              No upfront deposit required. Pay on arrival in USD or LKR.
            </p>
          </motion.aside>
        </div>
      </section>
    </>
  );
}
