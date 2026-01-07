
import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  LayoutDashboard, 
  Store, 
  Settings, 
  ChevronRight, 
  Zap, 
  Flame as FlameIcon, 
  Coins,
  FileCode2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_USER, MOCK_HABITS, MOCK_XP_LOGS, MOCK_MARKETPLACE } from './constants';
import { Habit, HabitType } from './types';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import DocPanel from './components/DocPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'docs'>('dashboard');
  const [user, setUser] = useState(MOCK_USER);
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);

  // Casting motion.div to any to avoid TS errors in environments with mismatched framer-motion types
  const MotionDiv = motion.div as any;

  const calculateLevel = (xp: number) => Math.floor(Math.sqrt(xp / 10)) + 1;

  useEffect(() => {
    const newLevel = calculateLevel(user.xp);
    if (newLevel !== user.level) {
      setUser(prev => ({ ...prev, level: newLevel }));
    }
  }, [user.xp]);

  const addHabit = (name: string, type: HabitType) => {
    const colors = {
      [HabitType.RUN]: '#f97316',
      [HabitType.STUDY]: '#3b82f6',
      [HabitType.GYM]: '#ef4444',
      [HabitType.CODE]: '#10b981',
      [HabitType.MEDITATE]: '#818cf8',
    };

    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type,
      currentStreak: 0,
      maxStreak: 0,
      lastCheckedIn: null,
      color: colors[type] || '#6366f1'
    };
    setHabits(prev => [newHabit, ...prev]);
  };

  const handleCheckIn = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev => prev.map(h => {
      if (h.id === habitId && h.lastCheckedIn !== today) {
        const newStreak = h.currentStreak + 1;
        // Update user XP
        setUser(u => ({ 
          ...u, 
          xp: u.xp + 10 + (newStreak > 7 ? 5 : 0),
          coins: u.coins + (newStreak % 5 === 0 ? 20 : 0)
        }));
        return { 
          ...h, 
          currentStreak: newStreak, 
          maxStreak: Math.max(h.maxStreak, newStreak),
          lastCheckedIn: today 
        };
      }
      return h;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-24 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex md:flex-col items-center justify-between md:py-8 px-4 md:px-0 sticky top-0 z-50 h-16 md:h-screen">
        <div className="flex md:flex-col items-center gap-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-0 md:mb-8">
            <Zap className="text-white w-8 h-8 fill-white" />
          </div>
          
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutDashboard />} 
          />
          <NavButton 
            active={activeTab === 'marketplace'} 
            onClick={() => setActiveTab('marketplace')} 
            icon={<Store />} 
          />
          <NavButton 
            active={activeTab === 'docs'} 
            onClick={() => setActiveTab('docs')} 
            icon={<FileCode2 />} 
          />
        </div>

        <div className="hidden md:flex flex-col items-center gap-6 mt-auto">
          <NavButton active={false} icon={<Settings />} />
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 overflow-hidden">
            <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Top Header Bar */}
        <header className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-gaming font-bold tracking-tight">
              {activeTab === 'dashboard' ? 'MISSION CENTER' : activeTab === 'marketplace' ? 'STREAK BAZAAR' : 'SYSTEM SPECS'}
            </h1>
            <p className="text-slate-400">Welcome back, {user.username}!</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-xl">
            {/* Level Progress */}
            <div className="px-4 py-1 flex items-center gap-3 border-r border-slate-800">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rank</span>
                <span className="text-indigo-400 font-gaming font-bold">LVL {user.level}</span>
              </div>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                {/* Fixed motion.div error by using MotionDiv cast to any */}
                <MotionDiv 
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.xp % 100)}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
            </div>

            {/* Currencies */}
            <div className="px-4 py-1 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="font-gaming font-bold text-yellow-400">{user.coins}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-indigo-500" />
                <span className="font-gaming font-bold text-slate-100">{user.xp} XP</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          {/* Fixed motion.div error by using MotionDiv cast to any */}
          <MotionDiv
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <Dashboard user={user} habits={habits} onAddHabit={addHabit} onCheckIn={handleCheckIn} />}
            {activeTab === 'marketplace' && <Marketplace user={user} />}
            {activeTab === 'docs' && <DocPanel />}
          </MotionDiv>
        </AnimatePresence>
      </main>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, onClick }) => {
  // Casting motion.div to any to avoid TS errors
  const MotionDiv = motion.div as any;
  
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all duration-300 relative group ${
        active 
          ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20' 
          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
      }`}
    >
      {/* Fixed React.cloneElement error by casting icon to React.ReactElement<any> */}
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
      {active && (
        /* Fixed motion.div error by using MotionDiv cast to any */
        <MotionDiv 
          layoutId="activeNav"
          className="absolute -right-1 md:-right-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-500 rounded-l-full hidden md:block"
        />
      )}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase font-bold tracking-widest">
        {active ? 'Active' : 'Go'}
      </div>
    </button>
  );
};

export default App;
