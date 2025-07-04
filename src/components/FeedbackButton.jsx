import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getFeedbackConfig, trackFeedbackEvent } from '../utils/feedbackUtils';

const {
  FiMessageCircle,
  FiX,
  FiHelpCircle,
  FiMail,
  FiStar,
  FiBug,
  FiLifeBuoy,
  FiBookOpen,
  FiPhone,
  FiUsers,
  FiSend,
  FiEdit3
} = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showDetailedForm, setShowDetailedForm] = useState(false);

  const feedbackConfig = getFeedbackConfig();

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleToggleFeedback = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    setShowQuickActions(false);
    
    trackFeedbackEvent(newState ? 'feedback_opened' : 'feedback_closed', {
      source: 'floating_button',
      isMobile,
    });
  };

  const handleFeedbackClose = () => {
    setIsOpen(false);
    setShowDetailedForm(false);
    trackFeedbackEvent('feedback_closed', {
      source: 'close_button',
      isMobile,
    });
  };

  const handleOpenDetailedForm = () => {
    console.log('🎯 Opening detailed feedback form...');
    setShowQuickActions(false);
    setShowDetailedForm(true);
    
    trackFeedbackEvent('detailed_form_opened', {
      source: 'quick_actions',
      isMobile,
    });
  };

  const handleQuickAction = (actionType) => {
    console.log(`🚀 Quick action: ${actionType}`);
    setShowQuickActions(false);

    // Beautiful modal-style content instead of basic alerts
    const createBeautifulModal = (title, content, icon, color) => {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm';
      modal.innerHTML = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-xs sm:max-w-lg w-full shadow-2xl border border-white/50 transform scale-95 opacity-0 transition-all duration-300" id="feedback-modal">
          <div class="text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                ${getIconSVG(icon)}
              </svg>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">${title}</h3>
            <div class="text-gray-600 text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base">
              ${content}
            </div>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button onclick="this.closest('.fixed').remove()" class="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                Got it!
              </button>
              ${actionType === 'contact' ? `
                <button onclick="window.location.href='mailto:hello@iconify-ai.com?subject=Hello from Iconify AI User&body=Hi there! I wanted to reach out about...';this.closest('.fixed').remove()" class="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                  Send Email
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Animate in
      setTimeout(() => {
        const modalContent = modal.querySelector('#feedback-modal');
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
      }, 10);

      // Close on backdrop click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    };

    const getIconSVG = (iconName) => {
      const icons = {
        help: '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>',
        bug: '<path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.291-.956a.5.5 0 1 1 .956.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 1 0 1h-.5a4.985 4.985 0 0 1-1.432 3.503l.41 1.352a.5.5 0 1 1-.956.29l-.291-.956A4.979 4.979 0 0 1 8 15a4.979 4.979 0 0 1-2.731-.811l-.291.956a.5.5 0 1 1-.956-.29l.41-1.352A4.985 4.985 0 0 1 2.5 10H2a.5.5 0 0 1 0-1h.5A4.985 4.985 0 0 1 3.932 5.497l-.41-1.352a.5.5 0 0 1 .333-.623z"/>',
        star: '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>',
        contact: '<path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>'
      };
      return icons[iconName] || icons.help;
    };

    switch (actionType) {
      case 'help':
        createBeautifulModal(
          '🆘 Need Help?',
          `
            <div class="space-y-3 sm:space-y-4">
              <div class="bg-blue-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-blue-800 mb-2">🕒 Live Support</h4>
                <p class="text-blue-600 text-sm sm:text-base">Available Monday-Friday, 9 AM - 5 PM PST</p>
              </div>
              <div class="bg-green-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-green-800 mb-2">📧 Email Support</h4>
                <p class="text-green-600 text-sm sm:text-base">support@iconify-ai.com - We respond within 24 hours</p>
              </div>
              <div class="bg-purple-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-purple-800 mb-2">📚 Resources</h4>
                <ul class="text-purple-600 space-y-1 text-sm sm:text-base">
                  <li>• FAQ Section</li>
                  <li>• Video Tutorials</li>
                  <li>• Getting Started Guide</li>
                  <li>• Community Forum</li>
                </ul>
              </div>
            </div>
          `,
          'help',
          'from-blue-500 to-blue-600'
        );
        break;
      case 'bug':
        createBeautifulModal(
          '🐛 Report a Bug',
          `
            <div class="space-y-3 sm:space-y-4">
              <div class="bg-red-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-red-800 mb-2">📝 What to Include</h4>
                <ul class="text-red-600 space-y-1 text-sm sm:text-base">
                  <li>• What happened?</li>
                  <li>• What were you trying to do?</li>
                  <li>• Browser & device info</li>
                  <li>• Screenshots if possible</li>
                </ul>
              </div>
              <div class="bg-orange-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-orange-800 mb-2">📧 Send Report To</h4>
                <p class="text-orange-600 text-sm sm:text-base">bugs@iconify-ai.com</p>
                <p class="text-orange-600 text-xs sm:text-sm mt-1">Or use our detailed feedback form below</p>
              </div>
              <div class="bg-green-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-green-800 mb-2">⚡ Quick Response</h4>
                <p class="text-green-600 text-sm sm:text-base">Critical bugs are fixed within 48 hours</p>
              </div>
            </div>
          `,
          'bug',
          'from-red-500 to-red-600'
        );
        break;
      case 'feature':
        createBeautifulModal(
          '💡 Feature Request',
          `
            <div class="space-y-3 sm:space-y-4">
              <div class="bg-yellow-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-yellow-800 mb-2">🎯 We Love Your Ideas!</h4>
                <p class="text-yellow-600 text-sm sm:text-base">Help us build the perfect icon generation tool</p>
              </div>
              <div class="bg-indigo-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-indigo-800 mb-2">💭 Tell Us About</h4>
                <ul class="text-indigo-600 space-y-1 text-sm sm:text-base">
                  <li>• What feature would help you?</li>
                  <li>• How would you use it?</li>
                  <li>• Any examples or inspiration?</li>
                  <li>• Integration needs?</li>
                </ul>
              </div>
              <div class="bg-purple-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-purple-800 mb-2">📧 Submit Ideas</h4>
                <p class="text-purple-600 text-sm sm:text-base">features@iconify-ai.com</p>
                <p class="text-purple-600 text-xs sm:text-sm mt-1">Or use our feedback form for detailed requests</p>
              </div>
            </div>
          `,
          'star',
          'from-yellow-500 to-yellow-600'
        );
        break;
      case 'contact':
        createBeautifulModal(
          '📧 Contact Us',
          `
            <div class="space-y-3 sm:space-y-4">
              <div class="bg-green-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-green-800 mb-2">💬 General Inquiries</h4>
                <p class="text-green-600 text-sm sm:text-base">hello@iconify-ai.com</p>
              </div>
              <div class="bg-blue-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-blue-800 mb-2">🤝 Partnerships</h4>
                <p class="text-blue-600 text-sm sm:text-base">partners@iconify-ai.com</p>
              </div>
              <div class="bg-purple-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-purple-800 mb-2">💼 Business Inquiries</h4>
                <p class="text-purple-600 text-sm sm:text-base">business@iconify-ai.com</p>
              </div>
              <div class="bg-teal-50 rounded-2xl p-3 sm:p-4">
                <h4 class="font-semibold text-teal-800 mb-2">🚀 We'd Love to Hear From You!</h4>
                <p class="text-teal-600 text-sm sm:text-base">Click "Send Email" to open your email client with a pre-filled message.</p>
              </div>
            </div>
          `,
          'contact',
          'from-green-500 to-green-600'
        );
        break;
      default:
        break;
    }

    trackFeedbackEvent('quick_action_clicked', {
      actionType,
      isMobile,
    });
  };

  // Custom detailed feedback form component
  const DetailedFeedbackForm = () => {
    const [formData, setFormData] = useState({
      type: 'general',
      subject: '',
      message: '',
      email: '',
      priority: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const feedbackTypes = [
      { id: 'general', label: 'General Feedback', icon: FiMessageCircle },
      { id: 'bug', label: 'Bug Report', icon: FiBug },
      { id: 'feature', label: 'Feature Request', icon: FiStar },
      { id: 'help', label: 'Need Help', icon: FiLifeBuoy }
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Track submission
        trackFeedbackEvent('detailed_feedback_submitted', {
          type: formData.type,
          priority: formData.priority,
          hasEmail: !!formData.email,
          messageLength: formData.message.length
        });

        console.log('📧 Feedback submitted:', formData);
        setShowSuccess(true);
        
        // Auto-close after success
        setTimeout(() => {
          setShowDetailedForm(false);
          setShowSuccess(false);
        }, 3000);

      } catch (error) {
        console.error('❌ Feedback submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (showSuccess) {
      return (
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-neumorphic"
          >
            <SafeIcon icon={FiSend} className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-warm-800 mb-4">Thank You! 🎉</h3>
          <p className="text-warm-600 text-lg">
            Your feedback has been submitted successfully. We'll get back to you soon!
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-warm-800">Detailed Feedback</h3>
            <p className="text-warm-600 text-sm">Help us improve Iconify AI</p>
          </div>
          <button
            type="button"
            onClick={() => setShowDetailedForm(false)}
            className="p-2 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-xl transition-all duration-200"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Type */}
        <div>
          <label className="block text-sm font-semibold text-warm-700 mb-3">
            Feedback Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {feedbackTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.id })}
                className={`p-3 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
                  formData.type === type.id
                    ? 'bg-primary-100 border-2 border-primary-400 text-primary-700'
                    : 'bg-warm-100 border-2 border-warm-200 text-warm-600 hover:bg-warm-200'
                }`}
              >
                <SafeIcon icon={type.icon} className="w-4 h-4" />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-warm-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Brief description of your feedback"
            className="w-full p-3 border-2 border-warm-200 rounded-xl focus:border-primary-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-warm-700 mb-2">
            Message
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please provide detailed feedback..."
            className="w-full p-3 border-2 border-warm-200 rounded-xl focus:border-primary-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-semibold text-warm-700 mb-2">
            Email (optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full p-3 border-2 border-warm-200 rounded-xl focus:border-primary-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-warm-700 mb-2">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-3 border-2 border-warm-200 rounded-xl focus:border-primary-400 focus:outline-none transition-colors"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.subject || !formData.message}
          className="w-full p-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-xl font-bold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
              </motion.div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiSend} className="w-5 h-5" />
              <span>Submit Feedback</span>
            </>
          )}
        </button>
      </form>
    );
  };

  const quickActions = [
    {
      id: 'help',
      icon: FiLifeBuoy,
      label: 'Get Help',
      color: 'from-blue-500 to-blue-600',
      description: 'Live support & resources',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'bug',
      icon: FiBug,
      label: 'Report Bug',
      color: 'from-red-500 to-red-600',
      description: 'Found an issue?',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      id: 'feature',
      icon: FiStar,
      label: 'Request Feature',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Share your ideas',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      id: 'contact',
      icon: FiMail,
      label: 'Contact Us',
      color: 'from-green-500 to-green-600',
      description: 'General inquiries',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  return (
    <>
      {/* Enhanced Quick Actions Menu - FULLY RESPONSIVE */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed z-40 ${
              isMobile 
                ? 'bottom-20 left-4 right-4' 
                : isTablet 
                  ? 'bottom-20 right-4 left-4 max-w-md ml-auto'
                  : 'bottom-20 right-4 w-80 xl:w-96'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 p-4 sm:p-6 lg:p-8">
              {/* Header - Responsive */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-2xl flex items-center justify-center shadow-neumorphic-sm">
                    <SafeIcon icon={FiLifeBuoy} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-warm-800 text-lg sm:text-xl">Quick Support</h3>
                    <p className="text-warm-600 text-xs sm:text-sm">How can we help you today?</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuickActions(false)}
                  className="p-2 sm:p-3 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-2xl transition-all duration-200"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Action Cards - Responsive Grid */}
              <div className={`grid gap-3 sm:gap-4 ${
                isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-1'
              }`}>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction(action.id)}
                    className={`w-full p-4 sm:p-5 ${action.bgColor} hover:shadow-lg rounded-2xl font-medium text-left transition-all duration-200 flex items-center space-x-3 sm:space-x-4 border border-white/50 group`}
                  >
                    <div className={`p-2 sm:p-3 bg-gradient-to-r ${action.color} rounded-2xl shadow-neumorphic-sm group-hover:shadow-neumorphic transition-all duration-200`}>
                      <SafeIcon icon={action.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm sm:text-lg ${action.textColor}`}>{action.label}</div>
                      <div className={`text-xs sm:text-sm opacity-80 ${action.textColor}`}>{action.description}</div>
                    </div>
                    <div className="text-warm-400 group-hover:text-warm-600 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* CTA Button - Responsive */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-warm-200">
                <button
                  onClick={handleOpenDetailedForm}
                  className="w-full p-3 sm:p-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-2xl font-bold text-center shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
                >
                  <SafeIcon icon={FiEdit3} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Open Detailed Feedback Form</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Feedback Button - Responsive */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => {
          if (isOpen || showDetailedForm) {
            handleFeedbackClose();
          } else {
            setShowQuickActions(!showQuickActions);
          }
        }}
        className={`flex items-center justify-center font-bold text-white z-50 fixed transition-all shadow-neumorphic hover:shadow-purple-glow ${
          isMobile 
            ? 'bottom-6 right-6 rounded-full h-14 w-14 p-0 text-lg' 
            : 'bottom-6 right-6 rounded-3xl h-16 w-16 text-sm tracking-wider'
        }`}
        style={{
          background: `linear-gradient(135deg, ${feedbackConfig.PRIMARY_COLOR}, #f97316)`,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px rgba(200, 75, 255, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ rotate: (isOpen || showQuickActions || showDetailedForm) ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <SafeIcon 
              icon={(isOpen || showQuickActions || showDetailedForm) ? FiX : FiMessageCircle} 
              className="w-6 h-6 sm:w-7 sm:h-7" 
            />
            {!isOpen && !showQuickActions && !showDetailedForm && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </motion.div>
      </motion.button>

      {/* Enhanced Detailed Feedback Form - Responsive */}
      <AnimatePresence>
        {showDetailedForm && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              x: isMobile ? 0 : 50,
              y: isMobile ? 50 : 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              x: isMobile ? 0 : 50,
              y: isMobile ? 50 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={`fixed z-40 ${
              isMobile 
                ? 'bottom-20 left-4 right-4 max-h-[70vh] overflow-y-auto' 
                : isTablet 
                  ? 'bottom-20 right-4 left-4 max-w-md ml-auto max-h-[70vh] overflow-y-auto'
                  : 'bottom-20 right-4 w-96 xl:w-[420px] max-h-[70vh] overflow-y-auto'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
              <DetailedFeedbackForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Backdrop for mobile and tablet */}
      <AnimatePresence>
        {(isOpen || showQuickActions || showDetailedForm) && (isMobile || isTablet) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => {
              handleFeedbackClose();
              setShowQuickActions(false);
              setShowDetailedForm(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackButton;