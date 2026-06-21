import { Gender } from '@/app/types';

const colors: Record<Gender, { bg: string; text: string; border: string }> = {
  der: { bg: '#EBF7FF', text: '#1CB0F6', border: '#1CB0F6' },
  die: { bg: '#FFF0F0', text: '#FF4B4B', border: '#FF4B4B' },
  das: { bg: '#F0FFF0', text: '#58CC02', border: '#58CC02' },
};

export function GenderBadge({ gender }: { gender: Gender }) {
  const c = colors[gender];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-black uppercase"
      style={{ background: c.bg, color: c.text, border: `2px solid ${c.border}` }}
    >
      {gender}
    </span>
  );
}
