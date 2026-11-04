import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Clock, 
  UserCheck, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  CheckCircle2,
  Stethoscope,
  Star,
  Play,
  Pause,
  Award,
  BadgeCheck,
  Activity,
  MapPin
} from 'lucide-react';
import { clinicData } from '../data/clinic';

const SLIDE_DURATION = 4200; // 4.2s Flipkart-style progress cycle

export const Hero = () => {
  const { hero } = clinicData;
  const slides = [
    {
      id: "dr-soujanya",
      image: "/Doctor 1.jpg",
      alt: "Dr. Soujanya Banka - Consultant Gynecologist & Laparoscopic Surgeon",
      badge: "Consultations Open Today",
      name: "Dr. Soujanya Banka",
      role: "Consultant Gynecologist & Laparoscopic Surgeon",
      degrees: "MBBS, DGO, FMAS, DMAS (Gold Medalist)",
      award: "Dr. APJ Abdul Kalam Awardee",
      tags: ["High-Risk Pregnancy", "Laparoscopy", "Fertility Care"],
      tabTitle: "Dr. Soujanya",
      tabRole: "Gynecologist & Surgeon",
      objectPosition: "center 6%",
    },
    {
      id: "dr-vivaswan",
      image: "/Doctor 2.jpg",
      alt: "Dr. Vivaswan Boorla - Senior Consultant Psychiatrist",
      badge: "Appointments Available",
      name: "Dr. Vivaswan Boorla",
      role: "Senior Consultant Psychiatrist",
      degrees: "MD (Psychiatry) • 18+ Yrs Experience",
      award: "Govt Healthcare Leadership",
      tags: ["Adult Psychiatry", "Child Guidance", "Mind Therapies"],
      tabTitle: "Dr. Vivaswan",
      tabRole: "Senior Psychiatrist",
      objectPosition: "50% 2%",
    },
    {
      id: "hospital",
      image: hero.heroImage || "/hero-clinic.jpg",
      alt: "Dr. Soujanya's Mother and Mind Care consultation suite",
      badge: "Modern Clinical Facility",
      name: "Mother & Mind Clinic Suite",
      role: "Private & Serene Consultation Facility",
      degrees: "Licensed Speciality Healthcare Centre",
      award: "Patient-First Ethics & Confidentiality",
      tags: ["Ultrasound & Labs", "Private Cabins", "Pragati Nagar"],
      tabTitle: "Clinic Suite",
      tabRole: "Consultation Care",
      objectPosition: "center center",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const timerRef = useRef(null);
  const videoRef = useRef(null);

  // Make sure the background video autoplays on mobile browsers (iOS/Android)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    tryPlay();
    // Resume if the tab was hidden or the browser paused it (battery saver etc.)
    const onVisible = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener('visibilitychange', onVisible);
    // Fallback: first touch/click starts it if autoplay was blocked
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    window.addEventListener('click', tryPlay, { once: true });
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('click', tryPlay);
    };
  }, []);

  // Flipkart-style continuous progress cycle
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPaused, slides.length]);

  // Touch swipe handling
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -40) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    setTouchStartX(null);
  };

  const activeSlide = slides[currentSlide] || slides[0];

  // Flipkart marquee items
  const tickerItems = [
    "✦ Dr. Soujanya Banka • Gold Medalist Laparoscopic Surgeon",
    "✦ Dr. Vivaswan Boorla • Senior Consultant Psychiatrist (18+ Yrs Exp)",
    "✦ Compassionate High-Risk Pregnancy & Antenatal Care",
    "✦ Advanced Minimally Invasive Gynecological Surgeries",
    "✦ Complete Adult & Child Psychological Therapies Under One Roof",
    "✦ 100% Patient Privacy & Ethical Clinical Consultations",
    "✦ Pragati Nagar, Hyderabad • Mon - Sat: 9 AM - 9 PM",
  ];

  return (
    <section id="home" className="relative isolate overflow-clip pt-[72px] pb-8 sm:pt-[100px] sm:pb-16 md:pt-[104px] lg:pt-[112px] lg:pb-20 bg-[#edf1f5] border-b border-slate-200/80">
      {/* =========================================================================
          OFFICIAL CLINIC VIDEO BACKGROUND (Complete Home Screen Backdrop)
         ========================================================================= */}
      <div
        className="absolute inset-0 -z-20 w-full h-full overflow-clip select-none pointer-events-none bg-[#edf1f5]"
        aria-hidden="true"
      >
        {/* Sticky viewport-sized frame: keeps the video sharp on tall mobile layouts while content scrolls */}
        <div className="sticky top-0 w-full h-[100svh] lg:h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          poster="/hero-video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-[62%_center] sm:object-center"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-doctor-video.mp4" type="video/mp4" />
        </video>
        </div>

        {/* Light readability overlay: video stays clearly visible, text stays crisp */}
        {/* Mobile / tablet: even soft veil (content is stacked full-width) */}
        <div className="absolute inset-0 bg-white/40 lg:hidden" />
        {/* Desktop: stronger on the text side (left), video fully open on the right */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-white/80 via-white/45 to-white/5" />
        {/* Soft fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#edf1f5] to-transparent" />
      </div>

      {/* Subtle Ambient Radial Lighting Blurs */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-slate-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-white/60 rounded-full blur-3xl pointer-events-none" />

      <div className="clinic-container max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            TOP STATUS & OFFICIAL VIDEO INDICATOR
           ========================================================================= */}
        <div className="flex items-center justify-between gap-2 w-full mb-3 sm:mb-6">
          
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0145f2] text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="w-2.5 h-2.5 text-blue-200" />
              <span>{hero.badgeTag || "Speciality Clinic"}</span>
            </span>
            <span className="font-semibold text-slate-800 hidden md:inline">
              {hero.badge}
            </span>
          </div>

          {/* Moving Animation Ticker Badge with Project-Related Text */}
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs max-w-[210px] sm:max-w-[340px] md:max-w-[440px] overflow-hidden group/ticker shrink-0">
            {/* Live Indicator Dot & Label */}
            <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-200/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Live</span>
            </div>

            {/* Continuous Moving Ticker Track */}
            <div className="relative overflow-hidden w-full">
              {/* Left & Right Smooth Edge Fade Masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

              <div className="animate-mini-marquee whitespace-nowrap flex gap-4 w-max">
                {[...tickerItems, ...tickerItems].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-800">
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN HERO GRID: LEFT (TYPOGRAPHY & CTAs) | RIGHT (ADVANCED FLIPKART STUDIO)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* -----------------------------------------------------------------------
              LEFT COLUMN: Clinical Branding, Headline & CTAs (Spacious 7 Columns)
             ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
            
            {/* Official Clinic Logo Emblem (Logo Only) */}
            <div className="mb-4 sm:mb-5">
              <img 
                src="/clinic-logo-dark.png" 
                alt="Clinic Emblem Logo" 
                className="h-14 sm:h-16 md:h-20 w-auto object-contain object-left drop-shadow-xs"
              />
            </div>

            {/* Editorial Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-[42px] lg:text-[44px] xl:text-[46px] font-black text-slate-950 tracking-tight leading-snug sm:leading-[1.14] mb-3 sm:mb-4">
              Advanced Women’s Health &{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-[#0145f2] to-[#0145f2]">
                  Compassionate Mind Care.
                </span>
                <span className="absolute bottom-1 left-0 w-full h-2 sm:h-3 bg-[#0145f2]/15 -z-10 rounded-sm"></span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-base text-slate-600 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              {hero.subheadline}
            </p>

            {/* Action Buttons: 2-Column Responsive Row + Direct Hotline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto mb-5 sm:mb-8">
              <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <a
                  href="#appointment"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0145f2] hover:bg-[#0038cb] shadow-md sm:shadow-lg shadow-[#0145f2]/25 hover:shadow-xl hover:shadow-[#0145f2]/35 transition-all duration-200 active:scale-95 group border border-[#0145f2] text-center"
                >
                  <Calendar className="w-4 h-4 text-blue-100 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">{hero.primaryCtaText}</span>
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-blue-50/60 hover:text-[#0145f2] border border-slate-200 hover:border-[#0145f2]/40 shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95 text-center truncate"
                >
                  <span className="truncate">{hero.secondaryCtaText}</span>
                </a>
              </div>

              {clinicData.contact?.phone && (
                <a
                  href={`tel:${clinicData.contact.phoneTel || clinicData.contact.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 py-1.5 sm:py-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 sm:bg-white/80 sm:hover:bg-white sm:border sm:border-slate-200/80 transition-all text-center"
                  title="Direct Clinic Phone Desk"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono text-slate-700">{clinicData.contact.phone}</span>
                  <span className="text-[10px] text-slate-500 sm:hidden">• Helpline</span>
                </a>
              )}
            </div>

            {/* 3-Pillar Clinical Trust Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full pt-4 sm:pt-6 border-t border-slate-200/80">
              {hero.highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-sm border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex sm:flex-col items-center sm:items-start justify-between sm:justify-between gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                      {idx === 0 && <UserCheck className="w-3.5 h-3.5 text-slate-200" />}
                      {idx === 1 && <Clock className="w-3.5 h-3.5 text-slate-200" />}
                      {idx === 2 && <ShieldCheck className="w-3.5 h-3.5 text-slate-200" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.label}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* -----------------------------------------------------------------------
              RIGHT COLUMN: FULL-BLEED PHOTO SHOWCASE (Native Portrait Proportions)
             ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex flex-col items-center lg:items-end w-full">
            
            {/* Ambient Blurred Aura */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-slate-200/60 via-slate-100/40 to-slate-200/50 rounded-[36px] blur-xl -z-10" />

            {/* Main Full-Bleed Photo Showcase Card (Proportional width: 420px max) */}
            <div 
              className="relative w-full max-w-[330px] sm:max-w-[350px] lg:max-w-[340px] xl:max-w-[360px] h-[420px] sm:h-[450px] lg:h-[470px] xl:h-[490px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 ring-1 ring-slate-900/5 bg-slate-950 select-none group/showcase"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              
              {/* Full-Bleed Sliding Image Track (No scale-105 zoom, natural framing!) */}
              <div 
                className="flex w-full h-full transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div key={idx} className="relative w-full h-full shrink-0 overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: slide.objectPosition || 'center 10%' }}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    {/* Multi-layered Vignette Shadow: soft top for timers, dark bottom for card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-slate-950/40 pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* ===================================================================
                  FLIPKART STORY PROGRESS TIMERS (Floating Directly at Top of Photo)
                 =================================================================== */}
              <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center gap-1.5 px-0.5">
                {slides.map((_, idx) => {
                  const isActive = currentSlide === idx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/30 backdrop-blur-md hover:bg-white/50 transition-colors cursor-pointer relative"
                      aria-label={`Slide ${idx + 1}`}
                    >
                      {isActive ? (
                        <div
                          key={`progress-${currentSlide}-${isPaused}`}
                          className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                          style={{
                            animation: `flipkartProgressBar ${SLIDE_DURATION}ms linear forwards`,
                            animationPlayState: isPaused ? 'paused' : 'running',
                          }}
                        />
                      ) : (
                        <div className={`h-full ${idx < currentSlide ? 'bg-white/80 w-full' : 'w-0'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Floating Top-Left Status Pill */}
              <div className="absolute top-7 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-slate-200/80 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-800 z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{activeSlide.badge}</span>
              </div>

              {/* Left & Right Interactive Chevron Controls */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/showcase:opacity-100 transition-all duration-200 cursor-pointer shadow-xl z-20 active:scale-95"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/showcase:opacity-100 transition-all duration-200 cursor-pointer shadow-xl z-20 active:scale-95"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* ===================================================================
                  BOTTOM FLOATING SECTION: DOCTOR PASSPORT CARD + MINI DOCK RAIL
                 =================================================================== */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex flex-col gap-1.5">
                
                {/* Doctor Passport Card */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl transition-all duration-300">
                  
                  {/* Doctor Title & Direct CTA */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="min-w-0 pr-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-extrabold text-slate-900 leading-tight truncate">
                          {activeSlide.name}
                        </h3>
                        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-600 font-semibold leading-snug mt-0.5">
                        {activeSlide.degrees}
                      </p>
                    </div>

                    <a
                      href="#appointment"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-semibold shadow-md shrink-0 transition-transform active:scale-95 group/btn"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Speciality Micro-Tags Pill Row */}
                  <div className="flex flex-wrap items-center gap-1 pt-1.5 border-t border-slate-200/70">
                    {activeSlide.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Flipkart Mini Doctor Dock Rail Directly at the Bottom */}
                <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                  {slides.map((slide, idx) => {
                    const isActive = currentSlide === idx;

                    return (
                      <button
                        key={slide.id || idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        className={`flex items-center gap-1 p-1 rounded-xl transition-all duration-200 cursor-pointer text-left backdrop-blur-md border ${
                          isActive
                            ? 'bg-slate-950/90 text-white shadow-lg border-white/40 ring-1 ring-white/30 scale-[1.02]'
                            : 'bg-white/85 text-slate-800 hover:bg-white hover:shadow-xs border-white/60'
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.tabTitle}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md object-cover shrink-0"
                          style={{ objectPosition: slide.objectPosition || 'center 10%' }}
                        />
                        <div className="min-w-0 pr-0.5">
                          <p className={`text-[9px] sm:text-[10px] font-bold truncate leading-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                            {slide.tabTitle}
                          </p>
                          <p className={`text-[8px] sm:text-[9px] truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                            {slide.tabRole}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            FLIPKART-STYLE HORIZONTAL MARQUEE TICKER (Across the bottom of Hero)
           ========================================================================= */}
        <div className="mt-8 sm:mt-12 pt-3 border-t border-slate-200/90 relative overflow-hidden group/marquee">
          <div className="flex w-max animate-marquee">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((text, idx) => (
              <div 
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap"
              >
                <span>{text}</span>
                <span className="text-slate-300 mx-2">•</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
