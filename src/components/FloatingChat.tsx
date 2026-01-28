import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, X } from "lucide-react";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 bg-card rounded-2xl shadow-elevated border border-border overflow-hidden min-w-[200px]"
          >
            <div className="p-4 bg-secondary/50 border-b border-border">
              <p className="font-display text-lg">Chat with us!</p>
              <p className="text-xs text-muted-foreground">We usually reply fast ✨</p>
            </div>
            <div className="p-2">
              <a
                href="https://www.instagram.com/yaaran_thread/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Instagram DM</p>
                  <p className="text-xs text-muted-foreground">@yaaran_thread</p>
                </div>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Quick chat</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary shadow-elevated flex items-center justify-center text-primary-foreground"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
