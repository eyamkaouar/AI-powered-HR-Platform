import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Award, Star, Briefcase, Mail, Phone, MapPin, X, ChevronRight, Zap, Target, Shield, Heart } from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Full Stack Engineer',
    experience: '8+ Years',
    location: 'San Francisco, CA',
    avatar: 'SC',
    color: 'bg-blue-500',
    bio: 'Specialist in building scalable web applications and distributed systems with a focus on high-performance React architectures.',
    competences: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript'],
    qualities: ['Strategic Thinker', 'Effective Communicator', 'Rapid Problem Solver', 'Team Mentor'],
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'AI Infrastructure Architect',
    experience: '6+ Years',
    location: 'Austin, TX',
    avatar: 'MR',
    color: 'bg-indigo-500',
    bio: 'Passionate about bridging the gap between ML models and production environments. Expert in Kubernetes and ML Ops.',
    competences: ['Python', 'Kubernetes', 'PyTorch', 'MLOps', 'Go', 'TensorFlow'],
    qualities: ['Analytical Mindset', 'Precision Focused', 'Innovative', 'Reliable'],
    email: 'marcus.r@example.com',
    phone: '+1 (555) 987-6543'
  },
  {
    id: 3,
    name: 'Aisha Gupta',
    role: 'Lead Data Engineer',
    experience: '7+ Years',
    location: 'London, UK',
    avatar: 'AG',
    color: 'bg-emerald-500',
    bio: 'Dedicated to building robust data pipelines and architecting data lakes for large-scale enterprise analytics.',
    competences: ['Apache Spark', 'Snowflake', 'Python', 'Airflow', 'Kafka', 'Scala'],
    qualities: ['Data-Driven', 'Detail Oriented', 'Collaborative', 'Adaptable'],
    email: 'aisha.g@example.com',
    phone: '+44 20 7946 0123'
  },
  {
    id: 4,
    name: 'Julian Vance',
    role: 'DevSecOps Specialist',
    experience: '5+ Years',
    location: 'Berlin, DE',
    avatar: 'JV',
    color: 'bg-rose-500',
    bio: 'Ensuring security is at the heart of the CI/CD pipeline. Expert in automated security testing and cloud compliance.',
    competences: ['Terraform', 'Vault', 'CI/CD Pipelines', 'AWS Security', 'Ansible', 'Linux'],
    qualities: ['Security First', 'Proactive', 'Meticulous', 'Pragmatic'],
    email: 'j.vance@example.com',
    phone: '+49 30 12345678'
  },
  {
    id: 5,
    name: 'Elena Sokolova',
    role: 'Frontend UI/UX Architect',
    experience: '9+ Years',
    location: 'New York, NY',
    avatar: 'ES',
    color: 'bg-amber-500',
    bio: 'Creating beautiful, accessible, and performant user experiences. Expert in Design Systems and CSS-in-JS.',
    competences: ['React', 'Framer Motion', 'Tailwind CSS', 'Figma', 'Jest', 'Storybook'],
    qualities: ['Empathetic Design', 'Visual Excellence', 'User Centric', 'Creative'],
    email: 'elena.s@example.com',
    phone: '+1 (555) 246-8135'
  },
  {
    id: 6,
    name: 'David Okafor',
    role: 'Cloud Native Developer',
    experience: '4+ Years',
    location: 'Toronto, CA',
    avatar: 'DO',
    color: 'bg-cyan-500',
    bio: 'Building serverless architectures and microservices. Enthusiast for Go and cloud-native computing patterns.',
    competences: ['Go', 'Serverless', 'Google Cloud', 'gRPC', 'Redis', 'GraphQL'],
    qualities: ['Fast Learner', 'Growth Mindset', 'Resilient', 'Passionate'],
    email: 'david.o@example.com',
    phone: '+1 (555) 369-2580'
  }
];

const CandidatesPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Engineering Talent Pool</h1>
          <p className="text-slate-400 font-medium">Browse and manage top-tier engineering candidates.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
            <Target size={18} className="text-primary-600" />
            <span className="text-sm font-bold text-slate-700">6 Candidates</span>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm text-green-600">
            <Zap size={18} />
            <span className="text-sm font-bold">4 Matches Found</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((candidate, i) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedCandidate(candidate)}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-16 h-16 ${candidate.color} rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-black/5`}>
                {candidate.avatar}
              </div>
              <div className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:border-primary-100 transition-colors">
                View Profile
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{candidate.name}</h3>
            <p className="text-slate-400 text-sm font-bold mb-6">{candidate.role}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-500">
                <Briefcase size={16} />
                <span className="text-xs font-semibold">{candidate.experience} Experience</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <MapPin size={16} />
                <span className="text-xs font-semibold">{candidate.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.competences.slice(0, 3).map((skill, j) => (
                <span key={j} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100">
                  {skill}
                </span>
              ))}
              {candidate.competences.length > 3 && (
                <span className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-bold border border-slate-100">
                  +{candidate.competences.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all z-10"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-5 bg-slate-50 p-10 flex flex-col items-center text-center">
                  <div className={`w-32 h-32 ${selectedCandidate.color} rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-8`}>
                    {selectedCandidate.avatar}
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-2">{selectedCandidate.name}</h2>
                  <p className="text-primary-600 font-bold mb-8 uppercase tracking-widest text-xs">{selectedCandidate.role}</p>
                  
                  <div className="w-full space-y-4 mb-10">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                        <Mail size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-600 truncate">{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                        <Phone size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{selectedCandidate.phone}</span>
                    </div>
                  </div>

                  <div className="mt-auto w-full grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Experience</p>
                      <p className="text-sm font-bold text-slate-800">{selectedCandidate.experience}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                      <p className="text-sm font-bold text-green-500">Available</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-7 p-10">
                  <div className="mb-10">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <User size={14} className="text-primary-600" />
                      About Candidate
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {selectedCandidate.bio}
                    </p>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Code size={14} className="text-indigo-600" />
                      Technical Competences
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedCandidate.competences.map((skill, j) => (
                        <div key={j} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 shadow-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Star size={14} className="text-amber-500" />
                      Core Qualities
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedCandidate.qualities.map((quality, j) => (
                        <div key={j} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                          <span className="text-sm font-bold text-slate-700">{quality}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 flex gap-4">
                    <button className="flex-1 bg-primary-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 hover:bg-primary-700 active:scale-[0.98] transition-all">
                      Shortlist Candidate
                    </button>
                    <button className="px-8 bg-slate-50 text-slate-400 font-bold py-4 rounded-2xl border border-slate-100 hover:bg-slate-100 hover:text-slate-600 transition-all">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidatesPage;
