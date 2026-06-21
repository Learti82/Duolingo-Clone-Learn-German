'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchPairsExercise as MPType } from '@/app/types';
import { useUserStore } from '@/store/useUserStore';

interface Props {
  exercise: MPType;
  onComplete: (correct: boolean, xp: number) => void;
}

export function MatchPairsExercise({ exercise, onComplete }: Props) {
  const { preferredTranslation } = useUserStore();
  const [selectedDe, setSelectedDe] = useState<number | null>(null);
  const [selectedTr, setSelectedTr] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState(0);

  const pairs = exercise.pairs;
  const shuffledTr = useState(() => pairs.map((p, i) => ({ ...p, origIdx: i })).sort(() => Math.random() - 0.5))[0];

  const handleDe = (i: number) => {
    if (matched.has(i)) return;
    setSelectedDe(i);
  };

  const handleTr = (i: number) => {
    if (matched.has(shuffledTr[i].origIdx)) return;
    if (selectedDe === null) return;

    const origIdx = shuffledTr[i].origIdx;
    if (origIdx === selectedDe) {
      setMatched(new Set([...matched, selectedDe]));
      setSelectedDe(null);
      setSelectedTr(null);
    } else {
      setWrongPair([selectedDe, i]);
      setErrors(errors + 1);
      setTimeout(() => { setWrongPair(null); setSelectedDe(null); setSelectedTr(null); }, 800);
    }
  };

  const allMatched = matched.size === pairs.length;

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">
          Përputh çiftet / Match the pairs
        </p>
        <p className="text-gray-500 text-sm">{matched.size}/{pairs.length} çifte / pairs</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {pairs.map((pair, i) => {
            const isMatched = matched.has(i);
            const isSelected = selectedDe === i;
            const isWrong = wrongPair?.[0] === i;
            return (
              <motion.button
                key={i}
                onClick={() => !isMatched && handleDe(i)}
                animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                className={`p-3 rounded-2xl border-2 font-bold text-sm text-left transition-all ${
                  isMatched ? 'bg-[#D7FFB8] border-[#58CC02] opacity-60' :
                  isWrong ? 'bg-[#FFDFE0] border-[#FF4B4B]' :
                  isSelected ? 'bg-blue-50 border-[#1CB0F6]' :
                  'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                {isMatched ? '✓ ' : ''}{pair.de}
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {shuffledTr.map((pair, i) => {
            const isMatched = matched.has(pair.origIdx);
            const isWrong = wrongPair?.[1] === i;
            const label = pair.translation;
            return (
              <motion.button
                key={i}
                onClick={() => !isMatched && handleTr(i)}
                animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                className={`p-3 rounded-2xl border-2 font-bold text-sm text-left transition-all ${
                  isMatched ? 'bg-[#D7FFB8] border-[#58CC02] opacity-60' :
                  isWrong ? 'bg-[#FFDFE0] border-[#FF4B4B]' :
                  selectedTr === i ? 'bg-blue-50 border-[#1CB0F6]' :
                  'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                {isMatched ? '✓ ' : ''}{label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {allMatched && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-[#D7FFB8] text-center">
            <p className="font-black text-xl text-[#46A302]">
              🎉 Saktë të gjitha! / Alle richtig! / All correct!
            </p>
            {errors > 0 && <p className="text-sm text-gray-600 mt-1">{errors} gabim(e) / {errors} error(s)</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {allMatched && (
        <button
          className="btn-check correct"
          onClick={() => onComplete(errors === 0, exercise.xpReward)}
        >
          VAZHDO / WEITER / CONTINUE →
        </button>
      )}
    </div>
  );
}
