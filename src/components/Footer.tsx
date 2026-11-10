import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Code, Coffee, Terminal } from 'lucide-react';
import { navItems, profile, services, socialLinks } from '../data/profile';
import { scrollToSection, scrollToTop } from '../lib/utils';

interface FooterProps {
  onOpenConsole: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenConsole }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-primary text-white relative overflow-hidden border-t border-white/5">
      {/* Background Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <motion.div
              className="sm:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                  <span className="text-neon-blue">A</span>hmad Mofidur <span className="text-neon-purple">R</span>
                  obbiyal Aqla
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Full Stack Developer passionate about creating innovative solutions through clean code, creative
                  design, and cutting-edge technology.
                </p>
              </div>

              <blockquote className="border-l-4 border-neon-blue pl-6 mb-6">
                <p className="text-gray-300 italic">"Code is like humor. When you have to explain it, it's bad."</p>
                <cite className="block not-italic text-neon-blue mt-2">— Cory House</cite>
              </blockquote>

              <div className="flex gap-8 mb-6">
                {[
                  { icon: Code, number: '50+', label: 'Projects' },
                  { icon: Coffee, number: '1000+', label: 'Cups of Coffee' },
                  { icon: Heart, number: '100%', label: 'Passion' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="text-neon-blue mx-auto mb-1" size={20} aria-hidden="true" />
                    <div className="text-lg font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="p-2.5 rounded-lg bg-white/5 text-gray-300 hover:text-neon-blue hover:bg-white/10 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
              <nav aria-label="Footer" className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                {navItems.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-gray-300 hover:text-neon-blue hover:translate-x-1 transition-all duration-200"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="text-left text-gray-300 hover:text-neon-purple transition-colors duration-200"
                      title="Get in touch about this service"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-400 text-center">
              <span>
                © {currentYear} {profile.name}. Made with
              </span>
              <Heart className="text-red-500 animate-pulse" size={16} fill="currentColor" aria-label="love" />
              <span>in {profile.location}</span>
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsole}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-neon-blue transition-colors"
                title="Shortcut: Ctrl + Alt + A"
              >
                <Terminal size={14} />
                Secret console (Ctrl+Alt+A) 🎮
              </button>
              <motion.button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white text-sm hover:shadow-lg hover:shadow-neon-blue/30 transition-shadow duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={16} />
                <span>Back to Top</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
