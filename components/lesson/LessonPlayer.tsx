'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson } from '@/app/types';
import { useUserStore } from '@/store/useUserStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { HeartBar } from '@/components/ui/HeartBar';
import { ExerciseRenderer } from '@/components/lesson/ExerciseRenderer';

interface Props {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (score: number, xp: number) => void;
}

export function LessonPlayer({ lesson, onClose, onComplete }: Props) {
  const { hearts, loseHeart, earnXP, recordAnswer, updateStreak } = useUserStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentHearts, setCurrentHearts] = useState(hearts);
  const [totalXP, setTotalXP] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [showXP, setShowXP] = useState<number | null>(null);

  const exercises = lesson.exercises;
  const current = exercises[currentIdx];

  const handleExerciseComplete = (correct: boolean, xp: number) => {
    recordAnswer(correct);
    if (correct) {
      setCorrectCount((c) => c + 1);
      setTotalXP((t) => t + xp);
      earnXP(xp);
      setShowXP(xp);
      setTimeout(() => setShowXP(null), 1500);
    } else {
      setCurrentHearts((h) => {
        const next = Math.max(0, h - 1);
        loseHeart();
        return next;
      });
    }

    setTimeout(() => {
      if (currentIdx < exercises.length - 1) {
        setCurrentIdx((i) => i + 1);
      } else {
        updateStreak();
        setShowComplete(true);
      }
    }, correct ? 800 : 1200);
  };

  if (showComplete) {
    const score = Math.round((correctCount / exercises.length) * 100);
    const perfect = score === 100;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-8xl mb-6"
        >
          {perfect ? '🏆' : score >= 70 ? '⭐' : '✅'}
        </motion.div>
        <h1 className="text-4xl font-black text-gray-800 mb-2">
          {perfect ? 'Perfekt! / Perfekt!' : 'Mësimi u krye! / Lektion abgeschlossen!'}
        </h1>
        <p className="text-xl text-gray-600 mb-6">Rezultati: {score}%</p>
        <div className="grid grid-cols-3 gap-6 mb-8 text-center">
          <div className="bg-[#FFF7E0] rounded-2xl p-4">
            <div className="text-3xl font-black text-[#FFC800]">+{totalXP}</div>
            <div className="text-sm text-gray-500 font-semibold">XP fituar</div>
          </div>
          <div className="bg-[#D7FFB8] rounded-2xl p-4">
            <div className="text-3xl font-black text-[#58CC02]">{correctCount}/{exercises.length}</div>
            <div className="text-sm text-gray-500 font-semibold">Saktë</div>
          </div>
          <div className="bg-[#EBF7FF] rounded-2xl p-4">
            <div className="text-3xl font-black text-[#1CB0F6]">{currentHearts}❤️</div>
            <div className="text-sm text-gray-500 font-semibold">Zemra</div>
          </div>
        </div>
        <button
          className="btn-check"
          style={{ maxWidth: 300 }}
          onClick={() => onComplete(score, totalXP)}
        >
          VAZHDO / WEITER / CONTINUE
        </button>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#F7F7F7] z-50 flex flex-col">
      <div className="flex items-center gap-4 px-4 pt-4 pb-2">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 font-bold text-xl p-1"
        >
          ✕
        </button>
        <div className="flex-1">
          <ProgressBar current={currentIdx} total={exercises.length} />
        </div>
        <HeartBar current={currentHearts} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex items-start justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {current && <ExerciseRenderer exercise={current} onComplete={handleExerciseComplete} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showXP !== null && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -80 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 text-2xl font-black text-[#FFC800] drop-shadow-lg pointer-events-none z-50"
          >
            +{showXP} XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
