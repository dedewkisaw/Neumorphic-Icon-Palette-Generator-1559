import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiGithub, FiTwitter, FiMail, FiExternalLink, FiBook, FiCode, FiHelpCircle, FiPhone, FiShield, FiFileText, FiX, FiCheck, FiInfo } = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const createNeumorphicModal = (title, content, type = 'info', actions = []) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/10 backdrop-blur-md';
    
    const typeStyles = {
      info: {
        iconBg: 'from-primary-400 to-secondary-500',
        icon: FiInfo,
        borderColor: 'border-primary-200/50'
      },
      success: {
        iconBg: 'from-green-400 to-teal-500',
        icon: FiCheck,
        borderColor: 'border-green-200/50'
      },
      document: {
        iconBg: 'from-secondary-400 to-warm-500',
        icon: FiFileText,
        borderColor: 'border-secondary-200/50'
      }
    };

    const style = typeStyles[type] || typeStyles.info;

    modal.innerHTML = `
      <div class="bg-white/95 backdrop-blur-lg rounded-[2rem] p-8 max-w-2xl w-full border border-white/60 transform scale-95 opacity-0 transition-all duration-500" 
           id="neuro-modal" 
           style="box-shadow: 20px 20px 40px rgba(120,113,108,0.1), -20px -20px 40px rgba(255,255,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.3);">
        
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-br ${style.iconBg} rounded-[1.25rem] flex items-center justify-center shadow-neumorphic-sm">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-warm-800">${title}</h3>
              <p class="text-warm-600">Iconify AI Platform</p>
            </div>
          </div>
          <button onclick="this.closest('.fixed').remove()" 
                  class="p-3 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-2xl transition-all duration-300"
                  style="box-shadow: 6px 6px 12px rgba(120,113,108,0.1), -6px -6px 12px rgba(255,255,255,0.9);">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="bg-gradient-to-br from-warm-50 to-primary-50 rounded-[1.5rem] p-6 mb-8 border border-white/50"
             style="box-shadow: inset 8px 8px 16px rgba(120,113,108,0.05), inset -8px -8px 16px rgba(255,255,255,0.9);">
          <div class="text-warm-700 leading-relaxed space-y-4">
            ${content}
          </div>
        </div>

        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          ${actions.map(action => `
            <button onclick="${action.onClick || 'this.closest(\'.fixed\').remove()'}" 
                    class="flex-1 py-4 px-6 ${action.primary ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white' : 'bg-white text-warm-600 border border-warm-200'} rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3"
                    style="box-shadow: 8px 8px 16px rgba(120,113,108,0.1), -8px -8px 16px rgba(255,255,255,0.9);">
              ${action.icon ? `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">${action.icon}</svg>` : ''}
              <span>${action.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Enhanced animation
    setTimeout(() => {
      const modalContent = modal.querySelector('#neuro-modal');
      modalContent.style.transform = 'scale(1)';
      modalContent.style.opacity = '1';
    }, 10);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
      }
    });

    return modal;
  };

  const handleDocumentClick = (docType) => {
    let title, content, actions;

    switch (docType) {
      case 'documentation':
        title = 'Documentation';
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">📚 Complete Developer Documentation</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white/80 rounded-xl p-4" style="box-shadow: 4px 4px 8px rgba(120,113,108,0.1), -4px -4px 8px rgba(255,255,255,0.9);">
              <h5 class="font-semibold text-primary-700 mb-2">🚀 Getting Started</h5>
              <ul class="text-sm space-y-1">
                <li>• Quick start guide</li>
                <li>• Installation instructions</li>
                <li>• First icon generation</li>
              </ul>
            </div>
            <div class="bg-white/80 rounded-xl p-4" style="box-shadow: 4px 4px 8px rgba(120,113,108,0.1), -4px -4px 8px rgba(255,255,255,0.9);">
              <h5 class="font-semibold text-secondary-700 mb-2">⚙️ Advanced Features</h5>
              <ul class="text-sm space-y-1">
                <li>• AI customization</li>
                <li>• Batch processing</li>
                <li>• Color harmonies</li>
              </ul>
            </div>
          </div>

          <div class="bg-primary-50 rounded-xl p-4 mb-4">
            <h5 class="font-semibold text-primary-800 mb-2">📖 Available Sections</h5>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>• API Reference</div>
              <div>• Code Examples</div>
              <div>• Best Practices</div>
              <div>• Troubleshooting</div>
              <div>• Integration Guide</div>
              <div>• Performance Tips</div>
            </div>
          </div>
        `;
        actions = [
          {
            text: 'View Full Docs',
            primary: true,
            onClick: "window.location.hash = '/docs'",
            icon: '<path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" clip-rule="evenodd" />'
          },
          { text: 'Close' }
        ];
        break;

      case 'api':
        title = 'API Documentation';
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">🔌 Powerful REST API</h4>
          
          <div class="bg-warm-50 rounded-xl p-4 mb-6">
            <h5 class="font-semibold text-warm-800 mb-3">🌟 API Features</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 class="font-medium text-primary-700 mb-2">Generation Endpoints</h6>
                <ul class="text-sm space-y-1 text-warm-600">
                  <li>• <code class="bg-white px-2 py-1 rounded">POST /api/generate</code></li>
                  <li>• <code class="bg-white px-2 py-1 rounded">GET /api/styles</code></li>
                  <li>• <code class="bg-white px-2 py-1 rounded">POST /api/customize</code></li>
                </ul>
              </div>
              <div>
                <h6 class="font-medium text-secondary-700 mb-2">Management Endpoints</h6>
                <ul class="text-sm space-y-1 text-warm-600">
                  <li>• <code class="bg-white px-2 py-1 rounded">GET /api/collections</code></li>
                  <li>• <code class="bg-white px-2 py-1 rounded">POST /api/export</code></li>
                  <li>• <code class="bg-white px-2 py-1 rounded">DELETE /api/icons</code></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-green-50 rounded-xl p-4 mb-4">
            <h5 class="font-semibold text-green-800 mb-2">📝 Example Request</h5>
            <pre class="bg-green-100 p-3 rounded-lg text-sm overflow-x-auto"><code>{
  "prompt": "finance dashboard icons",
  "style": "neumorphic",
  "count": 6,
  "format": "svg"
}</code></pre>
          </div>

          <div class="flex items-center space-x-3 text-sm">
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            <span class="text-warm-600">Rate limit: 1000 requests/hour</span>
          </div>
        `;
        actions = [
          {
            text: 'Try API',
            primary: true,
            onClick: "window.location.hash = '/api'",
            icon: '<path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />'
          },
          { text: 'Close' }
        ];
        break;

      case 'help':
        title = 'Help Center';
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">🆘 We're Here to Help</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-blue-50 rounded-xl p-4">
              <h5 class="font-semibold text-blue-800 mb-3">🕒 Live Support</h5>
              <p class="text-blue-600 text-sm mb-2">Available Monday-Friday</p>
              <p class="text-blue-700 font-medium">9 AM - 5 PM PST</p>
            </div>
            <div class="bg-green-50 rounded-xl p-4">
              <h5 class="font-semibold text-green-800 mb-3">📧 Email Support</h5>
              <p class="text-green-600 text-sm mb-2">support@iconify-ai.com</p>
              <p class="text-green-700 font-medium">Response within 24 hours</p>
            </div>
          </div>

          <div class="bg-purple-50 rounded-xl p-4 mb-4">
            <h5 class="font-semibold text-purple-800 mb-3">📚 Self-Help Resources</h5>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="text-purple-600">• FAQ Section</div>
              <div class="text-purple-600">• Video Tutorials</div>
              <div class="text-purple-600">• Getting Started Guide</div>
              <div class="text-purple-600">• Community Forum</div>
              <div class="text-purple-600">• Troubleshooting</div>
              <div class="text-purple-600">• Best Practices</div>
            </div>
          </div>
        `;
        actions = [
          {
            text: 'Open Help Center',
            primary: true,
            onClick: "window.location.hash = '/help'",
            icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />'
          },
          {
            text: 'Contact Support',
            onClick: "window.location.href = 'mailto:support@iconify-ai.com?subject=Support Request&body=Hi Iconify AI Team,%0A%0AI need help with...'",
            icon: '<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />'
          }
        ];
        break;

      case 'privacy':
        title = 'Privacy Policy';
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">🔒 Your Privacy Matters</h4>
          
          <div class="space-y-4 mb-6">
            <div class="bg-green-50 rounded-xl p-4">
              <h5 class="font-semibold text-green-800 mb-2">✅ What We Protect</h5>
              <ul class="text-sm text-green-700 space-y-1">
                <li>• Your personal information and account data</li>
                <li>• Generated icon designs and projects</li>
                <li>• Usage patterns and preferences</li>
                <li>• Communication and support interactions</li>
              </ul>
            </div>

            <div class="bg-blue-50 rounded-xl p-4">
              <h5 class="font-semibold text-blue-800 mb-2">🛡️ How We Use Data</h5>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>• Improve AI icon generation accuracy</li>
                <li>• Provide personalized recommendations</li>
                <li>• Ensure platform security and performance</li>
                <li>• Send important updates and notifications</li>
              </ul>
            </div>

            <div class="bg-yellow-50 rounded-xl p-4">
              <h5 class="font-semibold text-yellow-800 mb-2">🎯 Your Rights</h5>
              <ul class="text-sm text-yellow-700 space-y-1">
                <li>• Access and download your data</li>
                <li>• Request data correction or deletion</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Control data sharing preferences</li>
              </ul>
            </div>
          </div>

          <p class="text-sm text-warm-600">Last updated: ${new Date().toLocaleDateString()}</p>
        `;
        actions = [
          {
            text: 'Read Full Policy',
            primary: true,
            onClick: "window.location.hash = '/privacy'",
            icon: '<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />'
          },
          { text: 'Close' }
        ];
        break;

      case 'terms':
        title = 'Terms of Service';
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">📋 Terms of Service</h4>
          
          <div class="space-y-4 mb-6">
            <div class="bg-primary-50 rounded-xl p-4">
              <h5 class="font-semibold text-primary-800 mb-2">📝 Service Agreement</h5>
              <p class="text-sm text-primary-700">
                By using Iconify AI, you agree to our terms of service and acceptable use policy. 
                Our platform is designed for professional and creative use in compliance with applicable laws.
              </p>
            </div>

            <div class="bg-secondary-50 rounded-xl p-4">
              <h5 class="font-semibold text-secondary-800 mb-2">🎯 Permitted Use</h5>
              <ul class="text-sm text-secondary-700 space-y-1">
                <li>• Commercial and personal projects</li>
                <li>• Client work and freelance projects</li>
                <li>• Educational and non-profit use</li>
                <li>• Open source project integration</li>
              </ul>
            </div>

            <div class="bg-warm-50 rounded-xl p-4">
              <h5 class="font-semibold text-warm-800 mb-2">⚖️ Intellectual Property</h5>
              <ul class="text-sm text-warm-700 space-y-1">
                <li>• You own the icons you generate</li>
                <li>• No attribution required for generated content</li>
                <li>• Respect third-party intellectual property</li>
                <li>• Platform technology remains our property</li>
              </ul>
            </div>
          </div>

          <div class="flex items-center space-x-2 text-sm text-warm-600">
            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Effective: ${new Date().toLocaleDateString()}</span>
          </div>
        `;
        actions = [
          {
            text: 'Read Full Terms',
            primary: true,
            onClick: "window.location.hash = '/terms'",
            icon: '<path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />'
          },
          { text: 'Close' }
        ];
        break;

      default:
        return;
    }

    createNeumorphicModal(title, content, 'document', actions);
  };

  const handleExternalLink = (url, label) => {
    const title = `${label}`;
    let content;

    switch (label) {
      case 'GitHub':
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">🚀 Open Source & Community</h4>
          <div class="bg-gray-50 rounded-xl p-4 mb-4">
            <h5 class="font-semibold text-gray-800 mb-2">📚 Available Repositories</h5>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• <strong>iconify-ai-core</strong> - Main platform source code</li>
              <li>• <strong>iconify-ai-sdk</strong> - JavaScript SDK for developers</li>
              <li>• <strong>iconify-ai-examples</strong> - Integration examples</li>
              <li>• <strong>iconify-ai-docs</strong> - Documentation source</li>
            </ul>
          </div>
          <p class="text-warm-600 mb-4">Join our developer community and contribute to the future of AI-powered icon generation!</p>
        `;
        break;

      case 'Twitter':
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">🐦 Follow Us on Twitter</h4>
          <div class="bg-blue-50 rounded-xl p-4 mb-4">
            <h5 class="font-semibold text-blue-800 mb-2">📱 What You'll Get</h5>
            <ul class="text-sm text-blue-700 space-y-2">
              <li>• Latest feature announcements</li>
              <li>• Design tips and best practices</li>
              <li>• Community showcases</li>
              <li>• Behind-the-scenes content</li>
            </ul>
          </div>
          <p class="text-warm-600">Stay connected with the Iconify AI community and never miss an update!</p>
        `;
        break;

      case 'Email':
        content = `
          <h4 class="text-xl font-bold text-warm-800 mb-4">📧 Get in Touch</h4>
          <div class="space-y-4">
            <div class="bg-green-50 rounded-xl p-4">
              <h5 class="font-semibold text-green-800 mb-2">💬 General Inquiries</h5>
              <p class="text-green-700 text-sm">hello@iconify-ai.com</p>
            </div>
            <div class="bg-blue-50 rounded-xl p-4">
              <h5 class="font-semibold text-blue-800 mb-2">🤝 Partnerships</h5>
              <p class="text-blue-700 text-sm">partners@iconify-ai.com</p>
            </div>
            <div class="bg-purple-50 rounded-xl p-4">
              <h5 class="font-semibold text-purple-800 mb-2">💼 Business Inquiries</h5>
              <p class="text-purple-700 text-sm">business@iconify-ai.com</p>
            </div>
          </div>
        `;
        break;
    }

    const actions = [
      {
        text: `Open ${label}`,
        primary: true,
        onClick: `window.open('${url}', '_blank'); this.closest('.fixed').remove();`,
        icon: '<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />'
      },
      { text: 'Close' }
    ];

    createNeumorphicModal(title, content, 'info', actions);
  };

  const socialLinks = [
    {
      icon: FiGithub,
      href: 'https://github.com/iconify-ai',
      label: 'GitHub'
    },
    {
      icon: FiTwitter,
      href: 'https://twitter.com/iconify_ai',
      label: 'Twitter'
    },
    {
      icon: FiMail,
      href: 'mailto:hello@iconify-ai.com',
      label: 'Email'
    },
  ];

  const quickLinks = [
    {
      label: 'Create Icons',
      path: '/creator',
      icon: FiCode
    },
    {
      label: 'Gallery',
      path: '/community',
      icon: FiBook
    },
    {
      label: 'Documentation',
      action: () => handleDocumentClick('documentation')
    },
    {
      label: 'API',
      action: () => handleDocumentClick('api')
    }
  ];

  const supportLinks = [
    {
      label: 'Help Center',
      icon: FiHelpCircle,
      action: () => handleDocumentClick('help')
    },
    {
      label: 'Contact Us',
      icon: FiPhone,
      action: () => {
        window.location.href = 'mailto:support@iconify-ai.com?subject=Support Request&body=Hi Iconify AI Team,%0A%0AI need help with...';
      }
    },
    {
      label: 'Privacy Policy',
      icon: FiShield,
      action: () => handleDocumentClick('privacy')
    },
    {
      label: 'Terms of Service',
      icon: FiFileText,
      action: () => handleDocumentClick('terms')
    }
  ];

  const handleLinkClick = (link) => {
    if (link.action) {
      link.action();
    } else if (link.path) {
      window.location.hash = link.path;
    }
  };

  const showNewsletterModal = () => {
    const content = `
      <h4 class="text-xl font-bold text-warm-800 mb-4">📬 Stay Updated with Iconify AI</h4>
      
      <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 mb-4">
        <h5 class="font-semibold text-primary-800 mb-2">✨ What You'll Receive</h5>
        <ul class="text-sm text-primary-700 space-y-1">
          <li>• Weekly design tips and best practices</li>
          <li>• Early access to new features</li>
          <li>• Exclusive community showcases</li>
          <li>• Special offers and free resources</li>
        </ul>
      </div>

      <div class="bg-green-50 rounded-xl p-4 mb-4">
        <h5 class="font-semibold text-green-800 mb-2">🎯 Newsletter Benefits</h5>
        <div class="grid grid-cols-2 gap-2 text-sm text-green-700">
          <div>• No spam, ever</div>
          <div>• Unsubscribe anytime</div>
          <div>• Weekly frequency</div>
          <div>• Valuable content only</div>
        </div>
      </div>

      <p class="text-warm-600 text-sm">Join over 5,000 designers and developers who trust our newsletter!</p>
    `;

    createNeumorphicModal('Newsletter Signup', content, 'success', [
      {
        text: 'Subscribe Now',
        primary: true,
        onClick: "alert('Newsletter subscription feature will be available soon!'); this.closest('.fixed').remove();",
        icon: '<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />'
      },
      { text: 'Maybe Later' }
    ]);
  };

  const showVersionModal = () => {
    const content = `
      <h4 class="text-xl font-bold text-warm-800 mb-4">🚀 What's New in v2.0.0</h4>
      
      <div class="space-y-4">
        <div class="bg-green-50 rounded-xl p-4">
          <h5 class="font-semibold text-green-800 mb-2">✨ New Features</h5>
          <ul class="text-sm text-green-700 space-y-1">
            <li>• Enhanced AI icon generation with 16-color palettes</li>
            <li>• Professional neumorphic design system</li>
            <li>• Real-time collaboration features</li>
            <li>• Advanced export options (SVG, PNG, React)</li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-xl p-4">
          <h5 class="font-semibold text-blue-800 mb-2">⚡ Performance Improvements</h5>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• 50% faster icon generation</li>
            <li>• Improved memory efficiency</li>
            <li>• Better mobile responsiveness</li>
            <li>• Enhanced accessibility features</li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-xl p-4">
          <h5 class="font-semibold text-purple-800 mb-2">🔧 Developer Tools</h5>
          <ul class="text-sm text-purple-700 space-y-1">
            <li>• New REST API endpoints</li>
            <li>• JavaScript SDK updates</li>
            <li>• Webhook support</li>
            <li>• Improved documentation</li>
          </ul>
        </div>
      </div>
    `;

    createNeumorphicModal('Version 2.0.0 Release Notes', content, 'info', [
      {
        text: 'View Full Changelog',
        primary: true,
        onClick: "window.location.hash = '/changelog'; this.closest('.fixed').remove();",
        icon: '<path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />'
      },
      { text: 'Close' }
    ]);
  };

  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-warm-200 shadow-neumorphic-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-2xl shadow-neumorphic-sm flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-warm-800">Iconify AI</h3>
                <p className="text-sm text-warm-600">Professional Icons</p>
              </div>
            </div>
            <p className="text-warm-600 mb-6 leading-relaxed">
              Create beautiful neumorphic icons with AI-powered generation. Perfect for modern web and mobile applications.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleExternalLink(social.href, social.label)}
                  className="w-12 h-12 bg-white rounded-xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300 flex items-center justify-center text-warm-600 hover:text-primary-600 group"
                  title={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-warm-800 mb-6 text-lg flex items-center space-x-2">
              <SafeIcon icon={FiCode} className="w-5 h-5 text-primary-600" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4, scale: 1.02 }}
                    onClick={() => handleLinkClick(link)}
                    className="text-warm-600 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-2 group text-left w-full"
                  >
                    {link.icon && <SafeIcon icon={link.icon} className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
                    <span className="group-hover:font-medium transition-all duration-200">{link.label}</span>
                    {link.action && <SafeIcon icon={FiExternalLink} className="w-3 h-3 opacity-60" />}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-warm-800 mb-6 text-lg flex items-center space-x-2">
              <SafeIcon icon={FiHelpCircle} className="w-5 h-5 text-secondary-600" />
              <span>Support</span>
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4, scale: 1.02 }}
                    onClick={() => handleLinkClick(link)}
                    className="text-warm-600 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-2 group text-left w-full"
                  >
                    <SafeIcon icon={link.icon} className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="group-hover:font-medium transition-all duration-200">{link.label}</span>
                    <SafeIcon icon={FiExternalLink} className="w-3 h-3 opacity-60" />
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Updates */}
          <div>
            <h4 className="font-bold text-warm-800 mb-6 text-lg">Stay Updated</h4>
            <p className="text-warm-600 mb-4 text-sm">
              Get the latest updates on new features and design trends.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white border-0 rounded-l-xl shadow-neumorphic-inset text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={showNewsletterModal}
                  className="px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-r-xl shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
                >
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-warm-500">
                No spam, unsubscribe at any time.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200">
              <h5 className="font-semibold text-warm-800 mb-2 text-sm">✨ Latest Features</h5>
              <ul className="text-xs text-warm-600 space-y-1">
                <li>• AI-powered icon generation</li>
                <li>• 16-color professional palettes</li>
                <li>• Real-time collaboration</li>
                <li>• Advanced export options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-warm-200 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-warm-600 text-sm">
                © {currentYear} Iconify AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-warm-600 text-sm">
                <span>Made with</span>
                <SafeIcon icon={FiHeart} className="w-4 h-4 text-coral-500 animate-pulse" />
                <span>for designers</span>
              </div>
            </div>

            {/* Status & Version */}
            <div className="flex items-center space-x-6 text-sm text-warm-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>v2.0.0</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={showVersionModal}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  What's new?
                </motion.button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.hash = '/creator'}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium text-sm shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
              >
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.hash = '/community'}
                className="px-4 py-2 bg-white text-warm-600 rounded-xl font-medium text-sm border border-warm-200 hover:bg-warm-50 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
              >
                Browse Gallery
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;