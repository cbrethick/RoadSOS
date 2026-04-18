import React from 'react';

export function SettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h2 className="font-display font-black text-xl uppercase tracking-tight text-[#e4e1e9]">⚙️ Settings & Support</h2>
        <p className="text-xs text-[#a09ca8] mt-1">Configure RoadSOS preferences</p>
      </div>

      {/* Profile */}
      <section>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a09ca8] mb-3">My Profile</h3>
        <div className="bg-[#0e0e13] border border-white/5 rounded-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#E63946] rounded-full flex items-center justify-center text-2xl">👤</div>
          <div>
            <p className="font-bold text-[#e4e1e9]">Emergency User</p>
            <p className="text-xs text-[#a09ca8]">No profile configured</p>
            <button className="mt-2 text-[10px] font-bold text-[#4fdbcc] uppercase tracking-widest hover:underline">Configure →</button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a09ca8] mb-3">Location Settings</h3>
        <div className="space-y-2">
          {['Always share location in emergency', 'Auto-detect nearest services', 'Save common locations'].map(item => (
            <div key={item} className="bg-[#0e0e13] border border-white/5 rounded-sm p-4 flex items-center justify-between">
              <span className="text-sm text-[#e4e1e9]">{item}</span>
              <div className="w-10 h-5 bg-[#E63946] rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support */}
      <section>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a09ca8] mb-3">Support</h3>
        <div className="space-y-2">
          {[
            { icon: '📖', label: 'User Guide', desc: 'How to use RoadSOS' },
            { icon: '🐛', label: 'Report an Issue', desc: 'Help us improve' },
            { icon: 'ℹ️', label: 'About RoadSOS', desc: 'v1.0 — AI Emergency Dispatch' },
          ].map(item => (
            <div key={item.label} className="bg-[#0e0e13] border border-white/5 rounded-sm p-4 flex items-center gap-3 cursor-pointer hover:border-[#E63946]/30 transition-colors">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-[#e4e1e9]">{item.label}</p>
                <p className="text-xs text-[#a09ca8]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-[#E63946]/5 border border-[#E63946]/20 rounded-sm p-4">
        <p className="text-xs text-[#e4e1e9] leading-relaxed">
          <strong className="text-[#E63946]">RoadSOS</strong> — AI-powered emergency dispatch. 
          In life-threatening situations, always call <strong>112</strong> directly.
        </p>
      </div>
    </div>
  );
}
