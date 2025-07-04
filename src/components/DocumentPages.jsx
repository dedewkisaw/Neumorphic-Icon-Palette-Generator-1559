import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBook, FiCode, FiHelpCircle, FiShield, FiFileText, FiArrowLeft, FiExternalLink, FiDownload, FiCopy } = FiIcons;

// Documentation Page Component
export const DocumentationPage = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
            <SafeIcon icon={FiBook} className="w-8 h-8 text-white" />
          </div>
          <div className="px-6 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full border border-primary-200 shadow-neumorphic-sm">
            <span className="text-sm font-bold text-primary-700">📚 Complete Guide</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-warm-800 mb-6">Documentation</h1>
        <p className="text-xl text-warm-600 max-w-3xl mx-auto">
          Everything you need to know about using Iconify AI effectively
        </p>
      </motion.div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: FiCode, title: 'Getting Started', desc: 'Quick setup and first icon generation' },
          { icon: FiBook, title: 'API Reference', desc: 'Complete API documentation' },
          { icon: FiHelpCircle, title: 'Examples', desc: 'Code examples and tutorials' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 rounded-2xl p-6 shadow-neumorphic border border-white/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 shadow-neumorphic-sm">
              <SafeIcon icon={item.icon} className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-warm-800 mb-2">{item.title}</h3>
            <p className="text-warm-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white/90 rounded-3xl p-8 shadow-neumorphic border border-white/50">
        <h2 className="text-2xl font-bold text-warm-800 mb-6">Getting Started with Iconify AI</h2>
        
        <div className="prose prose-warm max-w-none">
          <h3>1. Creating Your First Icon Set</h3>
          <p>Start by describing your project in natural language. Our AI will analyze your description and generate contextually appropriate icons.</p>
          
          <div className="bg-gray-50 rounded-xl p-4 my-4">
            <code className="text-sm">
              Example: "Modern fintech dashboard with clean, professional icons for banking features"
            </code>
          </div>

          <h3>2. Customizing Your Icons</h3>
          <p>Use our professional editor to fine-tune colors, sizes, and styles. All icons are generated as scalable SVG with perfect neumorphic styling.</p>

          <h3>3. Exporting Your Work</h3>
          <p>Download your icons in multiple formats including SVG, PNG, and React components. Perfect for any project workflow.</p>
        </div>
      </div>
    </div>
  </div>
);

