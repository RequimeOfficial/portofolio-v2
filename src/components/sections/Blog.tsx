import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, Heart, Share2, Search, ArrowRight, Check, X, Mail, Loader2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import SmartImage from '../ui/SmartImage';
import Modal from '../ui/Modal';
import { blogCategories, blogPosts, type BlogPost } from '../../data/posts';
import type { ContentBlock } from '../../i18n/posts/types';
import { useI18n } from '../../contexts/language';
import { profile } from '../../data/profile';
import { copyText, formatDate, storage } from '../../lib/utils';
import { EMAIL_PATTERN, sendMessage } from '../../lib/contact';

const LIKES_KEY = 'blog-liked';
const ARTICLE_HASH = '#blog/';

const ArticleBody: React.FC<{ blocks: ContentBlock[] }> = ({ blocks }) => (
  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'h':
          return (
            <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white pt-2">
              {block.text}
            </h3>
          );
        case 'ul':
          return (
            <ul key={i} className="list-disc ps-6 space-y-1.5 marker:text-neon-blue">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        case 'code':
          return (
            <pre
              key={i}
              dir="ltr"
              className="bg-dark-primary text-gray-100 text-sm rounded-xl p-4 overflow-x-auto border border-white/10 text-left"
            >
              <code data-lang={block.lang}>{block.code}</code>
            </pre>
          );
        default:
          return <p key={i}>{block.text}</p>;
      }
    })}
  </div>
);

