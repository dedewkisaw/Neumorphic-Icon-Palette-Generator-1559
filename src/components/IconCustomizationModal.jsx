import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiCopy } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ColorPicker from './ColorPicker';

const IconCustomizationModal = ({ isOpen, onClose, icon, onSave }) => {
  const [color, setColor] = useState('#6366F1');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [size, setSize] = useState(24);
  const [style, setStyle] = useState('line');

  useEffect(() => {
    if (icon) {
      setColor(icon.color);
      setStrokeWidth(icon.strokeWidth);
      setSize(icon.size);
      setStyle(icon.style);
    }
  }, [icon]);

  if (!isOpen || !icon) return null;

  const handleSave = () => {
    const updatedIcon = {
      ...icon,
      color,
      strokeWidth,
      size,
      style
    };
    onSave(updatedIcon);
  };

  const exportSVG = () => {
    const svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path 
    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
    fill="${style === 'glyph' ? color : 'none'}"
    stroke="${style === 'glyph' ? 'none' : color}"
    stroke-width="${style === 'glyph' ? 0 : strokeWidth}"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${icon.name.toLowerCase()}-icon.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    const code = `<${icon.name}Icon size={${size}} color="${color}" strokeWidth={${strokeWidth}} />`;
    navigator.clipboard.writeText(code);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/15 shadow-soft"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Customize {icon.name}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white/5 rounded-xl p-8 mb-6 flex items-center justify-center">
            <div style={{ color }}>
              <SafeIcon 
                icon={icon.component} 
                style={{ 
                  fontSize: `${size}px`,
                  strokeWidth,
                  fill: style === 'glyph' ? color : 'none'
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4 mb-6">
            {/* Color */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Color</label>
              <ColorPicker value={color} onChange={setColor} />
            </div>

            {/* Style */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Style</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'line', name: 'Line' },
                  { id: 'glyph', name: 'Glyph' }
                ].map((styleOption) => (
                  <button
                    key={styleOption.id}
                    onClick={() => setStyle(styleOption.id)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      style === styleOption.id
                        ? 'bg-indigo-500/20 border border-indigo-500/50 text-white'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {styleOption.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Stroke Width */}
            {style !== 'glyph' && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Stroke Width: {strokeWidth}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            )}

            {/* Size */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min="16"
                max="64"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={copyCode}
              className="flex-1 border border-white/20 rounded-lg py-2 text-white hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCopy} className="w-4 h-4" />
              <span>Copy Code</span>
            </button>
            <button
              onClick={exportSVG}
              className="flex-1 border border-white/20 rounded-lg py-2 text-white hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default IconCustomizationModal;