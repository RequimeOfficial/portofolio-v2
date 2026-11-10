import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Brain, MessageCircle, ArrowRight, RotateCcw } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { getAssistantReply, type AssistantReply } from '../../lib/assistant';
import { profile } from '../../data/profile';
import { scrollToSection } from '../../lib/utils';

interface Message extends AssistantReply {
  id: number;
  isBot: boolean;
}

const greeting: Message = {
  id: 0,
  isBot: true,
  text: `Hi! I'm ${profile.brand}'s assistant. Ask me anything about ${profile.shortName}'s skills, experience, projects or services — in English or Bahasa Indonesia!`,
};

const quickQuestions = [
  'What are his main skills?',
  'Tell me about his experience',
  'What projects has he worked on?',
  'Is he available for hire?',
  'How can I contact him?',
];

const features = [
  {
    icon: Brain,
    title: 'Smart Responses',
    description: 'Answers are generated from the same data that powers this portfolio, so they are always up to date.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Bilingual',
    description: 'Ask in English or Bahasa Indonesia — "skills", "keahlian", "kontak" all work.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageCircle,
    title: '24/7 Availability',
    description: 'Get instant answers anytime, then jump straight to the relevant section.',
    color: 'from-green-500 to-emerald-500',
  },
];

const AISection: React.FC = () => {
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
        const reply = getAssistantReply(question);
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
        <SectionHeader
          title="Ask My"
          highlight="AI Assistant"
          subtitle="Get instant answers about my skills, experience, and projects through a quick conversation"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white text-center lg:text-left">
              Your Personal Guide to This Portfolio
            </h3>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-dark-secondary rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl shrink-0`}>
                    <feature.icon className="text-white" size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
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
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h4>
                  <p className="text-sm text-green-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {isTyping ? 'Typing…' : 'Online'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-neon-blue hover:bg-gray-200 dark:hover:bg-dark-accent transition-colors"
                aria-label="Restart conversation"
                title="Restart conversation"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={listRef}
              className="h-80 overflow-y-auto overscroll-contain space-y-4 mb-6 pr-1 scrollbar-thin"
              role="log"
              aria-live="polite"
              aria-label="Conversation"
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
                          ? 'bg-white dark:bg-dark-primary text-gray-900 dark:text-white rounded-tl-sm'
                          : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-tr-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.action && (
                        <button
                          type="button"
                          onClick={() => scrollToSection(message.action!.sectionId)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-neon-blue hover:underline"
                        >
                          {message.action.label} <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start" aria-label="Assistant is typing">
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
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
                placeholder={`Ask me about ${profile.shortName}'s skills...`}
                aria-label="Your question"
                maxLength={300}
                className="flex-1 min-w-0 px-4 py-3 bg-white dark:bg-dark-primary border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue text-gray-900 dark:text-white placeholder:text-gray-400"
              />
              <motion.button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Send question"
              >
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
