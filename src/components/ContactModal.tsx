import { useState, useEffect } from 'react';
import { X, Phone, Copy, Check, MessageCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsAppConcierge: (prefillMessage?: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const CONTACTS = [
  {
    name: 'Hirusha',
    role: 'Safari Operations & Lead Coordinator',
    displayPhone: '074 036 1590',
    telHref: 'tel:+94740361590',
  },
  {
    name: 'Nevith',
    role: 'Senior Tracker & Jeep Dispatch',
    displayPhone: '076 900 8795',
    telHref: 'tel:+94769008795',
  },
];

export function ContactModal({
  isOpen,
  onClose,
  onOpenWhatsAppConcierge,
}: ContactModalProps) {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setCopiedPhone(null);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleCopy = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone.replace(/\s+/g, ''));
      setCopiedPhone(phone);
      window.setTimeout(() => setCopiedPhone(null), 2000);
    } catch {
      setCopiedPhone(phone);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jungle-charcoal/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="w-full max-w-lg rounded-lg bg-warm-sand text-on-warm-sand border border-sand-muted overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="bg-jungle-charcoal text-on-jungle-charcoal px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-widest">
                  Direct Basecamp Desk
                </span>
                <h2
                  id="contact-modal-heading"
                  className="font-headline text-[26px] leading-[32px] font-semibold text-on-jungle-charcoal"
                >
                  Contact Us
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Close contact dialog"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-charcoal-muted bg-charcoal-elevated text-on-charcoal-elevated hover:border-leopard-amber transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </header>

            <div className="p-6 flex flex-col gap-4">
              <p className="font-body text-[14px] leading-[22px] text-text-muted-light">
                Reach our Tissamaharama &amp; Yala safari coordinators directly by phone or WhatsApp for jeep charters, lodge pickups, and real-time block updates.
              </p>

              <div className="flex flex-col gap-3">
                {CONTACTS.map((person, idx) => {
                  const isCopied = copiedPhone === person.displayPhone;
                  return (
                    <motion.div
                      key={person.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.06, ease: EASE_OUT }}
                      className="rounded-lg bg-sand-elevated border border-sand-muted p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-title text-[17px] leading-[24px] font-semibold text-on-sand-elevated">
                          {person.name}
                        </span>
                        <span className="font-body text-[12px] leading-[18px] text-text-muted-light">
                          {person.role}
                        </span>
                        <span className="font-label text-[15px] leading-[22px] font-semibold text-sage-green tabular-nums pt-0.5">
                          {person.displayPhone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(person.displayPhone)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-sand-muted bg-warm-sand text-on-warm-sand font-label text-[12px] font-semibold hover:border-sage-green transition-colors cursor-pointer"
                          aria-label={`Copy ${person.name} phone number`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-sage-green" aria-hidden="true" />
                              <span className="text-sage-green">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <a
                          href={person.telHref}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-leopard-amber text-on-leopard-amber font-label text-[12px] font-semibold hover:bg-amber-hover transition-colors whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call</span>
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="rounded bg-sand-muted/70 px-4 py-3 flex items-start gap-2.5 text-[13px] leading-[20px] text-text-muted-light">
                <MapPin className="w-4 h-4 text-sage-green shrink-0 mt-0.5" aria-hidden="true" />
                <span>Palatupana Road, Tissamaharama 82600, Yala National Park, Sri Lanka</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-sage-green text-on-warm-sand font-label text-[14px] font-semibold hover:bg-sage-green hover:text-on-sage-green transition-colors cursor-pointer"
                >
                  Close
                </button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    onOpenWhatsAppConcierge(
                      'Hello Hirusha & Nevith, I would like to inquire about a private safari at Yala National Park.'
                    );
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-jungle-charcoal text-on-jungle-charcoal font-label text-[14px] font-semibold hover:bg-charcoal-elevated transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-leopard-amber" aria-hidden="true" />
                  <span>Message on WhatsApp</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
