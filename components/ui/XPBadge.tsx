'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  amount: number;
  visible: boolean;
}

export function XPBadge({ amount, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -60, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-50 text-2xl font-black text-[#FFC800] drop-shadow-lg pointer-events-none"
        >
          +{amount} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}
