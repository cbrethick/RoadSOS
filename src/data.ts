// Emergency services mock data with location support
export interface Service {
  id: string;
  type: 'hospital' | 'police' | 'ambulance' | 'towing' | 'puncture';
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  open24h: boolean;
  hours?: string;
  speciality?: string;
  rating?: number;
  distanceKm?: number;
  costPerKm?: number;
}

export const SERVICES: Service[] = [
  // Hospitals
  { id: 'h1', type: 'hospital', name: 'Fortis Malar Hospital', address: '52 1st Main Rd, Adyar, Chennai', lat: 13.0067, lng: 80.2527, phone: '+91-44-42892222', open24h: true, speciality: 'Trauma & ICU', rating: 4.5 },
  { id: 'h2', type: 'hospital', name: 'Apollo Hospital - Greams Road', address: '21 Greams Lane, Chennai', lat: 13.0614, lng: 80.2582, phone: '+91-44-28290200', open24h: true, speciality: 'Multi-specialty', rating: 4.7 },
  { id: 'h3', type: 'hospital', name: 'Govt. Stanley Medical College', address: 'Old Jail Rd, Park Town, Chennai', lat: 13.0936, lng: 80.2896, phone: '+91-44-25281300', open24h: true, speciality: 'Government Trauma', rating: 3.9 },
  { id: 'h4', type: 'hospital', name: 'MIOT International', address: '4/112 Mount Poonamalle Rd, Chennai', lat: 13.0418, lng: 80.1695, phone: '+91-44-42002288', open24h: true, speciality: 'Orthopedics & Trauma', rating: 4.6 },
  // Police
  { id: 'p1', type: 'police', name: 'Adyar Police Station', address: 'Adyar, Chennai - 600020', lat: 13.0012, lng: 80.2565, phone: '+91-44-24913530', open24h: true },
  { id: 'p2', type: 'police', name: 'Egmore Police Station', address: 'Egmore, Chennai - 600008', lat: 13.0735, lng: 80.2626, phone: '+91-44-28191225', open24h: true },
  { id: 'p3', type: 'police', name: 'Anna Nagar Police Station', address: 'Anna Nagar, Chennai', lat: 13.0850, lng: 80.2101, phone: '+91-44-26161100', open24h: true },
  // Ambulance
  { id: 'a1', type: 'ambulance', name: 'GVK EMRI - 108 Ambulance', address: 'Serving Tamil Nadu', lat: 13.0478, lng: 80.2567, phone: '108', open24h: true },
  { id: 'a2', type: 'ambulance', name: 'Ziqitza Ambulance', address: 'Chennai City Operations', lat: 13.0600, lng: 80.2400, phone: '+91-44-45454545', open24h: true },
  // Towing
  { id: 't1', type: 'towing', name: 'Chennai Highway Towing', address: 'GST Road, Chromepet, Chennai', lat: 12.9518, lng: 80.1389, phone: '+91-98400-12345', open24h: true, costPerKm: 50 },
  { id: 't2', type: 'towing', name: 'City Road Rescue', address: 'Anna Salai, Chennai', lat: 13.0560, lng: 80.2590, phone: '+91-98402-56789', open24h: true, costPerKm: 45 },
  // Puncture
  { id: 'ps1', type: 'puncture', name: 'Highway Tyre Service', address: 'NH44, Tambaram Bypass, Chennai', lat: 12.9249, lng: 80.1000, phone: '+91-94440-98765', open24h: false, hours: '6AM–10PM' },
  { id: 'ps2', type: 'puncture', name: '24x7 Tyre Centre', address: 'LBS Marg, Guindy, Chennai', lat: 13.0100, lng: 80.2100, phone: '+91-98330-11223', open24h: true },
];

export const EMERGENCY_NUMBERS = [
  { label: 'National Emergency', num: '112', color: '#E63946' },
  { label: 'Ambulance', num: '108', color: '#4fdbcc' },
  { label: 'Police', num: '100', color: '#60a5fa' },
  { label: 'Fire Brigade', num: '101', color: '#f97316' },
  { label: 'Road Accident', num: '1073', color: '#ffba27' },
  { label: 'Women Helpline', num: '1091', color: '#e879f9' },
  { label: 'Child Helpline', num: '1098', color: '#34d399' },
  { label: 'Tourist Helpline', num: '1363', color: '#94a3b8' },
];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

export function getNearby(lat: number, lng: number, type?: Service['type'], limit = 5): Service[] {
  return SERVICES
    .filter(s => !type || s.type === type)
    .map(s => ({ ...s, distanceKm: haversine(lat, lng, s.lat, s.lng) }))
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
    .slice(0, limit);
}
