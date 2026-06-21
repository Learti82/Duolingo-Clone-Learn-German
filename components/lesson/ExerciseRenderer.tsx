'use client';
import { AnyExercise } from '@/app/types';
import { MultipleChoiceExercise } from '@/components/exercises/MultipleChoiceExercise';
import { TranslateExercise } from '@/components/exercises/TranslateExercise';
import { WordOrderExercise } from '@/components/exercises/WordOrderExercise';
import { MatchPairsExercise } from '@/components/exercises/MatchPairsExercise';
import { ArticleDrillExercise } from '@/components/exercises/ArticleDrillExercise';
import { FillBlankExercise } from '@/components/exercises/FillBlankExercise';
import { ListeningExercise } from '@/components/exercises/ListeningExercise';

interface Props {
  exercise: AnyExercise;
  onComplete: (correct: boolean, xp: number) => void;
}

export function ExerciseRenderer({ exercise, onComplete }: Props) {
  switch (exercise.type) {
    case 'multipleChoice':
      return <MultipleChoiceExercise exercise={exercise} onComplete={onComplete} />;
    case 'translate':
      return <TranslateExercise exercise={exercise} onComplete={onComplete} />;
    case 'wordOrder':
      return <WordOrderExercise exercise={exercise} onComplete={onComplete} />;
    case 'matchPairs':
      return <MatchPairsExercise exercise={exercise} onComplete={onComplete} />;
    case 'articleDrill':
      return <ArticleDrillExercise exercise={exercise} onComplete={onComplete} />;
    case 'fillBlank':
      return <FillBlankExercise exercise={exercise} onComplete={onComplete} />;
    case 'listening':
      return <ListeningExercise exercise={exercise} onComplete={onComplete} />;
    default:
      return (
        <div className="text-center text-gray-400 p-8">
          <p className="text-lg">Ky ushtrim nuk është implementuar ende.</p>
          <p className="text-sm">Exercise type: {(exercise as { type: string }).type}</p>
          <button className="btn-check mt-4" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => onComplete(true, 10)}>
            Skip →
          </button>
        </div>
      );
  }
}
