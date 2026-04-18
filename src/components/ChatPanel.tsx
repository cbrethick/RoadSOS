import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, MapPin } from 'lucide-react';
import { ChatMessage, getAIResponse } from '../gemini';
import { ServiceCard } from './ServiceCard';

interface ChatPanelProps {
  location: { lat: number; lng: number } | null;
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  text: "Emergency protocol initialized. I've detected you might be in distress. Are you and everyone involved safe? 🚑💨",
  suggestions: ['Find hospitals', 'Call police', 'Report Accident', 'Emergency numbers'],
};

export function ChatPanel({ location }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await getAIResponse(
        trimmed,
        messages,
        location?.lat,
        location?.lng,
      );
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: res.text,
        services: res.services,
        suggestions: res.suggestions,
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'bot',
        text: '⚠️ Connection error. Please dial **112** directly if it\'s urgent.',
        isError: true,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse max-w-xl ml-auto' : 'max-w-2xl'} msg-appear`}>
            {msg.role === 'bot' && (
              <div className="w-9 h-9 bg-[#93000a] rounded-sm flex items-center justify-center flex-shrink-0 shadow-red">
                <span className="text-base">🚨</span>
              </div>
            )}
            <div className="space-y-3 flex-1">
              <div className={`p-4 rounded-sm text-sm leading-relaxed font-medium whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-[#E63946] text-white shadow-red'
                  : msg.isError
                  ? 'bg-[#2a292f] border-l-2 border-yellow-500 text-[#e4e1e9]'
                  : 'bg-[#2a292f] border-l-2 border-[#E63946] text-[#e4e1e9]'
              }`}>
                {msg.text}
              </div>

              {/* Nearby Services */}
              {msg.services && msg.services.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E63946]">📍 Nearby Services</p>
                  {msg.services.map(s => (
                    <ServiceCard key={s.id} service={s} colorClass={s.type === 'hospital' ? 'text-[#4fdbcc]' : s.type === 'police' ? 'text-blue-400' : 'text-[#ffba27]'} />
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {msg.suggestions && msg.role === 'bot' && (
                <div className="flex flex-wrap gap-2">
                  {msg.suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-3 py-1.5 bg-[#0e0e13] border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#a09ca8] hover:border-[#4fdbcc] hover:text-[#4fdbcc] transition-all rounded-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3 max-w-2xl">
            <div className="w-9 h-9 bg-[#93000a] rounded-sm flex items-center justify-center flex-shrink-0 animate-pulse">
              <span className="text-base">🚨</span>
            </div>
            <div className="bg-[#2a292f] border-l-2 border-[#E63946] px-4 py-3 rounded-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E63946] typing-dot"></span>
              <span className="w-2 h-2 rounded-full bg-[#E63946] typing-dot"></span>
              <span className="w-2 h-2 rounded-full bg-[#E63946] typing-dot"></span>
            </div>
          </div>
        )}
      </div>

      {/* Location banner */}
      {!location && (
        <div className="mx-6 mb-2 px-4 py-2 bg-[#ffba27]/10 border border-[#ffba27]/20 rounded-sm flex items-center gap-2 text-xs text-[#ffba27]">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Share your location for more accurate results</span>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-[#1c1c24] border-t border-white/5">
        <form
          className="flex gap-3"
          onSubmit={e => { e.preventDefault(); send(input); }}
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your emergency..."
              className="w-full bg-[#0e0e13] border border-white/5 focus:border-[#E63946] focus:outline-none text-[#e4e1e9] placeholder:text-white/20 py-3.5 px-5 pr-24 rounded-sm text-sm font-medium transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-white/30">
              <button type="button" className="hover:text-white transition-colors p-1">
                <Paperclip className="w-4 h-4" />
              </button>
              <button type="button" className="hover:text-white transition-colors p-1">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-[#E63946] text-white flex items-center justify-center rounded-sm hover:bg-[#c0303b] transition-colors shadow-red disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
