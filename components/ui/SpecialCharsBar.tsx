'use client';
interface Props {
  onInsert: (char: string) => void;
}

const chars = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];

export function SpecialCharsBar({ onInsert }: Props) {
  return (
    <div className="flex gap-2 flex-wrap justify-center mt-2">
      {chars.map((c) => (
        <button
          key={c}
          onClick={() => onInsert(c)}
          className="px-3 py-1.5 bg-white border-2 border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:border-[#1CB0F6] hover:text-[#1CB0F6] transition-colors"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
