'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MultipleChoiceExercise as MCType } from '@/app/types';
import { TranslationDisplay } from '@/components/ui/TranslationDisplay';

interface Props {
  exercise: MCType;
  onComplete: (correct: boolean, xp: number) => void;
}

export function MultipleChoiceExercise({ exercise, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = selected === exercise.correctIndex;

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
  };

  const handleContinue = () => {
    onComplete(isCorrect, isCorrect ? exercise.xpReward : 0);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">
          Zgjidh përgjigjen e saktë / Select the correct answer
        </p>
        <TranslationDisplay
          translation={exercise.question}
          showDe={true}
          deClassName="text-2xl font-black mb-1"
          transClassName="text-base"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {exercise.options.map((option, i) => {
          let btnClass = 'w-full p-4 border-2 rounded-2xl font-bold text-left transition-all ';
          if (!checked) {
            btnClass += selected === i
              ? 'border-[#1CB0F6] bg-blue-50 text-[#1CB0F6]'
              : 'border-gray-200 bg-white hover:border-gray-400';
          } else if (i === exercise.correctIndex) {
            btnClass += 'border-[#58CC02] bg-[#D7FFB8] text-[#46A302]';
          } else if (i === selected && !isCorrect) {
            btnClass += 'border-[#FF4B4B] bg-[#FFDFE0] text-[#FF4B4B]';
          } else {
            btnClass += 'border-gray-200 bg-white opacity-50';
          }

          return (
            <motion.button
              key={i}
              onClick={() => !checked && setSelected(i)}
              className={btnClass}
              whileTap={{ scale: checked ? 1 : 0.97 }}
              animate={checked && !isCorrect && i === selected ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-black">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]'}`}
          >
            <p className={`font-black text-lg ${isCorrect ? 'text-[#46A302]' : 'text-[#FF4B4B]'}`}>
              {isCorrect ? '✓ Saktë! / Richtig! / Correct!' : '✗ Gabim! / Falsch! / Wrong!'}
            </p>
            {!isCorrect && (
              <p className="text-gray-700 mt-1 font-semibold">
                Përgjigja e saktë: {exercise.options[exercise.correctIndex]}
              </p>
            )}
            <p className="text-sm text-gray-600 mt-1">{exercise.explanation.sq}</p>
            <p className="text-sm text-gray-500 mt-0.5 italic">{exercise.explanation.en}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`btn-check ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        onClick={checked ? handleContinue : handleCheck}
        disabled={selected === null && !checked}
      >
        {checked ? 'VAZHDO / WEITER / CONTINUE →' : 'KONTROLLO / PRÜFEN / CHECK'}
      </button>
    </div>
  );
}
