import { useState, useEffect } from "react";
import { Flame, Zap, CheckCircle, ArrowRight, Lock, TrendingUp, Clock, Target } from "lucide-react";
import { trackCTAClick } from "@/utils/tracking";

interface QuizResultsProps {
  answers: string[];
}

const AFFILIATE_LINK = "https://5e382htdocns9uf2yryi-32gue.hop.clickbank.net";

const QuizResults = ({ answers }: QuizResultsProps) => {
  // Countdown timer for urgency (15 minutes)
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Enhanced personalization based on all answers
  const getProfile = () => {
    const frustrationAnswer = answers[0] || "";
    const energyAnswer = answers[1] || "";
    const triedBefore = answers[2] || "";
    const struggleAnswer = answers[3] || "";
    const ageAnswer = answers[4] || "";
    const urgencyAnswer = answers[5] || "";

    // Calculate resistance level based on multiple factors
    let resistanceScore = 0;
    
    // Frustration scoring
    if (frustrationAnswer.includes("tired")) resistanceScore += 3;
    if (frustrationAnswer.includes("won't budge")) resistanceScore += 3;
    if (frustrationAnswer.includes("lost motivation")) resistanceScore += 2;
    if (frustrationAnswer.includes("cravings")) resistanceScore += 2;
    
    // Energy scoring
    if (energyAnswer.includes("exhausted")) resistanceScore += 3;
    if (energyAnswer.includes("crashes")) resistanceScore += 2;
    if (energyAnswer.includes("sluggish")) resistanceScore += 2;
    
    // Past attempts scoring
    if (triedBefore.includes("many times")) resistanceScore += 3;
    if (triedBefore.includes("plateau")) resistanceScore += 2;
    if (triedBefore.includes("gained it all back")) resistanceScore += 2;
    
    // Struggle patterns
    if (struggleAnswer.includes("Late-night")) resistanceScore += 2;
    if (struggleAnswer.includes("Emotional eating")) resistanceScore += 3;
    
    // Age factor
    if (ageAnswer.includes("45-54") || ageAnswer.includes("55+")) resistanceScore += 2;

    // Determine profile based on score
    if (resistanceScore >= 10) {
      return {
        type: "High Metabolic Resistance",
        severity: "high",
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        score: "87%",
        description: "Your quiz responses indicate significant metabolic resistance. Your body has likely adapted to traditional weight loss methods, making them less effective. This explains why dieting alone hasn't worked for you.",
        keyIssues: [
          frustrationAnswer.includes("tired") ? "Chronic fatigue affecting daily energy" : "Metabolic slowdown affecting fat burning",
          triedBefore.includes("many times") ? "Yo-yo dieting has slowed your metabolism" : "Past attempts have created metabolic adaptation",
          struggleAnswer.includes("Emotional") ? "Stress-related eating patterns" : "Hormonal imbalances affecting hunger signals",
        ],
        urgentMessage: "Based on your profile, addressing this now is important before metabolic resistance increases further.",
      };
    } else if (resistanceScore >= 5) {
      return {
        type: "Moderate Metabolic Resistance",
        severity: "moderate",
        color: "text-primary",
        bgColor: "bg-primary/10",
        score: "72%",
        description: "Your metabolic function shows signs of resistance that may be blocking your progress. The good news is that your profile suggests you're at an optimal point to make changes before it becomes more challenging.",
        keyIssues: [
          energyAnswer.includes("crashes") ? "Energy fluctuations throughout the day" : "Inconsistent energy levels",
          "Metabolic efficiency needs optimization",
          struggleAnswer.includes("Portion") ? "Difficulty with portion awareness" : "Inconsistent eating patterns",
        ],
        urgentMessage: "Your profile indicates you can see improvements quickly with the right approach.",
      };
    }
    
    return {
      type: "Mild Metabolic Resistance",
      severity: "mild",
      color: "text-primary",
      bgColor: "bg-primary/10",
      score: "58%",
      description: "Your metabolic function appears to be functioning relatively well, with some minor areas that could benefit from optimization. You're in a great position to make lasting changes.",
      keyIssues: [
        "Minor metabolic inefficiencies",
        "Room for improved energy consistency",
        "Opportunity to optimize fat-burning potential",
      ],
      urgentMessage: "You're well-positioned to achieve your goals with proper guidance.",
    };
  };

  const getPersonalizedBenefits = () => {
    const urgencyAnswer = answers[5] || "";
    const ageAnswer = answers[4] || "";
    
    const benefits = [
      "Works in just 30 seconds each morning",
      "No complicated prep or special foods required",
    ];
    
    if (ageAnswer.includes("45") || ageAnswer.includes("55")) {
      benefits.push("Specifically designed for metabolic changes after 40");
    } else {
      benefits.push("Optimized for long-term metabolic health");
    }
    
    if (urgencyAnswer.includes("soon as possible")) {
      benefits.push("Many users report feeling different within days");
    } else {
      benefits.push("Builds sustainable habits for lasting results");
    }
    
    return benefits;
  };

  const profile = getProfile();
  const benefits = getPersonalizedBenefits();

  return (
    <div className="quiz-container px-5 py-8 md:py-12">
      <div className="w-full max-w-xl animate-slide-up">
        {/* Results Badge */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-4">
            <Flame className="w-4 h-4" />
            Analysis Complete
          </div>
        </div>

        {/* Profile Header with Score */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Your Metabolic Profile
          </h1>
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 ${profile.bgColor} rounded-xl`}>
            <TrendingUp className={`w-5 h-5 ${profile.color}`} />
            <span className={`text-lg md:text-xl font-bold ${profile.color}`}>
              {profile.type}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-3">
            Resistance Score: <span className="font-semibold text-foreground">{profile.score}</span>
          </p>
        </div>

        {/* Analysis Card */}
        <div className="bg-card rounded-2xl shadow-lg p-5 md:p-8 mb-6">
          {/* What This Means Section */}
          <div className="flex gap-4 pb-5 md:pb-6 border-b border-border">
            <div className={`w-10 h-10 md:w-12 md:h-12 ${profile.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Zap className={`w-5 h-5 md:w-6 md:h-6 ${profile.color}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-2">
                What Your Results Mean
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {profile.description}
              </p>
            </div>
          </div>

          {/* Key Issues Identified */}
          <div className="py-5 md:py-6 border-b border-border">
            <div className="flex gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl mb-3">
                  Key Factors Identified
                </h3>
                <ul className="space-y-2.5">
                  {profile.keyIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Urgent Message */}
          <div className="py-5 md:py-6 border-b border-border">
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">
                {profile.urgentMessage}
              </p>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="pt-5 md:pt-6">
            <h3 className="font-bold text-lg md:text-xl mb-3">
              Your Personalized Recommendation
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-5 leading-relaxed">
              Based on your specific profile and metabolism type, we've identified an approach 
              that may be compatible with your situation. Click below to learn more about 
              solutions designed for people with your specific metabolic pattern.
            </p>

            {/* Personalized Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          {/* Countdown Timer */}
          {timeLeft > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-6">
              <p className="text-sm font-medium text-foreground mb-2">
                📊 Your personalized analysis is ready
              </p>
              <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Access your complete results and recommendation
              </p>
            </div>
          )}

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            Based on your results, we've identified a solution that may help with your specific metabolism type.
          </p>
          
          <a
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick()}
            className="cta-button inline-flex items-center justify-center gap-2 text-lg font-bold mb-4"
          >
            See Your Personalized Recommendation →
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6">
            <Lock className="w-4 h-4" />
            Your information is secure and never shared
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
