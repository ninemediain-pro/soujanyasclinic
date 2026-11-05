import React from 'react';
import { Activity, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { clinicData } from '../data/clinic';
import DynamicIcon from './DynamicIcon';
import { handleEmailClick, getEmailUrl } from '../utils/mailHelper';

export const Footer = ({ onNavigate }) => {
  const { clinicName, logoUrl, footer, navLinks, services, contact } = clinicData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800/80">
      <div className="clinic-container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/clinic-logo-white.png" 
                alt={clinicName} 
                className="h-10 sm:h-12 w-auto object-contain" 
              />
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-sm">
              {footer.description}
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5">
              {footer.socialLinks.map((social) => {
                const isEmail = social.name.toLowerCase() === 'email';
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (isEmail) {
                        handleEmailClick(e, contact.email);
                      }
                    }}
                    aria-label={social.name}
                    className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-400"
                  >
                    <DynamicIcon name={social.iconName} className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {services.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-white transition-colors line-clamp-1"
                  >
                    {srv.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="Open clinic location on Google Maps"
                >
                  {contact.address}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-300 shrink-0" />
                <a href={`tel:${contact.phoneTel || contact.phone}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-300 shrink-0" />
                <a
                  href={getEmailUrl(contact.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleEmailClick(e, contact.email)}
                  className="hover:text-white transition-colors cursor-pointer"
                  title="Send email"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          {footer.medicalDisclaimer}
        </div>

        {/* Bottom Bar: Copyright & Navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            {footer.copyright.replace('{year}', currentYear)}
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('privacy') : (window.location.href = '/privacy-policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('terms') : (window.location.href = '/terms-of-service')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors border border-slate-800 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
