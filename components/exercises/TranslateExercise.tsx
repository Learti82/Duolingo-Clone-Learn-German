'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranslateExercise as TType } from '@/app/types';
import { TranslationDisplay } from '@/components/ui/TranslationDisplay';
import { SpecialCharsBar } from '@/components/ui/SpecialCharsBar';

interface Props {
  exercise: TType;
  onComplete: (correct: boolean, xp: number) => void;
}

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
}

export function TranslateExercise({ exercise, onComplete }: Props) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [shuffled] = useState(() => exercise.wordBank ? [...exercise.wordBank].sort(() => Math.random() - 0.5) : []);
  const inputRef = useRef<HTMLInputElement>(null);

  const userAnswer = exercise.useWordBank ? selectedWords.join(' ') : typedAnswer;
  const isCorrect = normalize(userAnswer) === normalize(exercise.correctAnswer);

  const insertChar = (char: string) => {
    if (inputRef.current) {
      const pos = inputRef.current.selectionStart || typedAnswer.length;
      setTypedAnswer(typedAnswer.slice(0, pos) + char + typedAnswer.slice(pos));
    }
  };

  const handleCheck = () => {
    if (!userAnswer.trim()) return;
    setChecked(true);
  };

  const langLabel = { de: 'Gjermanisht', en: 'Anglisht', sq: 'Shqip' }[exercise.targetLang];
  const promptLabel = exercise.targetLang === 'de' ? 'Shkruaj në gjermanisht:' : `Shkruaj në ${langLabel}:`;

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">{promptLabel}</p>
        <TranslationDisplay
          translation={exercise.prompt}
          showDe={exercise.targetLang !== 'de'}
          deClassName="text-2xl font-black mb-1"
          transClassName="text-base"
        />
        {exercise.targetLang !== 'de' && (
          <p className="text-lg font-bold text-gray-700 mt-1">{exercise.prompt.de}</p>
        )}
      </div>

      <div className={`min-h-14 p-3 border-2 rounded-2xl ${checked ? (isCorrect ? 'border-[#58CC02] bg-[#D7FFB8]' : 'border-[#FF4B4B] bg-[#FFDFE0]') : 'border-gray-300 bg-white'}`}>
        {exercise.useWordBank ? (
          <div className="flex flex-wrap gap-2 min-h-8">
            {selectedWords.map((w, i) => (
              <motion.button
                key={`${w}-${i}`}
                layout
                onClick={() => !checked && setSelectedWords(selectedWords.filter((_, j) => j !== i))}
                className="px-3 py-1.5 bg-white border-2 border-[#1CB0F6] rounded-xl text-sm font-bold text-[#1CB0F6] shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                {w}
              </motion.button>
            ))}
          </div>
        ) : (
          <input
            ref={inputRef}
            value={typedAnswer}
            onChange={(e) => !checked && setTypedAnswer(e.target.value)}
            className="w-full bg-transparent outline-none font-bold text-lg text-gray-800"
            placeholder="Shkruaj këtu... / Type here..."
            onKeyDown={(e) => e.key === 'Enter' && !checked && handleCheck()}
          />
        )}
      </div>

      {exercise.useWordBank && !checked && (
        <div className="flex flex-wrap gap-2 justify-center p-3 bg-gray-100 rounded-2xl">
          {shuffled.map((word, i) => {
            const used = selectedWords.includes(word);
            return (
              <motion.button
                key={i}
                onClick={() => !used && setSelectedWords([...selectedWords, word])}
                className={`px-3 py-1.5 border-2 rounded-xl text-sm font-bold transition-all ${used ? 'opacity-30 border-gray-300 bg-gray-200 cursor-not-allowed' : 'bg-white border-gray-300 hover:border-[#1CB0F6]'}`}
                whileTap={{ scale: 0.95 }}
                disabled={used}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
      )}

      {!exercise.useWordBank && exercise.targetLang === 'de' && (
        <SpecialCharsBar onInsert={insertChar} />
      )}

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
                Përgjigja e saktë: <span className="text-[#46A302]">{exercise.correctAnswer}</span>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`btn-check ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        onClick={checked ? () => onComplete(isCorrect, isCorrect ? exercise.xpReward : 0) : handleCheck}
        disabled={!userAnswer.trim() && !checked}
      >
        {checked ? 'VAZHDO / WEITER / CONTINUE →' : 'KONTROLLO / PRÜFEN / CHECK'}
      </button>
    </div>
  );
}
