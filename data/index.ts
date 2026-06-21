import { LevelData } from '@/app/types';
import { a1Units } from './a1/units';

export { a1Vocabulary } from './a1/vocabulary';
export { a1Grammar } from './a1/grammar';

export const curriculum: LevelData[] = [
  {
    id: 'A1',
    title: { de: 'Anfänger', en: 'Beginner', sq: 'Fillestar' },
    description: {
      de: 'Grundlagen der deutschen Sprache',
      en: 'Fundamentals of German language',
      sq: 'Bazat e gjuhës gjermane',
    },
    studyHours: '80-100',
    units: a1Units,
  },
  {
    id: 'A2',
    title: { de: 'Grundlegende Kenntnisse', en: 'Elementary', sq: 'Elementar' },
    description: {
      de: 'Erweitere deine Deutschkenntnisse',
      en: 'Expand your German knowledge',
      sq: 'Zgjidhni njohuritë tuaja të gjermanishtes',
    },
    studyHours: '180-200',
    units: [
      {
        id: 'a2-u1',
        levelId: 'A2',
        unitNumber: 1,
        title: { de: 'Alltag & Routinen', en: 'Daily Life & Routines', sq: 'Jeta e Përditshme & Rutina' },
        description: {
          de: 'Beschreibe deinen Alltag',
          en: 'Describe your daily life',
          sq: 'Përshkruaj jetën tëndë të përditshme',
        },
        emoji: '📅',
        grammarTips: [],
        vocabularyList: [],
        isComingSoon: true,
        lessons: [],
      },
    ],
  },
  {
    id: 'B1',
    title: { de: 'Mittelstufe', en: 'Intermediate', sq: 'Mesatar' },
    description: {
      de: 'Kommuniziere auf Deutsch',
      en: 'Communicate in German',
      sq: 'Komuniko në gjermanisht',
    },
    studyHours: '350-400',
    units: [
      {
        id: 'b1-u1',
        levelId: 'B1',
        unitNumber: 1,
        title: { de: 'Reisen & Erlebnisse', en: 'Travel & Experiences', sq: 'Udhëtim & Përvoja' },
        description: { de: 'Über Reisen sprechen', en: 'Talk about travel', sq: 'Fol për udhëtim' },
        emoji: '✈️',
        grammarTips: [],
        vocabularyList: [],
        isComingSoon: true,
        lessons: [],
      },
    ],
  },
  {
    id: 'B2',
    title: { de: 'Obere Mittelstufe', en: 'Upper Intermediate', sq: 'Mesatar i Lartë' },
    description: { de: 'Fließend Deutsch sprechen', en: 'Speak German fluently', sq: 'Fol gjermanisht me rrjedhshmëri' },
    studyHours: '500-600',
    units: [
      {
        id: 'b2-u1',
        levelId: 'B2',
        unitNumber: 1,
        title: { de: 'Kultur & Gesellschaft', en: 'Culture & Society', sq: 'Kulturë & Shoqëri' },
        description: { de: 'Deutsche Kultur verstehen', en: 'Understand German culture', sq: 'Kuptoni kulturën gjermane' },
        emoji: '🎭',
        grammarTips: [],
        vocabularyList: [],
        isComingSoon: true,
        lessons: [],
      },
    ],
  },
  {
    id: 'C1',
    title: { de: 'Fortgeschritten', en: 'Advanced', sq: 'I Avancuar' },
    description: { de: 'Meistere die deutsche Sprache', en: 'Master the German language', sq: 'Zotëro gjuhën gjermane' },
    studyHours: '700-800',
    units: [
      {
        id: 'c1-u1',
        levelId: 'C1',
        unitNumber: 1,
        title: { de: 'Akademisches Deutsch', en: 'Academic German', sq: 'Gjermanisht Akademike' },
        description: { de: 'Akademische Texte verstehen', en: 'Understand academic texts', sq: 'Kuptoni tekstet akademike' },
        emoji: '🎓',
        grammarTips: [],
        vocabularyList: [],
        isComingSoon: true,
        lessons: [],
      },
    ],
  },
  {
    id: 'C2',
    title: { de: 'Muttersprachliches Niveau', en: 'Mastery', sq: 'Zotërim' },
    description: { de: 'Perfektion auf Muttersprachniveau', en: 'Native-level perfection', sq: 'Përsosmëri në nivel amtar' },
    studyHours: '1000+',
    units: [
      {
        id: 'c2-u1',
        levelId: 'C2',
        unitNumber: 1,
        title: { de: 'Literatur & Kunst', en: 'Literature & Art', sq: 'Letërsi & Art' },
        description: { de: 'Deutsche Literatur meistern', en: 'Master German literature', sq: 'Zotëro letërsinë gjermane' },
        emoji: '📜',
        grammarTips: [],
        vocabularyList: [],
        isComingSoon: true,
        lessons: [],
      },
    ],
  },
];

export { achievements } from './achievements';
