
import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame as FlameIcon, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  History, 
  BookOpen, 
  Plus, 
  X,
  Target
} from 'lucide-react';
import { MOCK_XP_LOGS, HABIT_ICONS } from '../constants';
import { User, HabitType, Habit } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardProps {
  user: User;
  habits: Habit[];
  onAddHabit: (name: string, type: HabitType) => void;
  onCheckIn: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, habits, onAddHabit, onCheckIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Chart Data: XP Progress (Line)
  const xpChartData = {
    labels: MOCK_XP_LOGS.map(log => log.date.split('-').slice(1).join('/')),
    datasets: [
      {
        fill: true,
        label: 'Daily XP',
        data: MOCK_XP_LOGS.map(log => log.amount),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointRadius: 0,
      }
    ],
  };

  const xpChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      y: { display: false },
      x: { 
        grid: { display: false },
        ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 7, color: '#64748b' } 
      },
    },
  };

  // Chart Data: Streak Comparison (Bar)
  const streakChartData = {
    labels: habits.map(h => h.name.length > 10 ? h.name.substring(0, 10) + '...' : h.name),
    datasets: [
      {
        label: 'Current Streak',
        data: habits.map(h => h.currentStreak),
        backgroundColor: habits.map(h => h.color + '44'),
        borderColor: habits.map(h => h.color),
        borderWidth: 2,
        borderRadius: 8,
      }
    ],
  };

  // Chart Data: XP Source (Pie)
  const sourceChartData = {
    labels: ['Check-ins', 'Bonuses', 'Market'],
    datasets: [
      {
        data: [75, 20, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 0,
      }
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Habits & Daily Quests */}
      <div className="lg:col-span-8 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-gaming font-bold flex items-center gap-2 uppercase tracking-tighter">
              <History className="text-indigo-500 w-5 h-5" />
              Active Operations
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-2 text-xs bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 px-3 py-1.5 rounded-full text-indigo-400 font-bold uppercase tracking-widest transition-all"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform" />
              Deploy New Quest
            </button>
          </div>
          
          {habits.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-500">
              <Target size={48} className="mb-4 opacity-20" />
              <p className="font-gaming text-sm">No active quests. Initialize your first operation.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} onCheckIn={onCheckIn} />
              ))}
            </div>
          )}
        </section>

        {/* Analytics Section */}
        <section className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <h2 className="text-xl font-gaming font-bold flex items-center gap-2 mb-6 uppercase tracking-tighter">
            <TrendingUp className="text-indigo-500 w-5 h-5" />
            Strategic Intel
          </h2>
          <div className="h-64 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-400">XP PROGRESSION MATRIX</span>
              <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-gaming">SQUAD RANK: ELITE</span>
            </div>
            <Line data={xpChartData} options={xpChartOptions} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-sm font-bold text-slate-400 block mb-4 uppercase tracking-widest text-[10px]">STREAK DISPARITY</span>
              <div className="h-48">
                <Bar data={streakChartData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { 
                    x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } }, 
                    y: { display: false } 
                  }
                }} />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-slate-400 block mb-4 uppercase tracking-widest text-[10px]">XP RESOURCE DIVIDE</span>
              <div className="h-48 flex justify-center">
                <Pie data={sourceChartData} options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right', labels: { color: '#64748b', font: { size: 10 } } } }
                }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Mini Leaderboard & Rewards */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-6 rounded-3xl border border-indigo-500/20 shadow-xl">
          <h3 className="font-gaming font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
            <FlameIcon className="text-orange-500" />
            TOP PLAYERS
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 bg-slate-950/50 p-3 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors cursor-default">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center font-gaming text-indigo-400 border border-slate-700">
                  #{i}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">RECRUIT_{i * 482}</p>
                  <p className="text-xs text-slate-500">{35 - i * 5} Day Streak</p>
                </div>
                <FlameIcon className="w-5 h-5 text-orange-500 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
          <h3 className="font-gaming font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
            <AlertCircle className="text-yellow-500 w-5 h-5" />
            STREAK DANGER
          </h3>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <BookOpen className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-yellow-500 uppercase tracking-tighter">Critical Deadline</p>
              <p className="text-xs text-slate-400 font-gaming">Complete Java Quest</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddHabitModal 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={(name, type) => {
              onAddHabit(name, type);
              setIsModalOpen(false);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AddHabitModal: React.FC<{ onClose: () => void; onSubmit: (name: string, type: HabitType) => void }> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<HabitType>(HabitType.STUDY);

  // Casting motion.div to any to avoid TS errors
  const MotionDiv = motion.div as any;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Fixed motion.div error by using MotionDiv cast to any */}
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      {/* Fixed motion.div error by using MotionDiv cast to any */}
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        {/* Decorative Grid Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-gaming font-bold tracking-tighter uppercase">Initialize Quest</h3>
            <p className="text-slate-500 text-sm">Define your next mission objectives.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onSubmit(name, type);
        }} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Quest Identification</label>
            <input 
              autoFocus
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Grind LeetCode 100"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-700 outline-none focus:border-indigo-500 transition-colors font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Classification</label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(HabitType).map(([key, val]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setType(val as HabitType)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                    type === val 
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' 
                      : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                  }`}
                >
                  {HABIT_ICONS[val as HabitType]}
                  <span className="text-[8px] font-bold uppercase mt-2 tracking-tighter">{val}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-gaming font-bold text-lg shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              Confirm Deployment
            </button>
          </div>
        </form>
      </MotionDiv>
    </div>
  );
};

const HabitCard: React.FC<{ habit: Habit; onCheckIn: (id: string) => void }> = ({ habit, onCheckIn }) => {
  const isChecked = habit.lastCheckedIn === new Date().toISOString().split('T')[0];
  
  // Casting motion.div to any to avoid TS errors
  const MotionDiv = motion.div as any;

  return (
    /* Fixed motion.div error by using MotionDiv cast to any */
    <MotionDiv 
      layout
      whileHover={{ scale: 1.02 }}
      className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group ${
        isChecked 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
          {HABIT_ICONS[habit.type as HabitType]}
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className="font-gaming font-bold text-xl">{habit.currentStreak}</span>
            <FlameIcon className={`w-5 h-5 ${isChecked ? 'text-orange-500' : 'text-slate-600'}`} />
          </div>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Day Streak</span>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-1 truncate pr-8">{habit.name}</h3>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          {/* Fixed motion.div error by using MotionDiv cast to any */}
          <MotionDiv 
            initial={{ width: 0 }}
            animate={{ width: `${habit.maxStreak > 0 ? (habit.currentStreak / habit.maxStreak) * 100 : 0}%` }}
            className="h-full bg-indigo-500" 
          />
        </div>
        <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{habit.maxStreak} MAX</span>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onCheckIn(habit.id);
        }}
        disabled={isChecked}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
          isChecked 
            ? 'bg-emerald-500 text-white cursor-default' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
        }`}
      >
        {isChecked ? (
          <>
            <CheckCircle2 size={18} />
            Quest Clear
          </>
        ) : (
          'Check-in +10 XP'
        )}
      </button>

      {/* Flame Particles (Mocking the "Flame animation") */}
      {isChecked && (
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <FlameIcon className="w-16 h-16 text-orange-500 animate-pulse rotate-12" />
        </div>
      )}
    </MotionDiv>
  );
};

export default Dashboard;
