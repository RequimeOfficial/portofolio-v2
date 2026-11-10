import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { profile } from '../data/profile';

interface EasterEggConsoleProps {
  isOpen: boolean;
  commands: string[];
  onExecuteCommand: (command: string) => void;
  onClose: () => void;
}

const EasterEggConsole: React.FC<EasterEggConsoleProps> = ({ isOpen, commands, onExecuteCommand, onClose }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    // Wait for the open animation to mount the input.
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commands]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onExecuteCommand(input);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]!);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex]!);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            dir="ltr"
            aria-modal="true"
            aria-label="Secret console"
            className="w-full max-w-2xl h-[28rem] max-h-[85vh] flex flex-col bg-dark-primary/95 text-neon-blue p-5 rounded-xl border border-neon-blue font-mono shadow-[0_0_30px_rgba(0,209,255,0.3)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold font-mono">
                <Terminal size={18} />
                {profile.brand}'s Secret Console
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-neon-blue hover:text-white"
                aria-label="Close console"
              >
                <X size={20} />
              </button>
            </div>

            <div
              ref={consoleRef}
              className="flex-1 overflow-y-auto mb-4 space-y-1 text-xs sm:text-sm scrollbar-thin"
              aria-live="polite"
              onClick={() => inputRef.current?.focus()}
            >
              {commands.map((command, index) => (
                <div
                  key={index}
                  className={`whitespace-pre-wrap break-words ${command.startsWith('$') ? 'text-white' : ''}`}
                >
                  {command}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center border-t border-neon-blue/30 pt-3">
              <span className="text-neon-green mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white font-mono text-sm"
                placeholder="Type a command... (try: help)"
                aria-label="Console command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggConsole;
