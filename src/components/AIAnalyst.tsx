import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Brain, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const AIAnalyst: React.FC = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    const newResponses = [...responses, { role: 'user' as const, text: query }];
    setResponses(newResponses);
    const currentQuery = query;
    setQuery('');

    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: currentQuery,
        config: {
          systemInstruction: "You are an AI Tactical Dispatch Analyst for RoadSOS. Your goal is to provide brief, high-stakes tactical summaries and triage advice for emergency response. Keep it concise, professional, and technical.",
        }
      });

      const aiText = result.text || "Unable to process tactical analysis.";
      setResponses([...newResponses, { role: 'ai' as const, text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setResponses([...newResponses, { role: 'ai' as const, text: "SIGNAL INTERRUPTED: LINK ERROR" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1C1E] border border-[#2A2D31] rounded-lg overflow-hidden">
      <div className="p-3 border-b border-[#2A2D31] bg-[#141517] flex items-center gap-2">
        <Brain size={16} className="text-red-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Dispatch AI Analyst</span>
      </div>
      
      <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar min-h-[150px]">
        {responses.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-[#8E9299] text-center p-4">
            <Brain size={32} className="opacity-10 mb-2" />
            <p className="text-[10px] uppercase font-bold opacity-30 tracking-tight">System Ready for Analysis</p>
          </div>
        )}
        <AnimatePresence>
          {responses.map((res, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`text-[11px] leading-relaxed p-2 rounded ${res.role === 'user' ? 'bg-[#2A2D31] ml-4' : 'bg-[#0C0D0E] border-l-2 border-red-600 mr-4'}`}
            >
              <div className="font-bold text-[8px] uppercase mb-1 opacity-50">
                {res.role === 'user' ? 'Operator' : 'AI Analyst'}
              </div>
              {res.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex items-center gap-2 text-[10px] text-red-500 animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            ANALYZING DATA...
          </div>
        )}
      </div>

      <div className="p-2 bg-[#141517] border-t border-[#2A2D31] flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSuggest()}
          placeholder="ENTER TACTICAL QUERY..."
          className="flex-1 bg-[#0C0D0E] border border-[#2A2D31] rounded px-3 py-1.5 text-[10px] font-mono focus:outline-none focus:border-red-500 transition-colors uppercase"
        />
        <button 
          onClick={handleSuggest}
          disabled={loading}
          className="w-10 h-8 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600 rounded flex items-center justify-center transition-colors"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
