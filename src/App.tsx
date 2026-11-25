import { useState, useCallback } from 'react';
import {
  SAFARI_PACKAGES,
  SafariPackage,
  WildlifeSpecies,
} from './data/safariData';
import { Navbar } from './components/Navbar';
import { LandingView, QuickSearchPayload } from './components/LandingView';
import { PackageDetailView } from './components/PackageDetailView';
import { Footer } from './components/Footer';
import { BookingModal, BookingModalPrefill } from './components/BookingModal';
import { WildlifeModal } from './components/WildlifeModal';
import { WhatsAppConciergeModal } from './components/WhatsAppConciergeModal';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'package-detail'>('landing');
  const [selectedPackageId, setSelectedPackageId] = useState<SafariPackage['id']>('full-day');

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingModalPrefill | undefined>(
    undefined
  );

  const [selectedWildlife, setSelectedWildlife] = useState<WildlifeSpecies | null>(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappPrefill, setWhatsappPrefill] = useState<string | undefined>(undefined);

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
      }, 40);
    });
  }, []);

  const handleOpenPackageDetail = useCallback((pkgId: SafariPackage['id']) => {
    setSelectedPackageId(pkgId);
    setActiveView('package-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenBookingFromSearch = useCallback(
    (prefill?: Partial<QuickSearchPayload>) => {
      const pkgId = prefill?.packageId || 'full-day';
      const pkg = SAFARI_PACKAGES.find((p) => p.id === pkgId);
      setBookingPrefill({
        packageId: pkgId,
        date: prefill?.date,
        guests: prefill?.guests,
        departureTime: pkg?.defaultDeparture,
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
    <div className="min-h-screen flex flex-col bg-jungle-charcoal text-on-jungle-charcoal font-body">
      <Navbar
        activeView={activeView}
        onNavigateSection={scrollToSection}
        onOpenBooking={() =>
          handleOpenBookingForPackage(
            activeView === 'package-detail' ? selectedPackageId : 'full-day'
          )
        }
      />

      <main className="flex-1">
        {activeView === 'landing' ? (
          <LandingView
            onSelectPackageDetail={handleOpenPackageDetail}
            onOpenBooking={handleOpenBookingFromSearch}
            onOpenWhatsAppConcierge={handleOpenWhatsApp}
            onSelectWildlife={setSelectedWildlife}
          />
        ) : (
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
        )}
      </main>

      <Footer
        onNavigateSection={scrollToSection}
        onOpenWhatsAppConcierge={() => handleOpenWhatsApp()}
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
    </div>
  );
}
