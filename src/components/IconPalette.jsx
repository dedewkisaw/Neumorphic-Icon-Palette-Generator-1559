import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiDownload, FiEdit3, FiCopy, FiCheck } = FiIcons;

const IconPalette = ({ palette }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Create SVG content for the palette
      const svgContent = createPaletteSVG(palette);
      
      // Create and download the file
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success notification
      console.log(`Exported ${palette.name} palette successfully!`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const createPaletteSVG = (palette) => {
    const iconSize = 48;
    const spacing = 60;
    const cols = 3;
    const rows = Math.ceil(palette.icons.length / cols);
    const width = cols * spacing;
    const height = rows * spacing + 100; // Extra space for colors

    let svgContent = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .palette-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; }
            .palette-title { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; }
          </style>
        </defs>
        
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#fefcfb" rx="12"/>
        
        <!-- Title -->
        <text x="${width/2}" y="30" text-anchor="middle" class="palette-title" fill="#78716c">
          ${palette.name}
        </text>
    `;

    // Add icons
    palette.icons.slice(0, 6).forEach((iconName, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = col * spacing + spacing/2;
      const y = row * spacing + 60;
      const color = palette.colors[index % palette.colors.length];

      svgContent += `
        <circle cx="${x}" cy="${y}" r="${iconSize/2 - 4}" fill="${color}20" stroke="${color}" stroke-width="2"/>
        <text x="${x}" y="${y + 5}" text-anchor="middle" class="palette-text" fill="${color}">
          ${iconName.slice(0, 1)}
        </text>
      `;
    });

    // Add color palette
    const colorY = rows * spacing + 120;
    const colorWidth = width / palette.colors.length;
    
    palette.colors.forEach((color, index) => {
      svgContent += `
        <rect x="${index * colorWidth}" y="${colorY}" width="${colorWidth}" height="20" fill="${color}"/>
        <text x="${index * colorWidth + colorWidth/2}" y="${colorY + 35}" text-anchor="middle" class="palette-text" fill="#78716c">
          ${color}
        </text>
      `;
    });

    svgContent += '</svg>';
    return svgContent;
  };

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-white/50 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-bold text-warm-800 text-xl mb-2">{palette.name}</h3>
          <p className="text-warm-500 capitalize flex items-center space-x-2">
            <span>{palette.style}</span>
            <span>•</span>
            <span className="font-medium">{palette.theme}</span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="p-3 rounded-2xl hover:bg-warm-100 transition-colors duration-200"
        >
          <SafeIcon
            icon={FiHeart}
            className={`w-6 h-6 transition-colors duration-200 ${
              isLiked ? 'text-coral-500 fill-current' : 'text-warm-400 hover:text-coral-400'
            }`}
          />
        </motion.button>
      </div>

      {/* Icons Preview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {palette.icons.slice(0, 6).map((iconName, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="aspect-square bg-gradient-to-br from-white to-warm-50 rounded-3xl flex items-center justify-center shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300 cursor-pointer border border-white/50"
            style={{
              backgroundColor: palette.colors[index % palette.colors.length] + '15',
            }}
          >
            <SafeIcon
              icon={getIconComponent(iconName)}
              className="w-8 h-8 transition-transform duration-200"
              style={{ color: palette.colors[index % palette.colors.length] }}
            />
          </motion.div>
        ))}
      </div>

      {/* Color Palette */}
      <div className="flex space-x-3 mb-8">
        {palette.colors.map((color, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCopyColor(color)}
            className="flex-1 h-12 rounded-2xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-200 relative group/color border-2 border-white/50"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity duration-200 bg-black/20 rounded-2xl">
              <SafeIcon
                icon={copiedColor === color ? FiCheck : FiCopy}
                className="w-4 h-4 text-white drop-shadow-md"
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          disabled={isExporting}
          className={`flex-1 py-4 bg-gradient-to-r ${
            palette.gradient || 'from-primary-500 to-secondary-500'
          } text-white rounded-2xl font-bold text-base shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50`}
        >
          <SafeIcon icon={FiDownload} className="w-5 h-5" />
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => console.log('Edit palette:', palette.name)}
          className="px-6 py-4 bg-white text-warm-600 rounded-2xl font-bold text-base shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200"
        >
          <SafeIcon icon={FiEdit3} className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default IconPalette;