import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/instituteData';
import { GalleryItem } from '../types';

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Computer Lab', 'Students', 'Campus', 'Classroom', 'Events', 'Activities', 'Teachers'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const openLightbox = (item: GalleryItem) => {
    const index = GALLERY_ITEMS.findIndex(g => g.id === item.id);
    if (index !== -1) {
      setActiveLightboxIndex(index);
    }
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#061224] text-white relative border-t border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            Campus Life & Activities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            CAMPUS <span className="text-gold-gradient">GALLERY</span>
          </h2>
          <p className="text-base text-slate-300">
            A visual glimpse into daily life at Unique Commerce Centre: our high-tech computer labs, academic classrooms, student seminars, and annual achievements.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-[#0B1E3D] text-slate-300 hover:text-white hover:bg-[#112B54] border border-amber-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className={`group relative rounded-2xl overflow-hidden bg-[#0A192F] border border-amber-500/20 hover:border-amber-400/60 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                idx === 0 || idx === 1 ? 'sm:col-span-2 sm:row-span-1' : ''
              }`}
            >
              <div className="aspect-[16/10] sm:aspect-auto sm:h-64 w-full relative overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061224] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#0A192F]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/30 text-[11px] font-bold text-amber-300">
                  {item.category}
                </div>

                {/* Expand icon hover trigger */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 border border-amber-400/40 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0A192F] rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-900 text-amber-400 p-2 rounded-full border border-amber-400/30 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next buttons */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/80 hover:bg-slate-900 text-amber-400 p-2 rounded-full border border-amber-400/30 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/80 hover:bg-slate-900 text-amber-400 p-2 rounded-full border border-amber-400/30 transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div className="relative max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-slate-950">
              <img
                src={GALLERY_ITEMS[activeLightboxIndex].image}
                alt={GALLERY_ITEMS[activeLightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Lightbox Description */}
            <div className="p-4 bg-[#08162D] rounded-xl mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  {GALLERY_ITEMS[activeLightboxIndex].category} • {activeLightboxIndex + 1} of {GALLERY_ITEMS.length}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {GALLERY_ITEMS[activeLightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {GALLERY_ITEMS[activeLightboxIndex].caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
