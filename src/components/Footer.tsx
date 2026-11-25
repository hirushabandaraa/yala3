import { useState, FormEvent } from 'react';
import { MapPin, Mail, MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandMark, BrandWordmark } from './BrandMark';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenWhatsAppConcierge: () => void;
  onOpenContact: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Footer({
  onNavigateSection,
  onOpenWhatsAppConcierge,
  onOpenContact,
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      id="footer"
      className="bg-jungle-charcoal text-on-jungle-charcoal border-t border-charcoal-muted pt-12 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-charcoal-muted">
          {/* Brand + Direct Contact & WhatsApp Booking */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BrandMark className="w-7 h-7 text-leopard-amber shrink-0" />
              <BrandWordmark className="font-headline text-[20px] leading-[28px] font-semibold text-on-jungle-charcoal" />
            </div>
            <p className="font-body text-[13px] leading-[20px] tracking-[0.1px] text-text-muted-dark max-w-xs text-pretty">
              Private eco-luxury jeep safaris and ethical leopard tracking across Yala National Park, Sri Lanka.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                onClick={onOpenContact}
                className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-leopard-amber text-on-leopard-amber hover:bg-amber-hover transition-colors duration-150 ease-out cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold">
                  Contact Us
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                onClick={onOpenWhatsAppConcierge}
                className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-charcoal-elevated border border-sage-green/60 hover:border-leopard-amber transition-colors duration-150 ease-out cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-leopard-amber" aria-hidden="true" />
                <span className="font-label text-[12px] leading-[16px] tracking-[0.4px] font-semibold text-on-charcoal-elevated">
                  WhatsApp Desk
                </span>
              </motion.button>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
              Explore
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('safaris')}
                  className="font-body text-[13px] leading-[20px] text-text-muted-dark hover:text-on-jungle-charcoal transition-colors duration-150 cursor-pointer"
                >
                  Safaris
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('wildlife')}
                  className="font-body text-[13px] leading-[20px] text-text-muted-dark hover:text-on-jungle-charcoal transition-colors duration-150 cursor-pointer"
                >
                  Wildlife Sightings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('packages')}
                  className="font-body text-[13px] leading-[20px] text-text-muted-dark hover:text-on-jungle-charcoal transition-colors duration-150 cursor-pointer"
                >
                  Safari Packages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('about')}
                  className="font-body text-[13px] leading-[20px] text-text-muted-dark hover:text-on-jungle-charcoal transition-colors duration-150 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="font-body text-[13px] leading-[20px] text-text-muted-dark hover:text-on-jungle-charcoal transition-colors duration-150 cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Basecamp & Direct Contacts */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
              Contact Us
            </h3>
            <div className="flex flex-col gap-2 text-[13px] leading-[20px] text-text-muted-dark">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
                <a
                  href="tel:+94740361590"
                  className="hover:text-on-jungle-charcoal transition-colors tabular-nums"
                >
                  Hirusha - 074 036 1590
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-leopard-amber shrink-0" aria-hidden="true" />
                <a
                  href="tel:+94769008795"
                  className="hover:text-on-jungle-charcoal transition-colors tabular-nums"
                >
                  Nevith - 076 900 8795
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-sage-green shrink-0 mt-0.5" aria-hidden="true" />
                <span>Palatupana Road, Tissamaharama 82600, Yala National Park, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-green shrink-0" aria-hidden="true" />
                <a
                  href="mailto:concierge@leapordseeyala.lk"
                  className="hover:text-on-jungle-charcoal transition-colors"
                >
                  concierge@leapordseeyala.lk
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenWhatsAppConcierge();
                }}
                aria-label="Instagram"
                className="text-text-muted-dark hover:text-leopard-amber transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenWhatsAppConcierge();
                }}
                aria-label="YouTube"
                className="text-text-muted-dark hover:text-leopard-amber transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="4" />
                  <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenWhatsAppConcierge();
                }}
                aria-label="Facebook"
                className="text-text-muted-dark hover:text-leopard-amber transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Field Notes Newsletter */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
              Field Notes
            </h3>
            <p className="font-body text-[13px] leading-[20px] text-text-muted-dark">
              Monthly leopard sighting reports and seasonal Yala block openings.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <label className="flex flex-col gap-1">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  name="newsletter-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (subscribed) setSubscribed(false);
                  }}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded bg-charcoal-elevated border border-charcoal-muted px-4 py-2.5 text-[13px] leading-[20px] text-on-charcoal-elevated placeholder:text-text-muted-dark/60 focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none transition-colors duration-150 ease-out"
                />
              </label>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover transition-colors duration-150 ease-out cursor-pointer"
              >
                <span>Subscribe</span>
              </motion.button>
              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="font-body text-[13px] leading-[20px] text-leopard-amber"
                  >
                    Subscribed to Yala Field Notes.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] leading-[20px] text-text-muted-dark">
          <p>© 2026 Leapordsee Yala. All rights reserved.</p>
          <p>Licensed Yala National Park Safari Operator</p>
        </div>
      </div>
    </footer>
  );
}
