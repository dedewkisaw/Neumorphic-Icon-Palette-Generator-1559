// Real SVG Icon Generator with Neumorphic Styles
export class IconGenerator {
  constructor() {
    this.iconTemplates = {
      home: {
        viewBox: "0 0 24 24",
        paths: [
          "M3 9.5L12 2l9 7.5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11z",
          "M9 22V12h6v10"
        ]
      },
      search: {
        viewBox: "0 0 24 24",
        paths: [
          "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
          "m21 21-4.35-4.35"
        ]
      },
      user: {
        viewBox: "0 0 24 24",
        paths: [
          "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
          "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
        ]
      },
      settings: {
        viewBox: "0 0 24 24",
        paths: [
          "M12.22 2l-.44.1a9.94 9.94 0 0 0-7.75 7.75L4 10.22v3.56l.03.44a9.94 9.94 0 0 0 7.75 7.75L12.22 22h-.44l.44-.03a9.94 9.94 0 0 0 7.75-7.75L20 13.78v-3.56l-.03-.44a9.94 9.94 0 0 0-7.75-7.75L11.78 2h.44z",
          "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
        ]
      },
      heart: {
        viewBox: "0 0 24 24",
        paths: [
          "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        ]
      },
      star: {
        viewBox: "0 0 24 24",
        paths: [
          "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        ]
      },
      mail: {
        viewBox: "0 0 24 24",
        paths: [
          "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
          "m22 6-10 7L2 6"
        ]
      },
      bell: {
        viewBox: "0 0 24 24",
        paths: [
          "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
          "M13.73 21a2 2 0 0 1-3.46 0"
        ]
      },
      download: {
        viewBox: "0 0 24 24",
        paths: [
          "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
          "M7 10l5 5 5-5",
          "M12 15V3"
        ]
      },
      upload: {
        viewBox: "0 0 24 24",
        paths: [
          "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
          "M17 8l-5-5-5 5",
          "M12 3v12"
        ]
      },
      edit: {
        viewBox: "0 0 24 24",
        paths: [
          "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
          "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ]
      },
      trash: {
        viewBox: "0 0 24 24",
        paths: [
          "M3 6h18",
          "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
          "M10 11v6",
          "M14 11v6"
        ]
      },
      plus: {
        viewBox: "0 0 24 24",
        paths: [
          "M12 5v14",
          "M5 12h14"
        ]
      }
    };
  }

  generateSVG(iconName, options = {}) {
    const {
      size = 24,
      color = '#6366f1',
      strokeWidth = 2,
      style = 'outline',
      backgroundColor = 'transparent',
      neumorphic = true
    } = options;

    const template = this.iconTemplates[iconName.toLowerCase()];
    if (!template) {
      return this.generateFallbackIcon(iconName, options);
    }

    const gradientId = `gradient-${iconName}-${Date.now()}`;
    const shadowId = `shadow-${iconName}-${Date.now()}`;

    let svgContent = `
      <svg width="${size}" height="${size}" viewBox="${template.viewBox}" xmlns="http://www.w3.org/2000/svg">
        <defs>
    `;

    // Add neumorphic gradient and shadow effects
    if (neumorphic) {
      svgContent += `
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${this.lightenColor(color, 20)};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
          </linearGradient>
          <filter id="${shadowId}" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offset"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
      `;
    }

    svgContent += `
        </defs>
    `;

    // Add background if specified
    if (backgroundColor !== 'transparent') {
      svgContent += `
        <rect width="100%" height="100%" fill="${backgroundColor}" rx="4"/>
      `;
    }

    // Generate paths based on style
    template.paths.forEach((path, index) => {
      if (style === 'filled') {
        svgContent += `
          <path d="${path}" 
                fill="${neumorphic ? `url(#${gradientId})` : color}" 
                stroke="none"
                ${neumorphic ? `filter="url(#${shadowId})"` : ''}/>
        `;
      } else {
        svgContent += `
          <path d="${path}" 
                fill="none" 
                stroke="${neumorphic ? `url(#${gradientId})` : color}" 
                stroke-width="${strokeWidth}" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                ${neumorphic ? `filter="url(#${shadowId})"` : ''}/>
        `;
      }
    });

    svgContent += `
      </svg>
    `;

    return svgContent;
  }

  generateFallbackIcon(iconName, options) {
    const { size = 24, color = '#6366f1', backgroundColor = 'transparent' } = options;
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" rx="4"/>
        <circle cx="12" cy="12" r="8" fill="none" stroke="${color}" stroke-width="2"/>
        <text x="12" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="${color}">
          ${iconName.charAt(0).toUpperCase()}
        </text>
      </svg>
    `;
  }

  lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }

  getAvailableIcons() {
    return Object.keys(this.iconTemplates);
  }
}

export default new IconGenerator();