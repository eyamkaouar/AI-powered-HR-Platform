import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Cpu, ArrowRight } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex bg-white font-['Inter',_sans-serif]">
      {/* Left: Branding Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-primary-600 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-indigo-800 opacity-90" />
        
        {/* Decorative Circles */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
              <Cpu size={40} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">AI HR Assistant</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Smart recruitment <br /> 
            <span className="text-primary-200">powered by AI.</span>
          </h1>
          <p className="text-xl text-primary-100 max-w-md leading-relaxed">
            Streamline your hiring process with automated CV parsing, candidate evaluation, and data-driven insights.
          </p>
        </div>

        <div className="absolute bottom-10 left-20 z-10 flex gap-4 text-primary-200/50 text-sm">
          <span>© 2026 AI HR Assistant</span>
          <span>•</span>
          <span>Privacy Policy</span>
        </div>
      </motion.div>

      {/* Right: Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
              <p className="text-slate-400">Please enter your details to sign in</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 transition-all" />
                  <span className="text-slate-500 group-hover:text-slate-700">Remember me</span>
                </label>
                <a href="#" className="font-semibold text-primary-600 hover:text-primary-700">Forgot password?</a>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account? <a href="#" className="font-semibold text-primary-600 hover:text-primary-700">Request access</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
