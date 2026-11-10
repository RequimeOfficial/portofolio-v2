import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Brain, MessageCircle, ArrowRight, RotateCcw } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { getAssistantReply, type AssistantReply } from '../../lib/assistant';
import { profile } from '../../data/profile';
import { scrollToSection } from '../../lib/utils';
import { useI18n } from '../../contexts/language';

interface Message extends AssistantReply {
  id: number;
  isBot: boolean;
}

/** id 0 is the greeting; its text is rendered from the dictionary so it follows the active language. */
const greeting: Message = { id: 0, isBot: true, text: '' };

const featureStyles = [
  { icon: Brain, color: 'from-blue-500 to-cyan-500' },
  { icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
];

const AISection: React.FC = () => {
  const { t, posts } = useI18n();
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const timeoutRef = useRef<number>();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll only the chat box (not the whole page) when new messages arrive.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const send = (text: string) => {
    const question = text.trim();
    if (!question || isTyping) return;

    setMessages((prev) => [...prev, { id: nextId.current++, text: question, isBot: false }]);
    setInputMessage('');
    setIsTyping(true);

    // Short "thinking" delay so the conversation feels natural.
    timeoutRef.current = window.setTimeout(
      () => {
        const reply = getAssistantReply(question, t, posts);
        setMessages((prev) => [...prev, { id: nextId.current++, isBot: true, ...reply }]);
        setIsTyping(false);
        inputRef.current?.focus({ preventScroll: true });
      },
      700 + Math.random() * 600,
    );
  };

  const reset = () => {
    window.clearTimeout(timeoutRef.current);
    setIsTyping(false);
    setMessages([greeting]);
  };

  return (
    <section id="ai-section" className="py-20 bg-white dark:bg-dark-primary scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.ai.title} highlight={t.ai.highlight} subtitle={t.ai.subtitle} />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white text-center lg:text-start">
              {t.ai.heading}
            </h3>

            <div className="grid gap-6">
              {t.ai.features.map((feature, index) => {
                const { icon: Icon, color } = featureStyles[index]!;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-dark-secondary rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`p-3 bg-gradient-to-r ${color} rounded-xl shrink-0`}>
                      <Icon className="text-white" size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            className="bg-gray-50 dark:bg-dark-secondary rounded-2xl p-4 sm:p-6 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t.ai.assistantName}</h4>
                  <p className="text-sm text-green-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {isTyping ? t.ai.typing : t.ai.online}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-neon-blue hover:bg-gray-200 dark:hover:bg-dark-accent transition-colors"
                aria-label={t.ai.restart}
                title={t.ai.restart}
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={listRef}
              className="h-80 overflow-y-auto overscroll-contain space-y-4 mb-6 pe-1 scrollbar-thin"
              role="log"
              aria-live="polite"
              aria-label={t.ai.conversation}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.isBot
                          ? 'bg-gradient-to-r from-neon-blue to-neon-purple'
                          : 'bg-gray-400 dark:bg-gray-600'
                      }`}
                    >
                      {message.isBot ? (
                        <Bot className="text-white" size={16} />
                      ) : (
                        <User className="text-white" size={16} />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white dark:bg-dark-primary text-gray-900 dark:text-white rounded-ss-sm'
                          : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-se-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.id === 0 ? t.assistant.greeting(profile.brand, profile.shortName) : message.text}
                      </p>
                      {message.action && (
                        <button
                          type="button"
                          onClick={() => scrollToSection(message.action!.sectionId)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-neon-blue hover:underline"
                        >
                          {message.action.label} <ArrowRight size={12} className="rtl:-scale-x-100" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start" aria-label={t.ai.assistantTyping}>
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={16} />
                    </div>
                    <div className="bg-white dark:bg-dark-primary p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.ai.quickQuestionsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {t.ai.quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => send(question)}
                    disabled={isTyping}
                    className="px-3 py-1.5 text-xs bg-gray-200 dark:bg-dark-accent text-gray-600 dark:text-gray-300 rounded-full hover:bg-neon-blue hover:text-white transition-colors duration-200 disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(inputMessage);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.ai.placeholder(profile.shortName)}
                aria-label={t.ai.yourQuestion}
                maxLength={300}
                className="flex-1 min-w-0 px-4 py-3 bg-white dark:bg-dark-primary border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              <motion.button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t.ai.send}
              >
                <Send size={20} className="rtl:-scale-x-100" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
