import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

const UploadZone = ({ onParse, status }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file.');
      setFile(null);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files[0]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Candidate CV</h3>
        <p className="text-slate-400 text-sm">Upload a PDF to extract structured candidate data automatically.</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${
          isDragging ? 'border-primary-500 bg-primary-50/50 scale-[0.99]' : 
          file ? 'border-primary-400 bg-primary-50/30' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
        }`}
      >
        <input 
          type="file" 
          accept=".pdf" 
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div 
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <div className="p-5 bg-primary-100 rounded-2xl text-primary-600 mb-4">
                  <FileText size={40} />
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-slate-800 font-bold mb-1 max-w-[200px] truncate">{file.name}</p>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{(file.size / 1024).toFixed(2)} KB</p>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="p-5 bg-slate-50 rounded-2xl text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                <Upload size={40} />
              </div>
              <p className="text-slate-700 font-bold mb-1">Click or drag & drop</p>
              <p className="text-slate-400 text-sm">PDF files only (max 10MB)</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl"
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </motion.div>
      )}

      <button
        onClick={() => onParse(file)}
        disabled={!file || status === 'loading'}
        className={`w-full mt-8 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
          !file || status === 'loading'
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-500/20 active:scale-[0.98]'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Analyzing Candidate...
          </>
        ) : (
          <>
            <CheckCircle2 size={20} />
            Analyze Profile
          </>
        )}
      </button>

      {status === 'loading' && (
        <div className="mt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Engine Status</span>
            <span className="text-xs font-bold text-primary-600">Processing...</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-primary-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
