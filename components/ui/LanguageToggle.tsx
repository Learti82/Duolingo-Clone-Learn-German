'use client';
import { useUserStore } from '@/store/useUserStore';

export function LanguageToggle() {
  const { preferredTranslation, setPreferredTranslation } = useUserStore();

  const options = [
    { value: 'sq' as const, label: '🇦🇱 SQ', title: 'Shqip' },
    { value: 'en' as const, label: '🇬🇧 EN', title: 'English' },
    { value: 'both' as const, label: '🌐 Të dyja', title: 'Both' },
  ];

  return (
    <div className="flex gap-1 bg-white rounded-full p-1 border border-gray-200 shadow-sm">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setPreferredTranslation(opt.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
            preferredTranslation === opt.value
              ? 'bg-[#58CC02] text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          title={opt.title}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
