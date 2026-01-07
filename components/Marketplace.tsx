
import React from 'react';
import { motion } from 'framer-motion';
import { Coins, ShoppingCart, ShieldCheck, Tag, Info, User as UserIcon } from 'lucide-react';
import { MOCK_MARKETPLACE } from '../constants';
import { User } from '../types';

interface MarketplaceProps {
  user: User;
}

const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Promo Banner */}
      <section className="relative h-64 rounded-3xl overflow-hidden group">
        <img 
          src="https://picsum.photos/id/10/1200/400" 
          alt="Marketplace" 
          className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">New Arrival</span>
            <span className="bg-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Certified Proof</span>
          </div>
          <h2 className="text-4xl font-gaming font-black mb-2 tracking-tighter italic">STREAK EXCHANGE V1</h2>
          <p className="text-slate-300 max-w-md">Trade your consistency. Turn long-term discipline into tradable value. No blockchain, just raw dedication.</p>
        </div>
      </section>

      {/* Market Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Listings */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-gaming font-bold flex items-center gap-2">
              <Tag className="text-indigo-500 w-5 h-5" />
              ACTIVE LISTINGS
            </h3>
            <div className="flex gap-2">
              <select className="bg-slate-900 border border-slate-800 text-sm p-2 rounded-xl outline-none focus:border-indigo-500">
                <option>Sort by Streak</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MARKETPLACE.map((item) => (
              <MarketItemCard key={item.id} item={item} />
            ))}
            {/* Empty States / Coming Soon */}
            <div className="border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 opacity-40">
              <div className="p-4 bg-slate-800 rounded-full mb-4">
                <ShoppingCart className="text-slate-600" />
              </div>
              <p className="text-sm font-bold">List your streak</p>
            </div>
          </div>
        </div>

        {/* Info & Rewards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
            <h3 className="font-gaming font-bold mb-4 flex items-center gap-2">
              <Info className="text-indigo-500 w-5 h-5" />
              HOW IT WORKS
            </h3>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-indigo-400 font-bold">1</div>
                <p>Reach a 30+ day streak on any habit to generate a "Proof Token".</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-indigo-400 font-bold">2</div>
                <p>List your token on the bazaar for a price in QuestCoins.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-indigo-400 font-bold">3</div>
                <p>Buyers gain the profile badge and a permanent XP multiplier boost.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 p-6 rounded-3xl border border-purple-500/20">
            <h3 className="font-gaming font-bold mb-4">PREMIUM REWARDS</h3>
            <div className="space-y-3">
              <RewardRow title="XP Booster (2x)" price={200} />
              <RewardRow title="Flame Aura Profile" price={500} />
              <RewardRow title="Amazon Voucher" price={2500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketItemCard: React.FC<{ item: any }> = ({ item }) => {
  // Casting motion.div to any to avoid TS errors
  const MotionDiv = motion.div as any;

  return (
    /* Fixed motion.div error by using MotionDiv cast to any */
    <MotionDiv 
      whileHover={{ y: -5 }}
      className="bg-slate-900 p-5 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <UserIcon size={16} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-400">{item.sellerName}</span>
        </div>
        <ShieldCheck className="text-emerald-500" size={18} />
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-black font-gaming italic text-indigo-400 tracking-tighter">
          {item.habitName}
        </h4>
        <div className="flex items-center gap-2 text-slate-500 mt-1">
          <span className="text-2xl font-bold text-slate-200">{item.streakLength}</span>
          <span className="text-xs font-bold uppercase tracking-widest">Day Streak</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Coins className="text-yellow-500" size={20} />
          <span className="font-gaming font-bold text-lg">{item.price}</span>
        </div>
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-colors">
          BUY
        </button>
      </div>
    </MotionDiv>
  );
};

const RewardRow: React.FC<{ title: string; price: number }> = ({ title, price }) => (
  <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-2xl border border-slate-800">
    <span className="text-sm font-bold">{title}</span>
    <div className="flex items-center gap-1">
      <Coins size={14} className="text-yellow-500" />
      <span className="font-gaming font-bold text-xs">{price}</span>
    </div>
  </div>
);

export default Marketplace;
