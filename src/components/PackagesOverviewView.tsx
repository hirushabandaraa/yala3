import { Star, ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_IMAGE, SafariPackage } from '../data/safariData';
import { ResilientImage } from './ResilientImage';

interface PackagesOverviewViewProps {
  onBackHome: () => void;
  onOpenBooking: (packageId: SafariPackage['id']) => void;
  onSelectPackageDetail: (packageId: SafariPackage['id']) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface SafariOptionCard {
  id: string;
  title: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  badge?: string;
  actionType: 'booking' | 'detail';
  targetPackageId: SafariPackage['id'];
}

const SAFARI_OPTION_CARDS: SafariOptionCard[] = [
  {
    id: 'half-day',
    title: 'Half Day',
    duration: '5 Hours',
    originalPrice: 30,
    discountedPrice: 15,
    badge: 'Most Popular',
    actionType: 'booking',
    targetPackageId: 'morning',
  },
  {
    id: 'seven-hours',
    title: '7 Hours',
    duration: '6–7 Hours',
    originalPrice: 42,
    discountedPrice: 21,
    actionType: 'booking',
    targetPackageId: 'sunset',
  },
  {
    id: 'full-day',
    title: 'Full Day',
    duration: '10–12 Hours',
    originalPrice: 92,
    discountedPrice: 46,
    actionType: 'detail',
    targetPackageId: 'full-day',
  },
];

export function PackagesOverviewView({
  onBackHome,
  onOpenBooking,
  onSelectPackageDetail,
}: PackagesOverviewViewProps) {
  const handleCardClick = (card: SafariOptionCard) => {
    if (card.actionType === 'detail') {
      onSelectPackageDetail(card.targetPackageId);
    } else {
      onOpenBooking(card.targetPackageId);
    }
  };

  return (
    <section className="bg-warm-sand text-on-warm-sand pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left 7 Columns: Copy, Tour Cards, Trust Bar */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="flex items-center gap-2 text-[13px] leading-[20px]"
          >
            <button
              type="button"
              onClick={onBackHome}
              className="font-body text-text-muted-light hover:text-on-warm-sand transition-colors duration-150 cursor-pointer"
            >
              Home
            </button>
            <span className="text-text-muted-light" aria-hidden="true">
              /
            </span>
            <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-sage-green">
              Yala Safari
            </span>
          </motion.nav>

          {/* Trust & Season Promo Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-jungle-charcoal text-on-jungle-charcoal font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold tabular-nums">
              <Star
                className="w-3.5 h-3.5 fill-leopard-amber text-leopard-amber shrink-0"
                aria-hidden="true"
              />
              <span>4.9 · 10,000+ reviews</span>
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-amber-tint text-on-leopard-amber font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold">
              50% off the 2027 season
            </span>
            <span className="font-label text-[11px] leading-[16px] font-medium text-text-muted-light uppercase tracking-widest pl-1">
              Since 1987
            </span>
          </motion.div>

          {/* Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT }}
            className="font-display text-[32px] leading-[38px] tracking-[-0.5px] md:text-[64px] md:leading-[72px] md:tracking-[-1px] font-bold text-on-warm-sand text-balance"
          >
            Yala safari jeep tours, where{' '}
            <em className="italic underline decoration-leopard-amber decoration-4 underline-offset-4">
              leopards
            </em>{' '}
            run the show
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE_OUT }}
            className="font-body text-[16px] leading-[26px] text-text-muted-light max-w-2xl text-pretty"
          >
            Yala National Park safari tours in an open 4x4, tracking Sri Lanka&apos;s leopards with
            licensed expert guides — free hotel pickup, honest direct pricing and instant
            confirmation. Half-day, 7-hour and full-day Yala jeep safari options; pick one below
            and you&apos;re two minutes from booked.
          </motion.p>

          {/* 3 Horizontal Safari Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {SAFARI_OPTION_CARDS.map((card, idx) => (
              <motion.button
                key={card.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.06, ease: EASE_OUT }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleCardClick(card)}
                className="group relative text-left bg-sand-elevated text-on-sand-elevated rounded-lg border border-sand-muted hover:border-leopard-amber p-4 pt-6 flex flex-col justify-between gap-4 transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber"
              >
                {card.badge && (
                  <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded bg-jungle-charcoal text-on-jungle-charcoal font-label text-[11px] leading-[16px] font-semibold uppercase tracking-wider whitespace-nowrap">
                    {card.badge}
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  <h2 className="font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated">
                    {card.title}
                  </h2>
                  <p className="font-body text-[13px] leading-[20px] text-text-muted-light">
                    {card.duration}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-2 w-full">
                  <div className="flex flex-col">
                    <span className="font-body text-[13px] leading-[20px] text-text-muted-light line-through tabular-nums">
                      ${card.originalPrice}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-[28px] leading-[36px] font-semibold text-amber-hover tabular-nums">
                        ${card.discountedPrice}
                      </span>
                      <span className="font-body text-[13px] leading-[20px] text-text-muted-light">
                        /pp
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-leopard-amber text-on-leopard-amber group-hover:bg-amber-hover transition-colors duration-150 shrink-0">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Trust Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-6 pt-1 text-[13px] leading-[20px]"
          >
            <div className="flex items-center gap-1.5 text-on-warm-sand">
              <Check className="w-4 h-4 text-amber-hover shrink-0" aria-hidden="true" />
              <span className="font-body">Licensed trackers</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-warm-sand">
              <Check className="w-4 h-4 text-amber-hover shrink-0" aria-hidden="true" />
              <span className="font-body">Free hotel pickup</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-warm-sand">
              <Check className="w-4 h-4 text-amber-hover shrink-0" aria-hidden="true" />
              <span className="font-body">Free cancellation</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectPackageDetail('full-day')}
              className="inline-flex items-center gap-1.5 text-sage-green underline decoration-leopard-amber decoration-2 underline-offset-4 hover:text-on-warm-sand transition-colors duration-150 cursor-pointer group"
            >
              <span className="font-label text-[14px] leading-[20px] font-semibold">
                Compare tours
              </span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </motion.div>
        </div>

        {/* Right 5 Columns: Leopard Portrait with Promo & Rating Badges */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE_OUT }}
          className="lg:col-span-5 relative pt-4 lg:pt-0"
        >
          {/* Top-Left Angled Promo Badge */}
          <div className="absolute -top-2 -left-3 z-20 -rotate-6 rounded-md bg-leopard-amber text-on-leopard-amber px-4 py-2 border border-warm-sand shadow-md">
            <p className="font-headline text-[20px] leading-none font-semibold">50% off</p>
            <p className="font-label text-[11px] leading-[16px] font-semibold uppercase tracking-wider mt-0.5">
              2027 Season
            </p>
          </div>

          {/* Leopard Portrait Frame */}
          <div className="relative rounded-xl overflow-hidden border border-sand-muted bg-jungle-charcoal">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Close-up portrait of a Sri Lankan leopard resting on a granite boulder in Yala National Park"
              fallbackLabel="Sri Lankan Leopard · Yala"
              className="w-full h-[500px] md:h-[580px] object-cover"
            />
          </div>

          {/* Bottom-Left Floating Review Card */}
          <div className="relative sm:absolute sm:bottom-6 sm:left-6 z-20 mt-4 sm:mt-0 w-fit rounded-lg bg-sand-elevated text-on-sand-elevated border border-sand-muted p-4 flex flex-col gap-1 shadow-lg">
            <div className="flex items-center gap-1 text-leopard-amber" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Star
                  key={starNum}
                  className="w-4 h-4 fill-leopard-amber text-leopard-amber"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="font-label text-[14px] leading-[20px] font-semibold text-on-sand-elevated">
              Rated 4.9 by 10,000+ travellers
            </p>
            <p className="font-body text-[13px] leading-[20px] text-text-muted-light">
              GetYourGuide · Viator · TripAdvisor
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
