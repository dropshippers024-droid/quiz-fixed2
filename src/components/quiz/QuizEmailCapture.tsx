import { useState } from "react";
import { ArrowRight, Shield, Lock } from "lucide-react";

interface QuizEmailCaptureProps {
  onSubmit: (email: string) => void;
}

const QuizEmailCapture = ({ onSubmit }: QuizEmailCaptureProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email);
    }
  };

  return (
    <div className="quiz-container px-5 py-8 md:py-12">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Premium Value Badge */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-5 md:mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Personalized Analysis Ready
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Your Free Personalized Recommendation
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed px-2 mb-6">
            Based on your responses, we've created a custom analysis tailored to your specific situation. 
            Get your detailed breakdown and actionable next steps—completely free.
          </p>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
            <div className="bg-primary/5 rounded-lg p-3 md:p-4">
              <p className="font-semibold text-sm md:text-base text-foreground">Personalized Plan</p>
              <p className="text-xs md:text-sm text-muted-foreground">Built for your profile</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 md:p-4">
              <p className="font-semibold text-sm md:text-base text-foreground">Expert Analysis</p>
              <p className="text-xs md:text-sm text-muted-foreground">Instant breakdown</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 md:p-4">
              <p className="font-semibold text-sm md:text-base text-foreground">Actionable Steps</p>
              <p className="text-xs md:text-sm text-muted-foreground">Start immediately</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 md:p-4">
              <p className="font-semibold text-sm md:text-base text-foreground">100% Free</p>
              <p className="text-xs md:text-sm text-muted-foreground">No commitment</p>
            </div>
          </div>
        </div>

        {/* Email Capture Card */}
        <div className="quiz-card">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-semibold mb-2 md:mb-3">
                Enter your email to get instant access:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3.5 md:py-4 rounded-xl border border-border bg-background 
                         focus:outline-none focus:ring-2 focus:ring-primary/50 
                         transition-all duration-200 text-base"
              />
            </div>

            <button
              type="submit"
              className="cta-button flex items-center justify-center gap-2 text-base md:text-lg"
            >
              Get My Free Recommendation
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-muted-foreground text-center">
              ✓ No credit card required • Takes 10 seconds
            </p>
          </form>

          {/* Trust & Security indicators */}
          <div className="flex flex-col gap-3 mt-6 md:mt-7 pt-6 md:pt-7 border-t border-border space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Privacy guaranteed – No spam, ever</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Your data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEmailCapture;
