import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Ambulance, Hospital, Shield, Wrench, Fan, 
  Phone, Settings, MapPin, Share2, UserCircle, MessageSquare
} from 'lucide-react';
import { ChatPanel } from './components/ChatPanel';
import { ServicePage } from './components/ServicePage';
import { AccidentPage } from './components/AccidentPage';
import { NumbersPage } from './components/NumbersPage';
import { SettingsPage } from './components/SettingsPage';

type Page = 'chat' | 'accident' | 'ambulance' | 'hospital' | 'police' | 'towing' | 'puncture' | 'numbers' | 'settings';

interface NavItem {
  id: Page;
  label: string;
  Icon: React.FC<{ className?: string }>;
  color: string;
  border: string;
  bg: string;
}

const NAV: NavItem[] = [
  { id: 'accident',  label: 'Accident Emergency', Icon: AlertTriangle, color: 'text-[#E63946]', border: 'border-[#E63946]', bg: 'hover:bg-[#E63946]/5' },
  { id: 'ambulance', label: 'Ambulance',          Icon: Ambulance,     color: 'text-[#4fdbcc]', border: 'border-[#4fdbcc]', bg: 'hover:bg-[#4fdbcc]/5' },
  { id: 'hospital',  label: 'Hospital',           Icon: Hospital,      color: 'text-[#4fdbcc]', border: 'border-[#4fdbcc]', bg: 'hover:bg-[#4fdbcc]/5' },
  { id: 'police',    label: 'Police',             Icon: Shield,        color: 'text-blue-400',  border: 'border-blue-500',  bg: 'hover:bg-blue-500/5' },
  { id: 'towing',    label: 'Towing',             Icon: Wrench,        color: 'text-[#ffba27]', border: 'border-[#ffba27]', bg: 'hover:bg-[#ffba27]/5' },
  { id: 'puncture',  label: 'Puncture',           Icon: Fan,           color: 'text-[#ffba27]', border: 'border-[#ffba27]', bg: 'hover:bg-[#ffba27]/5' },
];