// API Documentation Page
export const APIPage = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
            <SafeIcon icon={FiCode} className="w-8 h-8 text-white" />
          </div>
          <div className="px-6 py-2 bg-gradient-to-r from-secondary-100 to-warm-100 rounded-full border border-secondary-200 shadow-neumorphic-sm">
            <span className="text-sm font-bold text-secondary-700">🔌 Developer Tools</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-warm-800 mb-6">API Documentation</h1>
        <p className="text-xl text-warm-600 max-w-3xl mx-auto">
          Integrate Iconify AI into your applications with our powerful REST API
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Endpoints */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-neumorphic border border-white/50">
          <h3 className="text-xl font-bold text-warm-800 mb-4">API Endpoints</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <code className="text-green-800 font-bold">POST /api/generate</code>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded">Core</span>
              </div>
              <p className="text-green-700 text-sm">Generate icons from text description</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <code className="text-blue-800 font-bold">GET /api/styles</code>
                <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">Utility</span>
              </div>
              <p className="text-blue-700 text-sm">List available icon styles</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <code className="text-purple-800 font-bold">POST /api/customize</code>
                <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded">Premium</span>
              </div>
              <p className="text-purple-700 text-sm">Customize existing icons</p>
            </div>
          </div>
        </div>

        {/* Example Request */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-neumorphic border border-white/50">
          <h3 className="text-xl font-bold text-warm-800 mb-4">Example Request</h3>
          
          <div className="bg-gray-900 rounded-xl p-4 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`curl -X POST "https://api.iconify-ai.com/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "finance dashboard icons",
    "style": "neumorphic",
    "count": 6,
    "format": "svg"
  }'`}</pre>
          </div>

          <div className="mt-4 bg-green-50 rounded-xl p-4">
            <h4 className="font-semibold text-green-800 mb-2">Response</h4>
            <pre className="text-green-700 text-sm overflow-x-auto">{`{
  "success": true,
  "icons": [
    {
      "id": "chart-icon",
      "name": "Chart",
      "svg": "<svg>...</svg>",
      "color": "#c84bff"
    }
  ]
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Help Center Page
export const HelpPage = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
            <SafeIcon icon={FiHelpCircle} className="w-8 h-8 text-white" />
          </div>
          <div className="px-6 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full border border-blue-200 shadow-neumorphic-sm">
            <span className="text-sm font-bold text-blue-700">🆘 Support Center</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-warm-800 mb-6">Help Center</h1>
        <p className="text-xl text-warm-600 max-w-3xl mx-auto">
          Find answers to common questions and get the help you need
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {[
          {
            q: "How does AI icon generation work?",
            a: "Our AI analyzes your text description and generates contextually relevant icons using advanced machine learning models trained on professional design patterns."
          },
          {
            q: "Can I use generated icons commercially?",
            a: "Yes! All icons generated with Iconify AI are yours to use in any project, commercial or personal, without attribution required."
          },
          {
            q: "What formats can I export to?",
            a: "We support SVG, PNG, and React component exports. SVG provides infinite scalability, while PNG is perfect for raster graphics needs."
          },
          {
            q: "How do I customize icon colors and styles?",
            a: "Use our built-in editor to adjust colors, stroke width, size, and apply different styles like neumorphic, flat, or outlined."
          }
        ].map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 rounded-2xl p-6 shadow-neumorphic border border-white/50"
          >
            <h3 className="text-lg font-bold text-warm-800 mb-3">{faq.q}</h3>
            <p className="text-warm-600">{faq.a}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 shadow-neumorphic border border-white/50 text-center">
        <h2 className="text-2xl font-bold text-warm-800 mb-4">Still Need Help?</h2>
        <p className="text-warm-600 mb-6">Our support team is here to help you succeed with Iconify AI</p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl font-bold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300">
            Contact Support
          </button>
          <button className="px-6 py-3 bg-white text-warm-600 rounded-2xl font-bold border border-warm-200 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300">
            Browse Tutorials
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Privacy Policy Page
export const PrivacyPage = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
            <SafeIcon icon={FiShield} className="w-8 h-8 text-white" />
          </div>
          <div className="px-6 py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full border border-green-200 shadow-neumorphic-sm">
            <span className="text-sm font-bold text-green-700">🔒 Privacy Policy</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-warm-800 mb-6">Privacy Policy</h1>
        <p className="text-lg text-warm-600">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <div className="bg-white/90 rounded-3xl p-8 shadow-neumorphic border border-white/50 prose prose-warm max-w-none">
        <h2>Your Privacy Matters to Us</h2>
        <p>At Iconify AI, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and protect your data.</p>

        <h3>Information We Collect</h3>
        <ul>
          <li><strong>Account Information:</strong> Email address, name, and profile details</li>
          <li><strong>Usage Data:</strong> How you interact with our platform and features</li>
          <li><strong>Generated Content:</strong> Icons and projects you create (stored securely)</li>
          <li><strong>Technical Information:</strong> Browser type, device info, and IP address</li>
        </ul>

        <h3>How We Use Your Information</h3>
        <ul>
          <li>Provide and improve our AI icon generation services</li>
          <li>Personalize your experience and recommendations</li>
          <li>Communicate important updates and support</li>
          <li>Ensure platform security and prevent abuse</li>
        </ul>

        <h3>Data Protection & Security</h3>
        <p>We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data.</p>

        <h3>Your Rights</h3>
        <ul>
          <li>Access and download your personal data</li>
          <li>Request correction of inaccurate information</li>
          <li>Delete your account and associated data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h3>Contact Us</h3>
        <p>For any privacy-related questions, please contact us at privacy@iconify-ai.com</p>
      </div>
    </div>
  </div>
);

// Terms of Service Page
export const TermsPage = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
            <SafeIcon icon={FiFileText} className="w-8 h-8 text-white" />
          </div>
          <div className="px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 shadow-neumorphic-sm">
            <span className="text-sm font-bold text-purple-700">📋 Terms of Service</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-warm-800 mb-6">Terms of Service</h1>
        <p className="text-lg text-warm-600">Effective: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <div className="bg-white/90 rounded-3xl p-8 shadow-neumorphic border border-white/50 prose prose-warm max-w-none">
        <h2>Agreement to Terms</h2>
        <p>By accessing and using Iconify AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h3>Permitted Use</h3>
        <p>You may use Iconify AI for:</p>
        <ul>
          <li>Commercial and personal projects</li>
          <li>Client work and freelance projects</li>
          <li>Educational and non-profit purposes</li>
          <li>Open source project integration</li>
        </ul>

        <h3>Intellectual Property</h3>
        <ul>
          <li><strong>Generated Icons:</strong> You own the icons you generate and can use them without attribution</li>
          <li><strong>Platform Technology:</strong> The underlying AI technology and platform remain our intellectual property</li>
          <li><strong>Respect for Others:</strong> Do not generate content that infringes on third-party intellectual property</li>
        </ul>

        <h3>Prohibited Activities</h3>
        <ul>
          <li>Attempting to reverse engineer our AI algorithms</li>
          <li>Using the service for illegal or harmful purposes</li>
          <li>Sharing account credentials with unauthorized users</li>
          <li>Excessive usage that impacts service performance</li>
        </ul>

        <h3>Service Availability</h3>
        <p>While we strive for 99.9% uptime, we cannot guarantee uninterrupted service availability. We reserve the right to perform maintenance and updates as needed.</p>

        <h3>Limitation of Liability</h3>
        <p>Iconify AI is provided "as is" without warranties. We are not liable for any damages arising from your use of the service.</p>

        <h3>Contact Information</h3>
        <p>For questions about these terms, please contact legal@iconify-ai.com</p>
      </div>
    </div>
  </div>
);