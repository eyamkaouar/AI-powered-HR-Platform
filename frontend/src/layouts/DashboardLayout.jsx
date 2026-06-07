import React from 'react';
import { LayoutDashboard, Users, UploadCloud, Settings, LogOut, Cpu, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, onTabChange, onLogout, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'upload', label: 'Upload CV', icon: UploadCloud },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-primary-600 rounded-xl text-white">
            <Cpu size={24} />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">AI HR</span>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all group ${
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-600 shadow-sm shadow-primary-500/10'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-primary-600' : 'group-hover:text-slate-600'} />
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 pt-0">
        <div className="bg-slate-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {getInitials(user.name)}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.role}</p>
            </div>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 w-[90%]" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Credits: 90 / 100</p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ title, user }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search candidates..."
            className="w-64 pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-all ${showNotifications ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Notifications</h4>
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">2 New</span>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'New Analysis Ready', time: '2 mins ago', desc: 'The CV for "John Doe" has been processed.' },
                    { title: 'System Update', time: '1 hour ago', desc: 'New matching models are now online.' }
                  ].map((n, i) => (
                    <div key={i} className="group cursor-pointer">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors">{n.title}</p>
                      <p className="text-xs text-slate-400 mb-1">{n.time}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-xs font-black text-slate-400 hover:text-primary-600 border-t border-slate-50 transition-colors">
                  Clear All Notifications
                </button>
              </div>
            </>
          )}
        </div>
        
        {user?.avatar ? (
          <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
};

export default function DashboardLayout({ children, activeTab, onTabChange, onLogout, user }) {
  const titles = {
    dashboard: 'Overview',
    candidates: 'Candidate Management',
    upload: 'CV Analysis',
    settings: 'Settings'
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} onLogout={onLogout} user={user} />
      <div className="flex-1 flex flex-col">
        <Navbar title={titles[activeTab]} user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
