import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  activeView: 'landing' | 'package-detail';
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export function Navbar({ activeView, onNavigateSection, onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => handleLinkClick('safaris')}
          className="inline-flex items-center gap-2 text-left text-on-jungle-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber rounded whitespace-nowrap shrink-0 cursor-pointer"
        >
          <BrandMark className="w-8 h-8 text-leopard-amber shrink-0" />
          <span className="flex flex-col">
            <span className="font-headline text-[17px] leading-none font-semibold tracking-tight text-on-jungle-charcoal">
              Leapordsee Yala
            </span>
            <span className="font-label text-[11px] leading-[16px] font-medium text-leopard-amber tracking-widest uppercase">
              Sri Lanka
            </span>
          </span>
        </button>

        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => handleLinkClick('safaris')}
            className="font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold text-on-jungle-charcoal/90 hover:text-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            Safaris
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('wildlife')}
            className="font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold text-on-jungle-charcoal/90 hover:text-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            Wildlife
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('packages')}
            className={`font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'package-detail'
                ? 'text-leopard-amber'
                : 'text-on-jungle-charcoal/90 hover:text-leopard-amber'
            }`}
          >
            Packages
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('about')}
            className="font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold text-on-jungle-charcoal/90 hover:text-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            About Us
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Book Safari</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-warm-sand/20 bg-jungle-charcoal/70 text-on-jungle-charcoal hover:border-leopard-amber transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mx-6 rounded-lg bg-jungle-charcoal/95 backdrop-blur-md border border-charcoal-muted p-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleLinkClick('safaris')}
            className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-on-jungle-charcoal hover:bg-charcoal-elevated hover:text-leopard-amber transition-colors"
          >
            Safaris
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('wildlife')}
            className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-on-jungle-charcoal hover:bg-charcoal-elevated hover:text-leopard-amber transition-colors"
          >
            Wildlife
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('packages')}
            className={`w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold hover:bg-charcoal-elevated transition-colors ${
              activeView === 'package-detail' ? 'text-leopard-amber' : 'text-on-jungle-charcoal'
            }`}
          >
            Packages
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('about')}
            className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-on-jungle-charcoal hover:bg-charcoal-elevated hover:text-leopard-amber transition-colors"
          >
            About Us
          </button>
        </div>
      )}
    </header>
  );
}
