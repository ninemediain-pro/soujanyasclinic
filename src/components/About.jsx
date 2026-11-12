import React from 'react';
import { CheckCircle2, Stethoscope, Users } from 'lucide-react';
import { clinicData } from '../data/clinic';
import ImagePlaceholder from './ImagePlaceholder';

export const About = () => {
  const { about } = clinicData;

  return (
    <section id="about" className="py-20 bg-white border-y border-slate-200/80">
      <div className="clinic-container">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image / Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative">
              {/* Background Accent Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-slate-100 via-slate-100/60 to-slate-200/40 rounded-3xl -z-10 transform -rotate-1 border border-slate-200/60" />

              <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-200/80">
                {about.aboutImage ? (
                  <img
                    src={about.aboutImage}
                    alt="About our clinic facility"
                    className="w-full h-80 sm:h-96 object-cover rounded-xl"
                  />
                ) : (
                  <ImagePlaceholder
                    src={null}
                    alt="Clinic facility and consultation room"
                    label="[Clinic Facility Photo]"
                    type="about"
                    aspectRatio="aspect-4/3"
                    className="w-full h-80 sm:h-96"
                  />
                )}
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-4 bg-slate-950 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 border border-slate-700/80">
                  <Stethoscope className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {about.experienceYearsBadge || "Clinical Care"}
                  </p>
                  <p className="text-sm font-bold text-white">
                    Patient-First Ethics
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Approach & Highlights */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">

            {/* Section Tag */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-4">
              {about.badge}
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug mb-6">
              {about.title}
            </h2>

            {/* Mission Statement */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-800 mb-5 leading-relaxed font-normal">
              {about.missionText}
            </p>

            {/* Approach Statement */}
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              {about.approachText}
            </p>

            {/* Stable Key Highlights List */}
            <div className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/60 p-3 sm:p-4 mb-8 space-y-2.5">
              {about.keyHighlights.map((highlight, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Anchor */}
            <a
              href="#doctors"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#0145f2] hover:bg-[#0038cb] shadow-md shadow-[#0145f2]/25 hover:shadow-lg hover:shadow-[#0145f2]/35 transition-all duration-200 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0145f2] border border-[#0145f2]"
            >
              <Users className="w-4 h-4 text-blue-100" />
              <span>Meet Our Medical Practitioners</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
