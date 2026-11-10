import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { skillStats, techCategories } from '../../data/skills';
import { useI18n } from '../../contexts/language';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TechStack: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-primary scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.skills.title} highlight={t.skills.highlight} subtitle={t.skills.subtitle} />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              variants={itemVariants}
              className="relative bg-gray-50 dark:bg-dark-secondary rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className={`w-full h-2 bg-gradient-to-r ${category.color} rounded-full mb-6`} />

              <h3 className="text-xl md:text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                {t.skills.categories[category.key]}
              </h3>

              <ul className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <skill.icon className="text-gray-900 dark:text-white me-3" size={22} aria-hidden="true" />
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{skill.level}%</span>
                    </div>

                    <div
                      className="w-full bg-gray-200 dark:bg-dark-accent rounded-full h-2 overflow-hidden"
                      role="progressbar"
                      aria-label={t.skills.proficiency(skill.name)}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.15 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              {/* Floating badge */}
              <div
                aria-hidden="true"
                className="absolute -top-2 -end-2 w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {categoryIndex + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {skillStats.map((stat, i) => (
            <motion.div
              key={stat.number}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-secondary dark:to-dark-accent rounded-2xl"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-2" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-neon-blue mb-1" dir="ltr">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t.skills.stats[i]}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
