import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Calendar,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { clinicData } from '../data/clinic';
import { AppointmentModal } from './AppointmentModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Monitor scroll for elevation and active link highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Detect active section on scroll
      const sections = ['home', 'about', 'services', 'doctors', 'why-us', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter links (hide testimonials if disabled)
  const navLinks = clinicData.navLinks.filter(
    (link) => link.href !== '#testimonials' || clinicData.testimonials?.showSection
  );

  return (
    <>
      {/* Top Utility Announcement & Contact Bar - Electric Blue Theme */}
      <div className="w-full bg-[#0145f2] text-white text-[11px] sm:text-xs border-b border-[#0038cb] shadow-xs">
        <div className="clinic-container max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 py-1.5 sm:py-2">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-blue-100 font-normal">
              <MapPin className="w-3.5 h-3.5 text-blue-200 shrink-0" />
              <span>{clinicData.location || "Pragati Nagar, Hyderabad"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-white font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-200 shrink-0" />
              <span>Mon - Sat: 9 AM - 9 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 font-medium">
            <span className="hidden md:inline-flex items-center gap-1 text-white text-[11px] bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
              <ShieldCheck className="w-3 h-3 text-blue-100" />
              Verified Specialists
            </span>
            {clinicData.contact?.phone && (
              <a
                href={`tel:${clinicData.contact.phoneTel || clinicData.contact.phone}`}
                className="inline-flex items-center gap-1.5 text-white hover:text-blue-100 transition-colors"
              >
                <Phone className="w-3 h-3 text-blue-200" />
                <span>{clinicData.contact.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Floating Glassmorphic Navigation Bar with Rounded Borders */}
      <header className="sticky top-2 sm:top-3 z-50 w-full h-0 px-2.5 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="clinic-container max-w-7xl mx-auto p-0">

          {/* Main Rounded Capsule Pill (Transparent Glass on Home, Solid White when Scrolled) */}
          <div
            className={`rounded-full transition-all duration-300 border ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_35px_-5px_rgba(1,69,242,0.12)] border-[#d0dbe7] py-1.5 sm:py-2.5 px-3 sm:px-6'
                : 'bg-white/15 hover:bg-white/25 backdrop-blur-md shadow-none border-white/30 py-2 sm:py-3 px-3 sm:px-6'
              }`}
          >
            <div className="flex items-center justify-between gap-2 sm:gap-4">

              {/* Brand Logo & Clinic Info (Clinic Name kept beside logo in Navbar only) */}
              <a
                href="#home"
                className="flex items-center gap-2 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0145f2] rounded-full p-0.5 min-w-0 flex-1 sm:flex-initial"
                aria-label={clinicData.clinicName}
                title={clinicData.clinicName}
              >
                {clinicData.logoUrl ? (
                  <div className={`relative p-1 rounded-full shadow-2xs group-hover:shadow-sm group-hover:scale-105 transition-all shrink-0 border ${
                    scrolled 
                      ? 'bg-gradient-to-tr from-[#edf1f5] via-white to-blue-50 border-[#d0dbe7]' 
                      : 'bg-white/40 backdrop-blur-xs border-white/50'
                  }`}>
                    <img
                      src={clinicData.logoUrl}
                      alt={clinicData.clinicName}
                      className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0145f2] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="flex flex-col min-w-0 pr-1">
                  <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 group-hover:text-[#0145f2] transition-colors leading-tight tracking-tight truncate">
                    {clinicData.clinicName}
                  </span>
                  <span className={`text-[9px] sm:text-[11px] font-medium tracking-wide flex items-center gap-1.5 truncate mt-0.5 transition-colors ${
                    scrolled ? 'text-slate-500' : 'text-slate-700'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0145f2] inline-block animate-pulse shrink-0"></span>
                    <span className="truncate">{clinicData.tagline || "Woman Well-being | Mental Health | Therapies"}</span>
                  </span>
                </div>
              </a>

              {/* Desktop Navigation Links Pill */}
              <nav className={`hidden lg:flex items-center p-1 rounded-full border shadow-2xs shrink-0 transition-all duration-300 ${
                scrolled
                  ? 'bg-[#edf1f5] border-[#d0dbe7]'
                  : 'bg-white/30 backdrop-blur-md border-white/40'
              }`} aria-label="Main navigation">
                {navLinks.map((link) => {
                  const linkId = link.href.replace('#', '');
                  const isActive = activeSection === linkId;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`relative whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${isActive
                          ? 'bg-[#0145f2] text-white shadow-xs font-bold border border-[#0145f2]'
                          : scrolled
                            ? 'text-slate-600 hover:text-[#0145f2] hover:bg-white/60'
                            : 'text-slate-800 hover:text-[#0145f2] hover:bg-white/60'
                        }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* Action CTA Group (Desktop: Phone pill + Book button) */}
              <div className="hidden lg:flex items-center gap-2.5 shrink-0">
                {clinicData.contact?.phone && (
                  <a
                    href={`tel:${clinicData.contact.phoneTel || clinicData.contact.phone}`}
                    className={`hidden xl:inline-flex whitespace-nowrap items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 border shadow-2xs ${
                      scrolled
                        ? 'text-slate-700 hover:text-[#0145f2] bg-[#edf1f5] hover:bg-white border-[#d0dbe7]'
                        : 'text-slate-900 hover:text-[#0145f2] bg-white/40 hover:bg-white/70 border-white/40 backdrop-blur-xs'
                    }`}
                    title="Call clinic reception desk"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0145f2]" />
                    <span>{clinicData.contact.phone}</span>
                  </a>
                )}
                <a
                  href="#appointment"
                  className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0145f2] hover:bg-[#0038cb] shadow-md shadow-[#0145f2]/25 hover:shadow-lg hover:shadow-[#0145f2]/35 transition-all duration-200 active:scale-95 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0145f2] border border-[#0145f2]"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-100 group-hover:scale-110 transition-transform" />
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Mobile Trigger Buttons (Rounded-full button & circular toggle) */}
              <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setAppointmentModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#0145f2] text-white text-xs font-bold shrink-0 hover:bg-[#0038cb] transition-colors active:scale-95 shadow-xs border border-[#0145f2] cursor-pointer"
                  aria-label="Open Appointment Form Pop-up"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-100" />
                  <span>Book</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-slate-700 hover:text-slate-950 transition-colors flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 shrink-0 cursor-pointer active:scale-95 border ${
                    scrolled
                      ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200'
                      : 'bg-white/40 hover:bg-white/60 border-white/50 backdrop-blur-xs'
                  }`}
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Floating Mobile Drawer Card (Positioned beneath the rounded pill without distorting it) */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2.5 rounded-3xl bg-white/98 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.15)] p-4 sm:p-5 transition-all duration-300 animate-modal-center max-h-[calc(100dvh-110px)] overflow-y-auto">
              {/* Quick Info Strip */}
              <div className="mb-3 px-3.5 py-2.5 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-700 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span className="truncate">Mon - Sat: 9 AM - 9 PM</span>
                </span>
                <span className="inline-flex items-center gap-1 shrink-0 font-semibold text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-slate-900" />
                  <span>Pragati Nagar</span>
                </span>
              </div>

              {/* Navigation Links with Rounded Pills */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const linkId = link.href.replace('#', '');
                  const isActive = activeSection === linkId;
                  const isContact = link.href === '#contact';
                  const targetHref = isContact ? `tel:${clinicData.contact?.phoneTel || clinicData.contact?.phone || '+916303818118'}` : link.href;

                  return (
                    <a
                      key={link.href}
                      href={targetHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${isActive
                          ? 'bg-[#0145f2] text-white font-bold shadow-xs'
                          : 'text-slate-700 hover:bg-blue-50 hover:text-[#0145f2]'
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </a>
                  );
                })}

                {/* Mobile Actions */}
                <div className="pt-3 space-y-2 border-t border-slate-100 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAppointmentModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-[#0145f2] hover:bg-[#0038cb] shadow-md shadow-[#0145f2]/25 transition-all active:scale-98 border border-[#0145f2] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-blue-100" />
                    <span>Book an Appointment</span>
                  </button>

                  {clinicData.contact?.phone && (
                    <a
                      href={`tel:${clinicData.contact.phoneTel || clinicData.contact.phone}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-900 bg-slate-100 border border-slate-200 hover:bg-slate-200/70 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-700" />
                      <span>Call {clinicData.contact.phone}</span>
                    </a>
                  )}
                </div>
              </nav>
            </div>
          )}

        </div>

        {/* Mobile Pop-up Form Dialog */}
        <AppointmentModal
          isOpen={appointmentModalOpen}
          onClose={() => setAppointmentModalOpen(false)}
        />
      </header>
    </>
  );
};

export default Navbar;

