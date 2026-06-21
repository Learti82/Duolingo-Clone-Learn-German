'use client';
import { useUserStore } from '@/store/useUserStore';
import { Translation } from '@/app/types';

interface Props {
  translation: Translation;
  showDe?: boolean;
  className?: string;
  deClassName?: string;
  transClassName?: string;
}

export function TranslationDisplay({ translation, showDe = true, className = '', deClassName = '', transClassName = '' }: Props) {
  const { preferredTranslation } = useUserStore();

  return (
    <div className={className}>
      {showDe && (
        <div className={`font-bold text-[#3C3C3C] ${deClassName}`}>
          {translation.de}
        </div>
      )}
      <div className={`text-gray-500 ${transClassName}`}>
        {(preferredTranslation === 'sq' || preferredTranslation === 'both') && (
          <span className="text-blue-600">{translation.sq}</span>
        )}
        {preferredTranslation === 'both' && (
          <span className="text-gray-400 mx-1">•</span>
        )}
        {(preferredTranslation === 'en' || preferredTranslation === 'both') && (
          <span className="text-purple-600">{translation.en}</span>
        )}
      </div>
    </div>
  );
}
