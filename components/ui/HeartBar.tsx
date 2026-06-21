'use client';
import { motion } from 'framer-motion';

interface Props {
  current: number;
  max?: number;
}

export function HeartBar({ current, max = 5 }: Props) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1 }}
          animate={{ scale: i < current ? 1 : 0.7, opacity: i < current ? 1 : 0.3 }}
          className="text-xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
