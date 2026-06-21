'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordOrderExercise as WOType } from '@/app/types';
import { TranslationDisplay } from '@/components/ui/TranslationDisplay';

interface Props {
  exercise: WOType;
  onComplete: (correct: boolean, xp: number) => void;
}

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
}

export function WordOrderExercise({ exercise, onComplete }: Props) {
  const [arranged, setArranged] = useState<string[]>([]);
  const [bank, setBank] = useState(() => exercise.words.map((w, i) => ({ w, id: i })).sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);

  const sentence = arranged.join(' ');
  const isCorrect = normalize(sentence) === normalize(exercise.correctSentence);

  const addWord = (item: { w: string; id: number }) => {
    if (checked) return;
    setArranged([...arranged, item.w]);
    setBank(bank.filter((b) => b.id !== item.id));
  };

  const removeWord = (idx: number) => {
    if (checked) return;
    const word = arranged[idx];
    const removedItem = exercise.words.map((w, i) => ({ w, id: i })).find(
      (item) => item.w === word && !bank.find(b => b.id === item.id)
    );
    if (removedItem) setBank([...bank, removedItem]);
    setArranged(arranged.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">
          Rregulloni fjalët / Arrange the words
        </p>
        <TranslationDisplay
          translation={exercise.translation}
          showDe={false}
          transClassName="text-lg"
        />
        {exercise.hint && (
          <p className="text-sm text-gray-400 mt-1">💡 {exercise.hint}</p>
        )}
      </div>

      <div className={`min-h-16 p-4 border-2 rounded-2xl flex flex-wrap gap-2 items-center ${checked ? (isCorrect ? 'border-[#58CC02] bg-[#D7FFB8]' : 'border-[#FF4B4B] bg-[#FFDFE0]') : 'border-dashed border-gray-300 bg-white'}`}>
        {arranged.length === 0 && !checked && (
          <p className="text-gray-300 text-sm">Kliko fjalët për t&apos;i shtuar / Click words to add them</p>
        )}
        {arranged.map((w, i) => (
          <motion.button
            key={`arr-${i}`}
            layout
            onClick={() => removeWord(i)}
            className="px-3 py-1.5 bg-white border-2 border-[#58CC02] rounded-xl text-sm font-bold text-gray-800 shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            {w}
          </motion.button>
        ))}
      </div>

      {!checked && (
        <div className="flex flex-wrap gap-2 justify-center p-3 bg-gray-100 rounded-2xl">
          {bank.map((item) => (
            <motion.button
              key={item.id}
              layout
              onClick={() => addWord(item)}
              className="px-3 py-1.5 bg-white border-2 border-gray-300 rounded-xl text-sm font-bold hover:border-[#58CC02] transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {item.w}
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]'}`}>
            <p className={`font-black text-lg ${isCorrect ? 'text-[#46A302]' : 'text-[#FF4B4B]'}`}>
              {isCorrect ? '✓ Saktë! Richtig! ✓' : '✗ Gabim! Falsch! ✗'}
            </p>
            {!isCorrect && (
              <p className="text-gray-700 mt-1 font-semibold">
                Fjalia e saktë: <span className="text-[#46A302]">{exercise.correctSentence}</span>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`btn-check ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        onClick={checked ? () => onComplete(isCorrect, isCorrect ? exercise.xpReward : 0) : () => arranged.length > 0 && setChecked(true)}
        disabled={arranged.length === 0 && !checked}
      >
        {checked ? 'VAZHDO / WEITER / CONTINUE →' : 'KONTROLLO / PRÜFEN / CHECK'}
      </button>
    </div>
  );
}
