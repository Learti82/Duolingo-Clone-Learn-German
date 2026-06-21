'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Level, LessonProgress, VocabProgress } from '@/app/types';

type ArticleStats = {
  der: { correct: number; total: number };
  die: { correct: number; total: number };
  das: { correct: number; total: number };
};

type UserState = {
  displayName: string;
  preferredTranslation: 'sq' | 'en' | 'both';
  currentLevel: Level;
  totalXP: number;
  hearts: number;
  heartsRefillAt: number | null;
  gems: number;
  streakCount: number;
  streakLastDate: string | null;
  streakFreezeAvailable: boolean;
  dailyGoal: 10 | 20 | 50 | 100;
  dailyXPEarned: number;
  dailyResetDate: string;
  completedLessons: Record<string, LessonProgress>;
  unlockedLessons: string[];
  vocabulary: Record<string, VocabProgress>;
  articleStats: ArticleStats;
  earnedAchievements: string[];
  soundEnabled: boolean;
  totalLessonsCompleted: number;
  totalCorrectAnswers: number;
  totalAnswers: number;
};

type UserActions = {
  setDisplayName: (name: string) => void;
  setPreferredTranslation: (lang: 'sq' | 'en' | 'both') => void;
  earnXP: (amount: number) => void;
  loseHeart: () => void;
  refillHearts: () => void;
  earnGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  updateStreak: () => void;
  completeLesson: (lessonId: string, score: number, xp: number) => void;
  unlockLesson: (lessonId: string) => void;
  addVocabularyWord: (word: VocabProgress & { id: string }) => void;
  updateVocabReview: (wordId: string, quality: number) => void;
  updateArticleStat: (gender: 'der' | 'die' | 'das', correct: boolean) => void;
  earnAchievement: (achievementId: string) => void;
  setDailyGoal: (goal: 10 | 20 | 50 | 100) => void;
  toggleSound: () => void;
  setCurrentLevel: (level: Level) => void;
  recordAnswer: (correct: boolean) => void;
};

const initialState: UserState = {
  displayName: 'Studiues',
  preferredTranslation: 'sq',
  currentLevel: 'A1',
  totalXP: 0,
  hearts: 5,
  heartsRefillAt: null,
  gems: 0,
  streakCount: 0,
  streakLastDate: null,
  streakFreezeAvailable: false,
  dailyGoal: 20,
  dailyXPEarned: 0,
  dailyResetDate: new Date().toDateString(),
  completedLessons: {},
  unlockedLessons: ['a1-u1-l1'],
  vocabulary: {},
  articleStats: {
    der: { correct: 0, total: 0 },
    die: { correct: 0, total: 0 },
    das: { correct: 0, total: 0 },
  },
  earnedAchievements: [],
  soundEnabled: true,
  totalLessonsCompleted: 0,
  totalCorrectAnswers: 0,
  totalAnswers: 0,
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setDisplayName: (name) => set({ displayName: name }),
      setPreferredTranslation: (lang) => set({ preferredTranslation: lang }),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      earnXP: (amount) =>
        set((s) => {
          const today = new Date().toDateString();
          const resetDate = s.dailyResetDate === today ? s.dailyResetDate : today;
          const dailyXP = s.dailyResetDate === today ? s.dailyXPEarned + amount : amount;
          return {
            totalXP: s.totalXP + amount,
            dailyXPEarned: dailyXP,
            dailyResetDate: resetDate,
          };
        }),

      loseHeart: () =>
        set((s) => {
          const newHearts = Math.max(0, s.hearts - 1);
          return {
            hearts: newHearts,
            heartsRefillAt: newHearts === 0 ? Date.now() + 3600000 : s.heartsRefillAt,
          };
        }),

      refillHearts: () => set({ hearts: 5, heartsRefillAt: null }),

      earnGems: (amount) => set((s) => ({ gems: s.gems + amount })),

      spendGems: (amount) => {
        const { gems } = get();
        if (gems >= amount) {
          set({ gems: gems - amount });
          return true;
        }
        return false;
      },

      updateStreak: () =>
        set((s) => {
          const today = new Date().toDateString();
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          if (s.streakLastDate === today) return {};
          if (s.streakLastDate === yesterday || s.streakFreezeAvailable) {
            return {
              streakCount: s.streakCount + 1,
              streakLastDate: today,
              streakFreezeAvailable: false,
            };
          }
          return { streakCount: 1, streakLastDate: today };
        }),

      completeLesson: (lessonId, score, xp) =>
        set((s) => {
          const existing = s.completedLessons[lessonId];
          const bestScore = existing ? Math.max(existing.bestScore, score) : score;
          return {
            completedLessons: {
              ...s.completedLessons,
              [lessonId]: {
                bestScore,
                completedAt: new Date().toISOString(),
                attempts: (existing?.attempts || 0) + 1,
              },
            },
            totalLessonsCompleted: s.totalLessonsCompleted + 1,
          };
        }),

      unlockLesson: (lessonId) =>
        set((s) => ({
          unlockedLessons: s.unlockedLessons.includes(lessonId)
            ? s.unlockedLessons
            : [...s.unlockedLessons, lessonId],
        })),

      addVocabularyWord: ({ id, ...word }) =>
        set((s) => ({
          vocabulary: s.vocabulary[id]
            ? s.vocabulary
            : { ...s.vocabulary, [id]: word },
        })),

      updateVocabReview: (wordId, quality) =>
        set((s) => {
          const word = s.vocabulary[wordId];
          if (!word) return {};
          let { easeFactor, intervalDays, proficiency } = word;
          if (quality < 3) {
            intervalDays = 1;
            proficiency = Math.max(0, proficiency - 1);
          } else {
            intervalDays = Math.round(intervalDays * easeFactor);
            proficiency = Math.min(5, proficiency + 1);
          }
          easeFactor = Math.max(
            1.3,
            easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
          );
          const nextReviewAt = new Date(
            Date.now() + intervalDays * 86400000
          ).toISOString();
          return {
            vocabulary: {
              ...s.vocabulary,
              [wordId]: { ...word, easeFactor, intervalDays, proficiency, nextReviewAt },
            },
          };
        }),

      updateArticleStat: (gender, correct) =>
        set((s) => ({
          articleStats: {
            ...s.articleStats,
            [gender]: {
              correct: s.articleStats[gender].correct + (correct ? 1 : 0),
              total: s.articleStats[gender].total + 1,
            },
          },
        })),

      earnAchievement: (achievementId) =>
        set((s) => ({
          earnedAchievements: s.earnedAchievements.includes(achievementId)
            ? s.earnedAchievements
            : [...s.earnedAchievements, achievementId],
        })),

      recordAnswer: (correct) =>
        set((s) => ({
          totalCorrectAnswers: s.totalCorrectAnswers + (correct ? 1 : 0),
          totalAnswers: s.totalAnswers + 1,
        })),
    }),
    {
      name: 'german-app-user',
      skipHydration: false,
    }
  )
);
