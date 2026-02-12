import { useState, useCallback, useEffect } from "react";
import QuizLanding from "./QuizLanding";
import QuizQuestion from "./QuizQuestion";
import QuizEmailCapture from "./QuizEmailCapture";
import QuizLoading from "./QuizLoading";
import QuizResults from "./QuizResults";
import QuizFooter from "./QuizFooter";
import { 
  initializeTracking,
  trackQuizStart,
  trackQuizQuestion,
  trackEmailCapture,
  trackQuizComplete,
  trackCTAClick 
} from "@/utils/tracking";

const quizQuestions = [
  {
    question: "What's your biggest frustration right now?",
    options: [
      "I feel tired no matter how much I sleep",
      "My weight won't budge despite eating less",
      "I've lost motivation because nothing works",
      "I struggle with cravings I can't control",
    ],
  },
  {
    question: "How would you describe your daily energy levels?",
    options: [
      "I'm exhausted by midday and need coffee to function",
      "My energy crashes after meals",
      "I feel sluggish even after a full night's sleep",
      "I have some energy but it's inconsistent",
    ],
  },
  {
    question: "Have you tried diets or programs before?",
    options: [
      "Yes, many times — nothing seems to stick",
      "I've tried a few but always hit a plateau",
      "I've had some success but gained it all back",
      "This is my first serious attempt",
    ],
  },
  {
    question: "When do you tend to struggle the most?",
    options: [
      "Late-night snacking and cravings",
      "Portion control at meals",
      "Staying consistent with healthy habits",
      "Emotional eating when stressed",
    ],
  },
  {
    question: "What's your age range?",
    options: [
      "25-34",
      "35-44",
      "45-54",
      "55+",
    ],
  },
  {
    question: "How soon would you like to start seeing changes?",
    options: [
      "As soon as possible — I'm ready now",
      "Within the next few weeks",
      "I want lasting results, timing doesn't matter",
      "I just want to understand what's blocking me",
    ],
  },
];

type QuizState = "landing" | "questions" | "email" | "loading" | "results";

const Quiz = () => {
  const [quizState, setQuizState] = useState<QuizState>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    initializeTracking();
  }, []);

  const handleStart = () => {
    trackQuizStart();
    setQuizState("questions");
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    trackQuizQuestion(currentQuestion + 1, answer);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState("email");
    }
  };

  const handleEmailSubmit = async (email: string) => {
    console.log("📧 ========== EMAIL SUBMISSION STARTED ==========");
    console.log("📧 Email:", email);
    console.log("⏰ Timestamp:", new Date().toISOString());

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeMmavVuRpZW2Q_6f13imXJ25MYQXkFhqfjOLqvA39QynGY0A/formResponse";
    const ENTRY_ID = "entry.637616055";

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `${ENTRY_ID}=${encodeURIComponent(email)}`,
      });
      console.log("✅ STEP 1: Backup saved to Google Form");
    } catch (error) {
      console.error("❌ STEP 1 ERROR:", error);
    }

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxWhF_TxXWU1EkrZRmoJI-AjHMg4ZS3C8uRNWz3OHwTOVrSicH3o5mA9R0aX0_Xkg_fEQ/exec";

    try {
      const urlWithEmail = `${APPS_SCRIPT_URL}?email=${encodeURIComponent(email)}&timestamp=${Date.now()}`;
      
      console.log("📤 STEP 2: Sending to Apps Script...");
      console.log("🔗 URL:", urlWithEmail);
      
      const response = await fetch(urlWithEmail, {
        method: "GET",
        redirect: "follow"
      });

      console.log("📊 Response status:", response.status);
      console.log("📊 Response ok:", response.ok);

      if (response.ok) {
        try {
          const result = await response.json();
          console.log("✅ STEP 2: Email automation SUCCESS!");
          console.log("📋 Response data:", result);
          
          if (result.serverTracking) {
            console.log("📊 Server-side tracking:", result.serverTracking);
          }
        } catch (jsonError) {
          console.log("✅ STEP 2: Request sent (response not JSON, but that's OK)");
        }
      } else {
        console.warn("⚠️ STEP 2: Non-OK status, but request was sent");
        console.log("💡 Check Apps Script Executions log to verify");
      }
    } catch (error) {
      console.error("❌ STEP 2 ERROR:", error);
      
      try {
        const urlWithEmail = `${APPS_SCRIPT_URL}?email=${encodeURIComponent(email)}&timestamp=${Date.now()}`;
        await fetch(urlWithEmail, { 
          method: "GET",
          mode: "no-cors"
        });
        console.log("✅ STEP 2 FALLBACK: Sent with no-cors mode");
        console.log("💡 Check Apps Script Executions to confirm it worked");
      } catch (fallbackError) {
        console.error("❌ STEP 2 FALLBACK ERROR:", fallbackError);
      }
    }

    try {
      trackEmailCapture(email);
      console.log("✅ STEP 3: Facebook Pixel Lead event tracked");
    } catch (error) {
      console.error("❌ STEP 3 ERROR:", error);
    }

    console.log("✅ ========== ALL STEPS COMPLETE ==========");
    console.log("🎯 Proceeding to loading screen...");
    setQuizState("loading");
  };

  const handleLoadingComplete = useCallback(() => {
    trackQuizComplete("quiz_completed");
    setQuizState("results");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {quizState === "landing" && (
          <QuizLanding onStart={handleStart} />
        )}

        {quizState === "questions" && (
          <QuizQuestion
            question={quizQuestions[currentQuestion].question}
            options={quizQuestions[currentQuestion].options}
            currentStep={currentQuestion + 1}
            totalSteps={quizQuestions.length}
            onAnswer={handleAnswer}
          />
        )}

        {quizState === "email" && (
          <QuizEmailCapture onSubmit={handleEmailSubmit} />
        )}

        {quizState === "loading" && (
          <QuizLoading
            onComplete={handleLoadingComplete}
            duration={4000}
          />
        )}

        {quizState === "results" && (
          <QuizResults answers={answers} />
        )}
      </main>

      <QuizFooter />
    </div>
  );
};

export default Quiz;
