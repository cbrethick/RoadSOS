import React from 'react';
import { getNearby } from '../data';
import { ServiceCard } from './ServiceCard';
import { AlertTriangle, Shield, Wrench, Fan, Ambulance, Hospital } from 'lucide-react';

interface ServicePageProps {
  type: 'hospital' | 'police' | 'towing' | 'puncture' | 'ambulance';
  location: { lat: number; lng: number } | null;
}

const CONFIG = {
  hospital: {
    title: 'Hospitals & Trauma Centres',
    icon: Hospital,
    color: 'text-[#4fdbcc]',
    borderColor: 'border-[#4fdbcc]',
    callout: '📞 Ambulance Dispatch: 108',
    cardColor: 'text-[#4fdbcc]',
  },
  police: {
    title: 'Police Stations',
    icon: Shield,
    color: 'text-blue-400',
    borderColor: 'border-blue-500',
    callout: '📞 Police: 100 | National: 112',
    cardColor: 'text-blue-400',
  },
  towing: {
    title: 'Towing & Breakdown',
    icon: Wrench,
    color: 'text-[#ffba27]',
    borderColor: 'border-[#ffba27]',
    callout: '🔧 Turn on hazard lights and stay with vehicle',
    cardColor: 'text-[#ffba27]',
  },
  puncture: {
    title: 'Tyre & Puncture Repair',
    icon: Fan,
    color: 'text-[#ffba27]',
    borderColor: 'border-[#ffba27]',
    callout: '🛞 Keep away from traffic while replacing tyre',
    cardColor: 'text-[#ffba27]',
  },
  ambulance: {
    title: 'Ambulance Services',
    icon: Ambulance,
    color: 'text-[#4fdbcc]',
    borderColor: 'border-[#4fdbcc]',
    callout: '📞 National Ambulance: 108',
    cardColor: 'text-[#4fdbcc]',
  },
};

const DEFAULT = { lat: 13.0478, lng: 80.2567 };

export function ServicePage({ type, location }: ServicePageProps) {
  const cfg = CONFIG[type];
  const Icon = cfg.icon;
  const { lat, lng } = location ?? DEFAULT;
  const services = getNearby(lat, lng, type === 'ambulance' ? 'ambulance' : type, 5);

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Hero header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-1">
          <Icon className={`w-6 h-6 ${cfg.color}`} />
          <h2 className="font-display font-black text-xl uppercase tracking-tight text-[#e4e1e9]">{cfg.title}</h2>
        </div>
        <p className={`text-xs font-bold ${cfg.color}`}>{cfg.callout}</p>
        {!location && (
          <p className="text-[10px] text-[#ffba27] mt-2">⚠️ Using default location (Chennai). Share location for accurate results.</p>
        )}
      </div>

      {/* Service list */}
      <div className="p-6 space-y-3">
        {services.length > 0 ? (
          services.map(s => <ServiceCard key={s.id} service={s} colorClass={cfg.cardColor} />)
        ) : (
          <div className="text-center text-[#a09ca8] py-10">
            <p className="text-4xl mb-3">📍</p>
            <p>No services found nearby. Call <strong className="text-[#E63946]">112</strong> immediately.</p>
          </div>
        )}
      </div>
    </div>
  );
}
