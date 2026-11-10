import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import AISection from './components/sections/AISection';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import EasterEggConsole from './components/EasterEggConsole';
import { ThemeProvider } from './contexts/ThemeContext';
import { MusicProvider } from './contexts/MusicContext';
import { useEasterEgg } from './hooks/useEasterEgg';

/** The intro loader is shown once per browser session, and only briefly. */
const shouldShowLoader = () => {
  try {
    if (sessionStorage.getItem('intro-seen')) return false;
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    /* storage unavailable: just show it */
  }
  return true;
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(shouldShowLoader);
  const { showConsole, commands, executeCommand, closeConsole, openConsole } = useEasterEgg();

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setIsLoading(false), 1300);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  return (
    // overflow-x-clip: slide-in animations start off-screen and must not cause sideways scrolling on phones.
    <div className="min-h-screen overflow-x-clip bg-white dark:bg-dark-primary transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-neon-blue focus:text-white"
      >
        Skip to content
      </a>
      <CustomCursor />
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main id="main">
              <Hero />
              <About />
              <TechStack />
              <Projects />
              <AISection />
              <Testimonials />
              <Blog />
              <Contact />
            </main>
            <Footer onOpenConsole={openConsole} />
            <MusicPlayer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>

      <EasterEggConsole
        isOpen={showConsole}
        commands={commands}
        onExecuteCommand={executeCommand}
        onClose={closeConsole}
      />
    </div>
  );
}

function App() {
  return (
    // Respects the OS "reduce motion" setting for all Framer Motion animations.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <MusicProvider>
          <AppContent />
        </MusicProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