export default function App() {
  const [page, setPage] = useState<Page>('chat');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      pos => { setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocationStatus('ok'); },
      () => setLocationStatus('error'),
      { timeout: 8000 }
    );
  };

  useEffect(() => { requestLocation(); }, []);

  const renderPage = () => {
    switch (page) {
      case 'chat':      return <ChatPanel location={location} />;
      case 'accident':  return <AccidentPage />;
      case 'hospital':  return <ServicePage type="hospital" location={location} />;
      case 'ambulance': return <ServicePage type="ambulance" location={location} />;
      case 'police':    return <ServicePage type="police" location={location} />;
      case 'towing':    return <ServicePage type="towing" location={location} />;
      case 'puncture':  return <ServicePage type="puncture" location={location} />;
      case 'numbers':   return <NumbersPage />;
      case 'settings':  return <SettingsPage />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#131318] text-[#e4e1e9]" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* ═══ TOPBAR ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#131318] border-b border-white/5 shadow-[0_4px_20px_rgba(230,57,70,0.12)] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E63946] rounded-sm flex items-center justify-center shadow-red flex-shrink-0">
            <span className="text-base">🚨</span>
          </div>
          <h1 className="font-display font-black uppercase tracking-tighter text-2xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Road<span className="text-[#E63946]">SOS</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* 24/7 badge */}
          <div className="flex items-center gap-2 bg-[#4fdbcc]/10 px-3 py-1 rounded-sm border border-[#4fdbcc]/20">
            <span className="flex h-2 w-2 rounded-full bg-[#4fdbcc] pulse-slow"></span>
            <span className="text-[#4fdbcc] font-bold text-[10px] tracking-widest uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>24/7 Active</span>
          </div>

          {/* Location button */}
          <button
            onClick={requestLocation}
            className={`flex items-center gap-2 border px-3 py-1.5 font-bold text-xs tracking-widest uppercase transition-colors rounded-sm ${
              locationStatus === 'ok' 
                ? 'border-[#4fdbcc] text-[#4fdbcc] bg-[#4fdbcc]/10' 
                : 'border-[#ffba27] text-[#ffba27] hover:bg-[#ffba27]/10'
            }`}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <MapPin className="w-3.5 h-3.5" />
            {locationStatus === 'ok' ? 'Location Active' : locationStatus === 'loading' ? 'Locating...' : 'Share Location'}
          </button>

          <div className="flex gap-3 ml-2">
            <button onClick={() => setPage('numbers')} className="hover:text-[#E63946] transition-colors p-1">
              <Phone className="w-5 h-5" />
            </button>
            <button onClick={() => setPage('settings')} className="hover:text-[#E63946] transition-colors p-1">
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ SIDEBAR ═══ */}
      <aside className="fixed left-0 top-16 bottom-0 w-[17rem] bg-[#1c1c24] border-r border-white/5 flex flex-col overflow-y-auto z-40 no-scrollbar">
        <div className="p-5 flex flex-col gap-2 flex-1">

          {/* Chat button */}
          <button
            onClick={() => setPage('chat')}
            className={`flex items-center gap-3 p-3.5 border-l-4 transition-all group rounded-r-sm ${
              page === 'chat' 
                ? 'border-[#E63946] bg-[#E63946]/5 text-[#E63946]' 
                : 'border-transparent hover:border-[#E63946]/40 hover:bg-[#E63946]/5 text-[#a09ca8]'
            }`}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="font-bold text-xs tracking-widest uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>AI Dispatcher</span>
          </button>

          {/* Divider */}
          <p className="px-1 pt-2 pb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#a09ca8]/40" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Emergency Services</p>

          {/* Service nav */}
          {NAV.map(({ id, label, Icon, color, border, bg }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex items-center gap-3 p-3.5 border-l-4 transition-all group rounded-r-sm ${
                page === id
                  ? `${border} bg-white/5 ${color}`
                  : `border-transparent ${bg} text-[#a09ca8]`
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${page === id ? color : ''}`} />
              <span className="font-bold text-xs tracking-widest uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{label}</span>
            </button>
          ))}

          {/* Critical Numbers */}
          <div className="mt-6">
            <p className="font-black text-[10px] tracking-[0.2em] text-[#E63946] uppercase mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>CRITICAL ACTIONS</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'National', num: '112', color: 'text-[#E63946]', href: 'tel:112' },
                { label: 'Ambulance', num: '108', color: 'text-[#4fdbcc]', href: 'tel:108' },
                { label: 'Police', num: '100', color: 'text-blue-400', href: 'tel:100' },
                { label: 'Accident', num: '1073', color: 'text-[#ffba27]', href: 'tel:1073' },
              ].map(item => (
                <a key={item.num} href={item.href}
                  className="bg-[#0e0e13] p-3 border border-white/5 rounded-sm hover:border-[#E63946]/30 transition-colors"
                >
                  <span className="block text-[8px] font-bold text-[#a09ca8] uppercase mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.label}</span>
                  <span className={`text-2xl font-black leading-none ${item.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.num}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-1">
          <button onClick={() => setPage('numbers')} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#a09ca8] hover:text-white transition-colors py-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <Phone className="w-4 h-4" /> Emergency Numbers
          </button>
          <button onClick={() => setPage('settings')} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#a09ca8] hover:text-white transition-colors py-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <Settings className="w-4 h-4" /> Settings & Support
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="ml-[17rem] pt-16 flex-1 flex flex-col overflow-hidden relative bg-[#131318]">
        {/* Page content */}
        <div className="flex-1 overflow-hidden">
          {renderPage()}
        </div>

        {/* Ambient decoration */}
        <div className="absolute bottom-20 right-8 w-64 h-64 bg-[#E63946]/3 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Live Incident Map (top-right, only on chat page) */}
        {page === 'chat' && (
          <div className="fixed top-20 right-6 w-72 h-44 bg-[#35343a] rounded-sm border border-white/10 overflow-hidden shadow-2xl z-30 hidden xl:block">
            <div className="absolute top-2 left-2 z-10 bg-[#131318]/80 backdrop-blur-md px-2 py-1 rounded-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E63946] rounded-full pulse-slow"></span>
              <span className="text-[8px] font-bold uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Live Incident View</span>
            </div>
            {/* Dark map grid simulation */}
            <div className="absolute inset-0 bg-[#0e0e13]">
              <svg width="100%" height="100%" opacity="0.15">
                {Array.from({ length: 10 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#4fdbcc" strokeWidth="0.5" />
                    <line x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#4fdbcc" strokeWidth="0.5" />
                  </React.Fragment>
                ))}
              </svg>
              {/* Roads */}
              <svg className="absolute inset-0" width="100%" height="100%" opacity="0.3">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffffff" strokeWidth="2" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#ffffff" strokeWidth="1" />
                <line x1="0" y1="30%" x2="100%" y2="70%" stroke="#ffffff" strokeWidth="0.5" />
              </svg>
              {/* Incident markers */}
              <div className="absolute" style={{ top: '48%', left: '48%' }}>
                <div className="w-3 h-3 bg-[#E63946] rounded-full animate-ping opacity-75 absolute -top-1.5 -left-1.5"></div>
                <div className="w-2 h-2 bg-[#E63946] rounded-full shadow-red"></div>
              </div>
              {location && (
                <div className="absolute" style={{ top: '30%', left: '60%' }}>
                  <div className="w-2 h-2 bg-[#4fdbcc] rounded-full shadow-teal"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
