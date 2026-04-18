import React from 'react';
import { EMERGENCY_NUMBERS } from '../data';

export function NumbersPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 border-b border-white/5">
        <h2 className="font-display font-black text-xl uppercase tracking-tight text-[#e4e1e9]">📞 Emergency Numbers</h2>
        <p className="text-xs text-[#a09ca8] mt-1">112 works from any mobile, even without a SIM card</p>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {EMERGENCY_NUMBERS.map(item => (
          <a
            key={item.num}
            href={`tel:${item.num}`}
            className="group bg-[#0e0e13] border border-white/5 rounded-sm p-5 hover:border-[#E63946]/40 transition-all flex flex-col gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a09ca8]">{item.label}</span>
            <span className="font-display font-black text-3xl leading-none" style={{ color: item.color }}>
              {item.num}
            </span>
            <span className="text-[10px] text-[#a09ca8] group-hover:text-white transition-colors">Tap to call →</span>
          </a>
        ))}
      </div>

      <div className="mx-6 mb-6 p-4 bg-[#E63946]/5 border border-[#E63946]/20 rounded-sm">
        <p className="text-xs text-[#e4e1e9] leading-relaxed">
          <strong className="text-[#E63946]">⚠️ Remember:</strong> In a road emergency, dial <strong>112</strong> first. 
          It connects you to Police, Fire, and Medical services simultaneously.
        </p>
      </div>

      <div className="px-6 pb-6">
        <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#a09ca8] mb-3">International</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { country: '🇬🇧 UK', num: '999' },
            { country: '🇺🇸 USA', num: '911' },
            { country: '🇦🇺 AU', num: '000' },
            { country: '🇩🇪 EU', num: '112' },
            { country: '🇯🇵 JP', num: '119' },
            { country: '🇸🇬 SG', num: '995' },
          ].map(c => (
            <div key={c.num} className="bg-[#0e0e13] border border-white/5 rounded-sm p-3 text-center">
              <p className="text-[10px] text-[#a09ca8]">{c.country}</p>
              <p className="font-display font-bold text-lg text-[#e4e1e9]">{c.num}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
