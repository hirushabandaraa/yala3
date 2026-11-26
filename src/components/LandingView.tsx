import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  Camera,
  Leaf,
  Car,
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, animate } from 'motion/react';
import {
  HERO_SLIDES,
  JEEP_COLLAGE_MAIN_IMAGE,
  JEEP_COLLAGE_GEAR_IMAGE,
  SAFARI_PACKAGES,
  WILDLIFE_SPECIES,
  SafariPackage,
  WildlifeSpecies,
} from '../data/safariData';
import { ResilientImage } from './ResilientImage';
import { GuestReviewSection } from './GuestReviewSection';
import type { BookingModalPrefill } from './BookingModal';

interface LandingViewProps {
  onSelectPackageDetail: (pkgId: SafariPackage['id']) => void;
  onOpenBooking: (prefill?: Partial<BookingModalPrefill>) => void;
  onOpenBookSafari: () => void;
  onSelectWildlife: (species: WildlifeSpecies) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const HERO_HEADLINE_WORDS = ['Track', 'the', 'Untamed', 'Spirit', 'of', 'Yala.'] as const;

function AnimatedSightingStat() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(94);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(72, 94, {
      duration: 0.9,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView]);

  return (
    <span
      ref={ref}
      className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-semibold text-leopard-amber tabular-nums"
    >
      {displayValue}%
    </span>
  );
}

