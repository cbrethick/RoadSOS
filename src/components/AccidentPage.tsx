import React from 'react';

export function AccidentPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Emergency banner */}
      <div className="bg-[#93000a] text-[#ffdad6] py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">⚠️</span>
          <span className="font-display font-black tracking-widest uppercase text-sm">EMERGENCY MODE ACTIVE</span>
        </div>
        <a href="tel:112" className="bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-tighter hover:bg-white/30 transition-colors rounded-sm">
          Call 112
        </a>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Incident Type */}
        <section>
          <h2 className="text-xs font-bold tracking-[0.2em] text-[#a09ca8] mb-4 uppercase font-display">Select Incident Type</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🚗', label: 'Vehicle Collision' },
              { icon: '🏍️', label: 'Bike / Two-Wheeler' },
              { icon: '🚶', label: 'Pedestrian Accident' },
            ].map(item => (
              <button key={item.label} className="group bg-[#2a292f] p-5 flex flex-col items-center justify-center text-center border-b-4 border-[#E63946] hover:bg-[#E63946]/10 transition-all rounded-sm">
                <span className="text-4xl mb-3">{item.icon}</span>
                <span className="font-display font-bold text-sm text-[#e4e1e9] leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Immediate Actions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#a09ca8] uppercase font-display">Immediate Actions</h2>
            <span className="text-[10px] bg-[#ffba27] text-black px-2 py-0.5 font-bold uppercase rounded-sm">CRITICAL</span>
          </div>
          <div className="space-y-3">
            {[
              { num: '01', title: 'Secure the Perimeter', desc: 'Turn on hazard lights and place warning triangles 30m behind the vehicle.' },
              { num: '02', title: 'Check for Injuries', desc: 'Do not move injured persons unless there is immediate risk of fire or explosion.' },
              { num: '03', title: 'Document the Scene', desc: 'Take photos of all vehicles and surrounding landmarks before moving anything.' },
              { num: '04', title: 'Call Emergency Services', desc: 'Dial 112 for all emergencies or 108 for ambulance. Give your exact location.' },
            ].map(step => (
              <div key={step.num} className="flex gap-4 items-start bg-[#1b1b20] p-5 rounded-sm">
                <span className="font-display font-black text-3xl text-[#E63946]/30 flex-shrink-0">{step.num}</span>
                <div>
                  <h3 className="font-bold text-[#e4e1e9] uppercase text-sm tracking-wide">{step.title}</h3>
                  <p className="text-[#a09ca8] text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Finding Help */}
        <section className="bg-[#35343a] p-6 rounded-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-black text-[#4fdbcc]">FINDING HELP</h2>
              <p className="text-xs text-[#a09ca8]">Broadcasting GPS coordinates to local dispatch...</p>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-[#4fdbcc] text-2xl">0.8km</span>
              <p className="text-[10px] text-[#a09ca8] uppercase tracking-widest">Nearest Response</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-[#1b1b20] mb-6 rounded-full overflow-hidden">
            <div className="h-full bg-[#4fdbcc] w-2/3 shadow-teal"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:108" className="bg-[#1b1b20] p-4 flex items-center justify-between rounded-sm hover:bg-[#4fdbcc]/10 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4fdbcc]/10 flex items-center justify-center text-[#4fdbcc] rounded-sm">🚑</div>
                <div>
                  <h4 className="font-bold text-sm text-[#e4e1e9]">Ambulance</h4>
                  <p className="text-xs text-[#a09ca8]">Dial 108</p>
                </div>
              </div>
            </a>
            <a href="tel:100" className="bg-[#1b1b20] p-4 flex items-center justify-between rounded-sm hover:bg-blue-500/10 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-400 rounded-sm">👮</div>
                <div>
                  <h4 className="font-bold text-sm text-[#e4e1e9]">Police</h4>
                  <p className="text-xs text-[#a09ca8]">Dial 100</p>
                </div>
              </div>
            </a>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#4fdbcc]/5 rounded-full blur-2xl pointer-events-none"></div>
        </section>
      </div>
    </div>
  );
}
