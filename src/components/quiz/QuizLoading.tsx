import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

interface QuizLoadingProps {
  message?: string;
  onComplete?: () => void;
  duration?: number;
}

const loadingMessages = [
  "Analyzing your responses...",
  "Calculating your metabolic profile...",
  "Generating personalized insights...",
  "Preparing your results...",
];

const QuizLoading = ({ 
  message, 
  onComplete, 
  duration = 3000 
}: QuizLoadingProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => 
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, duration / loadingMessages.length);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    const completeTimeout = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [duration, onComplete]);

  return (
    <div className="quiz-container">
      <div className="w-full max-w-md text-center px-6">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Flame className="w-12 h-12 text-primary animate-pulse" />
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-lg font-medium text-foreground mb-6 min-h-[28px] transition-all duration-300">
          {message || loadingMessages[currentMessageIndex]}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {progress}% complete
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizLoading;
