import { Achievement } from '@/app/types';

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: { de: 'Erste Schritte', en: 'First Steps', sq: 'Hapat e Parë' },
    description: {
      de: 'Erste Lektion abgeschlossen',
      en: 'Complete your first lesson',
      sq: 'Kryej mësimin e parë',
    },
    icon: '🎯',
    condition: 'totalLessonsCompleted >= 1',
  },
  {
    id: 'perfectionist',
    title: { de: 'Perfektionist', en: 'Perfectionist', sq: 'Perfeksionist' },
    description: {
      de: 'Einheitstest ohne Fehler',
      en: 'Complete a unit test perfectly',
      sq: 'Krye testin pa gabime',
    },
    icon: '⭐',
    condition: 'perfectUnitTest',
  },
  {
    id: 'a1-complete',
    title: { de: 'A1 Geschafft!', en: 'A1 Complete!', sq: 'A1 Përfunduar!' },
    description: {
      de: 'A1 abgeschlossen',
      en: 'Complete all A1 units',
      sq: 'Krye të gjitha njësitë A1',
    },
    icon: '🏆',
    condition: 'a1Complete',
  },
  {
    id: 'week-streak',
    title: { de: 'Woche für Woche', en: 'Week by Week', sq: 'Javë pas Jave' },
    description: {
      de: '7 Tage in Folge gelernt',
      en: '7-day learning streak',
      sq: '7 ditë rresht mësim',
    },
    icon: '🔥',
    condition: 'streakCount >= 7',
  },
  {
    id: 'month-streak',
    title: { de: 'Marathonläufer', en: 'Marathon Runner', sq: 'Maratonist' },
    description: {
      de: '30 Tage in Folge',
      en: '30-day streak',
      sq: '30 ditë rresht',
    },
    icon: '🏃',
    condition: 'streakCount >= 30',
  },
  {
    id: 'article-king',
    title: { de: 'Artikelkönig', en: 'Article King', sq: 'Mbreti i Nyjeve' },
    description: {
      de: '50 Artikel in Folge richtig',
      en: '50 articles correct in a row',
      sq: '50 nyje radhazi saktë',
    },
    icon: '👑',
    condition: 'articleStreak >= 50',
  },
  {
    id: 'five-perfect',
    title: { de: 'Ohne Fehler', en: 'Error-Free', sq: 'Pa Gabime' },
    description: {
      de: '5 perfekte Lektionen',
      en: '5 perfect lessons',
      sq: '5 mësime perfekte',
    },
    icon: '✨',
    condition: 'perfectLessons >= 5',
  },
  {
    id: 'night-owl',
    title: { de: 'Nachtlerner', en: 'Night Learner', sq: 'Nxënësi i Natës' },
    description: {
      de: 'Lektion nach 23 Uhr',
      en: 'Lesson after 11pm',
      sq: 'Mësim pas orës 23:00',
    },
    icon: '🦦',
    condition: 'lessonAfter11pm',
  },
  {
    id: 'polyglot',
    title: { de: 'Polyglot', en: 'Polyglot', sq: 'Poliglot' },
    description: {
      de: 'C2 abgeschlossen',
      en: 'Complete C2',
      sq: 'Krye C2',
    },
    icon: '🌍',
    condition: 'c2Complete',
  },
  {
    id: 'vocab-master',
    title: { de: 'Vokabelmeister', en: 'Vocabulary Master', sq: 'Mjeshtrë Fjalori' },
    description: {
      de: '100 Vokabeln wiederholt',
      en: '100 vocabulary reviews',
      sq: '100 rishikime fjalori',
    },
    icon: '📚',
    condition: 'vocabReviews >= 100',
  },
];
