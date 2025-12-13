"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /**
   * Fixed modal width in px (desktop). Example: 728
   * Modal will NOT shrink based on content.
   */
  width?: number;
  footer?: ReactNode;
  children: ReactNode;
}

export default function DModal({
  open,
  onClose,
  title,
  width = 728,
  footer,
  children,
}: ModalProps) {
  // Lock background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Desktop spacing wrapper */}
          <div className="w-full flex justify-center sm:px-4">
            {/* Modal */}
            <motion.div
              style={{ width: "100%", maxWidth: width }}
              className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[calc(100dvh-32px)]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 shrink-0">
                <h2 className="text-lg font-semibold truncate">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg w-8 h-8 border-secondary-border border flex items-center justify-center cursor-pointer"
                  aria-label="Close"
                >
                  <span className="material-symbols-rounded text-xl! leading-4 mt-0.5">
                    close
                  </span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 pt-0">{children}</div>

              {/* Footer (optional) */}
              {footer && (
                <div className="border-t px-4 py-3 shrink-0">{footer}</div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
