import React from 'react';
import { Sparkles, Target, TrendingUp, Info, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MatchResultCard = ({ role, confidence = 94, category = "Primary Role Match" }) => {
  const isNoMatch = role === "No Suitable Match Found";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full bg-white rounded-[3rem] border shadow-sm overflow-hidden ${isNoMatch ? 'border-red-100' : 'border-slate-100'}`}
    >
      <div className={`p-10 border-b ${isNoMatch ? 'bg-red-50/50 border-red-50' : 'bg-slate-50/50 border-slate-50'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${isNoMatch ? 'bg-red-100 text-red-700' : 'bg-primary-100 text-primary-700'}`}>
              {isNoMatch ? 'Unsuitable Profile' : 'Highly Compatible'}
            </span>
            <span className="text-xs font-bold text-slate-400">Match Confidence: {isNoMatch ? 'N/A' : `${confidence}%`}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 text-[10px] font-black text-slate-500 uppercase shadow-sm">
            {isNoMatch ? <X size={14} className="text-red-500" /> : <Target size={14} className="text-primary-500" />}
            {isNoMatch ? "Rejection Criteria Met" : category}
          </div>
        </div>
        <h2 className={`text-4xl font-black tracking-tight leading-none ${isNoMatch ? 'text-red-800' : 'text-slate-800'}`}>{role}</h2>
      </div>
    </motion.div>
  );
};

const RecommendationCard = ({ justification }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full h-full"
    >
      <div className="w-full h-full rounded-[3rem] p-10 bg-white shadow-sm border border-slate-100">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-500" />
          Strategic Recommendation
        </h4>
        <div className="w-full break-words leading-relaxed text-gray-600 text-base font-medium">
          "{justification}"
        </div>
      </div>
    </motion.div>
  );
};

const GrowthPathCard = ({ areas }) => {
  if (!areas || areas.length === 0) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full h-full"
    >
      <div className="w-full h-full rounded-[3rem] border border-slate-100 shadow-sm p-10 bg-white">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary-500" />
          Targeted Growth Path
        </h4>
        <div className="space-y-4">
          {areas.map((area, idx) => (
            <div key={idx} className="flex items-center gap-5 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100/50 group hover:border-primary-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xs font-black text-primary-600 shadow-sm shrink-0">
                {idx + 1}
              </div>
              <span className="text-sm font-bold text-slate-700">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export { MatchResultCard, RecommendationCard, GrowthPathCard };
