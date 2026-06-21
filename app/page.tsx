'use client';
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { LessonPath } from '@/components/home/LessonPath';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { StatsBar } from '@/components/home/StatsBar';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { Lesson, Level } from '@/app/types';
import { curriculum } from '@/data';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function Home() {
  const { currentLevel, setCurrentLevel, completeLesson, unlockLesson } = useUserStore();
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; unitId: string } | null>(null);

  const levelData = curriculum.find((l) => l.id === currentLevel);

  const handleLessonSelect = (lesson: Lesson, unitId: string) => {
    setActiveLesson({ lesson, unitId });
  };

  const handleLessonComplete = (score: number, xp: number) => {
    if (!activeLesson) return;
    completeLesson(activeLesson.lesson.id, score, xp);

    // Unlock next lesson
    const unit = levelData?.units.find((u) => u.id === activeLesson.unitId);
    if (unit) {
      const lessonIdx = unit.lessons.findIndex((l) => l.id === activeLesson.lesson.id);
      if (lessonIdx < unit.lessons.length - 1) {
        unlockLesson(unit.lessons[lessonIdx + 1].id);
      }
    }

    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-black text-[#58CC02]">🇩🇪 GermanAI</h1>
            <LanguageToggle />
          </div>
          <StatsBar />

          {/* Level tabs */}
          <div className="flex overflow-x-auto gap-1 px-4 pb-2">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={`px-4 py-1.5 rounded-full text-sm font-black whitespace-nowrap transition-all ${
                  currentLevel === lvl
                    ? 'bg-[#58CC02] text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto">
        {levelData ? (
          levelData.units.length > 0 ? (
            <LessonPath units={levelData.units} onLessonSelect={handleLessonSelect} />
          ) : (
            <div className="text-center py-20 px-8">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-black text-gray-700 mb-2">{currentLevel} - Së shpejti!</h2>
              <p className="text-gray-500">Ky nivel do të shtohet së shpejti. / This level will be added soon.</p>
            </div>
          )
        ) : null}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-lg mx-auto flex">
          {[
            { icon: '🏠', label: 'Mëso', href: '/' },
            { icon: '🏋️', label: 'Praktiko', href: '/practice' },
            { icon: '🏆', label: 'Arritje', href: '/achievements' },
            { icon: '👤', label: 'Profili', href: '/profile' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${item.href === '/' ? 'text-[#58CC02]' : 'text-gray-400 hover:text-[#58CC02]'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-bold mt-0.5">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Lesson player overlay */}
      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson.lesson}
          onClose={() => setActiveLesson(null)}
          onComplete={handleLessonComplete}
        />
      )}
    </div>
  );
}
