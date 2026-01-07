
export enum HabitType {
  RUN = 'RUN',
  STUDY = 'STUDY',
  GYM = 'GYM',
  CODE = 'CODE',
  MEDITATE = 'MEDITATE'
}

export interface User {
  id: string;
  username: string;
  xp: number;
  level: number;
  coins: number;
  avatarUrl: string;
  badges: string[];
}

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  currentStreak: number;
  maxStreak: number;
  lastCheckedIn: string | null; // ISO Date
  color: string;
}

export interface XPLog {
  date: string;
  amount: number;
  source: 'CHECK_IN' | 'STREAK_BONUS' | 'MARKETPLACE';
}

export interface MarketplaceItem {
  id: string;
  habitId: string;
  habitName: string;
  streakLength: number;
  price: number;
  sellerName: string;
  status: 'AVAILABLE' | 'SOLD';
}
