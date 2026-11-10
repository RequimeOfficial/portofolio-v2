import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageCircle, ExternalLink } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { profile, socialLinks } from '../../data/profile';
import { EMAIL_PATTERN, hasFormBackend, sendMessage } from '../../lib/contact';

const emptyForm = { name: '', email: '', subject: '', message: '', budget: '', timeline: '' };
type FormField = keyof typeof emptyForm;

const fieldClass = (hasError: boolean) =>
  `w-full px-4 py-3 bg-gray-50 dark:bg-dark-secondary border rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue text-gray-900 dark:text-white placeholder:text-gray-400 transition-colors duration-200 ${
    hasError ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
  }`;

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: profile.phone,
    href: profile.whatsapp,
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
    href: profile.mapsUrl,
    color: 'from-purple-500 to-pink-500',
  },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sent' | 'mailto' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<FormField, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!EMAIL_PATTERN.test(formData.email.trim())) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message should be at least 10 characters';

    setErrors(newErrors);
    const firstError = Object.keys(newErrors)[0];
    if (firstError) document.getElementById(`contact-${firstError}`)?.focus();
    return !firstError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const result = await sendMessage({
        subject: `[Portfolio] ${formData.subject.trim()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        fields: { Budget: formData.budget, Timeline: formData.timeline },
        message: formData.message.trim(),
      });
      setSubmitStatus(result);
      setFormData(emptyForm);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as FormField;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const whatsappHref = () => {
    const text = [
      `Hi ${profile.shortName}!`,
      formData.name && `I'm ${formData.name}.`,
      formData.subject && `Subject: ${formData.subject}`,
      formData.message,
    ]
      .filter(Boolean)
      .join('\n');
    return `${profile.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const errorText = (field: FormField) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className="text-red-500 text-sm mt-1">
        {errors[field]}
      </p>
    );

  const a11y = (field: FormField) => ({
    id: `contact-${field}`,
    name: field,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-secondary scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Let's Work"
          highlight="Together"
          subtitle="Ready to bring your ideas to life? Get in touch and let's create something amazing together."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                I'm always interested in new opportunities and exciting projects. Whether you need a full-stack
                developer, game developer, or AI integration specialist, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const external = item.href.startsWith('http');
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-dark-primary rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <div
                      className={`p-3 bg-gradient-to-r ${item.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0`}
                    >
                      <item.icon className="text-white" size={24} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                      <p className="text-gray-600 dark:text-gray-300 truncate">{item.value}</p>
                    </div>
                    {external && (
                      <ExternalLink className="ml-auto text-gray-400 group-hover:text-neon-blue shrink-0" size={16} />
                    )}
                  </motion.a>
                );
              })}
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    title={social.label}
                    className={`p-3 bg-white dark:bg-dark-primary rounded-xl shadow-lg text-gray-600 dark:text-gray-300 ${social.hoverClass} transition-colors duration-300`}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {profile.available && (
              <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Currently Available</h4>
                    <p className="text-gray-600 dark:text-gray-300">Open for new projects and collaborations</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-dark-primary rounded-3xl p-6 sm:p-8 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {(submitStatus === 'sent' || submitStatus === 'mailto') && (
              <motion.div
                role="status"
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                <p className="text-green-700 dark:text-green-300">
                  {submitStatus === 'sent'
                    ? "Thank you! Your message has been sent successfully. I'll get back to you soon."
                    : 'Your email app has opened with the message pre-filled — just press send to deliver it.'}
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                role="alert"
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <p className="text-red-700 dark:text-red-300">
                  Sorry, there was an error sending your message. Please try again or reach me on WhatsApp.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    className={fieldClass(!!errors.name)}
                    {...a11y('name')}
                  />
                  {errorText('name')}
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Your email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email *"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={150}
                    className={fieldClass(!!errors.email)}
                    {...a11y('email')}
                  />
                  {errorText('email')}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleInputChange}
                  maxLength={150}
                  className={fieldClass(!!errors.subject)}
                  {...a11y('subject')}
                />
                {errorText('subject')}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-budget" className="sr-only">
                    Budget range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={fieldClass(false)}
                    {...a11y('budget')}
                  >
                    <option value="">Budget Range</option>
                    <option value="< $1,000">Less than $1,000</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="> $10,000">More than $10,000</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-timeline" className="sr-only">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={fieldClass(false)}
                    {...a11y('timeline')}
                  >
                    <option value="">Timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="No rush">No rush</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  maxLength={3000}
                  className={`${fieldClass(!!errors.message)} resize-none`}
                  {...a11y('message')}
                />
                {errorText('message')}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
              </motion.button>

              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold hover:bg-green-500 hover:text-white transition-colors duration-300"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp instead
              </a>

              {!hasFormBackend && (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  "Send Message" opens your email app with everything pre-filled.
                </p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-dark-primary rounded-3xl p-4 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Find Me in Sumenep</h3>
              <a
                href={profile.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-blue hover:underline"
              >
                Open in Google Maps <ExternalLink size={14} />
              </a>
            </div>
            <div className="h-72 md:h-96 rounded-2xl overflow-hidden bg-gray-200 dark:bg-dark-secondary">
              <iframe
                title={`Map of ${profile.location}`}
                src={profile.mapsEmbed}
                className="w-full h-full border-0 dark:invert-[0.9] dark:hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
