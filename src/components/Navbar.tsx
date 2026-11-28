import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { BrandMark, BrandWordmark } from './BrandMark';

interface NavbarProps {
  activeView: 'landing' | 'package-detail' | 'packages-overview';
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Navbar({
  activeView,
  onNavigateSection,
  onOpenBooking,
  onOpenContact,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextScrolled = latest > 32;
    if (nextScrolled !== isScrolled) {
      setIsScrolled(nextScrolled);
    }
  });

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    onOpenContact();
  };

  const isLanding = activeView === 'landing';
  const isPackagesOverview = activeView === 'packages-overview';
  const showSolidHeader = isScrolled || !isLanding;

  const navItems = isPackagesOverview
    ? [
        { id: 'safaris', label: 'Safaris', active: false, action: () => handleLinkClick('safaris') },
        { id: 'wildlife', label: 'Wildlife', active: false, action: () => handleLinkClick('wildlife') },
        {
          id: 'packages',
          label: 'Packages',
          active: true,
          action: () => handleLinkClick('packages'),
        },
        { id: 'about', label: 'About Us', active: false, action: () => handleLinkClick('about') },
      ]
    : [
        { id: 'safaris', label: 'Safaris', active: false, action: () => handleLinkClick('safaris') },
        { id: 'wildlife', label: 'Wildlife', active: false, action: () => handleLinkClick('wildlife') },
        {
          id: 'packages',
          label: 'Packages',
          active: activeView === 'package-detail',
          action: () => handleLinkClick('packages'),
        },
        { id: 'about', label: 'About Us', active: false, action: () => handleLinkClick('about') },
        { id: 'contact', label: 'Contact Us', active: false, action: handleContactClick },
      ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={
        isPackagesOverview
          ? 'sticky top-0 z-30 bg-jungle-charcoal text-on-jungle-charcoal border-b border-charcoal-muted'
          : 'fixed top-0 inset-x-0 z-30'
      }
    >
      {/* Compositor-only animated backdrop when scrolled on landing or package-detail */}
      {!isPackagesOverview && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: showSolidHeader ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="absolute inset-0 bg-jungle-charcoal/92 backdrop-blur-md border-b border-charcoal-muted/80 pointer-events-none"
        />
      )}

      <div
        className={`relative max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between ${
          isPackagesOverview ? 'py-4 gap-4' : 'py-5 gap-8'
        }`}
      >
        {/* Brand Zone */}
        <motion.button
          type="button"
          onClick={() => handleLinkClick('safaris')}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE_OUT }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 text-left text-on-jungle-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber rounded whitespace-nowrap shrink-0 cursor-pointer group"
        >
          <motion.span
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="inline-flex"
          >
            <BrandMark className="w-[74px] h-10 shrink-0" />
          </motion.span>
          <BrandWordmark showSubtitle />
        </motion.button>

        {/* Center Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          onMouseLeave={() => setHoveredNav(null)}
          className={`hidden md:flex items-center ${isPackagesOverview ? 'gap-8' : 'gap-7'}`}
        >
          {navItems.map((item, idx) => {
            const showUnderline =
              !isPackagesOverview && (hoveredNav ? hoveredNav === item.id : item.active);
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + idx * 0.04, ease: EASE_OUT }}
                onMouseEnter={() => setHoveredNav(item.id)}
                onClick={item.action}
                className={`relative font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer ${
                  isPackagesOverview ? '' : 'py-1.5 '
                }${
                  item.active || hoveredNav === item.id
                    ? 'text-leopard-amber'
                    : 'text-on-jungle-charcoal/90 hover:text-leopard-amber'
                }`}
              >
                {item.label}
                {showUnderline && (
                  <motion.span
                    layoutId="header-nav-underline"
                    className="absolute bottom-0 inset-x-0 h-[1.5px] bg-leopard-amber rounded-full"
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Right Primary CTA */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: EASE_OUT }}
          className="flex items-center gap-4 shrink-0"
        >
          <motion.button
            type="button"
            onClick={onOpenBooking}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-leopard-amber text-on-leopard-amber font-label text-[14px] leading-[20px] tracking-[0.2px] font-semibold hover:bg-amber-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leopard-amber transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Book Safari</span>
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-warm-sand/20 bg-jungle-charcoal/70 text-on-jungle-charcoal hover:border-leopard-amber transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="relative md:hidden mx-6 rounded-lg bg-jungle-charcoal/95 backdrop-blur-md border border-charcoal-muted p-4 flex flex-col gap-2 shadow-xl"
          >
            <button
              type="button"
              onClick={() => handleLinkClick('safaris')}
              className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-on-jungle-charcoal hover:bg-charcoal-elevated hover:text-leopard-amber transition-colors cursor-pointer"
            >
              Safaris
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('wildlife')}
              className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-on-jungle-charcoal hover:bg-charcoal-elevated hover:text-leopard-amber transition-colors cursor-pointer"
            >
              Wildlife
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('packages')}
              className={`w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold hover:bg-charcoal-elevated transition-colors cursor-pointer ${
                activeView === 'package-detail' || activeView === 'packages-overview'
                  ? 'text-leopard-amber'
                  : 'text-on-jungle-charcoal'
              }`}
            >
              Packages
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('about')}
              className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-on-jungle-charcoal hover:bg-charcoal-elevated hover:text-leopard-amber transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={handleContactClick}
              className="w-full text-left px-3 py-2.5 rounded font-label text-sm font-semibold text-leopard-amber hover:bg-charcoal-elevated transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
