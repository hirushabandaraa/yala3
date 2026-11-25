import { useEffect } from 'react';
import { X, MapPin, Clock, ArrowRight } from 'lucide-react';
import { WildlifeSpecies, SafariPackage } from '../data/safariData';
import { ResilientImage } from './ResilientImage';

interface WildlifeModalProps {
  species: WildlifeSpecies | null;
  onClose: () => void;
  onBookPackage: (pkgId: SafariPackage['id']) => void;
}

export function WildlifeModal({
  species,
  onClose,
  onBookPackage,
}: WildlifeModalProps) {
  useEffect(() => {
    if (!species) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [species, onClose]);

  if (!species) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wildlife-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-jungle-charcoal/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-lg bg-warm-sand text-on-warm-sand border border-sand-muted overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-jungle-charcoal">
          <ResilientImage
            src={species.image}
            alt={species.imageAlt}
            fallbackLabel={species.commonName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jungle-charcoal via-jungle-charcoal/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wildlife dispatch"
            className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-full border border-charcoal-muted bg-jungle-charcoal/80 text-on-jungle-charcoal hover:border-leopard-amber transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1">
            <span className="font-label text-[12px] leading-[16px] font-semibold text-leopard-amber uppercase tracking-wider">
              {species.scientificName}
            </span>
            <h3
              id="wildlife-modal-title"
              className="font-headline text-[28px] leading-[36px] font-semibold text-on-jungle-charcoal"
            >
              {species.commonName}
            </h3>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <p className="font-body text-[15px] leading-[24px] text-on-warm-sand text-pretty">
            {species.fieldDispatch}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded bg-sand-elevated border border-sand-muted flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sage-green shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-label text-[11px] uppercase tracking-wider text-text-muted-light font-semibold">
                  Key Zones
                </span>
                <span className="font-body text-[13px] leading-[18px] text-on-sand-elevated">
                  {species.preferredZones}
                </span>
              </div>
            </div>
            <div className="p-3 rounded bg-sand-elevated border border-sand-muted flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-sage-green shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-label text-[11px] uppercase tracking-wider text-text-muted-light font-semibold">
                  Peak Window
                </span>
                <span className="font-body text-[13px] leading-[18px] text-on-sand-elevated tabular-nums">
                  {species.peakHours}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded border border-sage-green text-on-warm-sand font-label text-[14px] font-semibold hover:bg-sage-green hover:text-on-sage-green transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                const pkgId = species.recommendedPackageId;
                onClose();
                onBookPackage(pkgId);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] font-semibold hover:bg-amber-hover transition-colors cursor-pointer"
            >
              <span>Track With Us</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
