import { motion } from 'motion/react';

interface BrandMarkProps {
  className?: string;
}

interface BrandWordmarkProps {
  className?: string;
  showSubtitle?: boolean;
}

const TOE_PADS = [
  { cx: 11.5, cy: 13.5, delay: 0 },
  { cx: 15.8, cy: 10.8, delay: 0.2 },
  { cx: 20.2, cy: 10.8, delay: 0.4 },
  { cx: 24.5, cy: 13.5, delay: 0.6 },
];

const BRAND_LETTERS = Array.from('Leapordsee Yala');

export function BrandMark({ className = 'w-8 h-8 text-leopard-amber shrink-0' }: BrandMarkProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Base outer ring */}
      <circle
        cx="18"
        cy="18"
        r="16.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.35"
      />

      {/* Continuous rotating tracking arc */}
      <motion.circle
        cx="18"
        cy="18"
        r="16.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="24 80"
        style={{ transformOrigin: '18px 18px' }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Main paw pad */}
      <motion.path
        d="M12 22.5C12 18.5 14.8 15.5 18 15.5C21.2 15.5 24 18.5 24 22.5C24 24.4 22.4 25.5 20.5 25.5C19.3 25.5 18.6 24.9 18 24.9C17.4 24.9 16.7 25.5 15.5 25.5C13.6 25.5 12 24.4 12 22.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ transformOrigin: '18px 20.5px' }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Staggered pulsing toe pads */}
      {TOE_PADS.map((toe) => (
        <motion.circle
          key={`${toe.cx}-${toe.cy}`}
          cx={toe.cx}
          cy={toe.cy}
          r="1.6"
          fill="currentColor"
          style={{ transformOrigin: `${toe.cx}px ${toe.cy}px` }}
          animate={{
            scale: [1, 1.28, 1],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 2.8,
            delay: toe.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.svg>
  );
}

export function BrandWordmark({
  className = 'font-headline text-[17px] leading-none font-semibold tracking-tight text-on-jungle-charcoal',
  showSubtitle = false,
}: BrandWordmarkProps) {
  return (
    <span className="flex flex-col">
      <span className={className} aria-label="Leapordsee Yala">
        {BRAND_LETTERS.map((char, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="inline-block"
            animate={{
              y: [0, -1.5, 0],
              color: ['#F7F5F0', '#D99B26', '#F7F5F0'],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3.6,
              delay: index * 0.08,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
      {showSubtitle && (
        <motion.span
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="font-label text-[11px] leading-[16px] font-medium text-leopard-amber tracking-widest uppercase"
        >
          Sri Lanka
        </motion.span>
      )}
    </span>
  );
}