const Blog: React.FC = () => {
  const { t, posts, info } = useI18n();
  const [activeCategory, setActiveCategory] = useState<(typeof blogCategories)[number]>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [liked, setLiked] = useState<number[]>(() => storage.getJSON<number[]>(LIKES_KEY, []));
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'done' | 'error' | 'invalid'>('idle');

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !q ||
        posts[post.slug].title.toLowerCase().includes(q) ||
        posts[post.slug].excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, posts]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const otherPosts = filteredPosts.filter((p) => !p.featured);

  // Deep links: #blog/<slug> opens the article directly.
  useEffect(() => {
    const openFromHash = () => {
      if (!window.location.hash.startsWith(ARTICLE_HASH)) return;
      const slug = decodeURIComponent(window.location.hash.slice(ARTICLE_HASH.length));
      const post = blogPosts.find((p) => p.slug === slug);
      if (post) {
        setOpenPost(post);
        document.getElementById('blog')?.scrollIntoView();
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(id);
  }, [toast]);

  const openArticle = (post: BlogPost) => {
    setOpenPost(post);
    history.replaceState(null, '', `${ARTICLE_HASH}${post.slug}`);
  };

  const closeArticle = useCallback(() => {
    setOpenPost(null);
    if (window.location.hash.startsWith(ARTICLE_HASH)) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#blog`);
    }
  }, []);

  const toggleLike = (postId: number) => {
    setLiked((prev) => {
      const next = prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId];
      storage.setJSON(LIKES_KEY, next);
      return next;
    });
  };

  const handleShare = async (post: BlogPost) => {
    const url = `${window.location.origin}${window.location.pathname}${ARTICLE_HASH}${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: posts[post.slug].title, text: posts[post.slug].excerpt, url });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return;
      }
    }
    setToast((await copyText(url)) ? t.blog.copied : t.blog.copyFailed);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(newsletterEmail.trim())) {
      setNewsletterStatus('invalid');
      return;
    }
    setNewsletterStatus('sending');
    try {
      await sendMessage({
        subject: 'Newsletter subscription',
        email: newsletterEmail.trim(),
        message: `Please add ${newsletterEmail.trim()} to the newsletter list.`,
      });
      setNewsletterStatus('done');
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus('error');
    }
  };

  // Plain render helpers (not components) so cards aren't remounted on every state change.
  const renderLike = (post: BlogPost, size: number) => {
    const isLiked = liked.includes(post.id);
    return (
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(post.id);
        }}
        className={`flex items-center gap-1 transition-colors duration-200 ${
          isLiked ? 'text-red-500' : 'hover:text-red-500'
        }`}
        whileTap={{ scale: 0.8 }}
        aria-pressed={isLiked}
        aria-label={isLiked ? t.blog.unlike : t.blog.like}
      >
        <Heart size={size} fill={isLiked ? 'currentColor' : 'none'} />
        {post.likes + (isLiked ? 1 : 0)}
      </motion.button>
    );
  };

  const renderShare = (post: BlogPost, size: number) => (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        void handleShare(post);
      }}
      className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={t.blog.share(posts[post.slug].title)}
    >
      <Share2 size={size} />
    </motion.button>
  );

  const renderCard = (post: BlogPost, featured = false) => (
    <motion.article
      key={post.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-gray-50 dark:bg-dark-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-[box-shadow,transform] duration-300"
    >
      <button
        type="button"
        onClick={() => openArticle(post)}
        className={`relative ${featured ? 'h-48' : 'h-40'} overflow-hidden block w-full`}
        aria-label={t.blog.read(posts[post.slug].title)}
        tabIndex={-1}
      >
        <SmartImage
          src={post.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {featured && (
          <span className="absolute top-4 start-4 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold rounded-full">
            {t.common.featured}
          </span>
        )}
        <span className="absolute top-4 end-4 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
          {t.blog.categories[post.category]}
        </span>
      </button>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Calendar size={13} className="me-1" aria-hidden="true" />
          <time dateTime={post.date} className="me-4">
            {formatDate(post.date, info.locale)}
          </time>
          <Clock size={13} className="me-1" aria-hidden="true" />
          <span>{t.blog.readTime(post.minutes)}</span>
        </div>

        <h3
          className={`${featured ? 'text-xl' : 'text-lg line-clamp-2'} font-bold text-gray-900 dark:text-white mb-3 group-hover:text-neon-blue transition-colors duration-300`}
        >
          <button type="button" onClick={() => openArticle(post)} className="text-start">
            {posts[post.slug].title}
          </button>
        </h3>

        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${featured ? '' : 'text-sm line-clamp-3'}`}>
          {posts[post.slug].excerpt}
        </p>

        {featured && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchTerm(tag)}
                className="px-2 py-1 bg-gray-200 dark:bg-dark-accent text-gray-600 dark:text-gray-300 text-xs rounded-full hover:text-neon-blue"
                title={t.blog.tagTitle(tag)}
              >
                <Tag size={10} className="inline me-1" aria-hidden="true" />
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            {renderLike(post, featured ? 16 : 14)}
            {renderShare(post, featured ? 16 : 14)}
          </div>
          <button
            type="button"
            onClick={() => openArticle(post)}
            className="inline-flex items-center gap-1 font-semibold text-neon-blue hover:gap-2 transition-all"
          >
            {t.blog.readMore} <ArrowRight size={14} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </motion.article>
  );

  return (
    <section id="blog" className="py-20 bg-white dark:bg-dark-primary scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.blog.title} highlight={t.blog.highlight} subtitle={t.blog.subtitle} />

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              type="search"
              placeholder={t.blog.search}
              aria-label={t.blog.searchLabel}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full ps-10 pe-10 py-3 bg-gray-50 dark:bg-dark-secondary border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue"
                aria-label={t.blog.clearSearch}
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label={t.blog.filterLabel}>
            {blogCategories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-5 py-3 rounded-xl font-medium transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-dark-secondary text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.blog.categories[category]}
              </motion.button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <Search className="mx-auto mb-4 opacity-50" size={40} />
            <p className="mb-4">{t.blog.noResults(searchTerm.trim())}</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="text-neon-blue font-semibold hover:underline"
            >
              {t.blog.reset}
            </button>
          </div>
        )}

        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t.blog.featured}</h3>
            <motion.div layout className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">{featuredPosts.map((post) => renderCard(post, true))}</AnimatePresence>
            </motion.div>
          </div>
        )}

        {otherPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {featuredPosts.length > 0 ? t.blog.more : t.blog.articles}
            </h3>
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">{otherPosts.map((post) => renderCard(post))}</AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t.blog.newsletterTitle}</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">{t.blog.newsletterText}</p>

          {newsletterStatus === 'done' ? (
            <p className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-lg text-white font-semibold">
              <Check size={20} /> {t.blog.subscribed}
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" noValidate>
              <input
                type="email"
                placeholder={t.blog.emailPlaceholder}
                aria-label={t.blog.emailLabel}
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus !== 'sending') setNewsletterStatus('idle');
                }}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                required
              />
              <motion.button
                type="submit"
                disabled={newsletterStatus === 'sending'}
                className="px-6 py-3 bg-white text-neon-purple font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {newsletterStatus === 'sending' ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}
                {t.blog.subscribe}
              </motion.button>
            </form>
          )}
          {newsletterStatus === 'invalid' && (
            <p className="mt-3 text-sm text-white font-medium">{t.blog.invalidEmail}</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="mt-3 text-sm text-white font-medium">{t.blog.subscribeError}</p>
          )}
        </motion.div>
      </div>

      {/* Article reader */}
      <Modal isOpen={!!openPost} onClose={closeArticle} labelledBy="article-title" className="max-w-3xl">
        {openPost && (
          <article>
            <div className="relative h-48 sm:h-64">
              <SmartImage src={openPost.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-4 start-6 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold rounded-full">
                {t.blog.categories[openPost.category]}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <h2
                id="article-title"
                className="text-2xl sm:text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-3"
              >
                {posts[openPost.slug].title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span dir="ltr">{profile.name}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} /> {formatDate(openPost.date, info.locale)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} /> {t.blog.readTime(openPost.minutes)}
                </span>
              </div>

              <ArticleBody blocks={posts[openPost.slug].content} />

              <div className="flex flex-wrap gap-2 mt-8">
                {openPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-dark-accent text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400">
                {renderLike(openPost, 18)}
                <button
                  type="button"
                  onClick={() => void handleShare(openPost)}
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:text-neon-blue"
                >
                  <Share2 size={16} /> {t.blog.shareArticle}
                </button>
              </div>
            </div>
          </article>
        )}
      </Modal>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-full bg-gray-900 text-white text-sm shadow-xl flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Check size={16} className="text-neon-green" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
