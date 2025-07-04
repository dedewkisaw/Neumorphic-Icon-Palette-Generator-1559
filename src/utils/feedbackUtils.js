import questConfig from '../config/questConfig';

export const initializeFeedbackUser = () => {
  // Generate or retrieve user ID for feedback tracking
  let userId = localStorage.getItem('feedbackUserId');
  
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('feedbackUserId', userId);
  }
  
  return userId;
};

export const trackFeedbackEvent = (eventType, eventData = {}) => {
  const userId = initializeFeedbackUser();
  
  const eventPayload = {
    userId,
    eventType,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...eventData
  };
  
  // Log event for debugging
  console.log('Feedback Event Tracked:', eventPayload);
  
  // You can send this to your analytics service
  // analytics.track(eventPayload);
  
  return eventPayload;
};

export const getFeedbackConfig = () => {
  return {
    ...questConfig,
    userId: initializeFeedbackUser(),
    theme: {
      primaryColor: questConfig.PRIMARY_COLOR,
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxShadow: '8px 8px 16px #e6d9cc, -8px -8px 16px #ffffff'
    }
  };
};