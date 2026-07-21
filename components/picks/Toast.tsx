'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'

export default function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 lg:bottom-10"
        >
          <div className="flex items-center gap-2 rounded-[11px] border border-[#252A32] bg-[#171A20] px-4 py-2.5 text-sm text-[#F7F7F3] shadow-lg shadow-black/40">
            <Check size={15} className="text-[#E3B44F]" aria-hidden />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
