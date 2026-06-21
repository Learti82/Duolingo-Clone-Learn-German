'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArticleDrillExercise as ADType } from '@/app/types';
import { TranslationDisplay } from '@/components/ui/TranslationDisplay';
import { useUserStore } from '@/store/useUserStore';

interface Props {
  exercise: ADType;
  onComplete: (correct: boolean, xp: number) => void;
}

const articles = ['der', 'die', 'das'] as const;
const articleColors = {
  der: { bg: '#1CB0F6', hover: '#0fa0e0', active: '#0890c0' },
  die: { bg: '#FF4B4B', hover: '#e03a3a', active: '#c02a2a' },
  das: { bg: '#58CC02', hover: '#46A302', active: '#3a8a02' },
};

export function ArticleDrillExercise({ exercise, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const { updateArticleStat } = useUserStore();
  const isCorrect = selected === exercise.gender;

  const handleSelect = (art: string) => {
    if (checked) return;
    setSelected(art);
    setChecked(true);
    updateArticleStat(art as 'der' | 'die' | 'das', art === exercise.gender);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto items-center">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
          Cili është nyja? / Which article?
        </p>
        <div className="text-5xl font-black text-gray-800 mb-2">{exercise.noun}</div>
        <TranslationDisplay
          translation={exercise.translation}
          showDe={false}
          transClassName="text-lg"
        />
      </div>

      <div className="flex gap-4 w-full justify-center">
        {articles.map((art) => {
          const c = articleColors[art];
          const isSelected = selected === art;
          const isRight = checked && art === exercise.gender;
          const isWrong = checked && isSelected && !isCorrect;

          return (
            <motion.button
              key={art}
              onClick={() => handleSelect(art)}
              disabled={checked}
              whileTap={{ scale: 0.95 }}
              animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : isRight ? { scale: [1, 1.15, 1] } : {}}
              className="flex-1 py-5 rounded-2xl font-black text-xl text-white uppercase shadow-md transition-all"
              style={{
                backgroundColor: isRight ? c.bg : isWrong ? '#aaa' : c.bg,
                opacity: checked && !isRight && !isWrong ? 0.4 : 1,
                boxShadow: `0 4px 0 ${isRight ? c.active : isWrong ? '#888' : c.active}`,
              }}
            >
              {art}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full p-4 rounded-2xl ${isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]'}`}
          >
            <p className={`font-black text-lg ${isCorrect ? 'text-[#46A302]' : 'text-[#FF4B4B]'}`}>
              {isCorrect ? '✓ Saktë!' : `✗ Gabim! Nyja e saktë: ${exercise.gender}`}
            </p>
            <div className="mt-2 space-y-1">
              <p className="font-bold text-gray-700">
                <span style={{ color: articleColors[exercise.gender].bg }}>{exercise.gender}</span> {exercise.noun}
                {exercise.plural && <span className="text-gray-400 ml-2 text-sm">(pl: {exercise.plural})</span>}
              </p>
              <TranslationDisplay
                translation={exercise.exampleSentence}
                showDe={true}
                deClassName="text-sm font-semibold text-gray-700"
                transClassName="text-xs"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {checked && (
        <button
          className={`btn-check ${isCorrect ? 'correct' : 'wrong'}`}
          onClick={() => onComplete(isCorrect, isCorrect ? exercise.xpReward : 0)}
        >
          VAZHDO / WEITER / CONTINUE →
        </button>
      )}
    </div>
  );
}
