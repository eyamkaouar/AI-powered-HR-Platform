import React, { useState } from 'react';
import { User, Users, Briefcase, GraduationCap, Code, DollarSign, Layout, Info, Globe, TrendingUp, Cpu, Server, Database, Sparkles, Terminal, X, Zap, Target, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import CandidatesPage from './pages/CandidatesPage';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import SalaryMap from './components/SalaryMap';
import { MatchResultCard, RecommendationCard, GrowthPathCard } from './components/AIComponents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [isReportExpanded, setIsReportExpanded] = useState(false);
  const [user, setUser] = useState({
    name: 'Eya Mkouar',
    role: 'Senior Recruiter',
    avatar: null,
    email: 'eya.mkouar@ai-hr.com'
  });

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const roles = [
    { 
      id: 'ds', 
      title: 'Data Scientist', 
      count: 12, 
      color: 'bg-blue-500',
      requirements: ['Python', 'PyTorch/TensorFlow', 'SQL', 'Statistics', 'BigQuery'],
      description: 'Focus on predictive modeling and advanced analytics pipeline.'
    },
    { 
      id: 'se', 
      title: 'Software Engineer', 
      count: 45, 
      color: 'bg-indigo-500',
      requirements: ['React/Vue', 'Node.js', 'PostgreSQL', 'System Design', 'Git'],
      description: 'Building scalable microservices and high-performance UIs.'
    },
    { 
      id: 'ce', 
      title: 'Cloud Engineer', 
      count: 8, 
      color: 'bg-cyan-500',
      requirements: ['AWS/Azure', 'Terraform', 'Kubernetes', 'Networking', 'IAM'],
      description: 'Infrastructure automation and cloud-native architecture.'
    },
    { 
      id: 'do', 
      title: 'DevOps Specialist', 
      count: 15, 
      color: 'bg-purple-500',
      requirements: ['CI/CD', 'Docker', 'Jenkins', 'Linux Admin', 'Monitoring'],
      description: 'Bridging development and operations with automated pipelines.'
    },
    { 
      id: 'qe', 
      title: 'Quality Engineer', 
      count: 22, 
      color: 'bg-rose-500',
      requirements: ['Selenium', 'Cypress', 'Automation Testing', 'Agile', 'Jira'],
      description: 'Ensuring product excellence through automated testing suites.'
    }
  ];

  const stats = [
    { label: 'Total Employees', value: '102', icon: Users, change: '+4.5%' },
    { label: 'Open Positions', value: '18', icon: Briefcase, change: '-2%' },
    { label: 'CVs Analyzed', value: '1,240', icon: Sparkles, change: '+12%' },
    { label: 'Avg Salary Exp', value: '$124k', icon: DollarSign, change: '+0.8%' },
  ];

  const handleParse = async (file) => {
    setStatus('loading');
    setData(null);
    setShowMatchModal(false);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';
      const response = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to parse CV: ${errText}`);
      }

      const result = await response.json();
      
      // Clean up LLM response text
      if (result.ai_matching) {
        result.ai_matching.justification = result.ai_matching.justification.replace(/\*\*/g, '');
        if (result.ai_matching.improvement_areas) {
          result.ai_matching.improvement_areas = result.ai_matching.improvement_areas.map(area => area.replace(/\*\*/g, ''));
        }
      }
      
      setData(result);
      setStatus('done');
      
      if (result.ai_matching) {
        setShowMatchModal(true);
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      setStatus('idle');
      alert(`Error: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      onLogout={handleLogout}
      user={user}
    >
      <div className="p-10 max-w-[1600px] mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-50 rounded-2xl text-primary-600 group-hover:bg-primary-50 transition-colors">
                      <stat.icon size={24} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 h-full">
                <SalaryMap />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden group min-h-[250px] flex flex-col justify-center shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02]">
                  <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                    <Zap size={120} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 relative z-10">Smart Recruiter</h3>
                  <p className="text-indigo-100 text-sm mb-6 relative z-10 max-w-[200px]">Accelerate your hiring with AI-powered candidate screening and salary prediction.</p>
                  <button onClick={() => setActiveTab('upload')} className="bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-2xl shadow-xl transition-all relative z-10 w-fit hover:bg-slate-50 active:scale-95">
                    Start New Analysis
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-primary-500" />
                    Quick Insights
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Time to Hire', value: '18 Days', color: 'bg-green-500' },
                      { label: 'Offer Acceptance', value: '84%', color: 'bg-indigo-500' },
                      { label: 'Candidate Sat.', value: '4.8/5', color: 'bg-blue-500' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                          <span className="text-sm font-black text-slate-800">{item.value}</span>
                        </div>
                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full ${item.color} rounded-full opacity-80`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Roles Requirements Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Active Role Catalog</h3>
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">View All Roles</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roles.map((role, i) => (
                  <motion.div 
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 ${role.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        <Briefcase size={22} />
                      </div>
                      <span className="text-sm font-black text-slate-800">{role.count} Active</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-800 mb-3">{role.title}</h4>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">{role.description}</p>
                    
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {role.requirements.map((req, j) => (
                          <span key={j} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LEFT COLUMN: INPUT & TECHNICAL PROFILE */}
            <div className="w-full flex flex-col gap-8">
              <UploadZone onParse={handleParse} status={status} />
              
              {data && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Market Value Card */}
                  <div className="w-full bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 transform translate-x-4 -translate-y-4">
                      <DollarSign size={120} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase mb-3 opacity-70 tracking-widest">Market Salary Forecast</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold opacity-50">$</span>
                        <h3 className="text-6xl font-black tracking-tighter">
                          {Math.round(data?.predicted_salary || 0).toLocaleString()}
                        </h3>
                        <span className="text-xl font-bold opacity-50 ml-2">/ yr</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Breakdown */}
                  <div className="flex flex-col gap-6">
                    <ResultCard 
                      title="Programming Languages" 
                      icon={Code} 
                      data={Object.fromEntries(Object.entries(data || {}).filter(([k, v]) => k.startsWith('lang_') && v > 0))} 
                    />
                    <ResultCard 
                      title="Technical Frameworks" 
                      icon={Cpu} 
                      data={Object.fromEntries(Object.entries(data || {}).filter(([k, v]) => k.startsWith('fw_') && v > 0))} 
                    />
                  </div>
                </motion.div>
              )}

              {!data && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <Info size={24} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 tracking-tight">AI HR Intelligence</h4>
                  </div>
                  <div className="space-y-4">
                    {['PDF Text Extraction', '120+ Feature Engineering', 'Salary Market Prediction', 'Mistral AI Job Matching'].map((tip, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span className="text-xs font-bold text-slate-600">{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* RIGHT COLUMN: AI STRATEGIC INSIGHTS */}
            <div className="w-full flex flex-col gap-8">
              {!data && (
                <div className="w-full h-full min-h-[700px] flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-slate-100 border-dashed p-12 text-center">
                  <div className="p-12 bg-slate-50 rounded-[3rem] text-slate-200 mb-10">
                    <Sparkles size={80} strokeWidth={1} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Awaiting Resume</h3>
                  <p className="text-slate-400 max-w-sm mx-auto text-lg font-medium leading-relaxed">
                    Once you upload a PDF, our AI will generate a complete strategic evaluation here.
                  </p>
                </div>
              )}

              {data?.ai_matching && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Target size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">AI Matching Report</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Strategic Fit Analysis</p>
                    </div>
                  </div>

                  <MatchResultCard 
                    role={data.ai_matching.role_title} 
                  />
                  
                  <RecommendationCard 
                    justification={data.ai_matching.justification} 
                  />
                  
                  <GrowthPathCard 
                    areas={data.ai_matching.improvement_areas} 
                  />
                </motion.div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'candidates' && <CandidatesPage />}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
              <h2 className="text-2xl font-black text-slate-800 mb-8">Account Settings</h2>
              
              <div className="space-y-8">
                <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl">
                  <div className="relative group">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-lg" />
                    ) : (
                      <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition-all text-white text-[10px] font-black uppercase">
                      Change
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setUser({...user, avatar: reader.result});
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 mb-1">Profile Photo</h4>
                    <p className="text-xs text-slate-400 font-medium">Click to update your picture.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={user.name}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="w-full bg-primary-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-primary-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showMatchModal && data?.ai_matching && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMatchModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6"><Sparkles size={32} /></div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">AI Match Found!</h3>
                <div className="w-full bg-slate-50 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-black text-primary-600 mb-2">{data.ai_matching.role_title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">"{data.ai_matching.justification}"</p>
                </div>
                <button onClick={() => setShowMatchModal(false)} className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

export default App;
