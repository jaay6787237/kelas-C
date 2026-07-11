import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  description: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageUrl, title, description, onClose }: LightboxProps) {
  // Prevent body scroll when lightbox is active
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="lightbox-overlay"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close button top right */}
          <motion.button
            id="lightbox-close-btn"
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-all active:scale-95 flex items-center justify-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </motion.button>

          {/* Click outside to close container */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* Lightbox content card */}
          <motion.div
            id="lightbox-content"
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col justify-center items-center z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* The Image */}
            <motion.img
              id="lightbox-image"
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              layoutId={`gallery-img-${imageUrl}`}
              referrerPolicy="no-referrer"
            />

            {/* Title and description underneath */}
            <motion.div
              id="lightbox-details"
              className="mt-6 text-center max-w-2xl px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
