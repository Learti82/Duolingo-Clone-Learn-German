'use client';
import { useUserStore } from '@/store/useUserStore';

export function DailyGoalRing() {
  const { dailyGoal, dailyXPEarned } = useUserStore();
  const pct = Math.min(1, dailyXPEarned / dailyGoal);
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e5e5e5" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke="#FFC800" strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
        <text x="40" y="45" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1f2937">
          {dailyXPEarned}
        </text>
      </svg>
      <span className="text-xs text-gray-500 font-bold mt-1">/{dailyGoal} XP</span>
    </div>
  );
}
