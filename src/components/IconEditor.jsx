import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiSearch, FiUser, FiSettings, FiDownload, FiRotateCcw, FiCopy, FiPalette, FiEdit3, FiZap, FiStar, FiHeart, FiEye, FiLayers, FiGrid, FiRefreshCw, FiSave, FiShare2 } = FiIcons;

const IconEditor = () => {
  const [selectedIcon, setSelectedIcon] = useState('Home');
  const [iconColor, setIconColor] = useState('#c84bff');
  const [iconSize, setIconSize] = useState(48);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('#fefcfb');
  const [isExporting, setIsExporting] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [showGeneratedIcons, setShowGeneratedIcons] = useState(false);
  const [selectedGeneratedIcon, setSelectedGeneratedIcon] = useState(null);
  const [activeTab, setActiveTab] = useState('library');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    if (params.get('icon')) {
      setSelectedIcon(decodeURIComponent(params.get('icon')));
    }
    if (params.get('color')) {
      setIconColor(decodeURIComponent(params.get('color')));
    }
    if (params.get('size')) {
      setIconSize(parseInt(params.get('size')) || 48);
    }
    if (params.get('stroke')) {
      setStrokeWidth(parseFloat(params.get('stroke')) || 2);
    }
    
    if (params.get('icon') && params.get('color')) {
      setTimeout(() => {
        console.log(`🎨 Welcome to Icon Editor! Pre-loaded: ${params.get('icon')} with color ${params.get('color')}`);
      }, 500);
    }
    
    loadGeneratedIcons();
    loadFavorites();
  }, []);

  const loadGeneratedIcons = () => {
    const stored = localStorage.getItem('iconify_generated_icons');
    if (stored) {
      try {
        const icons = JSON.parse(stored);
        setGeneratedIcons(icons);
        setShowGeneratedIcons(true);
        return;
      } catch (error) {
        console.log('Error loading stored icons, generating samples');
      }
    }
    
    const sampleIcons = generateSampleIcons();
    setGeneratedIcons(sampleIcons);
    setShowGeneratedIcons(true);
    localStorage.setItem('iconify_generated_icons', JSON.stringify(sampleIcons));
  };

  const loadFavorites = () => {
    const stored = localStorage.getItem('iconify_favorites');
    if (stored) {
      try {
        const favs = JSON.parse(stored);
        setFavorites(favs);
      } catch (error) {
        console.log('Error loading favorites');
      }
    }
  };

  const generateSampleIcons = () => {
    const iconNames = ['Home', 'Search', 'User', 'Settings', 'Bell', 'Mail', 'Heart', 'Star', 'Plus', 'Edit', 'Trash', 'Download'];
    const colors = ['#c84bff', '#f97316', '#14b8a6', '#ff5757', '#facc15', '#2dd4bf'];
    
    return iconNames.map((name, index) => ({
      id: name.toLowerCase(),
      name,
      color: colors[index % colors.length],
      category: 'interface',
      generated: true,
      timestamp: Date.now() - (index * 1000)
    }));
  };

  const availableIcons = [
    'Home', 'Search', 'User', 'Settings', 'Bell', 'Mail', 'Heart', 'Star', 'Plus', 'Edit',
    'Trash', 'Download', 'Upload', 'Share', 'Lock', 'Eye', 'Grid', 'Layers', 'Zap', 'Target',
    'Award', 'Shield', 'Globe', 'Camera', 'Calendar', 'Clock', 'Map', 'Phone', 'Video', 'Music',
    'Image', 'File', 'Folder', 'Archive', 'Database', 'Server', 'Wifi', 'Bluetooth', 'Battery', 'Power',
    'Volume', 'Mic'
  ];

  const presetColors = [
    '#c84bff', '#f97316', '#14b8a6', '#ff5757', '#facc15', '#2dd4bf',
    '#d97aff', '#fb923c', '#5eead4', '#ff7a7a', '#fde047', '#99f6e4',
    '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444', '#10b981'
  ];

  const backgroundPresets = [
    '#fefcfb', '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
    '#1e293b', '#0f172a', '#000000', '#fef2f2', '#fef7ed', '#f0fdf4'
  ];

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  // FIXED: Enhanced SVG generation with proper Feather Icons paths
  const getIconSVGPaths = (iconName) => {
    const iconPaths = {
      'Home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
      'Search': 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z m21 21l-4.35-4.35',
      'User': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'Settings': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
      'Heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      'Star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'Mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z m18 2l-10 7L2 6',
      'Bell': 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
      'Download': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
      'Upload': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
      'Edit': 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
      'Trash': 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6',
      'Plus': 'M12 5v14 M5 12h14',
      'Share': 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13',
      'Lock': 'M3 11h18v11H3z M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M7 11V7a5 5 0 0 1 10 0v4',
      'Eye': 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      'Grid': 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
      'Layers': 'M12 2l8 4-8 4-8-4 8-4z M4 10l8 4 8-4 M4 14l8 4 8-4',
      'Zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      'Target': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
      'Award': 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
      'Shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      'Globe': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
      'Camera': 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'Calendar': 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
      'Clock': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
      'Map': 'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z M8 2v20 M16 6v20',
      'Phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      'Video': 'M23 7l-7 5 7 5V7z M1 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
      'Music': 'M9 18V5l12-2v13 M9 13l12-2',
      'Image': 'M3 3h18v18H3z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21',
      'File': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6',
      'Folder': 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
      'Archive': 'M21 8v13H3V8 M1 3h22v5H1z M10 12l2 2 2-2',
      'Database': 'M12 8a9 3 0 1 0 0-6 9 3 0 0 0 0 6z M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5',
      'Server': 'M2 2h20v8H2z M2 14h20v8H2z M6 6h.01 M6 18h.01',
      'Wifi': 'M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01',
      'Bluetooth': 'M6.5 6.5l11 11L12 23l-5.5-5.5L12 12l5.5-5.5L12 1l5.5 5.5-11 11',
      'Battery': 'M1 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z M23 13v-2',
      'Power': 'M12 2v10 M18.36 6.64a9 9 0 1 1-12.73 0',
      'Volume': 'M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14',
      'Mic': 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z m0 0a9 9 0 0 0 9 9v2a9 9 0 0 1-18 0v-2a9 9 0 0 0 9-9 M12 19v4'
    };
    
    return iconPaths[iconName] || iconPaths['Home'];
  };

  // FIXED: Proper SVG creation with real icon paths
  const createCorrectSVG = (iconName, settings) => {
    const { size, color, strokeWidth } = settings;
    const pathData = getIconSVGPaths(iconName);
    
    // Split multiple paths by 'M' and handle each separately
    const paths = pathData.split(' M').filter(p => p.trim()).map((p, index) => {
      return index === 0 ? p : 'M' + p;
    });
    
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${paths.map(path => `
        <path d="${path}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
      `).join('\n')}
    </svg>`;
  };

  // FIXED: Enhanced PNG creation from proper SVG
  const createPNGFromSVG = async (iconName, settings) => {
    const svgString = createCorrectSVG(iconName, settings);
    const { size } = settings;
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = size * 2; // Higher resolution
      canvas.height = size * 2;
      
      img.onload = () => {
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the SVG image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
      
      img.onerror = () => {
        console.log('Failed to load SVG, creating fallback PNG');
        // Fallback: create simple shape
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.strokeWidth * 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw a simple circle as fallback
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 3, 0, 2 * Math.PI);
        ctx.stroke();
        
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
      
      // Convert SVG to data URL
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.src = url;
      
      // Clean up after a delay
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    });
  };

  const exportIcon = async (format) => {
    console.log(`📤 Exporting ${selectedIcon} as ${format}`);
    setIsExporting(true);
    
    try {
      let content, filename, mimeType;
      
      if (format === 'SVG') {
        content = createCorrectSVG(selectedIcon, {
          size: iconSize,
          color: iconColor,
          strokeWidth: strokeWidth
        });
        filename = `${selectedIcon.toLowerCase()}-icon.svg`;
        mimeType = 'image/svg+xml';
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
      } else if (format === 'PNG') {
        const blob = await createPNGFromSVG(selectedIcon, {
          size: iconSize,
          color: iconColor,
          strokeWidth: strokeWidth
        });
        filename = `${selectedIcon.toLowerCase()}-icon.png`;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
      } else if (format === 'React') {
        content = `import React from 'react';
import { ${getIconComponent(selectedIcon).name} } from 'react-icons/fi';

const ${selectedIcon}Icon = ({ size = ${iconSize}, color = "${iconColor}", ...props }) => {
  return (
    <${getIconComponent(selectedIcon).name}
      size={size}
      color={color}
      strokeWidth={${strokeWidth}}
      {...props}
    />
  );
};

export default ${selectedIcon}Icon;`;
        filename = `${selectedIcon}Icon.jsx`;
        mimeType = 'text/javascript';
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      
      console.log(`✅ Exported successfully: ${filename}`);
      showSuccessNotification(
        `🎉 ${selectedIcon} exported as ${format}!`,
        `File: ${filename}\nColor: ${iconColor}\nSize: ${iconSize}px`
      );
      
    } catch (error) {
      console.error('❌ Export failed:', error);
      showErrorNotification(`Failed to export ${selectedIcon} as ${format}`);
    } finally {
      setIsExporting(false);
    }
  };

  const showSuccessNotification = (title, message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-6 right-6 z-[9999] transform translate-x-full transition-transform duration-500';
    notification.innerHTML = `
      <div class="bg-white/95 backdrop-blur-lg rounded-[1.5rem] p-8 shadow-neumorphic border border-green-200/50 max-w-sm">
        <div class="flex items-start space-x-6">
          <div class="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-[1rem] flex items-center justify-center shadow-neumorphic-sm">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-warm-800 text-xl mb-2">${title}</h4>
            <p class="text-warm-600 text-base whitespace-pre-line leading-relaxed">${message}</p>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="p-2 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-xl transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  };

  const showErrorNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-6 right-6 z-[9999] transform translate-x-full transition-transform duration-500';
    notification.innerHTML = `
      <div class="bg-white/95 backdrop-blur-lg rounded-[1.5rem] p-8 shadow-neumorphic border border-red-200/50 max-w-sm">
        <div class="flex items-start space-x-6">
          <div class="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-[1rem] flex items-center justify-center shadow-neumorphic-sm">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-warm-800 text-xl mb-2">Export Error</h4>
            <p class="text-warm-600 text-base">${message}</p>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="p-2 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-xl transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  };

  const resetSettings = () => {
    console.log('🔄 Resetting editor settings');
    setIconColor('#c84bff');
    setIconSize(48);
    setStrokeWidth(2);
    setBackgroundColor('#fefcfb');
    showSuccessNotification('🔄 Settings Reset', 'All settings have been reset to defaults');
  };

  const handleIconSelect = (iconName) => {
    console.log(`🎯 Icon selected: ${iconName}`);
    setSelectedIcon(iconName);
  };

  const handleGeneratedIconSelect = (icon) => {
    console.log(`🎯 Generated icon selected: ${icon.name}`);
    setSelectedIcon(icon.name);
    setIconColor(icon.color);
    setSelectedGeneratedIcon(icon);
    setActiveTab('library');
  };

  const handleFavoriteSelect = (favorite) => {
    console.log(`⭐ Favorite selected: ${favorite.name}`);
    setSelectedIcon(favorite.name);
    setIconColor(favorite.color);
    setIconSize(favorite.size);
    setStrokeWidth(favorite.strokeWidth);
    setBackgroundColor(favorite.backgroundColor);
    setActiveTab('library');
  };

  const handleColorChange = (color, source = 'picker') => {
    console.log(`🎨 Color changed: ${color} (${source})`);
    setIconColor(color);
  };

  const handleSizeChange = (size) => {
    console.log(`📏 Size changed: ${size}px`);
    setIconSize(size);
  };

  const handleStrokeChange = (stroke) => {
    console.log(`✏️ Stroke width changed: ${stroke}px`);
    setStrokeWidth(stroke);
  };

  const handleBackgroundChange = (bg) => {
    console.log(`🖼️ Background changed: ${bg}`);
    setBackgroundColor(bg);
  };

  const copyIconCode = () => {
    const code = `import React from 'react';
import { ${getIconComponent(selectedIcon).name} } from 'react-icons/fi';

const ${selectedIcon}Icon = ({ size = ${iconSize}, color = "${iconColor}", ...props }) => {
  return (
    <${getIconComponent(selectedIcon).name}
      size={size}
      color={color}
      strokeWidth={${strokeWidth}}
      {...props}
    />
  );
};

export default ${selectedIcon}Icon;`;
    
    navigator.clipboard.writeText(code);
    showSuccessNotification('📋 Code Copied!', 'React component code copied to clipboard');
  };

  const saveToFavorites = () => {
    const newFavorite = {
      id: `${selectedIcon}_${Date.now()}`,
      name: selectedIcon,
      color: iconColor,
      size: iconSize,
      strokeWidth,
      backgroundColor,
      timestamp: Date.now()
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('iconify_favorites', JSON.stringify(updatedFavorites));
    showSuccessNotification('⭐ Saved to Favorites!', `${selectedIcon} configuration saved`);
  };

  const removeFavorite = (favoriteId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('iconify_favorites', JSON.stringify(updatedFavorites));
    showSuccessNotification('🗑️ Removed from Favorites', 'Favorite configuration removed');
  };

  const tabs = [
    { id: 'library', label: 'Library', icon: FiGrid },
    { id: 'generated', label: 'AI Generated', icon: FiZap, badge: generatedIcons.length },
    { id: 'favorites', label: 'Favorites', icon: FiHeart, badge: favorites.length }
  ];

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-[1.5rem] flex items-center justify-center shadow-neumorphic mr-0 sm:mr-4 mb-4 sm:mb-0">
              <SafeIcon icon={FiEdit3} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-[1rem] border border-primary-200 shadow-neumorphic-sm">
              <span className="text-xs sm:text-sm font-bold text-primary-700">✨ Professional Editor</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-warm-800 mb-4 sm:mb-6">Professional Icon Editor</h1>
          <p className="text-base sm:text-xl text-warm-600 max-w-3xl mx-auto leading-relaxed px-4">
            Customize your icons with precision. Adjust colors, sizes, and styles to create the perfect icon for your project.
          </p>
        </motion.div>

        {/* MOBILE-OPTIMIZED LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">
          {/* LEFT COLUMN: Icon Selection - Mobile Responsive */}
          <div className="xl:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] p-4 sm:p-6 lg:p-8 shadow-neumorphic border border-white/60 h-full"
            >
              {/* Enhanced Tab Navigation - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-6 sm:mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-3 sm:px-5 py-3 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-neumorphic-inset'
                        : 'text-warm-600 hover:text-warm-800 hover:bg-warm-100 shadow-neumorphic-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={tab.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                      {tab.badge && tab.badge > 0 && (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeTab === tab.id
                            ? 'bg-white/20 text-white'
                            : 'bg-primary-100 text-primary-600'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Enhanced Tab Content - Mobile Responsive */}
              <AnimatePresence mode="wait">
                {activeTab === 'library' && (
                  <motion.div
                    key="library"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-warm-800">Icon Library</h3>
                      <span className="px-3 py-1 bg-warm-100 text-warm-600 rounded-lg text-sm font-medium">
                        {availableIcons.length}
                      </span>
                    </div>
                    
                    {/* FIXED: Mobile Responsive Icon Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 max-h-64 sm:max-h-96 overflow-y-auto pr-2">
                      {availableIcons.map((iconName) => (
                        <motion.button
                          key={iconName}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleIconSelect(iconName)}
                          className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 p-2 sm:p-3 ${
                            selectedIcon === iconName
                              ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-neumorphic-inset'
                              : 'bg-warm-100 text-warm-600 hover:bg-warm-200 shadow-neumorphic-sm hover:shadow-neumorphic'
                          }`}
                          title={`Select ${iconName} icon`}
                        >
                          <SafeIcon icon={getIconComponent(iconName)} className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'generated' && (
                  <motion.div
                    key="generated"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-warm-800">AI Generated</h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium">
                        {generatedIcons.length}
                      </span>
                    </div>
                    
                    {generatedIcons.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-h-64 sm:max-h-96 overflow-y-auto pr-2">
                        {generatedIcons.map((icon) => (
                          <motion.button
                            key={icon.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGeneratedIconSelect(icon)}
                            className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border-2 p-2 sm:p-3 ${
                              selectedGeneratedIcon?.id === icon.id
                                ? 'border-primary-400 bg-primary-50 shadow-neumorphic-inset'
                                : 'border-white/60 bg-white hover:border-primary-300 shadow-neumorphic-sm hover:shadow-neumorphic'
                            }`}
                            style={{
                              backgroundColor: selectedGeneratedIcon?.id === icon.id ? `${icon.color}15` : 'white'
                            }}
                          >
                            <SafeIcon
                              icon={getIconComponent(icon.name)}
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              style={{ color: icon.color }}
                            />
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12 flex-1 flex flex-col items-center justify-center">
                        <SafeIcon icon={FiZap} className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500 mx-auto mb-4" />
                        <p className="text-warm-600 text-base sm:text-lg font-medium">No AI generated icons yet</p>
                        <p className="text-warm-500 text-sm sm:text-base mt-2">Use the Generator to create some!</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'favorites' && (
                  <motion.div
                    key="favorites"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-warm-800">Favorites</h3>
                      <span className="px-3 py-1 bg-coral-100 text-coral-600 rounded-lg text-sm font-medium">
                        {favorites.length}
                      </span>
                    </div>
                    
                    {favorites.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-h-64 sm:max-h-96 overflow-y-auto pr-2">
                        {favorites.map((favorite) => (
                          <motion.div key={favorite.id} className="relative group">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleFavoriteSelect(favorite)}
                              className="w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border-2 border-white/60 bg-white hover:border-coral-300 shadow-neumorphic-sm hover:shadow-neumorphic p-2 sm:p-3"
                              style={{ backgroundColor: `${favorite.color}15` }}
                            >
                              <SafeIcon
                                icon={getIconComponent(favorite.name)}
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                style={{ color: favorite.color }}
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFavorite(favorite.id)}
                              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs shadow-neumorphic-sm"
                            >
                              ×
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12 flex-1 flex flex-col items-center justify-center">
                        <SafeIcon icon={FiHeart} className="w-12 h-12 sm:w-16 sm:h-16 text-coral-500 mx-auto mb-4" />
                        <p className="text-warm-600 text-base sm:text-lg font-medium">No favorites yet</p>
                        <p className="text-warm-500 text-sm sm:text-base mt-2">Save icons you love!</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* MIDDLE COLUMN: Preview - Mobile Responsive */}
          <div className="xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] p-4 sm:p-6 lg:p-8 shadow-neumorphic border border-white/60 h-full flex flex-col"
            >
              {/* Enhanced Header - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-warm-800 mb-4 sm:mb-0">Preview</h3>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveToFavorites}
                    className="p-3 bg-coral-100 text-coral-600 rounded-xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300"
                    title="Save to favorites"
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetSettings}
                    className="p-3 bg-warm-100 text-warm-600 rounded-xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300"
                    title="Reset settings"
                  >
                    <SafeIcon icon={FiRotateCcw} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Preview Area - Mobile Responsive */}
              <div 
                className="w-full h-48 sm:h-64 lg:h-80 rounded-[1.5rem] flex items-center justify-center shadow-neumorphic-inset mb-6 sm:mb-8 border-2 border-white/50 relative overflow-hidden"
                style={{ backgroundColor }}
              >
                <motion.div
                  key={`${selectedIcon}-${iconColor}-${iconSize}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <SafeIcon
                    icon={getIconComponent(selectedIcon)}
                    style={{
                      color: iconColor,
                      fontSize: `${iconSize * 1.2}px`,
                      strokeWidth: strokeWidth,
                      filter: `drop-shadow(0 ${iconSize/12}px ${iconSize/8}px rgba(0,0,0,0.1))`
                    }}
                  />
                </motion.div>
              </div>

              {/* Enhanced Icon Info - Mobile Responsive */}
              <div className="bg-gradient-to-r from-warm-50 to-primary-50 rounded-[1rem] p-4 sm:p-6 mb-6 sm:mb-8 border border-white/30">
                <h4 className="font-bold text-warm-800 mb-3 sm:mb-4 text-lg sm:text-xl">{selectedIcon} Icon</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-warm-700">Color:</span>
                    <div 
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border border-white shadow-sm"
                      style={{ backgroundColor: iconColor }}
                    ></div>
                    <span className="text-warm-600 font-mono text-xs sm:text-sm">{iconColor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-warm-700">Size:</span>
                    <span className="text-warm-600 ml-3">{iconSize}px</span>
                  </div>
                  <div>
                    <span className="font-semibold text-warm-700">Stroke:</span>
                    <span className="text-warm-600 ml-3">{strokeWidth}px</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-warm-700">Background:</span>
                    <div 
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg border border-white shadow-sm"
                      style={{ backgroundColor }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Export Buttons - Mobile Responsive */}
              <div className="space-y-3 sm:space-y-4 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => exportIcon('SVG')}
                  disabled={isExporting}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-[1rem] font-bold text-base sm:text-lg shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{isExporting ? 'Exporting...' : 'Export as SVG'}</span>
                </motion.button>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => exportIcon('PNG')}
                    disabled={isExporting}
                    className="py-2 sm:py-3 bg-white text-warm-600 rounded-xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200 disabled:opacity-50 text-sm sm:text-base"
                  >
                    PNG
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => exportIcon('React')}
                    disabled={isExporting}
                    className="py-2 sm:py-3 bg-white text-warm-600 rounded-xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200 disabled:opacity-50 text-sm sm:text-base"
                  >
                    React
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={copyIconCode}
                    className="py-2 sm:py-3 bg-white text-warm-600 rounded-xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200 flex items-center justify-center text-sm sm:text-base"
                  >
                    <SafeIcon icon={FiCopy} className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Controls - Mobile Responsive */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Enhanced Color Control - Mobile Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-4 sm:p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-base sm:text-lg font-bold text-warm-800 mb-4 sm:mb-5 flex items-center space-x-3">
                  <SafeIcon icon={FiPalette} className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  <span>Color</span>
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => handleColorChange(e.target.value, 'picker')}
                    className="w-full h-8 sm:h-10 rounded-lg shadow-neumorphic-inset cursor-pointer border border-white"
                  />
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {presetColors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleColorChange(color, 'preset')}
                        className={`aspect-square rounded-lg shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-200 border ${
                          iconColor === color ? 'border-primary-400 border-2' : 'border-white'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Size Control - Mobile Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-4 sm:p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-base sm:text-lg font-bold text-warm-800 mb-4 sm:mb-5 flex items-center space-x-3">
                  <SafeIcon icon={FiLayers} className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
                  <span>Size</span>
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="range"
                    min="24"
                    max="128"
                    value={iconSize}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-warm-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-secondary-500 to-warm-500 bg-clip-text text-transparent">
                      {iconSize}px
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {[24, 32, 48, 64].map(size => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                          iconSize === size
                            ? 'bg-secondary-100 text-secondary-700 shadow-neumorphic-inset'
                            : 'bg-warm-100 text-warm-600 hover:bg-warm-200 shadow-neumorphic-sm'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Stroke Width - Mobile Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-4 sm:p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-base sm:text-lg font-bold text-warm-800 mb-4 sm:mb-5">Stroke Width</h4>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.5"
                    value={strokeWidth}
                    onChange={(e) => handleStrokeChange(Number(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-warm-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-500 to-primary-500 bg-clip-text text-transparent">
                      {strokeWidth}px
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Background Color - Mobile Responsive */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-4 sm:p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-base sm:text-lg font-bold text-warm-800 mb-4 sm:mb-5">Background</h4>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => handleBackgroundChange(e.target.value)}
                    className="w-full h-8 sm:h-10 rounded-lg shadow-neumorphic-inset cursor-pointer border border-white"
                  />
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {backgroundPresets.map((bg) => (
                      <motion.button
                        key={bg}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBackgroundChange(bg)}
                        className={`aspect-square rounded-lg shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-200 border ${
                          backgroundColor === bg ? 'border-primary-400 border-2' : 'border-white'
                        }`}
                        style={{ backgroundColor: bg }}
                        title={bg}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconEditor;