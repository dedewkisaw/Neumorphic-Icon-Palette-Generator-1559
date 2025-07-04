import React from 'react';
import { motion } from 'framer-motion';

const StyleSelector = ({ selectedStyle, onStyleChange }) => {
  const styles = [
    {
      id: 'flat',
      name: 'Flat',
      description: 'Clean, minimal icons',
      preview: '🎨',
      gradient: 'from-primary-400 to-primary-600',
    },
    {
      id: 'line',
      name: 'Line',
      description: 'Outlined style',
      preview: '✨',
      gradient: 'from-teal-400 to-teal-600',
    },
    {
      id: '3d',
      name: '3D',
      description: 'Dimensional depth',
      preview: '🔮',
      gradient: 'from-secondary-400 to-secondary-600',
    },
    {
      id: 'gradient',
      name: 'Gradient',
      description: 'Colorful gradients',
      preview: '🌈',
      gradient: 'from-coral-400 to-coral-600',
    },
  ];

  return (
    <div>
      <label className="block text-base font-semibold text-warm-700 mb-6">
        Choose Style
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {styles.map((style) => (
          <motion.button
            key={style.id}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStyleChange(style.id)}
            className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
              selectedStyle === style.id
                ? 'border-primary-400 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-neumorphic-inset'
                : 'border-warm-200 bg-white/80 hover:border-primary-300 shadow-neumorphic-sm hover:shadow-neumorphic'
            }`}
          >
            <div className="text-3xl mb-4">{style.preview}</div>
            <div className={`font-bold text-base mb-2 ${
              selectedStyle === style.id ? 'text-primary-700' : 'text-warm-700'
            }`}>
              {style.name}
            </div>
            <div className={`text-sm ${
              selectedStyle === style.id ? 'text-primary-600' : 'text-warm-500'
            }`}>
              {style.description}
            </div>
            {selectedStyle === style.id && (
              <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${style.gradient}`}></div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;