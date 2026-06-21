'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FillBlankExercise as FBType } from '@/app/types';
import { TranslationDisplay } from '@/components/ui/TranslationDisplay';
import { SpecialCharsBar } from '@/components/ui/SpecialCharsBar';

interface Props {
  exercise: FBType;
  onComplete: (correct: boolean, xp: number) => void;
}

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function FillBlankExercise({ exercise, onComplete }: Props) {
  const [answers, setAnswers] = useState<string[]>(exercise.blanks.map(() => ''));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const parts = exercise.sentence.de.split('___');
  const isCorrect = exercise.blanks.every((blank, i) => normalize(answers[i]) === normalize(blank));

  const insertChar = (char: string) => {
    if (inputRef.current) {
      const pos = inputRef.current.selectionStart || 0;
      const newAnswers = [...answers];
      newAnswers[0] = answers[0].slice(0, pos) + char + answers[0].slice(pos);
      setAnswers(newAnswers);
    }
  };

  const handleOption = (opt: string) => {
    if (checked) return;
    setSelectedOption(opt);
    setAnswers([opt]);
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">
          Plotëso boshllëkun / Fill in the blank
        </p>
        <TranslationDisplay translation={exercise.sentence} showDe={false} transClassName="text-base mb-3" />

        <div className="text-xl font-black text-gray-800 flex flex-wrap items-center justify-center gap-1">
          {parts.map((part, i) => (
            <span key={i} className="flex items-center gap-1">
              <span>{part}</span>
              {i < parts.length - 1 && (
                <span className={`inline-block border-b-2 min-w-16 text-center px-1 ${
                  checked ? (isCorrect ? 'border-[#58CC02] text-[#46A302]' : 'border-[#FF4B4B] text-[#FF4B4B]') : 'border-gray-400'
                }`}>
                  {answers[i] || '     '}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {exercise.useOptions && exercise.options ? (
        <div className="grid grid-cols-2 gap-3">
          {exercise.options.map((opt, i) => (
            <motion.button
              key={i}
              onClick={() => handleOption(opt)}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-2xl border-2 font-bold transition-all ${
                checked && opt === exercise.blanks[0] ? 'border-[#58CC02] bg-[#D7FFB8] text-[#46A302]' :
                checked && opt === selectedOption && !isCorrect ? 'border-[#FF4B4B] bg-[#FFDFE0]' :
                selectedOption === opt && !checked ? 'border-[#1CB0F6] bg-blue-50' :
                'border-gray-200 bg-white hover:border-gray-400'
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            value={answers[0]}
            onChange={(e) => !checked && setAnswers([e.target.value])}
            className={`w-full p-3 border-2 rounded-2xl font-bold text-lg outline-none ${
              checked ? (isCorrect ? 'border-[#58CC02] bg-[#D7FFB8]' : 'border-[#FF4B4B] bg-[#FFDFE0]') : 'border-gray-300'
            }`}
            placeholder="Shkruaj këtu..."
            onKeyDown={(e) => e.key === 'Enter' && !checked && answers[0] && setChecked(true)}
          />
          <SpecialCharsBar onInsert={insertChar} />
        </>
      )}

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]'}`}>
            <p className={`font-black text-lg ${isCorrect ? 'text-[#46A302]' : 'text-[#FF4B4B]'}`}>
              {isCorrect ? '✓ Saktë! Richtig! ✓' : '✗ Gabim! Falsch! ✗'}
            </p>
            {!isCorrect && (
              <p className="text-gray-700 mt-1">
                Përgjigja e saktë: <span className="font-bold text-[#46A302]">{exercise.blanks[0]}</span>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`btn-check ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        onClick={checked ? () => onComplete(isCorrect, isCorrect ? exercise.xpReward : 0) : () => answers[0] && setChecked(true)}
        disabled={!answers[0] && !checked}
      >
        {checked ? 'VAZHDO / WEITER / CONTINUE →' : 'KONTROLLO / PRÜFEN / CHECK'}
      </button>
    </div>
  );
}
