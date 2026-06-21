'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListeningExercise as LType } from '@/app/types';
import { TranslationDisplay } from '@/components/ui/TranslationDisplay';

interface Props {
  exercise: LType;
  onComplete: (correct: boolean, xp: number) => void;
}

export function ListeningExercise({ exercise, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isCorrect = selected === exercise.correctIndex;
  const MAX_PLAYS = 3;

  const playAudio = useCallback((slow = false) => {
    if (playCount >= MAX_PLAYS || isPlaying) return;
    window.speechSynthesis?.cancel();
    const utt = new SpeechSynthesisUtterance(exercise.audioText);
    utt.lang = 'de-DE';
    utt.rate = slow ? 0.6 : 0.9;
    utt.onstart = () => setIsPlaying(true);
    utt.onend = () => { setIsPlaying(false); setPlayCount((p) => p + 1); };
    window.speechSynthesis?.speak(utt);
  }, [exercise.audioText, playCount, isPlaying]);

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">
          Dëgjo dhe zgjidh / Listen and choose
        </p>

        <div className="flex gap-3 justify-center mb-4">
          <motion.button
            onClick={() => playAudio(false)}
            whileTap={{ scale: 0.9 }}
            disabled={playCount >= MAX_PLAYS || isPlaying}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white transition-all ${
              playCount >= MAX_PLAYS || isPlaying ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#1CB0F6] hover:bg-[#0fa0e0]'
            }`}
          >
            {isPlaying ? '🔊' : '▶️'} Dëgjo ({MAX_PLAYS - playCount} left)
          </motion.button>
          <motion.button
            onClick={() => playAudio(true)}
            whileTap={{ scale: 0.9 }}
            disabled={playCount >= MAX_PLAYS || isPlaying}
            className="px-4 py-3 rounded-2xl font-bold border-2 border-[#1CB0F6] text-[#1CB0F6] hover:bg-blue-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🐢 Ngadalë
          </motion.button>
        </div>

        <TranslationDisplay translation={exercise.question} showDe={true} deClassName="text-xl font-bold" transClassName="text-base" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {exercise.options.map((opt, i) => {
          let cls = 'w-full p-4 border-2 rounded-2xl font-bold text-left transition-all ';
          if (!checked) cls += selected === i ? 'border-[#1CB0F6] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-400';
          else if (i === exercise.correctIndex) cls += 'border-[#58CC02] bg-[#D7FFB8] text-[#46A302]';
          else if (i === selected) cls += 'border-[#FF4B4B] bg-[#FFDFE0]';
          else cls += 'border-gray-200 bg-white opacity-50';

          return (
            <motion.button key={i} onClick={() => !checked && setSelected(i)} className={cls} whileTap={{ scale: 0.97 }}>
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-black">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl ${isCorrect ? 'bg-[#D7FFB8]' : 'bg-[#FFDFE0]'}`}>
            <p className={`font-black text-lg ${isCorrect ? 'text-[#46A302]' : 'text-[#FF4B4B]'}`}>
              {isCorrect ? '✓ Saktë! / Richtig!' : '✗ Gabim! / Falsch!'}
            </p>
            {!isCorrect && <p className="text-gray-700 mt-1 font-semibold">Përgjigja e saktë: {exercise.options[exercise.correctIndex]}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`btn-check ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        onClick={checked ? () => onComplete(isCorrect, isCorrect ? exercise.xpReward : 0) : () => selected !== null && setChecked(true)}
        disabled={selected === null && !checked}
      >
        {checked ? 'VAZHDO / WEITER / CONTINUE →' : 'KONTROLLO / PRÜFEN / CHECK'}
      </button>
    </div>
  );
}
