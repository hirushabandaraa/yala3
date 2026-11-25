import { useState, useEffect, FormEvent } from 'react';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppConciergeModalProps {
  isOpen: boolean;
  initialMessage?: string;
  onClose: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function WhatsAppConciergeModal({
  isOpen,
  initialMessage,
  onClose,
}: WhatsAppConciergeModalProps) {
  const [guestContact, setGuestContact] = useState('');
  const [message, setMessage] = useState(
    'Hello Leapordsee Yala, I would like to check private 4x4 jeep availability for Yala Block 1.'
  );
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSent(false);
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-concierge-heading"
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
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-leopard-amber shrink-0" aria-hidden="true" />
                <div>
                  <h2
                    id="whatsapp-concierge-heading"
                    className="font-headline text-[22px] leading-[28px] font-semibold text-on-jungle-charcoal"
                  >
                    Tracker WhatsApp Desk
                  </h2>
                  <p className="font-body text-[12px] leading-[16px] text-text-muted-dark">
                    Direct line · Palatupana Basecamp (+94 77 412 8900)
                  </p>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Close WhatsApp concierge"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-charcoal-muted bg-charcoal-elevated text-on-charcoal-elevated hover:border-leopard-amber transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </header>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Your WhatsApp Number or Email
                </span>
                <input
                  type="text"
                  value={guestContact}
                  onChange={(e) => setGuestContact(e.target.value)}
                  placeholder="+44 7700 900123"
                  required
                  className="w-full rounded bg-sand-elevated border border-sand-muted px-3 py-2.5 text-[15px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Message to Senior Tracker
                </span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full rounded bg-sand-elevated border border-sand-muted px-3 py-2.5 text-[15px] leading-[22px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none resize-none"
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded border border-sage-green text-on-warm-sand font-label text-[14px] font-semibold hover:bg-sage-green hover:text-on-sage-green transition-colors cursor-pointer"
                >
                  Close
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] font-semibold hover:bg-amber-hover transition-colors cursor-pointer"
                >
                  <span>Send to Tracker</span>
                  <Send className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="rounded bg-sage-tint border border-sage-green/30 p-3 flex items-center gap-2 text-sage-green"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <p className="font-body text-[13px] leading-[20px]">
                      Message dispatched to our Palatupana basecamp desk. Expect a WhatsApp reply within 15 minutes.
                    </p>
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
