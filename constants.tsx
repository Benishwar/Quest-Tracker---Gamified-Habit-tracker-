
import React from 'react';
import { HabitType, User, Habit, XPLog, MarketplaceItem } from './types';
import { Flame, BookOpen, Dumbbell, Code, Wind } from 'lucide-react';

export const HABIT_ICONS = {
  [HabitType.RUN]: <Flame className="w-6 h-6 text-orange-500" />,
  [HabitType.STUDY]: <BookOpen className="w-6 h-6 text-blue-500" />,
  [HabitType.GYM]: <Dumbbell className="w-6 h-6 text-red-500" />,
  [HabitType.CODE]: <Code className="w-6 h-6 text-emerald-500" />,
  [HabitType.MEDITATE]: <Wind className="w-6 h-6 text-indigo-400" />,
};

export const MOCK_USER: User = {
  id: 'u1',
  username: 'ShadowSlayer99',
  xp: 1450,
  level: 12,
  coins: 450,
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  badges: ['Early Bird', 'Consistency King', 'Iron Will']
};

export const MOCK_HABITS: Habit[] = [
  {
    id: 'h1',
    name: 'Morning 2km Run',
    type: HabitType.RUN,
    currentStreak: 14,
    maxStreak: 21,
    lastCheckedIn: new Date().toISOString().split('T')[0],
    color: '#f97316'
  },
  {
    id: 'h2',
    name: 'Study Java DSA',
    type: HabitType.STUDY,
    currentStreak: 8,
    maxStreak: 12,
    lastCheckedIn: null,
    color: '#3b82f6'
  },
  {
    id: 'h3',
    name: 'LeetCode Daily',
    type: HabitType.CODE,
    currentStreak: 3,
    maxStreak: 30,
    lastCheckedIn: new Date().toISOString().split('T')[0],
    color: '#10b981'
  }
];

export const MOCK_XP_LOGS: XPLog[] = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  amount: Math.floor(Math.random() * 40) + 10,
  source: Math.random() > 0.7 ? 'STREAK_BONUS' : 'CHECK_IN'
}));

export const MOCK_MARKETPLACE: MarketplaceItem[] = [
  {
    id: 'm1',
    habitId: 'h1',
    habitName: 'Elite Runner',
    streakLength: 100,
    price: 1500,
    sellerName: 'ProAthlete',
    status: 'AVAILABLE'
  },
  {
    id: 'm2',
    habitId: 'h2',
    habitName: 'Java Master',
    streakLength: 50,
    price: 800,
    sellerName: 'CodeGeek',
    status: 'AVAILABLE'
  }
];
