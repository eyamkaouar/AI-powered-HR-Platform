import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ title, icon: Icon, data, delay = 0, columns = 2 }) => {
  if (!data || Object.keys(data).length === 0) return null;

  // Identify if this is a "Binary Section" (like tech stacks) vs "Metrics Section"
  const isBinarySection = Object.keys(data).some(key => 
    key.startsWith('plat_') || key.startsWith('fw_') || key.startsWith('lang_') || 
    key.startsWith('db_') || key.startsWith('ai_') || key.startsWith('dev_') || 
    key.startsWith('misc_') || key === 'is_usa' || key === 'is_senior' || key === 'is_fulltime'
  );

  const formatLabel = (key) => {
    // Specialized formatting for common prefixes
    let label = key.replace(/^(plat_|fw_|misc_|lang_|db_|ai_|dev_)/, '');
    
    // Handle double underscores (often used for special chars)
    label = label.replace(/__/g, ' ');
    
    // Handle trailing underscore (often from special char mapping)
    label = label.replace(/_$/, '');
    
    // Convert snake_case to Space Case
    label = label.replace(/_/g, ' ');
    
    // Capitalize acronyms or specific terms
    return label.split(' ').map(word => {
      if (['p90', 'p75', 'p25', 'p10', 'iqr', 'usa', 'cv', 'te', 'ai', 'aws', 'sql', 'php', 'vba', 'gap', 'pro', 'exp', 'edu'].includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all group"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-[1.25rem] text-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Detected Expertise</p>
        </div>
      </div>

      
      {isBinarySection ? (
        <div className="flex flex-wrap gap-2">
          {Object.entries(data).map(([key, value]) => {
            if (value === 0 || value === "0" || value === null) return null;
            return (
              <motion.span 
                key={key}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100/50 shadow-sm whitespace-nowrap"
              >
                {formatLabel(key)}
              </motion.span>
            );
          })}
          {Object.values(data).every(v => v === 0 || v === "0") && (
            <span className="text-slate-400 text-sm italic">No specific technologies detected.</span>
          )}
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-x-12 gap-y-6`}>
          {Object.entries(data).map(([key, value]) => {
            if (value === null || value === "") return null;
            
            return (
              <div key={key} className="flex flex-col gap-1 border-l-2 border-slate-50 pl-4 hover:border-primary-200 transition-colors">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{formatLabel(key)}</span>
                <span className="text-slate-800 font-bold text-base">
                  {typeof value === 'number' ? 
                    (value % 1 === 0 ? value.toLocaleString() : value.toFixed(3)) 
                    : value}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default ResultCard;
