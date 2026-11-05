import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Stethoscope, Brain, HeartPulse, CheckCircle2, ShieldCheck } from 'lucide-react';
import { clinicData } from '../data/clinic';
import DynamicIcon from './DynamicIcon';

// Curated category badges matching Dr. Soujanya's Mother and Mind Care theme
const categoryMap = {
  'antenatal-pregnancy': 'Maternal Care',
  'pcod-menstrual-health': 'Women\'s Wellness',
  'infertility-gynae-consult': 'Fertility Care',
  'gynae-surgeries-procedures': 'Advanced Surgeries',
  'cancer-screening-vaccines': 'Preventive Screening',
  'menopausal-wellbeing': 'Women\'s Wellness',
  'depression-mood-care': 'Mood & Emotions',
  'anxiety-panic-phobias': 'Anxiety & Panic',
  'insomnia-sleep-health': 'Sleep Medicine',
  'counselling-psychotherapy': 'Therapy & Counselling',
  'neuropsychiatry-addiction': 'Neuropsychiatry',
};

export const Services = () => {
  const { services, clinicalDirectory } = clinicData;
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('normal'); // 'normal' (right-to-left) | 'reverse' (left-to-right)
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'gynaecology' | 'psychiatry'

  // Filtered services based on user tab selection
  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter((s) => s.department === activeFilter);

  // Guarantee seamless infinite marquee: two identical halves with sufficient width
  const multiplier = Math.max(1, Math.ceil(8 / Math.max(1, filteredServices.length)));
  const halfList = Array(multiplier).fill(filteredServices).flat();
  const marqueeServices = [...halfList, ...halfList];

  return (
    <section id="services" className="py-20 bg-[#edf1f5] border-y border-slate-200/80 overflow-hidden">
      <div className="clinic-container">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0145f2]/10 text-[#0145f2] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#0145f2]/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0145f2]" />
            <span>Comprehensive Medical Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Integrated Mother & Mind Care
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed font-normal">
            Personalized, ethical, and compassionate outpatient clinical services spanning women's health, obstetrics, and psychiatric care.
          </p>
        </div>

        {/* =========================================================================
            FLIPKART-STYLE CLINICAL SPECIALITIES SHELF & INTERACTIVE CAROUSEL
           ========================================================================= */}
        <div className="relative mb-16 sm:mb-20">

          {/* Flipkart Shelf Container Frame */}
          <div
            className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 overflow-hidden group/shelf"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Shelf Top Header Bar (Flipkart Style) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Featured Clinical Specialities & Services
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-medium">
                  Comprehensive care by Award-winning Gynecologist & Senior Consultant Psychiatrist
                </p>
              </div>

              {/* Action Row: "VIEW ALL" Button */}
              <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                <a
                  href="#clinical-directory"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#0145f2] hover:bg-[#0038cb] text-white text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                  <span>VIEW ALL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Department Filter Tabs */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeFilter === 'all'
                    ? 'bg-[#0145f2] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                All Services ({services.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('gynaecology')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeFilter === 'gynaecology'
                    ? 'bg-rose-700 text-white shadow-2xs'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Gynaecology & Obstetrics (Dr. Soujanya)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('psychiatry')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeFilter === 'psychiatry'
                    ? 'bg-[#0145f2] text-white shadow-2xs'
                    : 'bg-blue-50 text-[#0145f2] hover:bg-blue-100'
                  }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Psychiatry & Mind Care (Dr. Vivaswan)</span>
              </button>
            </div>

            {/* Carousel Rail Track */}
            <div className="relative group/marquee-rail group-services-marquee">
              {/* Smooth Edge Fade Masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

              {/* Infinite Scrolling Track */}
              <div className="overflow-hidden py-2 px-1">
                <div
                  key={`${activeFilter}-${direction}`}
                  className="animate-marquee-services flex gap-4 sm:gap-5"
                  style={{
                    animationDirection: direction,
                    animationPlayState: isPaused ? 'paused' : undefined,
                  }}
                >
                  {marqueeServices.map((service, index) => {
                    const categoryTag = categoryMap[service.id] || service.departmentLabel || 'Clinical Specialty';
                    const isGynae = service.department === 'gynaecology';

                    return (
                      <div
                        key={`${service.id}-${index}`}
                        className="w-[280px] sm:w-[305px] shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#0145f2]/70 transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none"
                      >
                        {/* Service Card Top Showcase Area (Doctor Pics Removed, Clean Service Icon) */}
                        <div className="h-32 sm:h-34 bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-white p-3.5 relative flex flex-col justify-between items-center border-b border-slate-100">
                          {/* Top Badge Row */}
                          <div className="w-full flex items-center justify-between z-10">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border ${isGynae
                                ? 'bg-rose-50 text-rose-700 border-rose-200/80'
                                : 'bg-blue-50 text-[#0145f2] border-blue-200/80'
                              }`}>
                              {categoryTag}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isGynae
                                ? 'text-rose-600 bg-rose-50/70 border-rose-100'
                                : 'text-[#0145f2] bg-blue-50/70 border-blue-100'
                              }`}>
                              {isGynae ? 'Gynaecology' : 'Psychiatry'}
                            </span>
                          </div>

                          {/* Center: Normal Service-Related Icon */}
                          <div className="my-auto flex items-center justify-center">
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-md border ${isGynae
                                ? 'bg-gradient-to-br from-rose-50 via-white to-rose-100/60 text-rose-600 border-rose-200/80 group-hover:border-rose-300'
                                : 'bg-gradient-to-br from-blue-50 via-white to-blue-100/60 text-[#0145f2] border-blue-200/80 group-hover:border-blue-300'
                              }`}>
                              <DynamicIcon name={service.iconName} className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Title */}
                            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0145f2] transition-colors line-clamp-2 h-[44px] flex items-center mb-1.5">
                              {service.name}
                            </h4>

                            {/* Short Description */}
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3.5">
                              {service.shortDescription}
                            </p>

                            {/* 3 Key Treatments from Brochure */}
                            {service.features && (
                              <div className="space-y-1.5 mb-4 pt-2.5 border-t border-slate-100">
                                {service.features.slice(0, 3).map((feature, fIdx) => (
                                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                                    <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                                    <span className="truncate font-medium">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Flipkart Card Footer: Status & Book Button */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[11px] font-semibold text-slate-600">In-Clinic & Online</span>
                            </div>
                            <a
                              href="#appointment"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0145f2] hover:bg-[#0038cb] text-white text-xs font-bold transition-all active:scale-95 shadow-2xs hover:shadow-xs"
                            >
                              <span>Book Slot</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            COMPLETE BROCHURE SERVICES DIRECTORY (GYNAECOLOGY & PSYCHIATRY)
           ========================================================================= */}
        {clinicalDirectory && (
          <div id="clinical-directory" className="relative scroll-mt-24">
            {/* Directory Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-800" />
                <span>Complete Clinical Directory</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                All Conditions Treated & Services Provided
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                Comprehensive outpatient clinical care offered across our two specialized departments.
              </p>
            </div>

            {/* 2-Column Clinical Pamphlet Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

              {/* Column 1: Gynaecology Services (Dr. Soujanya Banka) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/70 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

                <div>
                  {/* Department Badge & Title */}
                  <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 border border-slate-200/80 shadow-2xs">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                        {clinicalDirectory.gynaecology.category}
                      </h4>
                      <p className="text-sm font-semibold text-slate-700">
                        {clinicalDirectory.gynaecology.doctorName} • {clinicalDirectory.gynaecology.doctorTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 font-medium mb-5 leading-relaxed">
                    Specialized women's reproductive health, normal deliveries, minimally invasive laparoscopic surgeries, fertility evaluation, and preventive screening.
                  </p>

                  {/* Stable List Container (No Sliding Animation) */}
                  <div className="w-full max-h-[350px] sm:max-h-[380px] overflow-y-auto rounded-2xl border border-slate-200/90 bg-slate-50/60 p-2.5 sm:p-3 space-y-2 focus:outline-hidden">
                    {clinicalDirectory.gynaecology.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all text-left"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0145f2] shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: Psychiatry Services (Dr. Vivaswan Boorla) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/70 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

                <div>
                  {/* Department Badge & Title */}
                  <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 border border-slate-200/80 shadow-2xs">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                        {clinicalDirectory.psychiatry.category}
                      </h4>
                      <p className="text-sm font-semibold text-slate-700">
                        {clinicalDirectory.psychiatry.doctorName} • {clinicalDirectory.psychiatry.doctorTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 font-medium mb-5 leading-relaxed">
                    Senior clinical psychiatric consultation, evidence-based psychotherapy, sleep medicine, de-addiction protocols, crisis support, and cognitive evaluations.
                  </p>

                  {/* Stable List Container (No Sliding Animation) */}
                  <div className="w-full max-h-[350px] sm:max-h-[380px] overflow-y-auto rounded-2xl border border-slate-200/90 bg-slate-50/60 p-2.5 sm:p-3 space-y-2 focus:outline-hidden">
                    {clinicalDirectory.psychiatry.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all text-left"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0145f2] shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom Notice */}
        <div className="mt-14 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Need a clinical consultation or second opinion not listed above?{' '}
            <a href="#contact" className="text-slate-900 font-semibold underline underline-offset-4 hover:text-slate-700">
              Inquire with our clinic reception
            </a>{' '}
            or call our direct office line.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Services;
