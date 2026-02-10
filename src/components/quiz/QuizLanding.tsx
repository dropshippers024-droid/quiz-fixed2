import { Flame, Check } from "lucide-react";

interface QuizLandingProps {
  onStart: () => void;
}

const QuizLanding = ({ onStart }: QuizLandingProps) => {
  return (
    <div className="quiz-container px-5 py-10 md:py-12">
      <div className="w-full max-w-xl text-center animate-fade-in">
        {/* Trust indicator */}
        <p className="text-muted-foreground text-sm mb-6 md:mb-8 flex items-center justify-center gap-2">
          <span className="text-primary">✦</span>
          Trusted by 127,000+ Users
        </p>

        {/* Icon */}
        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Flame className="w-10 h-10 md:w-12 md:h-12 text-primary" />
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 leading-tight px-2">
          Why Women Over 40 Can't Lose Weight{" "}
          <span className="text-primary">(Even Eating 1,200 Calories)</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-md mx-auto leading-relaxed px-2">
          Take this 60-second quiz to discover if you have "thermogenic resistance" 
          — the hidden condition blocking 67% of women from burning fat.
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="cta-button max-w-sm mx-auto animate-pulse-glow"
        >
          Take the Free Quiz
        </button>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mt-6 md:mt-8">
          <span className="trust-badge">
            <Check className="w-4 h-4 text-primary" />
            Takes 60 seconds
          </span>
          <span className="trust-badge">
            <Check className="w-4 h-4 text-primary" />
            100% Free
          </span>
          <span className="trust-badge">
            <Check className="w-4 h-4 text-primary" />
            Personalized Results
          </span>
        </div>

        {/* Social Proof Testimonials */}
        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-5 text-center">
            What people are discovering:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm mb-2 leading-relaxed">"This quiz explained everything my doctor couldn't!"</p>
              <p className="text-xs text-muted-foreground">- Sarah M., 47</p>
              <div className="text-primary text-sm mt-2">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm mb-2 leading-relaxed">"Finally understand why nothing was working."</p>
              <p className="text-xs text-muted-foreground">- Jennifer L., 52</p>
              <div className="text-primary text-sm mt-2">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm mb-2 leading-relaxed">"Wish I'd taken this quiz years ago!"</p>
              <p className="text-xs text-muted-foreground">- Maria R., 44</p>
              <div className="text-primary text-sm mt-2">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizLanding;
