import { useState, useEffect, FormEvent } from 'react';
import { Star, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS, Testimonial } from '../data/safariData';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = 'leapordsee_yala_guest_reviews_v1';

const RATING_LABELS: Record<number, string> = {
  1: '1 / 5 · Poor',
  2: '2 / 5 · Fair',
  3: '3 / 5 · Good',
  4: '4 / 5 · Very Good',
  5: '5 / 5 · Exceptional Safari',
};

export function GuestReviewSection() {
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Testimonial[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default seed testimonials
    }
    return TESTIMONIALS;
  });

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [author, setAuthor] = useState('');
  const [country, setCountry] = useState('');
  const [packageName, setPackageName] = useState('Full-Day Tracker');
  const [comment, setComment] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage quota errors
    }
  }, [reviews]);

  const activeStarValue = hoverRating ?? rating;
  const averageRating = (
    reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
  ).toFixed(1);

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    const trimmedAuthor = author.trim();
    if (!trimmedComment || !trimmedAuthor) return;

    const formattedQuote = trimmedComment.startsWith('"')
      ? trimmedComment
      : `"${trimmedComment}"`;

    const newReview: Testimonial = {
      id: `guest-${Date.now()}`,
      quote: formattedQuote,
      author: trimmedAuthor,
      country: country.trim() || 'Safari Guest',
      packageName,
      rating,
    };

    setReviews((prev) => [newReview, ...prev]);
    setAuthor('');
    setCountry('');
    setComment('');
    setRating(5);
    setHoverRating(null);
    setSubmittedNotice(true);
    window.setTimeout(() => setSubmittedNotice(false), 4500);
  };

  return (
    <>
      <section
        id="reviews"
        className="bg-sand-muted text-on-warm-sand py-12 md:py-24 border-t border-sand-muted"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-10">
          {/* Clean Header (nothing added above the reviews) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col gap-2 max-w-2xl"
          >
            <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green uppercase tracking-widest">
              Guest Stories
            </span>
            <h2 className="font-display text-[30px] leading-[36px] md:text-[48px] md:leading-[56px] tracking-[-0.5px] font-semibold text-on-warm-sand text-balance">
              Memories from the Bush
            </h2>
          </motion.div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <AnimatePresence initial={false}>
              {reviews.map((review, idx) => (
                <motion.article
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.06, 0.24),
                    ease: EASE_OUT,
                  }}
                  whileHover={{ y: -3 }}
                  className="h-full bg-sand-elevated text-on-sand-elevated rounded-lg border border-sand-muted p-6 flex flex-col justify-between gap-4 transition-shadow duration-200 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <Star
                          key={starNum}
                          className={`w-4 h-4 ${
                            starNum <= review.rating
                              ? 'fill-leopard-amber text-leopard-amber'
                              : 'text-sand-muted'
                          }`}
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
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Dedicated Review & Star Rating Section Down Below Reviews */}
      <section
        id="leave-review"
        className="bg-warm-sand text-on-warm-sand py-12 md:py-20 border-t border-sand-muted"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="bg-sand-elevated text-on-sand-elevated rounded-lg border border-sand-muted p-6 md:p-8"
          >
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sand-muted">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[13px] leading-[20px] text-text-muted-light">
                    <Star
                      className="w-4 h-4 fill-leopard-amber text-leopard-amber shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-title font-semibold text-on-sand-elevated tabular-nums">
                      {averageRating} / 5
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{reviews.length} Guest Reviews</span>
                  </div>
                  <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-on-sand-elevated">
                    Leave a Service Review
                  </h3>
                  <p className="font-body text-[14px] leading-[22px] text-text-muted-light">
                    Traveled with Leapordsee Yala? Rate your tracker, jeep comfort, and wildlife sightings.
                  </p>
                </div>

                {/* Interactive Star Picker */}
              <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                <div
                  role="radiogroup"
                  aria-label="Rate our safari service from 1 to 5 stars"
                  onMouseLeave={() => setHoverRating(null)}
                  className="inline-flex items-center gap-1.5"
                >
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= activeStarValue;
                    return (
                      <motion.button
                        key={starValue}
                        type="button"
                        role="radio"
                        aria-checked={rating === starValue}
                        aria-label={`Rate ${starValue} out of 5 stars`}
                        whileHover={{ scale: 1.18 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15, ease: EASE_OUT }}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onClick={() => setRating(starValue)}
                        className="p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors duration-150 ${
                            isFilled
                              ? 'fill-leopard-amber text-leopard-amber'
                              : 'text-sand-muted hover:text-leopard-amber/60'
                          }`}
                          aria-hidden="true"
                        />
                      </motion.button>
                    );
                  })}
                </div>
                <span className="font-label text-[12px] leading-[16px] font-semibold text-sage-green tabular-nums">
                  {RATING_LABELS[activeStarValue]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Your Name
                </span>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Elena Rossi"
                  required
                  className="w-full rounded bg-warm-sand/60 border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated placeholder:text-text-muted-light/60 focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Country
                </span>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Germany"
                  className="w-full rounded bg-warm-sand/60 border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated placeholder:text-text-muted-light/60 focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                  Safari Package
                </span>
                <div className="relative flex items-center">
                  <select
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full appearance-none rounded bg-warm-sand/60 border border-sand-muted pl-3 pr-9 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none cursor-pointer"
                  >
                    <option value="Full-Day Tracker">Full-Day Tracker</option>
                    <option value="Morning Safari">Morning Safari</option>
                    <option value="Sunset Drive">Sunset Drive</option>
                  </select>
                  <ChevronDown
                    className="w-4 h-4 absolute right-3 text-text-muted-light pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span className="font-label text-[12px] leading-[16px] tracking-[0.6px] font-semibold text-text-muted-light uppercase">
                Your Review &amp; Comment
              </span>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell future guests about your tracker, jeep comfort, and wildlife encounters in Yala..."
                required
                className="w-full rounded bg-warm-sand/60 border border-sand-muted px-3 py-2.5 text-[15px] leading-[24px] text-on-sand-elevated placeholder:text-text-muted-light/60 focus:border-leopard-amber focus:ring-1 focus:ring-leopard-amber focus:outline-none resize-none"
              />
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <AnimatePresence>
                {submittedNotice ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="inline-flex items-center gap-2 text-sage-green font-body text-[14px]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Thank you! Your review is now live above.</span>
                  </motion.div>
                ) : (
                  <span className="font-body text-[13px] leading-[20px] text-text-muted-light">
                    Reviews appear immediately in Guest Stories.
                  </span>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap cursor-pointer"
              >
                <span>Post Review</span>
                <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
}
