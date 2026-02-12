declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Facebook Pixel ID
const FB_PIXEL_ID = '878204665027235';

// ================= INITIALIZATION =================

export const initializeTracking = () => {
  if (typeof window === "undefined") return;
  
  if (window.fbq) {
    console.log("✅ Facebook Pixel loaded successfully");
    console.log("📊 Pixel ID:", FB_PIXEL_ID);
    console.log("🌐 Current URL:", window.location.href);
  } else {
    console.error("❌ Facebook Pixel NOT loaded!");
    console.error("🔍 Check index.html for pixel code");
  }
};

// ================= HELPER FUNCTIONS =================

const fireEvent = (event: string, params?: Record<string, any>, custom = false) => {
  if (typeof window === "undefined") {
    console.warn("⚠️ Server-side rendering detected, skipping event");
    return;
  }
  
  if (!window.fbq) {
    console.error("❌ Facebook Pixel not loaded - cannot track event:", event);
    return;
  }

  try {
    // Add enhanced parameters to all events
    const enhancedParams = {
      ...params,
      event_source_url: window.location.href,
      timestamp: Date.now()
    };

    if (custom) {
      window.fbq("trackCustom", event, enhancedParams);
      console.log("✅ Custom Event:", event);
    } else {
      window.fbq("track", event, enhancedParams);
      console.log("✅ Standard Event:", event);
    }
    
    console.log("   📋 Parameters:", enhancedParams);
  } catch (error) {
    console.error("❌ Error tracking event:", event, error);
  }
};

// ================= QUIZ EVENTS =================

export const trackQuizStart = () => {
  console.log("🎯 ========== QUIZ STARTED ==========");
  
  // Standard event
  fireEvent("ViewContent", {
    content_name: "Quiz Started",
    content_category: "Quiz",
    content_type: "quiz_funnel"
  });

  // Custom event for better segmentation
  fireEvent("QuizStarted", {
    quiz_name: "Metabolism Type Quiz",
    quiz_step: 0,
    total_steps: 6
  }, true);
};

export const trackQuizQuestion = (questionNumber: number, answer: string) => {
  console.log(`📝 Question ${questionNumber}/6 answered:`, answer);
  
  // Track progress
  fireEvent("ViewContent", { 
    content_name: `Quiz Question ${questionNumber}`,
    content_category: "Quiz",
    question_number: questionNumber,
    answer: answer,
    progress_percent: Math.round((questionNumber / 6) * 100)
  });

  // Custom event
  fireEvent("QuizProgress", {
    question_number: questionNumber,
    total_questions: 6,
    answer: answer,
    completion: `${questionNumber}/6`
  }, true);
};

export const trackEmailCapture = (email?: string) => {
  console.log("📧 ========== EMAIL CAPTURED ==========");
  console.log("📧 Email submitted:", email ? "Yes" : "Unknown");
  
  // CRITICAL: Lead event (Facebook's standard conversion)
  fireEvent("Lead", {
    content_name: "Quiz Email Capture",
    content_category: "Lead Generation",
    value: 15.00, // Estimated lead value
    currency: "USD",
    predicted_ltv: 147.00 // Potential customer lifetime value
  });

  // Custom event
  fireEvent("EmailCaptured", {
    email_captured: true,
    quiz_completed: true,
    source: "quiz_funnel"
  }, true);

  console.log("💰 Lead value tracked: $15");
};

export const trackQuizComplete = (resultType: string) => {
  console.log("✅ ========== QUIZ COMPLETED ==========");
  console.log("📊 Result type:", resultType);
  
  // CompleteRegistration = meaningful user action
  fireEvent("CompleteRegistration", { 
    content_name: "Quiz Completed",
    content_category: "Quiz",
    result_type: resultType,
    value: 0,
    currency: "USD",
    status: "completed"
  });

  // Custom event
  fireEvent("QuizCompleted", {
    result_type: resultType,
    completion_time: Date.now(),
    funnel_stage: "results_shown"
  }, true);
};

export const trackCTAClick = (ctaLocation?: string) => {
  console.log("🎯 ========== CTA CLICKED ==========");
  console.log("📍 Location:", ctaLocation || "results_page");
  
  // InitiateCheckout = purchase intent
  fireEvent("InitiateCheckout", { 
    content_name: "Affiliate Link Click",
    content_category: "Purchase Intent",
    value: 49.00, // Discounted price
    currency: "USD",
    num_items: 1,
    cta_location: ctaLocation || "results_page"
  });

  // Custom event
  fireEvent("AffiliateLinkClicked", {
    destination: "ClickBank",
    product: "CitrusBurn",
    discount: "67%",
    original_price: 147,
    discounted_price: 49,
    cta_location: ctaLocation
  }, true);

  console.log("💰 Purchase intent tracked: $49");
};

// ================= ADVANCED TRACKING =================

// Track scroll depth on results page
export const trackResultsScroll = (depth: number) => {
  if (depth === 25 || depth === 50 || depth === 75 || depth === 100) {
    console.log(`📊 Scroll depth: ${depth}%`);
    
    fireEvent("ViewContent", {
      content_name: `Results Scroll ${depth}%`,
      scroll_depth: depth,
      page: "results"
    });
  }
};

// Track time spent on page
export const trackTimeOnPage = (seconds: number) => {
  if (seconds === 30 || seconds === 60 || seconds === 120) {
    console.log(`⏱️ Time on page: ${seconds}s`);
    
    fireEvent("ViewContent", {
      content_name: "Time on Page",
      time_spent: seconds,
      engagement_level: seconds >= 120 ? "high" : seconds >= 60 ? "medium" : "low"
    });
  }
};

// Track abandonment
export const trackAbandon = (stage: string) => {
  console.log("⚠️ User abandoned at:", stage);
  
  fireEvent("QuizAbandoned", {
    abandon_stage: stage,
    abandon_time: Date.now()
  }, true);
};

// ================= ENHANCED MATCHING =================

// Get enhanced matching data for server-side API
export const getEnhancedMatchingData = () => {
  if (typeof window === "undefined") return null;
  
  return {
    user_agent: navigator.userAgent,
    fbp: getCookie('_fbp'), // Facebook browser ID
    fbc: getCookie('_fbc'), // Facebook click ID
    client_user_agent: navigator.userAgent,
    url: window.location.href
  };
};

// Helper to get cookies
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

// ================= DEBUGGING =================

export const getPixelStatus = () => {
  if (typeof window === "undefined") {
    return { 
      loaded: false, 
      reason: "Server-side rendering" 
    };
  }
  
  return {
    loaded: !!window.fbq,
    pixelId: FB_PIXEL_ID,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
};

// Auto-check pixel status on load
if (typeof window !== "undefined") {
  setTimeout(() => {
    const status = getPixelStatus();
    console.log("🔍 ========== PIXEL STATUS CHECK ==========");
    console.log("📊 Status:", status);
    
    if (status.loaded) {
      console.log("✅ Pixel is ready to track events");
    } else {
      console.error("❌ Pixel not loaded - tracking will not work!");
    }
  }, 1000);
}