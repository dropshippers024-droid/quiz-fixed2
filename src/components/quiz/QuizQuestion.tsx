import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: string;
  options: string[];
  currentStep: number;
  totalSteps: number;
  onAnswer: (answer: string) => void;
}

const QuizQuestion = ({
  question,
  options,
  currentStep,
  totalSteps,
  onAnswer,
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (option: string) => {
    if (isAnimating) return;
    
    setSelectedOption(option);
    setIsAnimating(true);
    
    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null);
      setIsAnimating(false);
    }, 400);
  };

  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="quiz-container px-5 py-8 md:py-12">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Progress */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="quiz-card">
          <h2 className="text-lg md:text-2xl font-semibold mb-5 md:mb-6 text-center leading-relaxed">
            {question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={cn(
                  "quiz-option text-sm md:text-base",
                  selectedOption === option && "quiz-option-selected"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    "w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors",
                    selectedOption === option 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : "border-muted-foreground/30"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-left">{option}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
