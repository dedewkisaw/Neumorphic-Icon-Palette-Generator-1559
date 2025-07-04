import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ColorPicker = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetColors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#10B981',
    '#06B6D4', '#84CC16', '#F97316', '#8B5CF6', '#6366F1', '#EC4899',
    '#64748B', '#374151', '#1F2937', '#111827', '#000000', '#FFFFFF'
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 rounded-lg border border-white/20 flex items-center space-x-3 px-3 bg-white/10 hover:bg-white/20 transition-colors"
      >
        <div 
          className="w-6 h-6 rounded border border-white/20"
          style={{ backgroundColor: value }}
        />
        <span className="text-white font-mono text-sm">{value}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/15 rounded-xl p-4 shadow-soft z-50"
        >
          {/* HTML Color Input */}
          <div className="mb-4">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Preset Colors */}
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                  value === color ? 'border-white ring-2 ring-white/50' : 'border-white/20 hover:border-white/40'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Custom Input */}
          <div className="mt-4">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </motion.div>
      )}

      {/* Backdrop to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ColorPicker;