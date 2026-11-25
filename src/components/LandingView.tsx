import { useState, FormEvent } from 'react';
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  Camera,
  Leaf,
  Car,
  Star,
  ChevronDown,
} from 'lucide-react';
import {
  HERO_IMAGE,
  JEEP_COLLAGE_MAIN_IMAGE,
  JEEP_COLLAGE_GEAR_IMAGE,
  SAFARI_PACKAGES,
  WILDLIFE_SPECIES,
  TESTIMONIALS,
  SafariPackage,
  WildlifeSpecies,
} from '../data/safariData';
import { ResilientImage } from './ResilientImage';

export interface QuickSearchPayload {
  date: string;
  timeOption: 'Morning' | 'Evening' | 'Full Day';
  guests: string;
  packageId: SafariPackage['id'];
}

interface LandingViewProps {
  onSelectPackageDetail: (pkgId: SafariPackage['id']) => void;
  onOpenBooking: (prefill?: Partial<QuickSearchPayload>) => void;
  onOpenWhatsAppConcierge: (prefillMessage?: string) => void;
  onSelectWildlife: (species: WildlifeSpecies) => void;
}

export function LandingView({
  onSelectPackageDetail,
  onOpenBooking,
  onOpenWhatsAppConcierge,
  onSelectWildlife,
}: LandingViewProps) {
  const [date, setDate] = useState('2026-12-14');
  const [safariTime, setSafariTime] = useState<'Morning' | 'Evening' | 'Full Day'>('Morning');
  const [guests, setGuests] = useState('2 Guests');
  const [availabilityResult, setAvailabilityResult] = useState<QuickSearchPayload | null>(null);

  const mapTimeToPackageId = (time: 'Morning' | 'Evening' | 'Full Day'): SafariPackage['id'] => {
    if (time === 'Full Day') return 'full-day';
    if (time === 'Evening') return 'sunset';
    return 'morning';
  };

  const handleAvailabilitySubmit = (e: FormEvent) => {
    e.preventDefault();
    setAvailabilityResult({
      date: date || '2026-12-14',
      timeOption: safariTime,
      guests,
      packageId: mapTimeToPackageId(safariTime),
    });
  };

  return (
    <>
      {/* 2. Hero Section */}
      <section
        id="safaris"
        className="relative min-h-[760px] lg:min-h-[840px] flex flex-col justify-between bg-jungle-charcoal overflow-hidden"
      >
        <ResilientImage
          src={HERO_IMAGE}
          alt="Sri Lankan leopard resting on a granite boulder in golden hour light at Yala National Park"
          fallbackLabel="Yala National Park · Golden Hour"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jungle-charcoal/90 via-jungle-charcoal/55 to-jungle-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle-charcoal via-transparent to-jungle-charcoal/50" />

        {/* Hero Copy */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-8 pt-36 md:pt-44 pb-8 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-jungle-charcoal/75 border border-sage-green/60 text-warm-sand font-label text-[12px] leading-[16px] font-semibold uppercase tracking-widest">
              Yala National Park · Block 1 &amp; Block 5
            </span>
            <h1 className="font-display text-[32px] leading-[38px] tracking-[-0.5px] md:text-[64px] md:leading-[72px] md:tracking-[-1px] font-bold text-on-jungle-charcoal text-balance">
              Track the Untamed Spirit of Yala.
            </h1>
            <p className="font-body text-[16px] leading-[26px] text-on-jungle-charcoal/90 max-w-xl text-pretty">
              Private luxury jeep safaris, expert naturalists, and unforgettable wildlife encounters in Sri Lanka&apos;s premier leopard sanctuary.
            </p>
          </div>
        </div>

        {/* Floating Horizontal Glassmorphism Booking Widget */}
        <div
          id="booking-widget"
          className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-8 pb-8 md:pb-12"
        >
          <form
            onSubmit={handleAvailabilitySubmit}
            className="rounded-lg bg-jungle-charcoal/75 backdrop-blur-md border border-warm-sand/15 p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            {/* Date Field */}
            <label className="flex flex-col gap-1">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-dark uppercase">
                Date
              </span>
              <div className="relative flex items-center">
                <Calendar
                  className="w-4 h-4 absolute left-3 text-leopard-amber pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="date"
                  name="safari-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="input-dark-scheme w-full rounded bg-charcoal-elevated/90 border border-charcoal-muted pl-10 pr-3 py-3 text-[15px] leading-[24px] text-on-charcoal-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none transition-colors duration-150 ease-out"
                />
              </div>
            </label>

            {/* Safari Time Field */}
            <label className="flex flex-col gap-1">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-dark uppercase">
                Safari Time
              </span>
              <div className="relative flex items-center">
                <Clock
                  className="w-4 h-4 absolute left-3 text-leopard-amber pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  name="safari-time"
                  value={safariTime}
                  onChange={(e) =>
                    setSafariTime(e.target.value as 'Morning' | 'Evening' | 'Full Day')
                  }
                  className="w-full appearance-none rounded bg-charcoal-elevated/90 border border-charcoal-muted pl-10 pr-9 py-3 text-[15px] leading-[24px] text-on-charcoal-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none transition-colors duration-150 ease-out cursor-pointer"
                >
                  <option value="Morning">Morning (5:30 AM – 9:30 AM)</option>
                  <option value="Evening">Evening (2:30 PM – 6:30 PM)</option>
                  <option value="Full Day">Full Day (5:30 AM – 6:00 PM)</option>
                </select>
                <ChevronDown
                  className="w-4 h-4 absolute right-3 text-text-muted-dark pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </label>

            {/* Guests Field */}
            <label className="flex flex-col gap-1">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-dark uppercase">
                Guests
              </span>
              <div className="relative flex items-center">
                <Users
                  className="w-4 h-4 absolute left-3 text-leopard-amber pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  name="safari-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full appearance-none rounded bg-charcoal-elevated/90 border border-charcoal-muted pl-10 pr-9 py-3 text-[15px] leading-[24px] text-on-charcoal-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none transition-colors duration-150 ease-out cursor-pointer"
                >
                  <option value="2 Guests">2 Guests (Private Jeep)</option>
                  <option value="1 Guest">1 Guest (Solo Tracker)</option>
                  <option value="3 Guests">3 Guests (Private Jeep)</option>
                  <option value="4 Guests">4 Guests (Private Jeep)</option>
                  <option value="5-6 Guests">5–6 Guests (Extended 4x4)</option>
                </select>
                <ChevronDown
                  className="w-4 h-4 absolute right-3 text-text-muted-dark pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </label>

            {/* Check Availability CTA */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap cursor-pointer"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </form>

          {/* Live Availability Confirmation Banner */}
          {availabilityResult && (
            <div className="mt-2 rounded bg-charcoal-elevated/95 border border-sage-green px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
                <p className="font-body text-[13px] leading-[20px] text-on-charcoal-elevated">
                  Private 4x4 available on{' '}
                  <span className="font-semibold tabular-nums">{availabilityResult.date}</span> for{' '}
                  {availabilityResult.timeOption} ({availabilityResult.guests}).
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenBooking(availabilityResult)}
                  className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold px-3 py-1.5 rounded bg-leopard-amber text-on-leopard-amber hover:bg-amber-hover transition-colors whitespace-nowrap cursor-pointer"
                >
                  Reserve Now
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenWhatsAppConcierge(
                      `Hello Leapordsee Yala, I would like to confirm availability for ${availabilityResult.date} (${availabilityResult.timeOption}, ${availabilityResult.guests}).`
                    )
                  }
                  className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-leopard-amber hover:underline whitespace-nowrap cursor-pointer"
                >
                  Confirm via WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Safari Packages Section (Warm Sand #F7F5F0) */}
      <section id="packages" className="bg-warm-sand text-on-warm-sand py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl flex flex-col gap-2">
              <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green uppercase tracking-widest">
                Private Expeditions
              </span>
              <h2 className="font-display text-[30px] leading-[36px] md:text-[48px] md:leading-[56px] tracking-[-0.5px] font-semibold text-on-warm-sand text-balance">
                Safari Packages Tailored to the Wild
              </h2>
            </div>
            <p className="font-body text-[15px] leading-[24px] text-text-muted-light max-w-md text-pretty">
              Every expedition includes a private custom-fitted 4x4, national park tracker coordination, and chilled bush refreshments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {SAFARI_PACKAGES.map((pkg) => {
              const isFeatured = Boolean(pkg.featuredTag);
              return (
                <article
                  key={pkg.id}
                  className={`h-full bg-sand-elevated text-on-sand-elevated rounded-lg overflow-hidden flex flex-col justify-between ${
                    isFeatured
                      ? 'border-2 border-leopard-amber'
                      : 'border border-sand-muted'
                  }`}
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(pkg.id)}
                      className="relative h-60 w-full overflow-hidden bg-charcoal-muted block text-left cursor-pointer group"
                      aria-label={`View full details for ${pkg.title}`}
                    >
                      <ResilientImage
                        src={pkg.cardImage}
                        alt={pkg.cardImageAlt}
                        fallbackLabel={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                      {pkg.featuredTag && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-leopard-amber text-on-leopard-amber font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold">
                          {pkg.featuredTag}
                        </span>
                      )}
                    </button>

                    <div className="p-6 flex flex-col gap-4">
                      <header className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-tint text-sage-green border border-sage-green/20 font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold">
                            {pkg.badgeText}
                          </span>
                          <span className="font-title text-[20px] leading-[28px] font-semibold text-on-sand-elevated tabular-nums">
                            ${pkg.price}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectPackageDetail(pkg.id)}
                          className="text-left group cursor-pointer"
                        >
                          <h3 className="font-headline text-[28px] leading-[36px] font-semibold text-on-sand-elevated group-hover:text-sage-green transition-colors">
                            {pkg.title}
                          </h3>
                        </button>
                      </header>

                      <ul className="flex flex-col gap-2 text-[13px] leading-[20px] text-text-muted-light">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2
                              className="w-4 h-4 text-sage-green shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <footer className="px-6 pb-6 pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenBooking({ packageId: pkg.id })}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover transition-colors duration-150 ease-out cursor-pointer"
                    >
                      <span>{pkg.ctaLabel}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(pkg.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded text-sage-green font-label text-[13px] leading-[18px] font-semibold hover:bg-warm-sand transition-colors duration-150 ease-out cursor-pointer"
                    >
                      <span>View Expedition Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Leapordsee Yala (Deep Jungle Charcoal #141815) */}
      <section id="about" className="bg-jungle-charcoal text-on-jungle-charcoal py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Collage of Custom-Modified Open-Top 4x4 Jeeps & Photography Gear */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-8 rounded-lg overflow-hidden border border-charcoal-muted bg-charcoal-elevated">
                <ResilientImage
                  src={JEEP_COLLAGE_MAIN_IMAGE}
                  alt="Custom-modified open-top 4x4 safari jeep with tan leather seats in Yala bushland"
                  fallbackLabel="Custom Open-Top 4x4 Jeep"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="rounded-lg overflow-hidden border border-charcoal-muted bg-charcoal-elevated">
                  <ResilientImage
                    src={JEEP_COLLAGE_GEAR_IMAGE}
                    alt="Telephoto wildlife camera lens and binoculars mounted on a safari jeep"
                    fallbackLabel="Photography Rig & Optics"
                    className="w-full h-44 md:h-56 object-cover"
                  />
                </div>
                <div className="rounded-lg bg-charcoal-elevated border border-sage-green/40 p-4 flex flex-col gap-1">
                  <span className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-semibold text-leopard-amber tabular-nums">
                    94%
                  </span>
                  <span className="font-body text-[13px] leading-[20px] text-text-muted-dark">
                    Leopard sighting rate on Full-Day drives
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Value Propositions */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
                The Leapordsee Standard
              </span>
              <h2 className="font-display text-[30px] leading-[36px] md:text-[48px] md:leading-[56px] tracking-[-0.5px] font-semibold text-on-jungle-charcoal text-balance">
                Built for Quiet Encounters &amp; Crisp Frames
              </h2>
              <p className="font-body text-[15px] leading-[24px] text-text-muted-dark text-pretty">
                We never race through convoy trails. Every vehicle, route, and tracker is dedicated to ethical, unhurried wildlife observation.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal-elevated/70 border border-charcoal-muted">
                <BadgeCheck className="w-6 h-6 text-leopard-amber shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-jungle-charcoal">
                    Certified Wildlife Trackers
                  </h3>
                  <p className="font-body text-[13px] leading-[20px] text-text-muted-dark text-pretty">
                    Veteran naturalists trained in alarm-call reading, pugmark analysis, and Yala leopard territories.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal-elevated/70 border border-charcoal-muted">
                <Camera className="w-6 h-6 text-leopard-amber shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-jungle-charcoal">
                    Custom Photography-Ready Jeeps
                  </h3>
                  <p className="font-body text-[13px] leading-[20px] text-text-muted-dark text-pretty">
                    Open-top 4x4s fitted with gimbal mounts, beanbag rails, dual charging ports, and silent-idle tuning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal-elevated/70 border border-charcoal-muted">
                <Leaf className="w-6 h-6 text-leopard-amber shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-jungle-charcoal">
                    Ethical &amp; Eco-Friendly Tracking
                  </h3>
                  <p className="font-body text-[13px] leading-[20px] text-text-muted-dark text-pretty">
                    Strict zero-crowding distance rules, plastic-free bush picnics, and local conservation support.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal-elevated/70 border border-charcoal-muted">
                <Car className="w-6 h-6 text-leopard-amber shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-jungle-charcoal">
                    Flexible Hotel Pickups in Tissamaharama &amp; Yala
                  </h3>
                  <p className="font-body text-[13px] leading-[20px] text-text-muted-dark text-pretty">
                    Complimentary door-to-door transfers from boutique lodges in Tissamaharama &amp; Yala buffer zones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wildlife Sightings Gallery (Asymmetrical Bento-Grid on Warm Sand #F7F5F0) */}
      <section id="wildlife" className="bg-warm-sand text-on-warm-sand py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl flex flex-col gap-2">
              <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green uppercase tracking-widest">
                Field Dispatches
              </span>
              <h2 className="font-display text-[30px] leading-[36px] md:text-[48px] md:leading-[56px] tracking-[-0.5px] font-semibold text-on-warm-sand text-balance">
                Wildlife Sightings Gallery
              </h2>
            </div>
            <p className="font-body text-[15px] leading-[24px] text-text-muted-light max-w-md text-pretty">
              Yala boasts the highest density of wild leopards on Earth, alongside iconic herds of Asian elephants, sloth bears, and over 215 bird species.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[260px]">
            {WILDLIFE_SPECIES.map((species) => (
              <button
                key={species.id}
                type="button"
                onClick={() => onSelectWildlife(species)}
                className={`group relative ${species.gridSpanClass} rounded-md overflow-hidden bg-jungle-charcoal text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber`}
              >
                <ResilientImage
                  src={species.image}
                  alt={species.imageAlt}
                  fallbackLabel={species.commonName}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jungle-charcoal via-jungle-charcoal/55 to-transparent p-6 flex flex-col justify-end gap-1">
                  <span className="w-fit px-2.5 py-0.5 rounded bg-jungle-charcoal/85 font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-wider">
                    {species.scientificName}
                  </span>
                  <h3 className={species.titleClass}>{species.commonName}</h3>
                  {species.id === 'leopard' && (
                    <p className="font-body text-[13px] leading-[20px] text-on-jungle-charcoal/90">
                      {species.summary}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Traveler Testimonials (Solid Sand Muted Band) */}
      <section className="bg-sand-muted text-on-warm-sand py-12 md:py-24 border-t border-sand-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col gap-2 mb-8 max-w-2xl">
            <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green uppercase tracking-widest">
              Guest Stories
            </span>
            <h2 className="font-display text-[30px] leading-[36px] md:text-[48px] md:leading-[56px] tracking-[-0.5px] font-semibold text-on-warm-sand text-balance">
              Memories from the Bush
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {TESTIMONIALS.map((review) => (
              <article
                key={review.id}
                className="h-full bg-sand-elevated text-on-sand-elevated rounded-lg border border-sand-muted p-6 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-4">
                  <div
                    className="flex items-center gap-1 text-leopard-amber"
                    aria-label="5 out of 5 stars"
                  >
                    {[0, 1, 2, 3, 4].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 fill-leopard-amber text-leopard-amber"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="font-body text-[15px] leading-[24px] text-on-sand-elevated text-pretty">
                    {review.quote}
                  </p>
                </div>
                <header className="pt-2 border-t border-sand-muted flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated">
                      {review.author}
                    </h3>
                    <p className="font-body text-[13px] leading-[20px] text-text-muted-light">
                      {review.country}
                    </p>
                  </div>
                  <span className="font-label text-[11px] leading-[16px] tracking-[0.5px] font-medium text-sage-green uppercase whitespace-nowrap shrink-0">
                    {review.packageName}
                  </span>
                </header>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
