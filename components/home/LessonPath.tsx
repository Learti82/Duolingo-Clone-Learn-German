'use client';
import { motion } from 'framer-motion';
import { Unit, Lesson } from '@/app/types';
import { useUserStore } from '@/store/useUserStore';

interface Props {
  units: Unit[];
  onLessonSelect: (lesson: Lesson, unitId: string) => void;
}

const positions = ['left-8', 'left-24', 'left-40', 'left-24', 'left-8', 'left-24', 'left-40', 'left-24'];

export function LessonPath({ units, onLessonSelect }: Props) {
  const { completedLessons, unlockedLessons } = useUserStore();

  return (
    <div className="relative pb-24">
      {units.map((unit) => (
        <div key={unit.id} className="mb-4">
          <div className={`mx-4 mb-6 mt-8 rounded-2xl p-4 text-white font-bold ${unit.isComingSoon ? 'bg-gray-300' : 'bg-gradient-to-r from-[#58CC02] to-[#46A302]'}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{unit.emoji}</span>
              <div>
                <div className="text-lg font-black">{unit.title.de}</div>
                <div className="text-sm opacity-90">{unit.title.sq} · {unit.title.en}</div>
              </div>
            </div>
          </div>

          {unit.isComingSoon ? (
            <div className="mx-4 p-6 bg-gray-100 rounded-2xl text-center text-gray-400">
              <div className="text-4xl mb-2">🔒</div>
              <p className="font-bold">Së shpejti / Coming Soon</p>
            </div>
          ) : (
            <div className="relative" style={{ minHeight: unit.lessons.length * 100 }}>
              {unit.lessons.map((lesson, li) => {
                const isCompleted = !!completedLessons[lesson.id];
                const isUnlocked = unlockedLessons.includes(lesson.id);
                const isPerfect = isCompleted && (completedLessons[lesson.id]?.bestScore === 100);
                const posClass = positions[li % positions.length];

                let bgColor = 'bg-gray-200 cursor-not-allowed';
                let borderColor = 'border-gray-300';
                let textColor = 'text-gray-400';
                if (isCompleted) {
                  bgColor = isPerfect ? 'bg-[#FFC800]' : 'bg-[#58CC02]';
                  borderColor = isPerfect ? 'border-[#E6B400]' : 'border-[#46A302]';
                  textColor = 'text-white';
                } else if (isUnlocked) {
                  bgColor = 'bg-white';
                  borderColor = 'border-[#1CB0F6]';
                  textColor = 'text-[#1CB0F6]';
                }

                return (
                  <div
                    key={lesson.id}
                    className={`absolute ${posClass}`}
                    style={{ top: li * 90 }}
                  >
                    <motion.button
                      onClick={() => isUnlocked && onLessonSelect(lesson, unit.id)}
                      whileHover={isUnlocked ? { scale: 1.1 } : {}}
                      whileTap={isUnlocked ? { scale: 0.95 } : {}}
                      animate={isUnlocked && !isCompleted ? {
                        boxShadow: ['0 0 0 0 rgba(28,176,246,0)', '0 0 0 10px rgba(28,176,246,0.3)', '0 0 0 0 rgba(28,176,246,0)'],
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-16 h-16 rounded-full border-4 ${bgColor} ${borderColor} ${textColor} font-black text-sm flex flex-col items-center justify-center shadow-lg`}
                      style={{ boxShadow: `0 4px 0 ${isCompleted ? (isPerfect ? '#E6B400' : '#46A302') : '#ddd'}` }}
                    >
                      {isCompleted ? (isPerfect ? '👑' : '✓') : isUnlocked ? '⭐' : '🔒'}
                      <span className="text-xs">{li + 1}</span>
                    </motion.button>

                    <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 min-w-36 z-10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="font-bold text-xs text-gray-800">{lesson.title.de}</p>
                      <p className="text-xs text-gray-500">{lesson.title.sq}</p>
                      {isCompleted && <p className="text-xs text-[#58CC02] font-bold mt-0.5">✓ {completedLessons[lesson.id]?.bestScore}%</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
