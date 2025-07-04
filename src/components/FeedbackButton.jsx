import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getFeedbackConfig, trackFeedbackEvent } from '../utils/feedbackUtils';

const { FiMessageCircle, FiX, FiHelpCircle, FiMail, FiStar, FiBug, FiLifeBuoy, FiBookOpen, FiPhone, FiUsers } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const feedbackConfig = getFeedbackConfig();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleFeedback = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    setShowQuickActions(false);
    trackFeedbackEvent(newState ? 'feedback_opened' : 'feedback_closed', {
      source: 'floating_button',
      isMobile
    });
  };

  const handleFeedbackClose = () => {
    setIsOpen(false);
    trackFeedbackEvent('feedback_closed', {
      source: 'close_button',
      isMobile
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
        <div class="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50 transform scale-95 opacity-0 transition-all duration-300" id="feedback-modal">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                ${getIconSVG(icon)}
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">${title}</h3>
            <div class="text-gray-600 text-left space-y-4 mb-8">
              ${content}
            </div>
            <div class="flex space-x-4">
              <button onclick="this.closest('.fixed').remove()" class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                Got it!
              </button>
              ${actionType === 'contact' ? `
                <button onclick="window.location.href='mailto:hello@iconify-ai.com?subject=Hello from Iconify AI User&body=Hi there! I wanted to reach out about...'; this.closest('.fixed').remove()" class="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
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
            <div class="space-y-4">
              <div class="bg-blue-50 rounded-2xl p-4">
                <h4 class="font-semibold text-blue-800 mb-2">🕒 Live Support</h4>
                <p class="text-blue-600">Available Monday-Friday, 9 AM - 5 PM PST</p>
              </div>
              <div class="bg-green-50 rounded-2xl p-4">
                <h4 class="font-semibold text-green-800 mb-2">📧 Email Support</h4>
                <p class="text-green-600">support@iconify-ai.com - We respond within 24 hours</p>
              </div>
              <div class="bg-purple-50 rounded-2xl p-4">
                <h4 class="font-semibold text-purple-800 mb-2">📚 Resources</h4>
                <ul class="text-purple-600 space-y-1">
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
            <div class="space-y-4">
              <div class="bg-red-50 rounded-2xl p-4">
                <h4 class="font-semibold text-red-800 mb-2">📝 What to Include</h4>
                <ul class="text-red-600 space-y-1">
                  <li>• What happened?</li>
                  <li>• What were you trying to do?</li>
                  <li>• Browser & device info</li>
                  <li>• Screenshots if possible</li>
                </ul>
              </div>
              <div class="bg-orange-50 rounded-2xl p-4">
                <h4 class="font-semibold text-orange-800 mb-2">📧 Send Report To</h4>
                <p class="text-orange-600">bugs@iconify-ai.com</p>
                <p class="text-orange-600 text-sm mt-1">Or use our detailed feedback form below</p>
              </div>
              <div class="bg-green-50 rounded-2xl p-4">
                <h4 class="font-semibold text-green-800 mb-2">⚡ Quick Response</h4>
                <p class="text-green-600">Critical bugs are fixed within 48 hours</p>
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
            <div class="space-y-4">
              <div class="bg-yellow-50 rounded-2xl p-4">
                <h4 class="font-semibold text-yellow-800 mb-2">🎯 We Love Your Ideas!</h4>
                <p class="text-yellow-600">Help us build the perfect icon generation tool</p>
              </div>
              <div class="bg-indigo-50 rounded-2xl p-4">
                <h4 class="font-semibold text-indigo-800 mb-2">💭 Tell Us About</h4>
                <ul class="text-indigo-600 space-y-1">
                  <li>• What feature would help you?</li>
                  <li>• How would you use it?</li>
                  <li>• Any examples or inspiration?</li>
                  <li>• Integration needs?</li>
                </ul>
              </div>
              <div class="bg-purple-50 rounded-2xl p-4">
                <h4 class="font-semibold text-purple-800 mb-2">📧 Submit Ideas</h4>
                <p class="text-purple-600">features@iconify-ai.com</p>
                <p class="text-purple-600 text-sm mt-1">Or use our feedback form for detailed requests</p>
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
            <div class="space-y-4">
              <div class="bg-green-50 rounded-2xl p-4">
                <h4 class="font-semibold text-green-800 mb-2">💬 General Inquiries</h4>
                <p class="text-green-600">hello@iconify-ai.com</p>
              </div>
              <div class="bg-blue-50 rounded-2xl p-4">
                <h4 class="font-semibold text-blue-800 mb-2">🤝 Partnerships</h4>
                <p class="text-blue-600">partners@iconify-ai.com</p>
              </div>
              <div class="bg-purple-50 rounded-2xl p-4">
                <h4 class="font-semibold text-purple-800 mb-2">💼 Business Inquiries</h4>
                <p class="text-purple-600">business@iconify-ai.com</p>
              </div>
              <div class="bg-teal-50 rounded-2xl p-4">
                <h4 class="font-semibold text-teal-800 mb-2">🚀 We'd Love to Hear From You!</h4>
                <p class="text-teal-600">Click "Send Email" to open your email client with a pre-filled message.</p>
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
      isMobile
    });
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
      {/* Beautiful Enhanced Quick Actions Menu */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed z-40 ${
              isMobile 
                ? 'bottom-24 right-6 left-6' 
                : 'top-1/2 right-16 transform -translate-y-1/2 w-96'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 p-8">
              {/* Beautiful Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-2xl flex items-center justify-center shadow-neumorphic-sm">
                    <SafeIcon icon={FiLifeBuoy} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-warm-800 text-xl">Quick Support</h3>
                    <p className="text-warm-600 text-sm">How can we help you today?</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuickActions(false)}
                  className="p-3 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-2xl transition-all duration-200"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              
              {/* Beautiful Action Cards */}
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction(action.id)}
                    className={`w-full p-5 ${action.bgColor} hover:shadow-lg rounded-2xl font-medium text-left transition-all duration-200 flex items-center space-x-4 border border-white/50 group`}
                  >
                    <div className={`p-3 bg-gradient-to-r ${action.color} rounded-2xl shadow-neumorphic-sm group-hover:shadow-neumorphic transition-all duration-200`}>
                      <SafeIcon icon={action.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-lg ${action.textColor}`}>{action.label}</div>
                      <div className={`text-sm opacity-80 ${action.textColor}`}>{action.description}</div>
                    </div>
                    <div className="text-warm-400 group-hover:text-warm-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Beautiful CTA */}
              <div className="mt-8 pt-6 border-t border-warm-200">
                <button
                  onClick={handleToggleFeedback}
                  className="w-full p-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-2xl font-bold text-center shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
                  <span>Open Detailed Feedback Form</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Main Floating Feedback Button */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => {
          if (isOpen) {
            handleToggleFeedback();
          } else {
            setShowQuickActions(!showQuickActions);
          }
        }}
        className={`flex items-center justify-center font-bold text-white z-50 fixed transition-all shadow-neumorphic hover:shadow-purple-glow ${
          isMobile 
            ? 'bottom-6 right-6 rounded-full h-16 w-16 p-0 text-lg' 
            : 'top-1/2 right-0 transform -translate-y-1/2 rounded-l-3xl h-36 w-14 text-sm tracking-wider'
        }`}
        style={{
          background: `linear-gradient(135deg, ${feedbackConfig.PRIMARY_COLOR}, #f97316)`,
          writingMode: isMobile ? 'horizontal-tb' : 'vertical-lr',
          textOrientation: isMobile ? 'mixed' : 'mixed'
        }}
        whileHover={{
          scale: 1.05,
          x: isMobile ? 0 : -10,
          boxShadow: '0 0 30px rgba(200,75,255,0.5), 0 0 60px rgba(249,115,22,0.3)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ rotate: (isOpen || showQuickActions) ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobile ? (
            <div className="relative">
              <SafeIcon icon={(isOpen || showQuickActions) ? FiX : FiMessageCircle} className="w-7 h-7" />
              {!isOpen && !showQuickActions && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <SafeIcon icon={(isOpen || showQuickActions) ? FiX : FiMessageCircle} className="w-6 h-6" />
                {!isOpen && !showQuickActions && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
              <span className="text-xs font-bold tracking-[0.2em] transform rotate-0">
                HELP
              </span>
            </div>
          )}
        </motion.div>
      </motion.button>

      {/* Enhanced Detailed Feedback Workflow Component */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-40 ${
              isMobile 
                ? 'bottom-24 right-6 left-6' 
                : 'top-1/2 right-16 transform -translate-y-1/2 w-[420px]'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
              <FeedbackWorkflow
                uniqueUserId={feedbackConfig.userId}
                questId={feedbackConfig.QUEST_FEEDBACK_QUESTID}
                isOpen={isOpen}
                accent={feedbackConfig.PRIMARY_COLOR}
                onClose={handleFeedbackClose}
                styleConfig={{
                  ...feedbackConfig.theme,
                  primaryColor: feedbackConfig.PRIMARY_COLOR,
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                <FeedbackWorkflow.ThankYou />
              </FeedbackWorkflow>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Backdrop for mobile */}
      <AnimatePresence>
        {(isOpen || showQuickActions) && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => {
              handleFeedbackClose();
              setShowQuickActions(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackButton;