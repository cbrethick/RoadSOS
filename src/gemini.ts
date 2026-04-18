import React from 'react';
import { GoogleGenAI } from '@google/genai';
import { getNearby, EMERGENCY_NUMBERS, Service } from './data';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  services?: Service[];
  suggestions?: string[];
  isError?: boolean;
}

const SYSTEM_PROMPT = `You are RoadSOS, a professional AI Emergency Dispatch Assistant for India.
You help people facing road emergencies: accidents, breakdowns, medical emergencies, flat tyres, etc.
Rules:
1. ALWAYS be calm, direct, and helpful.
2. For accidents: First ask if everyone is safe. Then advise calling 112.
3. Keep responses SHORT (2-4 sentences). Use markdown bold for emphasis.
4. Never ask more than one question at a time.
5. For service requests (hospital/police/towing/puncture), acknowledge and say you're showing nearby options.
6. Emergency numbers: National Emergency: 112 | Ambulance: 108 | Police: 100 | Road Accident: 1073`;

const INTENT_KEYWORDS = {
  accident: ['accident', 'crash', 'collision', 'hit', 'injured', 'injury', 'hurt', 'blood'],
  hospital: ['hospital', 'medical', 'doctor', 'ambulance', 'trauma', 'wound', 'pain', 'emergency'],
  police: ['police', 'fir', 'report', 'theft', 'stolen', 'cop', 'station'],
  towing: ['tow', 'towing', 'breakdown', 'broken', 'stranded', 'stuck', 'car won'],
  puncture: ['puncture', 'flat tyre', 'flat tire', 'tyre', 'wheel'],
};

type Intent = keyof typeof INTENT_KEYWORDS | 'greeting' | 'numbers' | 'unknown';

function detectIntent(msg: string): Intent {
  const lower = msg.toLowerCase();
  if (/^(hi|hello|hey|sos|help|start)/.test(lower)) return 'greeting';
  if (/number|contact|dial|helpline/.test(lower)) return 'numbers';
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) return intent as Intent;
  }
  return 'unknown';
}

function getSuggestions(intent: Intent): string[] {
  const map: Record<Intent, string[]> = {
    greeting: ['I had an accident 🚗', 'Need ambulance 🚑', 'Call police 👮', 'Car breakdown 🔧'],
    accident: ['Yes, injuries present', 'No injuries', 'Find hospitals', 'Need police'],
    hospital: ['Get ambulance', 'Find police', 'Emergency numbers'],
    police: ['Need hospital', 'Need towing', 'Emergency numbers'],
    towing: ['Find hospital', 'Puncture repair', 'Emergency numbers'],
    puncture: ['Need towing instead', 'Find hospital', 'Emergency numbers'],
    numbers: ['I had an accident', 'Find hospitals', 'Need ambulance'],
    unknown: ['I had an accident', 'Find hospitals', 'Call police', 'Emergency numbers'],
  };
  return map[intent] ?? map.unknown;
}

const DEFAULT_LAT = 13.0478;
const DEFAULT_LNG = 80.2567;

export async function getAIResponse(
  message: string,
  history: ChatMessage[],
  lat?: number,
  lng?: number
): Promise<{ text: string; services?: Service[]; suggestions?: string[] }> {
  const intent = detectIntent(message);
  const userLat = lat ?? DEFAULT_LAT;
  const userLng = lng ?? DEFAULT_LNG;

  let services: Service[] | undefined;
  
  // Fetch nearby services based on intent
  if (intent === 'accident') {
    services = [
      ...getNearby(userLat, userLng, 'hospital', 2),
      ...getNearby(userLat, userLng, 'ambulance', 2),
      ...getNearby(userLat, userLng, 'police', 1),
    ];
  } else if (intent === 'hospital') {
    services = getNearby(userLat, userLng, 'hospital', 4);
  } else if (intent === 'police') {
    services = getNearby(userLat, userLng, 'police', 3);
  } else if (intent === 'towing') {
    services = getNearby(userLat, userLng, 'towing', 3);
  } else if (intent === 'puncture') {
    services = getNearby(userLat, userLng, 'puncture', 3);
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return {
      text: getDemoResponse(intent),
      services,
      suggestions: getSuggestions(intent),
    };
  }

  try {
    // Build valid history: must start with user, alternate user/model
    const validHistory = [];
    const filtered = history.filter(m => m.role === 'user' || m.role === 'bot');
    // Skip any leading bot messages
    let started = false;
    for (const msg of filtered) {
      if (!started && msg.role === 'bot') continue;
      started = true;
      validHistory.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    }

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      history: validHistory,
      config: { systemInstruction: SYSTEM_PROMPT, maxOutputTokens: 200 },
    });

    const result = await chat.sendMessage({ message });
    const text = result.text ?? 'Unable to get response.';

    return { text, services, suggestions: getSuggestions(intent) };
  } catch (err) {
    console.error('Gemini error:', err);
    return {
      text: getDemoResponse(intent),
      services,
      suggestions: getSuggestions(intent),
    };
  }
}

function getDemoResponse(intent: Intent): string {
  const map: Record<Intent, string> = {
    greeting: '🚨 **RoadSOS Active.** I\'m your AI emergency dispatcher. Tell me your emergency and I\'ll help immediately. Are you safe right now?',
    accident: '🆘 **ACCIDENT PROTOCOL ACTIVATED.** First — are there any injuries? If yes, call **112** immediately. I\'ve located the nearest emergency services below. Stay calm and stay safe.',
    hospital: '🏥 **Finding nearest hospitals.** Here are the closest trauma centres and emergency units near you. Call **108** for ambulance dispatch.',
    police: '👮 **Locating nearest police stations.** Call **100** for direct police line or **112** for national emergency. Here are the closest stations.',
    towing: '🔧 **Locating towing services.** Here are the nearest breakdown recovery units near you. Turn on hazard lights and stay with your vehicle.',
    puncture: '🛞 **Puncture repair shops located.** Here are the nearest tyre services. If it\'s late night, consider calling a towing service.',
    numbers: `📞 **Emergency Helplines India:**\n• **112** — National Emergency\n• **108** — Ambulance\n• **100** — Police\n• **101** — Fire\n• **1073** — Road Accident\n• **1091** — Women Helpline`,
    unknown: 'I\'m here to help with road emergencies. You can ask me about accidents, hospitals, police, ambulance, towing, or puncture repair. What do you need?',
  };
  return map[intent] ?? map.unknown;
}
