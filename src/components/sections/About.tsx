import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Code, Brain } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { profile } from '../../data/profile';
import { timeline } from '../../data/skills';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const facts = [
  { icon: Calendar, text: profile.age, color: 'text-neon-blue' },
  { icon: MapPin, text: profile.location, color: 'text-neon-purple' },
  { icon: Heart, text: profile.interest, color: 'text-red-500' },
  { icon: Code, text: profile.experience, color: 'text-neon-green' },
];

const About: React.FC = () => (
  <section id="about" className="py-20 bg-gray-50 dark:bg-dark-secondary scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="About" highlight="Me" />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-spin-slow" />
            <div className="absolute inset-2 bg-white dark:bg-dark-primary rounded-full overflow-hidden">
              <img
                src={profile.avatar}
                alt={`${profile.name} (${profile.brand})`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              aria-hidden="true"
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Code className="text-white" size={24} />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 bg-neon-purple rounded-full flex items-center justify-center shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Brain className="text-white" size={24} />
            </motion.div>
          </div>
        </motion.div>

        {/* About Content */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white mb-4">
              Hi there! I'm {profile.name} 👋
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
          </motion.div>

          <motion.ul variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facts.map(({ icon: Icon, text, color }) => (
              <li key={text} className="flex items-center text-gray-600 dark:text-gray-300">
                <Icon className={`${color} mr-2 shrink-0`} size={20} aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <blockquote className="text-lg italic text-gray-600 dark:text-gray-300 border-l-4 border-neon-blue pl-6">
              "The best way to predict the future is to create it through code."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="mt-20">
        <h3 className="text-2xl md:text-3xl font-poppins font-bold text-center text-gray-900 dark:text-white mb-12">
          My Journey
        </h3>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-purple rounded-full" />

          <ol className="space-y-8">
            {timeline.map((item, index) => (
              <motion.li
                key={item.year}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Dot on the line (mobile) */}
                <div className="md:hidden absolute left-4 -translate-x-1/2 w-4 h-4 bg-neon-blue rounded-full border-4 border-gray-50 dark:border-dark-secondary" />

                <div
                  className={`w-full pl-12 md:pl-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}
                >
                  <div className="bg-white dark:bg-dark-primary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className={`flex items-center mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <item.icon className="text-neon-blue mr-2" size={20} aria-hidden="true" />
                      <span className="text-2xl font-bold text-neon-blue">{item.year}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-4 h-4 bg-neon-blue rounded-full border-4 border-gray-50 dark:border-dark-secondary" />
                </div>

                <div className="hidden md:block w-5/12" />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default About;
