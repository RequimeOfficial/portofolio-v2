import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Avatar from '../ui/Avatar';
import { testimonialStats, testimonials } from '../../data/testimonials';
import { sendMessage, hasFormBackend } from '../../lib/contact';

const emptyForm = { name: '', role: '', company: '', rating: 5, content: '' };

const inputClass =
  'w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue bg-white dark:bg-dark-secondary text-gray-900 dark:text-white placeholder:text-gray-400';

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={20}
        fill="currentColor"
        className={star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
      />
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const [[currentIndex, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');

  const paginate = useCallback((delta: number) => {
    setSlide(([index]) => [(index + delta + testimonials.length) % testimonials.length, delta]);
  }, []);

  // Auto-advance every 7s; pauses while the visitor hovers or focuses the carousel.
  useEffect(() => {
    if (isPaused || testimonials.length < 2) return;
    const id = window.setInterval(() => paginate(1), 7000);
    return () => window.clearInterval(id);
  }, [isPaused, paginate, currentIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const result = await sendMessage({
        subject: `New testimonial from ${form.name}`,
        name: form.name,
        fields: { Role: form.role, Company: form.company, Rating: `${form.rating}/5` },
        message: form.content,
      });
      setStatus(result);
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const current = testimonials[currentIndex]!;

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-dark-secondary scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Client" highlight="Testimonials" subtitle="What clients say about working with me" />

        {/* Carousel */}
        <div
          className="relative max-w-4xl mx-auto mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.figure
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={onDragEnd}
                className="bg-white dark:bg-dark-primary rounded-3xl p-8 md:p-12 shadow-xl relative cursor-grab active:cursor-grabbing select-none"
                aria-roledescription="slide"
                aria-label={`${currentIndex + 1} of ${testimonials.length}`}
              >
                <Quote className="absolute top-6 left-6 text-neon-blue/20" size={48} aria-hidden="true" />

                <div className="flex justify-center mb-6">
                  <Stars rating={current.rating} />
                </div>

                <blockquote className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
                  "{current.content}"
                </blockquote>

                <figcaption className="flex items-center justify-center gap-4">
                  <Avatar name={current.name} src={current.avatar} />
                  <div className="text-left">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{current.name}</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {current.role} at {current.company}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Navigation (outside the card on large screens, below it on small ones) */}
          <div className="flex items-center justify-center gap-4 mt-6 lg:mt-0">
            <motion.button
              type="button"
              onClick={() => paginate(-1)}
              className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-16 p-3 bg-white dark:bg-dark-primary rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((t, index) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSlide([index, index > currentIndex ? 1 : -1])}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === currentIndex}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-neon-blue' : 'w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={() => paginate(1)}
              className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-16 p-3 bg-white dark:bg-dark-primary rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-neon-blue transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 my-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {testimonialStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white dark:bg-dark-primary rounded-2xl shadow-lg"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-2" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-neon-blue mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Testimonial */}
        <div className="text-center">
          <motion.button
            type="button"
            onClick={() => {
              setShowForm((open) => !open);
              setStatus('idle');
            }}
            aria-expanded={showForm}
            aria-controls="testimonial-form"
            className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className={`inline mr-2 transition-transform ${showForm ? 'rotate-45' : ''}`} size={20} />
            {showForm ? 'Close Form' : 'Add Your Testimonial'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              id="testimonial-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-12 max-w-2xl mx-auto bg-white dark:bg-dark-primary rounded-2xl p-6 sm:p-8 shadow-xl">
                {status === 'sent' || status === 'mailto' ? (
                  <div className="text-center py-6">
                    <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank you! 🙏</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {status === 'sent'
                        ? 'Your testimonial has been sent and will appear here after review.'
                        : 'Your email app has opened with the testimonial pre-filled — just hit send.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-neon-blue font-semibold hover:underline"
                    >
                      Write another one
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Share Your Experience
                    </h3>

                    {status === 'error' && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                        <AlertCircle size={16} /> Something went wrong. Please try again.
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        aria-label="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        maxLength={80}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Your Role *"
                        aria-label="Your role"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className={inputClass}
                        maxLength={80}
                        required
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Company Name *"
                      aria-label="Company name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={`${inputClass} mb-4`}
                      maxLength={80}
                      required
                    />

                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rating
                      </legend>
                      <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => setForm({ ...form, rating: star })}
                            onMouseEnter={() => setHoverRating(star)}
                            aria-label={`${star} star${star > 1 ? 's' : ''}`}
                            aria-pressed={form.rating === star}
                            className={
                              star <= (hoverRating || form.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Star size={26} fill="currentColor" />
                          </motion.button>
                        ))}
                      </div>
                    </fieldset>

                    <textarea
                      placeholder="Your testimonial... *"
                      aria-label="Your testimonial"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      rows={4}
                      minLength={10}
                      maxLength={600}
                      className={`${inputClass} mb-6 resize-none`}
                      required
                    />

                    <div className="flex gap-4">
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg disabled:opacity-60 inline-flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {status === 'sending' && <Loader2 className="animate-spin" size={18} />}
                        {status === 'sending' ? 'Sending...' : 'Submit Testimonial'}
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                    {!hasFormBackend && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                        Submitting opens your email app with the testimonial pre-filled.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
