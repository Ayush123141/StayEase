import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

const Styleguide: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="label-caps text-[#B8924A] tracking-[0.25em]">Design System & Verification</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1410]">
          Heritage Luxury <span className="italic text-[#B8924A]">Styleguide</span>
        </h1>
        <p className="text-sm text-[#1C1410]/70">
          Visual verification of Phase 0 tokens: Cormorant Garamond, Jost typography, gold hairlines, glassmorphism recipes, and status indicators.
        </p>
      </div>

      {/* 1. Palette Tokens */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#1C1410] border-b border-[#B8924A]/30 pb-2">
          1. Color Palette Tokens (§2A)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div className="p-4 rounded border border-black/10 bg-[#F6EFE2] text-[#1C1410]">
            <div className="font-bold text-xs">--color-ivory</div>
            <div className="text-xs text-gray-500 font-mono">#F6EFE2</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#EADFC8] text-[#1C1410]">
            <div className="font-bold text-xs">--color-parchment</div>
            <div className="text-xs text-gray-500 font-mono">#EADFC8</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#1C1410] text-[#F6EFE2]">
            <div className="font-bold text-xs">--color-espresso</div>
            <div className="text-xs text-gray-400 font-mono">#1C1410</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#0F2A24] text-[#F6EFE2]">
            <div className="font-bold text-xs">--color-bottle</div>
            <div className="text-xs text-gray-400 font-mono">#0F2A24</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#5B1A1F] text-[#F6EFE2]">
            <div className="font-bold text-xs">--color-oxblood</div>
            <div className="text-xs text-gray-400 font-mono">#5B1A1F</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#B8924A] text-[#1C1410]">
            <div className="font-bold text-xs">--color-gold</div>
            <div className="text-xs text-black/60 font-mono">#B8924A</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#D9BC82] text-[#1C1410]">
            <div className="font-bold text-xs">--color-gold-light</div>
            <div className="text-xs text-black/60 font-mono">#D9BC82</div>
          </div>
          <div className="p-4 rounded border border-black/10 bg-[#CFC6B4] text-[#1C1410]">
            <div className="font-bold text-xs">--color-mist</div>
            <div className="text-xs text-black/60 font-mono">#CFC6B4</div>
          </div>
        </div>
      </section>

      {/* 2. Glassmorphism Variations */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#1C1410] border-b border-[#B8924A]/30 pb-2">
          2. Real Glassmorphism Recipes (Over Warm Image & Deep Canvas)
        </h2>
        <div className="relative rounded-xl overflow-hidden p-8 sm:p-12 min-h-[360px] flex items-center justify-center bg-cover bg-center"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80')` }}>
          {/* Bottle overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A24]/65 to-[#0F2A24]/90" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Standard Glass */}
            <div className="glass p-6 rounded-lg space-y-3">
              <span className="label-caps text-[#D9BC82]">.glass Utility</span>
              <h3 className="font-serif text-2xl text-[#F6EFE2]">Subtle Refraction</h3>
              <p className="text-xs text-[#F6EFE2]/80 leading-relaxed">
                Rendered with 18px blur, 140% saturation, and gold highlights on edges. Meets WCAG 4.5:1 contrast.
              </p>
              <button className="text-xs uppercase tracking-wider text-[#D9BC82] flex items-center space-x-1 hover:underline pt-2">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Glass Dark */}
            <div className="glass-dark p-6 rounded-lg space-y-3">
              <span className="label-caps text-[#D9BC82]">.glass-dark Utility</span>
              <h3 className="font-serif text-2xl text-[#F6EFE2]">Bottle Tint Overlay</h3>
              <p className="text-xs text-[#CFC6B4] leading-relaxed">
                Deep bottle green underlay for high contrast cards, admin widgets, and hero filters.
              </p>
              <div className="flex items-center space-x-2 text-xs text-[#D9BC82]">
                <Shield className="w-4 h-4" />
                <span>Double-Booking Protected</span>
              </div>
            </div>

            {/* Glass Ivory */}
            <div className="glass-ivory p-6 rounded-lg space-y-3">
              <span className="label-caps text-[#B8924A]">.glass-ivory Utility</span>
              <h3 className="font-serif text-2xl text-[#1C1410]">Warm Light Accent</h3>
              <p className="text-xs text-[#1C1410]/80 leading-relaxed">
                Ivory glass recipe for daytime cards, modal dialogs, and floating checkout summaries.
              </p>
              <div className="text-lg font-serif font-bold text-[#5B1A1F]">
                ₹8,500 <span className="text-xs font-normal text-[#1C1410]/60 italic font-sans">/ night</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Buttons & Badges */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl text-[#1C1410] border-b border-[#B8924A]/30 pb-2">
          3. Buttons, Badges, and Inputs
        </h2>
        
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-[#5B1A1F] hover:bg-[#782329] text-[#F6EFE2] text-xs uppercase tracking-[0.18em] font-medium px-6 py-3 rounded-[3px] border border-[#B8924A]/50 transition shadow">
            Oxblood Primary Action
          </button>

          <button className="bg-transparent hover:bg-[#B8924A]/10 text-[#B8924A] text-xs uppercase tracking-[0.18em] font-medium px-6 py-3 rounded-[3px] border border-[#B8924A] transition">
            Gold Outline Button
          </button>

          <button className="bg-[#0F2A24] hover:bg-[#17403A] text-[#F6EFE2] text-xs uppercase tracking-[0.18em] font-medium px-6 py-3 rounded-[3px] border border-[#B8924A]/30 transition">
            Bottle Dark Button
          </button>
        </div>

        {/* Quiet Status Badges per §2A */}
        <div className="flex flex-wrap gap-4 items-center pt-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded text-xs uppercase tracking-wider border border-[#B8924A] text-[#B8924A] bg-[#B8924A]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A]" />
            <span>Pending Confirmation</span>
          </span>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded text-xs uppercase tracking-wider border border-[#0F2A24] text-[#0F2A24] bg-[#0F2A24]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2A24]" />
            <span>Confirmed Stay</span>
          </span>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded text-xs uppercase tracking-wider border border-[#5B1A1F] text-[#5B1A1F] bg-[#5B1A1F]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B1A1F]" />
            <span>Cancelled</span>
          </span>
        </div>
      </section>
    </div>
  );
};

export default Styleguide;
