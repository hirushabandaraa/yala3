import { useState, useCallback } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
import {
  SAFARI_PACKAGES,
  SafariPackage,
  WildlifeSpecies,
} from './data/safariData';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { PackageDetailView } from './components/PackageDetailView';
import { PackagesOverviewView } from './components/PackagesOverviewView';
import { Footer } from './components/Footer';
import { BookingModal, BookingModalPrefill } from './components/BookingModal';
import { WildlifeModal } from './components/WildlifeModal';
import { WhatsAppConciergeModal } from './components/WhatsAppConciergeModal';
import { ContactModal } from './components/ContactModal';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'package-detail' | 'packages-overview'>(
    'landing'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<SafariPackage['id']>('full-day');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingModalPrefill | undefined>(
    undefined
  );

  const [selectedWildlife, setSelectedWildlife] = useState<WildlifeSpecies | null>(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappPrefill, setWhatsappPrefill] = useState<string | undefined>(undefined);
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveView('landing');
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 220);
    });
  }, []);

  const handleOpenPackagesOverview = useCallback(() => {
    setActiveView('packages-overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPackageDetail = useCallback((pkgId: SafariPackage['id']) => {
    setSelectedPackageId(pkgId);
    setActiveView('package-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenBookingFromSearch = useCallback(
    (prefill?: Partial<BookingModalPrefill>) => {
      const pkgId = prefill?.packageId || 'full-day';
      const pkg = SAFARI_PACKAGES.find((p) => p.id === pkgId);
      setBookingPrefill({
        packageId: pkgId,
        date: prefill?.date,
        guests: prefill?.guests,
        departureTime: pkg?.defaultDeparture,
        charterType: prefill?.charterType,
        tierLabel: prefill?.tierLabel,
        sharingPrice: prefill?.sharingPrice,
      });
      setBookingModalOpen(true);
    },
    []
  );

  const handleOpenBookingForPackage = useCallback((pkgId: SafariPackage['id']) => {
    const pkg = SAFARI_PACKAGES.find((p) => p.id === pkgId);
    setBookingPrefill({
      packageId: pkgId,
      departureTime: pkg?.defaultDeparture,
    });
    setBookingModalOpen(true);
  }, []);

  const handleOpenWhatsApp = useCallback((prefillMessage?: string) => {
    setWhatsappPrefill(prefillMessage);
    setWhatsappOpen(true);
  }, []);

  const activePackage =
    SAFARI_PACKAGES.find((pkg) => pkg.id === selectedPackageId) || SAFARI_PACKAGES[1];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-jungle-charcoal text-on-jungle-charcoal font-body">
        <Navbar
          activeView={activeView}
          onNavigateSection={scrollToSection}
          onOpenBooking={handleOpenPackagesOverview}
          onOpenContact={() => setContactOpen(true)}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeView === 'landing' ? (
              <motion.div
                key="landing-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <LandingView
                  onSelectPackageDetail={handleOpenPackageDetail}
                  onOpenBooking={handleOpenBookingFromSearch}
                  onOpenBookSafari={handleOpenPackagesOverview}
                  onSelectWildlife={setSelectedWildlife}
                />
              </motion.div>
            ) : activeView === 'packages-overview' ? (
              <motion.div
                key="packages-overview-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <PackagesOverviewView
                  onBackHome={() => scrollToSection('safaris')}
                  onOpenBooking={handleOpenBookingFromSearch}
                />
              </motion.div>
            ) : (
              <motion.div
                key="package-detail-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <PackageDetailView
                  selectedPackage={activePackage}
                  onSelectPackage={(pkgId) => {
                    setSelectedPackageId(pkgId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onBackToPackages={() => scrollToSection('packages')}
                  onOpenBooking={handleOpenBookingForPackage}
                  onOpenWhatsAppConcierge={handleOpenWhatsApp}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer
          onNavigateSection={scrollToSection}
          onOpenWhatsAppConcierge={() => handleOpenWhatsApp()}
          onOpenContact={() => setContactOpen(true)}
        />

        <BookingModal
          isOpen={bookingModalOpen}
          prefill={bookingPrefill}
          onClose={() => setBookingModalOpen(false)}
        />

        <WildlifeModal
          species={selectedWildlife}
          onClose={() => setSelectedWildlife(null)}
          onBookPackage={handleOpenBookingForPackage}
        />

        <WhatsAppConciergeModal
          isOpen={whatsappOpen}
          initialMessage={whatsappPrefill}
          onClose={() => setWhatsappOpen(false)}
        />

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          onOpenWhatsAppConcierge={handleOpenWhatsApp}
        />
      </div>
    </MotionConfig>
  );
}
