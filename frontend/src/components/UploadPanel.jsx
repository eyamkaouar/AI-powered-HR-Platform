import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const UploadPanel = ({ onParse, status }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file.');
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (file) {
      onParse(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Upload CV</h2>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors ${
          file ? 'border-primary-400 bg-primary-50' : 'border-slate-200 hover:border-primary-300'
        }`}
      >
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {file ? (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary-100 rounded-full text-primary-600 mb-4">
              <FileText size={32} />
            </div>
            <p className="text-slate-700 font-medium mb-1">{file.name}</p>
            <p className="text-slate-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4">
              <Upload size={32} />
            </div>
            <p className="text-slate-700 font-medium mb-1">Drag & drop your PDF here</p>
            <p className="text-slate-400 text-sm">or click to browse files</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || status === 'loading'}
        className={`w-full mt-8 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          !file || status === 'loading'
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Parsing CV...
          </>
        ) : (
          <>
            <CheckCircle2 size={20} />
            Parse CV
          </>
        )}
      </button>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Status</h4>
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${
            status === 'idle' ? 'bg-slate-300' : 
            status === 'loading' ? 'bg-amber-400 animate-pulse' : 'bg-green-500'
          }`} />
          <span className="text-sm font-medium text-slate-600 capitalize">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;
