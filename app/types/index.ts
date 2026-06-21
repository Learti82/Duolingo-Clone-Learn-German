export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type Gender = 'der' | 'die' | 'das';
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'article' | 'numeral' | 'interjection';

export type Translation = {
  de: string;
  en: string;
  sq: string;
};

export type VocabularyWord = {
  id: string;
  word: Translation;
  gender?: Gender;
  plural?: string;
  partOfSpeech: PartOfSpeech;
  exampleSentence: Translation;
  audioText: string;
  level: Level;
  topic: string;
};

export type GrammarTip = {
  id: string;
  title: Translation;
  explanation_en: string;
  explanation_sq: string;
  examples: Translation[];
  level: Level;
  relatedTopics: string[];
};

// Exercise types
export type BaseExercise = {
  id: string;
  type: ExerciseType;
  level: Level;
  xpReward: number;
};

export type ExerciseType =
  | 'translate'
  | 'multipleChoice'
  | 'fillBlank'
  | 'matchPairs'
  | 'wordOrder'
  | 'listening'
  | 'speaking'
  | 'readingComprehension'
  | 'writingPrompt'
  | 'errorCorrection'
  | 'articleDrill'
  | 'clozeListening';

export type TranslateExercise = BaseExercise & {
  type: 'translate';
  prompt: Translation;
  correctAnswer: string;
  targetLang: 'de' | 'en' | 'sq';
  wordBank?: string[];
  useWordBank: boolean;
};

export type MultipleChoiceExercise = BaseExercise & {
  type: 'multipleChoice';
  question: Translation;
  options: string[];
  correctIndex: number;
  explanation: { en: string; sq: string };
};

export type FillBlankExercise = BaseExercise & {
  type: 'fillBlank';
  sentence: Translation;
  blanks: string[];
  options?: string[];
  useOptions: boolean;
};

export type MatchPairsExercise = BaseExercise & {
  type: 'matchPairs';
  pairs: Array<{ de: string; translation: string; translationLang: 'en' | 'sq' }>;
};

export type WordOrderExercise = BaseExercise & {
  type: 'wordOrder';
  words: string[];
  correctSentence: string;
  translation: Translation;
  hint?: string;
};

export type ListeningExercise = BaseExercise & {
  type: 'listening';
  audioText: string;
  question: Translation;
  options: string[];
  correctIndex: number;
};

export type SpeakingExercise = BaseExercise & {
  type: 'speaking';
  targetSentence: string;
  translation: Translation;
  phoneticHints?: string;
};

export type ArticleDrillExercise = BaseExercise & {
  type: 'articleDrill';
  noun: string;
  gender: Gender;
  plural: string;
  translation: Translation;
  exampleSentence: Translation;
};

export type AnyExercise =
  | TranslateExercise
  | MultipleChoiceExercise
  | FillBlankExercise
  | MatchPairsExercise
  | WordOrderExercise
  | ListeningExercise
  | SpeakingExercise
  | ArticleDrillExercise;

export type Lesson = {
  id: string;
  unitId: string;
  title: Translation;
  description: Translation;
  exercises: AnyExercise[];
  grammarFocus?: string[];
  vocabularyFocus?: string[];
};

export type Unit = {
  id: string;
  levelId: Level;
  unitNumber: number;
  title: Translation;
  description: Translation;
  emoji: string;
  lessons: Lesson[];
  grammarTips: GrammarTip[];
  vocabularyList: VocabularyWord[];
  isComingSoon?: boolean;
};

export type LevelData = {
  id: Level;
  title: Translation;
  description: Translation;
  studyHours: string;
  units: Unit[];
};

// User progress types
export type LessonProgress = {
  bestScore: number;
  completedAt: string;
  attempts: number;
};

export type VocabProgress = {
  word_de: string;
  word_en: string;
  word_sq: string;
  gender: string | null;
  proficiency: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewAt: string;
};

export type Achievement = {
  id: string;
  title: Translation;
  description: Translation;
  icon: string;
  condition: string;
};