export function LandingView({
  onSelectPackageDetail,
  onOpenBooking,
  onOpenBookSafari,
  onSelectWildlife,
}: LandingViewProps) {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <>
      {/* 2. Hero Section */}
      <section
        ref={heroRef}
        id="safaris"
        className="relative min-h-[760px] lg:min-h-[840px] flex flex-col justify-between bg-jungle-charcoal overflow-hidden"
      >
        <motion.div
          style={{ y: heroParallaxY, scale: heroParallaxScale }}
          className="absolute inset-0 will-change-transform"
        >
          <AnimatePresence mode="sync">
            {HERO_SLIDES.map((slide, index) => {
              if (index !== activeHeroIndex) return null;
              return (
                <motion.div
                  key={slide.src}
                  initial={{ opacity: 0, scale: 1.09, x: '0%', y: '0%' }}
                  animate={{
                    opacity: 1,
                    scale: [1.03, 1.09, 1.04],
                    x: ['0%', '-1.4%', '0.8%'],
                    y: ['0%', '-0.8%', '0.5%'],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.3, ease: EASE_OUT },
                    scale: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
                    x: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <ResilientImage
                    src={slide.src}
                    alt={slide.alt}
                    fallbackLabel="Yala National Park · Golden Hour"
                    className={`w-full h-full object-cover ${slide.objectPositionClass}`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-jungle-charcoal/90 via-jungle-charcoal/55 to-jungle-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle-charcoal via-transparent to-jungle-charcoal/50" />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.15, 0.32, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-leopard-amber/10 to-leopard-amber/20 pointer-events-none"
        />

        {/* Hero Copy */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-8 pt-36 md:pt-44 pb-16 md:pb-24 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT }}
              className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-jungle-charcoal/75 border border-sage-green/60 text-warm-sand font-label text-[12px] leading-[16px] font-semibold uppercase tracking-widest"
            >
              Yala National Park
            </motion.span>
            <motion.h1
              aria-label="Track the Untamed Spirit of Yala."
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
              className="font-display text-[32px] leading-[38px] tracking-[-0.5px] md:text-[64px] md:leading-[72px] md:tracking-[-1px] font-bold text-on-jungle-charcoal text-balance"
            >
              {HERO_HEADLINE_WORDS.map((word, idx) => {
                const isAccentWord = word === 'Untamed' || word === 'Yala.';
                return (
                  <span key={word} aria-hidden="true" className="inline-block mr-[0.26em] last:mr-0">
                    <motion.span
                      className="inline-block will-change-transform"
                      animate={{
                        y: [0, -3.5, 0],
                        opacity: [0.9, 1, 0.9],
                        color: isAccentWord
                          ? ['#F7F5F0', '#D99B26', '#F7F5F0']
                          : ['#F7F5F0', '#FFEEDA', '#F7F5F0'],
                      }}
                      transition={{
                        duration: 3.8,
                        delay: idx * 0.18,
                        repeat: Infinity,
                        repeatDelay: 1.4,
                        ease: 'easeInOut',
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT }}
              className="font-body text-[16px] leading-[26px] text-on-jungle-charcoal/90 max-w-xl text-pretty"
            >
              Private luxury jeep safaris, expert naturalists, and unforgettable wildlife encounters in Sri Lanka&apos;s premier leopard sanctuary.
            </motion.p>

            {/* Primary Hero Book Safari CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
              className="pt-1"
            >
              <motion.button
                type="button"
                onClick={onOpenBookSafari}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap cursor-pointer shadow-lg group"
              >
                <span>View Packages &amp; Book Safari</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </motion.button>
            </motion.div>

            {/* Minimal Header Photo Slideshow Controls */}
            <div className="flex items-center gap-2 pt-1" role="tablist" aria-label="Hero leopard photography">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === activeHeroIndex;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View header photo ${idx + 1}`}
                    onClick={() => setActiveHeroIndex(idx)}
                    className="group py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber rounded"
                  >
                    <span
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-10 bg-leopard-amber'
                          : 'w-5 bg-warm-sand/35 group-hover:bg-warm-sand/70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* 3. Safari Packages Section (Warm Sand #F7F5F0) */}
      <section id="packages" className="bg-warm-sand text-on-warm-sand py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAFARI_PACKAGES.map((pkg, idx) => {
              const isFeatured = Boolean(pkg.featuredTag);
              return (
                <motion.div
                  key={pkg.id}
                  initial={{
                    opacity: 0,
                    y: 42,
                    scale: 0.93,
                    clipPath: 'inset(14% 0% 0% 0% round 8px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    clipPath: 'inset(0% 0% 0% 0% round 8px)',
                  }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.65, delay: idx * 0.12, ease: EASE_OUT }}
                  className="flex"
                >
                  <motion.article
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 4.4,
                        delay: idx * 0.45,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.2, ease: EASE_OUT } }}
                    className={`flex-1 bg-sand-elevated text-on-sand-elevated rounded-lg overflow-hidden flex flex-col justify-between transition-shadow duration-200 hover:shadow-xl will-change-transform ${
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
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: EASE_OUT }}
                      onClick={() => onOpenBooking({ packageId: pkg.id })}
                      className="w-full inline-flex items-center justify-center px-6 py-3 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover transition-colors duration-150 ease-out cursor-pointer"
                    >
                      <span>{pkg.ctaLabel}</span>
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(pkg.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded text-sage-green font-label text-[13px] leading-[18px] font-semibold hover:bg-warm-sand transition-colors duration-150 ease-out cursor-pointer group"
                    >
                      <span>View Expedition Itinerary</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </footer>
                  </motion.article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Leapordsee Yala (Deep Jungle Charcoal #141815) */}
      <section id="about" className="bg-jungle-charcoal text-on-jungle-charcoal py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Collage of Custom-Modified Open-Top 4x4 Jeeps & Photography Gear */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-8 rounded-lg overflow-hidden border border-charcoal-muted bg-charcoal-elevated group">
                <ResilientImage
                  src={JEEP_COLLAGE_MAIN_IMAGE}
                  alt="Custom-modified open-top 4x4 safari jeep with tan leather seats in Yala bushland"
                  fallbackLabel="Custom Open-Top 4x4 Jeep"
                  className="w-full h-80 md:h-[420px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="rounded-lg overflow-hidden border border-charcoal-muted bg-charcoal-elevated group">
                  <ResilientImage
                    src={JEEP_COLLAGE_GEAR_IMAGE}
                    alt="Telephoto wildlife camera lens and binoculars mounted on a safari jeep"
                    fallbackLabel="Photography Rig & Optics"
                    className="w-full h-44 md:h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="rounded-lg bg-charcoal-elevated border border-sage-green/40 p-4 flex flex-col gap-1">
                  <AnimatedSightingStat />
                  <span className="font-body text-[13px] leading-[20px] text-text-muted-dark">
                    Leopard sighting rate on Full-Day drives
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Key Value Propositions */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="flex flex-col gap-2"
            >
              <span className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
                The Leapordsee Standard
              </span>
              <h2 className="font-display text-[30px] leading-[36px] md:text-[48px] md:leading-[56px] tracking-[-0.5px] font-semibold text-on-jungle-charcoal text-balance">
                Built for Quiet Encounters &amp; Crisp Frames
              </h2>
              <p className="font-body text-[15px] leading-[24px] text-text-muted-dark text-pretty">
                We never race through convoy trails. Every vehicle, route, and tracker is dedicated to ethical, unhurried wildlife observation.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: BadgeCheck,
                  title: 'Certified Wildlife Trackers',
                  desc: 'Veteran naturalists trained in alarm-call reading, pugmark analysis, and Yala leopard territories.',
                },
                {
                  icon: Camera,
                  title: 'Custom Photography-Ready Jeeps',
                  desc: 'Open-top 4x4s fitted with gimbal mounts, beanbag rails, dual charging ports, and silent-idle tuning.',
                },
                {
                  icon: Leaf,
                  title: 'Ethical & Eco-Friendly Tracking',
                  desc: 'Strict zero-crowding distance rules, plastic-free bush picnics, and local conservation support.',
                },
                {
                  icon: Car,
                  title: 'Flexible Hotel Pickups in Tissamaharama & Yala',
                  desc: 'Complimentary door-to-door transfers from boutique lodges in Tissamaharama & Yala buffer zones.',
                },
              ].map((prop, idx) => {
                const IconComponent = prop.icon;
                return (
                  <motion.div
                    key={prop.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.07, ease: EASE_OUT }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-charcoal-elevated/70 border border-charcoal-muted hover:border-sage-green/60 transition-colors duration-150"
                  >
                    <IconComponent
                      className="w-6 h-6 text-leopard-amber shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-title text-[17px] leading-[24px] font-semibold text-on-jungle-charcoal">
                        {prop.title}
                      </h3>
                      <p className="font-body text-[13px] leading-[20px] text-text-muted-dark text-pretty">
                        {prop.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wildlife Sightings Gallery (Asymmetrical Bento-Grid on Warm Sand #F7F5F0) */}
      <section id="wildlife" className="bg-warm-sand text-on-warm-sand py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[260px]">
            {WILDLIFE_SPECIES.map((species, idx) => (
              <motion.button
                key={species.id}
                type="button"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE_OUT }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
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
                  <h3 className={`${species.titleClass} transition-transform duration-200 ease-out group-hover:translate-x-0.5`}>
                    {species.commonName}
                  </h3>
                  {species.id === 'leopard' && (
                    <p className="font-body text-[13px] leading-[20px] text-on-jungle-charcoal/90">
                      {species.summary}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Traveler Testimonials & Interactive Review Box */}
      <GuestReviewSection />
    </>
  );
}
