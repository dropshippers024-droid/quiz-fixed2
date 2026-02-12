import { useEffect, useState } from "react";
import {
  initializeTracking,
  trackCTAClick,
  trackResultsScroll,
  trackTimeOnPage,
} from "@/utils/tracking";

const AFF_LINK = "https://d46508k5kgun8qbzogzm187kzd.hop.clickbank.net";

interface PricingTier {
  label: string;
  bottles: string;
  supply: string;
  perBottle: string;
  oldPrice: string;
  newPrice: string;
  savings: string;
  features: string[];
  shipping: string;
  popular?: boolean;
}

export default function CleanAffiliatePage() {
  const [timeLeft, setTimeLeft] = useState<number>(599); // 9:59 in seconds

  useEffect(() => {
    initializeTracking();

    const timers = [30, 60, 120].map((sec) =>
      setTimeout(() => trackTimeOnPage(sec), sec * 1000)
    );

    const onScroll = (): void => {
      const scroll =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const percent = Math.round(scroll * 100);
      trackResultsScroll(percent);
    };

    window.addEventListener("scroll", onScroll);

    const countdown = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 599));
    }, 1000);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      clearInterval(countdown);
    };
  }, []);

  const handleClick = (location: string): void => {
    trackCTAClick(location);
    window.open(AFF_LINK, "_blank");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const pricingTiers: PricingTier[] = [
    {
      label: "Starter",
      bottles: "2 Bottles",
      supply: "60 Day Supply",
      perBottle: "$79",
      oldPrice: "$398",
      newPrice: "$158",
      savings: "Save $240",
      features: [],
      shipping: "+ Shipping",
    },
    {
      label: "Most Popular",
      bottles: "6 Bottles",
      supply: "180 Day Supply",
      perBottle: "$49",
      oldPrice: "$1194",
      newPrice: "$294",
      savings: "Save $900",
      features: ["Free Bonuses", "Free Shipping", "Biggest Savings"],
      shipping: "Free Shipping",
      popular: true,
    },
    {
      label: "Best Deal",
      bottles: "3 Bottles",
      supply: "90 Day Supply",
      perBottle: "$69",
      oldPrice: "$597",
      newPrice: "$207",
      savings: "Save $390",
      features: ["Free Bonuses"],
      shipping: "Free Shipping",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Sticky Timer - Top Desktop, Bottom Mobile */}
      <div className="fixed md:top-0 bottom-0 md:bottom-auto left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-5 px-6 shadow-2xl z-50 border-b-2 border-orange-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs md:text-sm font-medium opacity-90">⏱️ EXCLUSIVE OFFER EXPIRES IN:</p>
            <p className="text-2xl md:text-3xl font-black tracking-wider">{timeDisplay}</p>
          </div>
          <button
            onClick={() => handleClick("sticky_cta")}
            className="bg-white text-orange-700 hover:bg-yellow-50 font-bold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap transform hover:scale-105"
          >
            CLAIM OFFER NOW
          </button>
        </div>
      </div>

      {/* Add spacing for sticky bars */}
      <div className="md:pt-16 pb-20 md:pb-0">
        
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Finally Break Through Your Weight Loss Plateau Without Restrictive Diets or Intense Workouts
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Discover the scientifically-proven citrus compound that reactivates your metabolism and helps burn stubborn fat naturally—even while you sleep
          </p>

          {/* Product Image */}
          <div className="mb-6 max-w-3xl mx-auto">
            <img 
              src="/images/image-main.png" 
              alt="Product Bottle" 
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>

          <button
            onClick={() => handleClick("hero_cta")}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xl font-semibold px-12 py-4 rounded-lg transition-colors shadow-lg"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Get Your Discount Now
          </button>
        </section>

        {/* Problem Section */}
        <section className="bg-gray-50 py-10 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Why Nothing Has Worked For You Until Now
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Real Problem</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  After age 35, your body's natural fat-burning mechanism slows down dramatically. This isn't about willpower or discipline—it's a biological shift that makes traditional diet and exercise ineffective.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What You've Tried</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Cutting calories only triggers your body's survival mode. Extreme workouts spike cortisol and increase fat storage. Restrictive diets destroy your metabolism and leave you exhausted.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Missing Piece</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Your metabolism needs to be reactivated at the cellular level. Without addressing thermogenic resistance, no amount of dieting or exercise will produce lasting results.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">The Solution</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  A natural citrus compound that breaks through metabolic resistance, allowing your body to burn fat efficiently again—without stimulants, restrictive eating, or exhausting workouts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              What You Can Expect
            </h2>
            <p className="text-center text-gray-600 mb-6 text-lg">Results backed by scientific research</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Natural Fat Burning</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Reactivate your body's thermogenic process to burn stored fat continuously, even during rest
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sustained Energy</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Say goodbye to afternoon crashes and brain fog with stable, all-day energy
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl">🍽️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reduced Cravings</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Control hunger naturally without willpower struggles or constant food thoughts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Real Results From Real People
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "Sarah M.",
                  age: "43",
                  result: "Lost 22 lbs",
                  quote: "After years of yo-yo dieting, this finally worked. No jitters, no crash diets, just steady results. I have my confidence back.",
                },
                {
                  name: "James T.",
                  age: "51",
                  result: "Down 18 lbs",
                  quote: "My doctor is impressed with my blood work. The weight came off naturally and my energy is better than it's been in years.",
                },
                {
                  name: "Linda K.",
                  age: "47",
                  result: "Lost 27 lbs",
                  quote: "I was skeptical, but the science made sense. Within weeks I noticed my clothes fitting better. This genuinely works.",
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-orange-500">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2 italic text-sm">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-200 pt-2">
                    <p className="font-semibold text-gray-900 text-sm">{testimonial.name}, {testimonial.age}</p>
                    <p className="text-orange-600 font-medium text-xs">{testimonial.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-10 md:py-12 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-1 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Choose Your Package
            </h2>
            <p className="text-center text-orange-600 font-semibold mb-0.5 text-base md:text-lg">⏰ Offer Expires in {timeDisplay}</p>
            <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">All include FREE bonuses & 180-day guarantee</p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-8">
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-5 md:p-6 shadow-lg border-2 transition-all ${
                    tier.popular
                      ? "border-orange-600 md:scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-center mb-4">
                    {tier.popular && (
                      <div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-semibold mb-3">
                        {tier.label}
                      </div>
                    )}
                    {!tier.popular && (
                      <div className="font-semibold text-gray-700 mb-3 text-sm">{tier.label}</div>
                    )}
                    
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 text-center">{tier.bottles}</h3>
                    <p className="text-gray-600 mb-4 text-center font-medium text-sm">{tier.supply}</p>

                    {/* Product Image */}
                    <div className="mb-4 rounded-2xl overflow-hidden">
                      <img 
                        src={["images/image-2.png", "images/image-main.png", "images/image-3.png"][idx]} 
                        alt={tier.bottles} 
                        className="w-full h-48 md:h-56 object-cover"
                      />
                    </div>

                    {/* Price Section - Focus on Per Bottle */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-3 mb-3 border-2 border-orange-100">
                      <div className="text-center mb-1">
                        <div className="text-orange-600 font-black text-3xl md:text-4xl">{tier.perBottle}</div>
                        <div className="text-gray-600 text-xs font-bold tracking-wide">PER BOTTLE</div>
                      </div>
                      <div className="text-gray-500 line-through text-xs text-center mb-1">Regular: {tier.oldPrice}</div>
                      <div className="text-center text-gray-700 text-xs font-bold">Full price: {tier.newPrice}</div>
                      <div className="text-green-600 font-black text-xs text-center mt-1 bg-green-50 py-1 rounded-lg">{tier.savings}</div>
                    </div>

                    {tier.features.length > 0 && (
                      <div className="space-y-1 mb-3">
                        {tier.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-700 font-semibold text-xs">
                            <span className="text-green-600 text-base">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Button */}
                    <button
                      onClick={() => handleClick(`pricing_${idx}`)}
                      className={`w-full py-3.5 rounded-full font-black text-sm md:text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl mb-2.5 tracking-wider ${
                        tier.popular
                          ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white"
                          : "bg-gray-800 hover:bg-gray-900 text-white"
                      }`}
                    >
                      SECURE ORDER NOW →
                    </button>

                    {/* Shipping */}
                    {tier.shipping && (
                      <div className="text-center text-xs font-bold text-gray-700 py-1.5 border-t border-gray-100 mt-2">
                        🚚 {tier.shipping}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bonuses Section */}
        <section className="bg-orange-50 py-6 md:py-12 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-4 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Order Today & Get These FREE Bonuses
            </h2>

            <div className="grid md:grid-cols-2 gap-2.5 md:gap-4 mb-3">
              <div className="bg-white rounded-xl p-3 md:p-5 shadow-sm border border-orange-200">
                <div className="mb-2 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-white flex items-center justify-center" style={{height: '140px'}}>
                  <img 
                    src="/images/bonus-1.png" 
                    alt="15-Day Rapid Detox Guide" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="inline-block bg-orange-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold mb-2">
                  FREE BONUS
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">15-Day Rapid Detox Guide</h3>
                <p className="text-gray-700 leading-relaxed text-xs">
                  Jumpstart your results with this proven Mediterranean-style cleanse using simple kitchen ingredients. Designed to reduce inflammation and support natural fat burning.
                </p>
              </div>

              <div className="bg-white rounded-xl p-3 md:p-5 shadow-sm border border-orange-200">
                <div className="mb-2 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-white flex items-center justify-center" style={{height: '140px'}}>
                  <img 
                    src="/images/bonus-2.png" 
                    alt="Metabolism Reset Mindset Program" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="inline-block bg-orange-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold mb-2">
                  FREE BONUS
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">Metabolism Reset Mindset Program</h3>
                <p className="text-gray-700 leading-relaxed text-xs">
                  Daily 5-minute techniques to rewire your relationship with food, eliminate emotional eating, and build lasting healthy habits that stick.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 180-Day Guarantee */}
        <section className="py-10 md:py-14 px-4 md:px-6 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white text-4xl md:text-5xl font-black">✓</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              180-Day Money-Back Guarantee
            </h2>
            <div className="bg-white rounded-3xl p-4 md:p-6 border-3 border-green-300 shadow-lg mb-4">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold mb-2">
                Try it risk-free for a full 180 days. If you don't see real results—just contact us for a complete refund. No questions asked.
              </p>
              <p className="text-base md:text-lg text-green-700 font-black">
                💰 ZERO RISK - EVERYTHING to gain.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Ready to Transform Your Body?
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 font-bold opacity-95">
              Join thousands of real results
            </p>
            <button
              onClick={() => handleClick("final_cta")}
              className="bg-white hover:bg-yellow-50 text-orange-700 text-lg md:text-2xl font-black px-12 md:px-16 py-4 md:py-6 rounded-full transition-all shadow-2xl hover:shadow-3xl mb-6 transform hover:scale-105 tracking-wider"
            >
              CLAIM YOUR SPOT NOW →
            </button>
            <div className="text-white text-xs md:text-sm font-bold space-y-1.5 opacity-95 bg-black bg-opacity-20 rounded-xl md:rounded-2xl p-4 md:p-5 backdrop-blur">
              <p>✓ 180-Day Money-Back Guarantee</p>
              <p>✓ Free Bonuses ($197 Value)</p>
              <p>✓ Secure SSL Encrypted Checkout</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-xs md:text-sm space-y-6">
            <div className="flex justify-center gap-4 md:gap-8 mb-6 flex-wrap font-semibold">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-orange-400 transition-colors">Refunds</a>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
              <p className="text-xs leading-relaxed max-w-3xl mx-auto">
                <strong className="text-gray-200">Disclaimer:</strong> The statements on this website have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Always consult your physician before starting any supplement program.
              </p>
            </div>

            <p className="text-xs text-gray-500 font-semibold">
              © 2025 All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}