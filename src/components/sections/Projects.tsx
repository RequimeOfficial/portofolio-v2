import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import SmartImage from '../ui/SmartImage';
import { projectCategories, projects, type ProjectCategory } from '../../data/projects';
import { profile } from '../../data/profile';
import { useI18n } from '../../contexts/language';

const categoryBadge: Record<ProjectCategory, string> = {
  Web: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  AI: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
  Game: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
};

const linkButton =
  'inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200';

const Projects: React.FC = () => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<(typeof projectCategories)[number]>('All');

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-secondary scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.projects.title} highlight={t.projects.highlight} subtitle={t.projects.subtitle} />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label={t.projects.filterLabel}>
          {projectCategories.map((category) => {
            const count = category === 'All' ? projects.length : projects.filter((p) => p.category === category).length;
            return (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
                className={`px-5 py-2.5 rounded-full font-medium transition-colors duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                    : 'bg-white dark:bg-dark-primary text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="inline me-2" size={16} aria-hidden="true" />
                {t.projects.categories[category]}
                <span className="ms-1.5 text-xs opacity-70">({count})</span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col bg-white dark:bg-dark-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-[box-shadow,transform] duration-300"
              >
                {project.featured && (
                  <div className="absolute top-4 start-4 z-10 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold rounded-full">
                    {t.common.featured}
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <SmartImage
                    src={project.image}
                    alt={t.projects.items[project.id].title}
                    fallbackLabel={t.projects.items[project.id].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white">
                      {t.projects.items[project.id].title}
                    </h3>
                    <span
                      className={`shrink-0 px-2 py-1 text-xs font-medium rounded-full ${categoryBadge[project.category]}`}
                    >
                      {t.projects.categories[project.category]}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t.projects.items[project.id].description}</p>

                  <ul className="flex flex-wrap gap-2 mb-5" aria-label={t.projects.technologies}>
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-dark-secondary text-gray-600 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Links are always visible (hover-only buttons don't work on touch screens). */}
                  <div className="mt-auto flex items-center gap-5 pt-4 border-t border-gray-100 dark:border-white/10">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkButton} hover:text-neon-blue`}
                        aria-label={t.projects.openLive(t.projects.items[project.id].title)}
                      >
                        <ExternalLink size={16} /> {t.projects.liveDemo}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkButton} hover:text-neon-purple`}
                        aria-label={t.projects.viewSource(t.projects.items[project.id].title)}
                      >
                        <Github size={16} /> {t.projects.source}
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="text-sm text-gray-400 dark:text-gray-500 italic">{t.projects.private}</span>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            {t.projects.viewAll}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
