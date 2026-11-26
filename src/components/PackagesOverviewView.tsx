import { useState } from 'react';
import { CheckCircle2, Sparkles, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MODAL_BACKDROP_IMAGE,
  SafariPackage,
} from '../data/safariData';
import { BookingModalPrefill } from './BookingModal';
import { ResilientImage } from './ResilientImage';

interface PackagesOverviewViewProps {
  onBackHome: () => void;
  onOpenBooking: (prefill: Partial<BookingModalPrefill>) => void;
}

type DurationFilter = 'all' | 'half-day' | 'full-day';

interface EditorialPackageCard {
  id: string;
  filterCategory: 'half-day' | 'mid-day' | 'full-day';
  targetPackageId: SafariPackage['id'];
  badgeText: string;
  signatureTag?: string;
  title: string;
  startingPrice: number;
  quote: string;
  image: string;
  imageAlt: string;
  imageFocusClass: string;
  includedItems: string[];
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const EDITORIAL_PACKAGES: EditorialPackageCard[] = [
  {
    id: 'golden-hour',
    filterCategory: 'half-day',
    targetPackageId: 'morning',
    badgeText: '4 Hours | Morning & Evening Safari',
    title: 'Golden Hour Safari',
    startingPrice: 53,
    quote: '"Golden light at dawn and dusk, when the wild wakes up."',
    image: '/assets/aistudio/images-3_396de6bf.jpeg',
    imageAlt: 'Close-up portrait of a wild Sri Lankan leopard in Yala National Park',
    imageFocusClass: 'object-[center_25%]',
    includedItems: [
      'Free hotel pickup',
      '4x4 luxury Jeep & park entry tickets.',
      'Experienced tracker with wildlife insights',
      'Binoculars provided',
      'Breakfast & refreshments included',
    ],
  },
  {
    id: 'first-light-midday',
    filterCategory: 'mid-day',
    targetPackageId: 'sunset',
    badgeText: '7 Hours | Dawn to Noon Safari',
    signatureTag: 'Signature Expedition',
    title: 'First light to Mid-day Safari',
    startingPrice: 58,
    quote:
      '"Extra hours until noon give you more time to track elusive wildlife and chase rare sightings"',
    image: '/assets/aistudio/snapgram.io_qry8aalwq0w8_5da6d0e9.jpg',
    imageAlt: 'Sri Lankan sloth bear walking along a sandy track in Yala National Park',
    imageFocusClass: 'object-[center_55%]',
    includedItems: [
      'Free hotel pickup',
      '4x4 luxury Jeep & park entry tickets.',
      'Experienced tracker with wildlife insights',
      'Binoculars provided',
      'Breakfast & refreshments included',
    ],
  },
  {
    id: 'ultimate-full-day',
    filterCategory: 'full-day',
    targetPackageId: 'full-day',
    badgeText: '12 Hours | Deep Jungle Expedition',
    title: 'Ultimate Full-Day Safari',
    startingPrice: 69,
    quote:
      '"No rush, no limits-spend dawn to dusk exploring deep terrain and rare wildlife territories"',
    image: '/assets/aistudio/snapgram.io_7e5ofjqyy9bx_ea92b445.jpg',
    imageAlt: 'Sri Lankan leopard peeking over a mossy branch in Yala National Park',
    imageFocusClass: 'object-[center_45%]',
    includedItems: [
      'Free hotel pickup',
      '4x4 luxury Jeep & park entry tickets.',
      'Experienced tracker with wildlife insights',
      'Binoculars provided',
      'Breakfast, Lunch & Refreshments included',
    ],
  },
];

const FILTER_OPTIONS: { id: DurationFilter; label: string }[] = [
  { id: 'all', label: 'All Expeditions' },
  { id: 'half-day', label: 'Half-Day (4 Hours)' },
  { id: 'full-day', label: 'Full-Day (12 Hours)' },
];

const SPARKLE_STARS = [
  { className: '-top-2 -right-3 w-3.5 h-3.5', delay: 0, duration: 1.9 },
  { className: '-top-2.5 left-12 w-2.5 h-2.5', delay: 0.65, duration: 2.2 },
  { className: '-bottom-1 right-6 w-2.5 h-2.5', delay: 1.2, duration: 2.0 },
] as const;

function SparklePackageTitle({
  title,
  staggerOffset = 0,
}: {
  title: string;
  staggerOffset?: number;
}) {
  const words = title.split(' ');
  return (
    <h2
      aria-label={title}
      className="relative inline-block font-headline text-[28px] leading-[36px] font-semibold"
    >
      <span className="inline-flex flex-wrap items-center gap-x-[0.22em]">
        {words.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            aria-hidden="true"
            className="inline-block will-change-transform"
            animate={{
              y: [0, -2.5, 0],
              color: ['#D99B26', '#F4C14E', '#C08508', '#D99B26'],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2.8,
              delay: staggerOffset + idx * 0.18,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: 'easeInOut',
            }}
          >
            {word}
          </motion.span>
        ))}

