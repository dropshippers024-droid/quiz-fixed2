declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Facebook Pixel is now loaded directly in index.html
// This file handles event tracking

export const initializeTracking = () => {
  // Verify pixel is loaded
  if (typeof window !== "undefined" && window.fbq) {
    console.log("✅ Facebook Pixel detected and ready");
  } else {
    console.warn("⚠️ Facebook Pixel not detected - check index.html");
  }
};

// ================= EVENTS =================

const fireEvent = (event: string, params?: Record<string, any>, custom = false) => {
  if (typeof window === "undefined") return;
  
  if (!window.fbq) {
    console.warn("❌ Facebook Pixel not loaded yet");
    return;
  }

  try {
    if (custom) {
      window.fbq("trackCustom", event, params);
    } else {
      window.fbq("track", event, params);
    }
    console.log("✅ Event Tracked:", event, params);
  } catch (error) {
    console.error("❌ Error tracking event:", error);
  }
};

export const trackQuizStart = () => {
  fireEvent("ViewContent");
};

export const trackQuizQuestion = (questionNumber: number, answer: string) => {
  fireEvent("ViewContent", { 
    content_name: "Quiz Question",
    question_number: questionNumber,
    answer: answer
  });
};

export const trackEmailCapture = () => {
  fireEvent("Lead");
};

export const trackQuizComplete = (resultType: string) => {
  fireEvent("CompleteRegistration", { 
    result_type: resultType,
    value: 0,
    currency: "USD"
  });
};

export const trackCTAClick = () => {
  fireEvent("InitiateCheckout", { 
    value: 49,
    currency: "USD",
    content_name: "Affiliate Link"
  });
};
