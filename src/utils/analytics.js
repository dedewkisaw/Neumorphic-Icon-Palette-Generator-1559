// Comprehensive User Activity Tracking System
class UserActivityTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.startTime = Date.now();
    this.events = [];
    this.pageViews = [];
    this.interactions = [];
    this.isTracking = true;
    
    // Initialize tracking
    this.initializeTracking();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getUserId() {
    let userId = localStorage.getItem('iconify_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('iconify_user_id', userId);
    }
    return userId;
  }

  initializeTracking() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('page_visibility_change', {
        hidden: document.hidden,
        timestamp: Date.now()
      });
    });

    // Track window focus/blur
    window.addEventListener('focus', () => {
      this.trackEvent('window_focus', { timestamp: Date.now() });
    });

    window.addEventListener('blur', () => {
      this.trackEvent('window_blur', { timestamp: Date.now() });
    });

    // Track scroll behavior
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackEvent('scroll', {
          scrollY: window.scrollY,
          scrollPercent: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
          timestamp: Date.now()
        });
      }, 100);
    });

    // Track mouse movement patterns (throttled)
    let mouseTimeout;
    document.addEventListener('mousemove', (e) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        this.trackInteraction('mouse_movement', {
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      }, 500);
    });

    // Track clicks
    document.addEventListener('click', (e) => {
      this.trackClick(e);
    });

    // Track form interactions
    document.addEventListener('input', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.trackFormInteraction(e);
      }
    });

    // Track keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) {
        this.trackKeyboardShortcut(e);
      }
    });

    // Track session duration
    setInterval(() => {
      this.updateSessionDuration();
    }, 30000); // Every 30 seconds

    // Send data periodically
    setInterval(() => {
      this.flushData();
    }, 60000); // Every minute
  }

  // Core tracking methods
  trackEvent(eventName, data = {}) {
    if (!this.isTracking) return;

    const event = {
      id: this.generateEventId(),
      sessionId: this.sessionId,
      userId: this.userId,
      eventName,
      timestamp: Date.now(),
      url: window.location.href,
      path: window.location.hash,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      ...data
    };

    this.events.push(event);
    this.logEvent(event);
  }

  trackPageView(page, additionalData = {}) {
    const pageView = {
      id: this.generateEventId(),
      sessionId: this.sessionId,
      userId: this.userId,
      type: 'page_view',
      page,
      timestamp: Date.now(),
      url: window.location.href,
      path: window.location.hash,
      referrer: document.referrer,
      ...additionalData
    };

    this.pageViews.push(pageView);
    this.trackEvent('page_view', pageView);
  }

  trackInteraction(type, data = {}) {
    if (!this.isTracking) return;

    const interaction = {
      id: this.generateEventId(),
      sessionId: this.sessionId,
      userId: this.userId,
      type,
      timestamp: Date.now(),
      ...data
    };

    this.interactions.push(interaction);
  }

  // Specific tracking methods
  trackClick(event) {
    const target = event.target;
    const clickData = {
      tagName: target.tagName,
      className: target.className,
      id: target.id,
      text: target.textContent?.slice(0, 100),
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now()
    };

    // Identify specific UI elements
    if (target.closest('button')) {
      clickData.elementType = 'button';
      clickData.buttonText = target.closest('button').textContent?.slice(0, 50);
    } else if (target.closest('a')) {
      clickData.elementType = 'link';
      clickData.href = target.closest('a').href;
    } else if (target.closest('.icon-preview')) {
      clickData.elementType = 'icon';
      clickData.iconName = target.dataset.iconName;
    }

    this.trackEvent('click', clickData);
  }

  trackFormInteraction(event) {
    const target = event.target;
    const formData = {
      inputType: target.type,
      inputName: target.name,
      inputId: target.id,
      valueLength: target.value?.length || 0,
      timestamp: Date.now()
    };

    this.trackEvent('form_interaction', formData);
  }

  trackKeyboardShortcut(event) {
    const shortcut = {
      key: event.key,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      timestamp: Date.now()
    };

    this.trackEvent('keyboard_shortcut', shortcut);
  }

  // Feature-specific tracking
  trackIconGeneration(data) {
    this.trackEvent('icon_generation_started', {
      keyword: data.keyword,
      style: data.style,
      hasUploadedImage: !!data.uploadedImage,
      timestamp: Date.now()
    });
  }

  trackIconGenerationComplete(data) {
    this.trackEvent('icon_generation_completed', {
      iconsGenerated: data.iconsGenerated,
      generationTime: data.generationTime,
      success: data.success,
      timestamp: Date.now()
    });
  }

  trackIconSelection(iconData) {
    this.trackEvent('icon_selected', {
      iconName: iconData.name,
      iconColor: iconData.color,
      iconStyle: iconData.style,
      selectionMethod: iconData.selectionMethod, // click, keyboard, etc.
      timestamp: Date.now()
    });
  }

  trackIconCustomization(customizationData) {
    this.trackEvent('icon_customization', {
      iconName: customizationData.iconName,
      changes: customizationData.changes,
      finalSettings: customizationData.finalSettings,
      timestamp: Date.now()
    });
  }

  trackIconDownload(downloadData) {
    this.trackEvent('icon_download', {
      iconName: downloadData.iconName,
      format: downloadData.format, // SVG, PNG, React
      size: downloadData.size,
      color: downloadData.color,
      downloadMethod: downloadData.method, // single, bulk
      timestamp: Date.now()
    });
  }

  trackPaletteGeneration(paletteData) {
    this.trackEvent('palette_generation', {
      keyword: paletteData.keyword,
      style: paletteData.style,
      palettesGenerated: paletteData.palettesGenerated,
      timestamp: Date.now()
    });
  }

  trackCommunityInteraction(interactionData) {
    this.trackEvent('community_interaction', {
      action: interactionData.action, // like, download, share, view
      paletteId: interactionData.paletteId,
      paletteName: interactionData.paletteName,
      author: interactionData.author,
      timestamp: Date.now()
    });
  }

  trackEditorUsage(editorData) {
    this.trackEvent('editor_usage', {
      tool: editorData.tool,
      action: editorData.action,
      iconName: editorData.iconName,
      settings: editorData.settings,
      sessionDuration: editorData.sessionDuration,
      timestamp: Date.now()
    });
  }

  trackSearchBehavior(searchData) {
    this.trackEvent('search_behavior', {
      query: searchData.query,
      results: searchData.results,
      filters: searchData.filters,
      resultClicked: searchData.resultClicked,
      timestamp: Date.now()
    });
  }

  trackErrorOccurrence(errorData) {
    this.trackEvent('error_occurred', {
      errorType: errorData.type,
      errorMessage: errorData.message,
      errorStack: errorData.stack,
      userAction: errorData.userAction,
      timestamp: Date.now()
    });
  }

  trackPerformanceMetric(metricData) {
    this.trackEvent('performance_metric', {
      metric: metricData.metric,
      value: metricData.value,
      context: metricData.context,
      timestamp: Date.now()
    });
  }

  // User journey tracking
  trackUserJourney(step, data = {}) {
    this.trackEvent('user_journey', {
      step,
      journeyStage: this.getCurrentJourneyStage(),
      ...data,
      timestamp: Date.now()
    });
  }

  getCurrentJourneyStage() {
    const path = window.location.hash;
    if (path === '#/' || path === '') return 'landing';
    if (path.includes('/creator')) return 'creation';
    if (path.includes('/editor')) return 'editing';
    if (path.includes('/community')) return 'discovery';
    if (path.includes('/about')) return 'learning';
    return 'other';
  }

  // Session management
  updateSessionDuration() {
    const duration = Date.now() - this.startTime;
    this.trackEvent('session_heartbeat', {
      sessionDuration: duration,
      eventsCount: this.events.length,
      interactionsCount: this.interactions.length,
      timestamp: Date.now()
    });
  }

  // Engagement metrics
  trackEngagementMetrics() {
    const metrics = {
      sessionDuration: Date.now() - this.startTime,
      totalEvents: this.events.length,
      totalInteractions: this.interactions.length,
      pageViews: this.pageViews.length,
      uniquePages: [...new Set(this.pageViews.map(pv => pv.page))].length,
      clickEvents: this.events.filter(e => e.eventName === 'click').length,
      formInteractions: this.events.filter(e => e.eventName === 'form_interaction').length,
      timestamp: Date.now()
    };

    this.trackEvent('engagement_metrics', metrics);
    return metrics;
  }

  // Feature usage analytics
  trackFeatureUsage(feature, action, data = {}) {
    this.trackEvent('feature_usage', {
      feature,
      action,
      ...data,
      timestamp: Date.now()
    });
  }

  // A/B testing support
  trackExperiment(experimentName, variant, data = {}) {
    this.trackEvent('experiment_exposure', {
      experimentName,
      variant,
      ...data,
      timestamp: Date.now()
    });
  }

  // Conversion tracking
  trackConversion(conversionType, data = {}) {
    this.trackEvent('conversion', {
      conversionType,
      conversionValue: data.value || 1,
      conversionPath: this.getConversionPath(),
      ...data,
      timestamp: Date.now()
    });
  }

  getConversionPath() {
    return this.pageViews.map(pv => pv.page).join(' -> ');
  }

  // Data management
  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  logEvent(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }

  flushData() {
    if (this.events.length === 0) return;

    const payload = {
      sessionId: this.sessionId,
      userId: this.userId,
      events: this.events.splice(0), // Clear events array
      interactions: this.interactions.splice(0), // Clear interactions array
      pageViews: this.pageViews,
      sessionInfo: {
        startTime: this.startTime,
        duration: Date.now() - this.startTime,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      timestamp: Date.now()
    };

    // Send to analytics service (replace with your actual endpoint)
    this.sendToAnalyticsService(payload);
  }

  async sendToAnalyticsService(payload) {
    try {
      // Store locally for now (replace with actual API call)
      const existingData = JSON.parse(localStorage.getItem('iconify_analytics') || '[]');
      existingData.push(payload);
      
      // Keep only last 100 sessions
      if (existingData.length > 100) {
        existingData.splice(0, existingData.length - 100);
      }
      
      localStorage.setItem('iconify_analytics', JSON.stringify(existingData));

      // In production, send to your analytics service:
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });

      console.log('📊 Analytics data sent:', payload);
    } catch (error) {
      console.error('❌ Failed to send analytics data:', error);
    }
  }

  // Privacy controls
  enableTracking() {
    this.isTracking = true;
    localStorage.setItem('iconify_tracking_enabled', 'true');
  }

  disableTracking() {
    this.isTracking = false;
    localStorage.setItem('iconify_tracking_enabled', 'false');
  }

  isTrackingEnabled() {
    const stored = localStorage.getItem('iconify_tracking_enabled');
    return stored !== 'false'; // Default to enabled
  }

  // GDPR compliance
  getStoredData() {
    return {
      userId: this.userId,
      sessionId: this.sessionId,
      events: this.events,
      interactions: this.interactions,
      pageViews: this.pageViews,
      analyticsData: JSON.parse(localStorage.getItem('iconify_analytics') || '[]')
    };
  }

  deleteUserData() {
    localStorage.removeItem('iconify_user_id');
    localStorage.removeItem('iconify_analytics');
    localStorage.removeItem('iconify_tracking_enabled');
    this.events = [];
    this.interactions = [];
    this.pageViews = [];
  }

  exportUserData() {
    const data = this.getStoredData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iconify-user-data-${this.userId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Create global instance
const analytics = new UserActivityTracker();

// Export convenience methods
export const trackEvent = (eventName, data) => analytics.trackEvent(eventName, data);
export const trackPageView = (page, data) => analytics.trackPageView(page, data);
export const trackIconGeneration = (data) => analytics.trackIconGeneration(data);
export const trackIconGenerationComplete = (data) => analytics.trackIconGenerationComplete(data);
export const trackIconSelection = (data) => analytics.trackIconSelection(data);
export const trackIconCustomization = (data) => analytics.trackIconCustomization(data);
export const trackIconDownload = (data) => analytics.trackIconDownload(data);
export const trackPaletteGeneration = (data) => analytics.trackPaletteGeneration(data);
export const trackCommunityInteraction = (data) => analytics.trackCommunityInteraction(data);
export const trackEditorUsage = (data) => analytics.trackEditorUsage(data);
export const trackSearchBehavior = (data) => analytics.trackSearchBehavior(data);
export const trackErrorOccurrence = (data) => analytics.trackErrorOccurrence(data);
export const trackPerformanceMetric = (data) => analytics.trackPerformanceMetric(data);
export const trackUserJourney = (step, data) => analytics.trackUserJourney(step, data);
export const trackEngagementMetrics = () => analytics.trackEngagementMetrics();
export const trackFeatureUsage = (feature, action, data) => analytics.trackFeatureUsage(feature, action, data);
export const trackExperiment = (name, variant, data) => analytics.trackExperiment(name, variant, data);
export const trackConversion = (type, data) => analytics.trackConversion(type, data);

export default analytics;