        <motion.span
          aria-hidden="true"
          className="inline-flex items-center text-leopard-amber shrink-0"
          animate={{
            opacity: [0.35, 1, 0.25, 1, 0.35],
            scale: [0.8, 1.2, 0.85, 1.15, 0.8],
            rotate: [0, 14, -8, 10, 0],
          }}
          transition={{
            duration: 2.4,
            delay: staggerOffset,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.span>
      </span>

      {SPARKLE_STARS.map((star, idx) => (
        <motion.svg
          key={idx}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`pointer-events-none absolute text-leopard-amber ${star.className}`}
          animate={{
            opacity: [0, 1, 0.15, 0.95, 0],
            scale: [0.4, 1.25, 0.65, 1.1, 0.4],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: star.duration,
            delay: staggerOffset + star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path d="M12 1L14.6 9.4L23 12L14.6 14.6L12 23L9.4 14.6L1 12L9.4 9.4L12 1Z" />
        </motion.svg>
      ))}
    </h2>
  );
}

export function PackagesOverviewView({
  onBackHome,
  onOpenBooking,
}: PackagesOverviewViewProps) {
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');

  const visiblePackages = EDITORIAL_PACKAGES.filter((pkg) => {
    if (durationFilter === 'all') return true;
    return pkg.filterCategory === durationFilter;
  });

  const handleBookPackage = (
    pkg: EditorialPackageCard,
    charterType: 'Sharing Safari' | 'Private Safari'
  ) => {
    onOpenBooking({
      packageId: pkg.targetPackageId,
      charterType,
      tierLabel: pkg.title,
      sharingPrice: pkg.startingPrice,
    });
  };

  return (
    <div className="flex flex-col">
      {/* 1. Editorial Dark Hero Header with Prominent Leopard Photo & Blurred Jungle Backdrop */}
      <section className="relative bg-jungle-charcoal text-on-jungle-charcoal overflow-hidden border-b border-charcoal-muted py-12 md:py-16">
        <ResilientImage
          src={MODAL_BACKDROP_IMAGE}
          alt="Yala National Park lush dry-zone jungle canopy at dawn"
          fallbackLabel="Yala Canopy"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 opacity-35"
        />
        <div className="absolute inset-0 bg-jungle-charcoal/70" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Columns: Breadcrumb, Title, Subtitle, Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="lg:col-span-7 flex flex-col items-start text-left gap-4"
          >
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] leading-[20px]">
              <button
                type="button"
                onClick={onBackHome}
                className="font-body text-text-muted-dark hover:text-leopard-amber transition-colors duration-150 cursor-pointer"
              >
                Home
              </button>
              <span className="text-text-muted-dark" aria-hidden="true">
                /
              </span>
              <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-leopard-amber">
                Safari Packages
              </span>
            </nav>

            <h1 className="font-display text-[32px] leading-[38px] tracking-[-0.5px] md:text-[64px] md:leading-[72px] md:tracking-[-1px] font-bold text-on-jungle-charcoal text-balance">
              Stop waiting on your desire-go for it now!!!
            </h1>

            <p className="font-body text-[16px] leading-[26px] text-text-muted-dark max-w-xl text-pretty">
              Every charter includes a custom-modified open-top 4x4, a certified senior leopard
              tracker, and complimentary hotel pickup across Tissamaharama and Yala.
            </p>

            {/* Interactive Duration Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE_OUT }}
              className="flex flex-wrap items-center gap-2 pt-2"
              role="tablist"
              aria-label="Filter safari packages by duration"
            >
              {FILTER_OPTIONS.map((option, idx) => {
                const isActive = durationFilter === option.id;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 14, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.18 + idx * 0.08, ease: EASE_OUT }}
                  >
                    <motion.button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setDurationFilter(option.id)}
                      animate={{ y: [0, -2.5, 0] }}
                      transition={{
                        y: {
                          duration: 3.2,
                          delay: idx * 0.28,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      whileHover={{ scale: 1.04, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative px-4 py-2 rounded-full font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'text-on-leopard-amber'
                          : 'bg-charcoal-elevated border border-charcoal-muted text-on-charcoal-elevated hover:border-leopard-amber'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="packages-filter-active-pill"
                          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                          className="absolute inset-0 rounded-full bg-leopard-amber"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{option.label}</span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right 5 Columns: Prominent Leopard Photo */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
                boxShadow: [
                  '0 14px 32px -12px rgba(217, 155, 38, 0.16)',
                  '0 22px 42px -12px rgba(217, 155, 38, 0.32)',
                  '0 14px 32px -12px rgba(217, 155, 38, 0.16)',
                ],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25, ease: EASE_OUT } }}
              className="relative rounded-lg overflow-hidden border border-charcoal-muted bg-charcoal-elevated will-change-transform"
            >
              <div className="w-full h-80 md:h-96 overflow-hidden">
                <motion.div
                  className="w-full h-full will-change-transform"
                  animate={{
                    scale: [1.01, 1.08, 1.03, 1.01],
                    x: ['0%', '-1.2%', '0.6%', '0%'],
                    y: ['0%', '-0.8%', '0.4%', '0%'],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ResilientImage
                    src="/assets/aistudio/panthera_header.jpg"
                    alt="Sri Lankan leopard resting on a mossy branch in Yala National Park"
                    fallbackLabel="Panthera pardus kotiya · Yala Block 1"
                    className="w-full h-full object-cover object-[58%_45%]"
                  />
                </motion.div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-jungle-charcoal/90 p-4 flex items-center justify-between gap-2">
                <span className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-wider">
                  Panthera pardus kotiya
                </span>
                <span className="font-body text-[13px] leading-[20px] text-on-jungle-charcoal">
                  Yala Block 1
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. 3-Column Safari Package Grid (Warm Sand #F7F5F0) */}
      <section className="bg-warm-sand text-on-warm-sand py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div id="packages-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              {visiblePackages.map((pkg, idx) => (
                <motion.div
                  key={`${pkg.id}-${durationFilter}`}
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
                  exit={{ opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.18, ease: EASE_OUT } }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.65, delay: idx * 0.12, ease: EASE_OUT }}
                  className="flex"
                >
                  <motion.article
                    animate={{
                      y: [0, -6, 0],
                      boxShadow: [
                        '0 10px 24px -10px rgba(217, 155, 38, 0.14)',
                        '0 18px 34px -10px rgba(217, 155, 38, 0.30)',
                        '0 10px 24px -10px rgba(217, 155, 38, 0.14)',
                      ],
                    }}
                    transition={{
                      y: {
                        duration: 4.4,
                        delay: idx * 0.45,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      boxShadow: {
                        duration: 4.4,
                        delay: idx * 0.45,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    whileHover={{ y: -9, transition: { duration: 0.22, ease: EASE_OUT } }}
                    className="flex-1 bg-sand-elevated text-on-sand-elevated rounded-lg border-2 border-leopard-amber overflow-hidden flex flex-col justify-between will-change-transform"
                  >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-charcoal-muted">
                    <ResilientImage
                      src={pkg.image}
                      alt={pkg.imageAlt}
                      fallbackLabel={pkg.title}
                      className={`w-full h-full object-cover ${pkg.imageFocusClass} hover:scale-105 transition-transform duration-300 ease-out`}
                    />
                    {pkg.signatureTag && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-leopard-amber text-on-leopard-amber font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold">
                        <Zap className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        <span>{pkg.signatureTag}</span>
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <header className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-tint text-sage-green border border-sage-green/20 font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold">
                          {pkg.badgeText}
                        </span>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <SparklePackageTitle title={pkg.title} staggerOffset={idx * 0.35} />
                        <div className="flex flex-col items-end text-right shrink-0 self-start -translate-y-1">
                          <span className="font-label text-[11px] leading-[16px] font-bold text-on-sand-elevated uppercase tracking-wider">
                            Starts from
                          </span>
                          <span className="font-headline text-[36px] leading-[40px] font-bold text-on-sand-elevated tabular-nums">
                            ${pkg.startingPrice}
                          </span>
                        </div>
                      </div>
                    </header>

                    <p className="font-serif-quote italic text-[20px] leading-[28px] font-bold text-on-sand-elevated text-pretty">
                      {pkg.quote}
                    </p>

                    <div className="flex flex-col gap-2">
                      <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-bold text-on-sand-elevated">
                        This package included:
                      </span>
                      <ul className="flex flex-col gap-2 text-[13px] leading-[20px] font-bold text-on-sand-elevated">
                        {pkg.includedItems.map((item) => (
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
                </div>

                <footer className="px-6 pb-6 pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookPackage(pkg, 'Sharing Safari')}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded bg-leopard-amber text-on-leopard-amber font-cta text-[17px] leading-[24px] font-bold tracking-wider hover:bg-amber-hover transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber"
                  >
                    <span>Sharing Safari</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookPackage(pkg, 'Private Safari')}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded bg-leopard-amber text-on-leopard-amber font-cta text-[17px] leading-[24px] font-bold tracking-wider hover:bg-amber-hover transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber"
                  >
                    <span>Private Safari</span>
                  </button>
                  </footer>
                  </motion.article>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Expedition Comparison Table (Sand Muted Band) */}
      <section className="bg-sand-muted text-on-warm-sand py-12 border-t border-sand-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col gap-1 mb-6">
            <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green uppercase tracking-widest">
              At a Glance
            </span>
            <h2 className="font-headline text-[26px] leading-[32px] md:text-[36px] md:leading-[44px] font-semibold text-on-warm-sand">
              Compare Safari Expeditions
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg border border-sand-muted bg-sand-elevated">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-jungle-charcoal text-on-jungle-charcoal">
                  <th className="p-4 font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold uppercase">
                    Feature
                  </th>
                  <th className="p-4 font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold uppercase">
                    Morning Safari
                  </th>
                  <th className="p-4 font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold uppercase text-leopard-amber">
                    Full-Day Tracker
                  </th>
                  <th className="p-4 font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold uppercase">
                    Sunset Drive
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-muted text-[13px] leading-[20px]">
                <tr>
                  <td className="p-4 font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                    Duration
                  </td>
                  <td className="p-4 text-text-muted-light">4 Hours (5:30 AM)</td>
                  <td className="p-4 text-on-sand-elevated font-medium">
                    12 Hours (5:30 AM – 6:00 PM)
                  </td>
                  <td className="p-4 text-text-muted-light">4 Hours (2:30 PM)</td>
                </tr>
                <tr>
                  <td className="p-4 font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                    Park Zones
                  </td>
                  <td className="p-4 text-text-muted-light">Block 1 Coastal</td>
                  <td className="p-4 text-on-sand-elevated font-medium">Block 1 &amp; Block 5</td>
                  <td className="p-4 text-text-muted-light">Block 1 Lagoons</td>
                </tr>
                <tr>
                  <td className="p-4 font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                    Meals &amp; Drinks
                  </td>
                  <td className="p-4 text-text-muted-light">Ceylon Tea &amp; Fruit</td>
                  <td className="p-4 text-on-sand-elevated font-medium">
                    Bush Breakfast &amp; Riverside Lunch
                  </td>
                  <td className="p-4 text-text-muted-light">Sundowner Cooler</td>
                </tr>
                <tr>
                  <td className="p-4 font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
                    Private Jeep Rate
                  </td>
                  <td className="p-4 font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated tabular-nums">
                    $145
                  </td>
                  <td className="p-4 font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated tabular-nums">
                    $290
                  </td>
                  <td className="p-4 font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated tabular-nums">
                    $140
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
