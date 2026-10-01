import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Copy, Check, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ContactModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:${personalInfo.contact.email}?subject=Design Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center items-center p-3 sm:p-6">
        
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 my-auto"
        >
          {/* Header */}
          <div className="p-5 sm:p-8 bg-gradient-to-br from-brand-dark via-neutral-900 to-black text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-pink-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <span>Let's Connect</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Get in touch
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Have a project, collaboration, or opportunity? Let’s create something impactful together.
            </p>
          </div>

          {/* Quick Contact Info Cards */}
          <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
            
            <div className="space-y-2.5 sm:space-y-3">
              {/* Email */}
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-pink-100 text-brand-pink flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs font-semibold text-gray-500">Email</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 break-all select-all">{personalInfo.contact.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-gray-500 hover:text-brand-pink hover:bg-white transition-all text-xs font-semibold flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs font-semibold text-gray-500">Phone / WhatsApp</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{personalInfo.contact.phone}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg text-gray-500 hover:text-brand-pink hover:bg-white transition-all text-xs font-semibold flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Send Message Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pt-1">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Message / Project Scope
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me a bit about your idea or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 sm:py-4 rounded-full bg-brand-pink hover:bg-brand-pinkHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-pink-200 disabled:opacity-75 cursor-pointer"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
