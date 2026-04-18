import React from 'react';
import { Service } from '../data';

interface ServiceCardProps {
  service: Service;
  colorClass?: string;
}

export function ServiceCard({ service, colorClass = 'text-[#4fdbcc]' }: ServiceCardProps) {
  return (
    <div className="bg-[#0e0e13] p-4 border border-white/5 rounded-sm space-y-2">
      <div className="flex justify-between items-start">
        <span className="font-bold text-[#e4e1e9] text-sm">{service.name}</span>
        {service.distanceKm !== undefined && (
          <span className="text-[10px] bg-[#E63946]/10 text-[#E63946] px-1.5 py-0.5 rounded-sm font-mono">
            {service.distanceKm.toFixed(1)} km
          </span>
        )}
      </div>
      <p className="text-[#a09ca8] text-xs">{service.address}</p>
      {service.speciality && (
        <p className="text-xs italic text-[#a09ca8]">🩺 {service.speciality}</p>
      )}
      {service.costPerKm && (
        <p className="text-xs text-[#ffba27]">💰 ₹{service.costPerKm}/km approx</p>
      )}
      <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2">
        <a href={`tel:${service.phone}`} className={`font-bold text-sm ${colorClass} hover:underline`}>
          📞 {service.phone}
        </a>
        <span className="text-[10px] text-[#a09ca8]">
          {service.open24h ? '🟢 24/7' : `🕐 ${service.hours ?? 'Check hours'}`}
        </span>
      </div>
    </div>
  );
}
