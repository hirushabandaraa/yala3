import { motion } from 'motion/react';

interface BrandMarkProps {
  className?: string;
}

interface BrandWordmarkProps {
  className?: string;
  showSubtitle?: boolean;
}

const BRAND_LETTERS = Array.from('Leapordsee Yala');

export function BrandMark({ className = 'w-[74px] h-10 shrink-0' }: BrandMarkProps) {
  return (
    <motion.span
      className={`inline-flex items-center justify-center bg-transparent ${className}`}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <img
        src="/assets/aistudio/leopardsee_logo_trimmed.png"
        alt="LeopardSee Yala logo"
        className="w-full h-full object-contain drop-shadow-[0_1px_6px_rgba(247,245,240,0.28)]"
      />
    </motion.span>
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
