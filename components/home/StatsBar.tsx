'use client';
import { useUserStore } from '@/store/useUserStore';
import { DailyGoalRing } from './DailyGoalRing';

export function StatsBar() {
  const { streakCount, gems, hearts } = useUserStore();

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <DailyGoalRing />
      <div className="flex gap-4 flex-1 justify-end">
        <div className="flex items-center gap-1">
          <span className="text-xl">🔥</span>
          <span className="font-black text-gray-700">{streakCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xl">💎</span>
          <span className="font-black text-gray-700">{gems}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xl">❤️</span>
          <span className="font-black text-gray-700">{hearts}</span>
        </div>
      </div>
    </div>
  );
}
