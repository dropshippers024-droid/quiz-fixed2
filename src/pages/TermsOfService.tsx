import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-8 md:py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quiz
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last Updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the 
              terms and provisions of this agreement. If you do not agree to these terms, 
              please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
            <p>
              This website provides a quiz-based assessment tool designed to help users 
              understand their metabolic profile and receive personalized recommendations. 
              The service is for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
            <p>As a user of this website, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide accurate and truthful information</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to interfere with the website's operation</li>
              <li>Not reproduce or distribute content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Medical Disclaimer</h2>
            <p>
              The content provided on this website is for informational purposes only and 
              is not intended as medical advice, diagnosis, or treatment. Always seek the 
              advice of your physician or other qualified health provider with any questions 
              you may have regarding a medical condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. No Guarantees</h2>
            <p>
              Results may vary from person to person. We make no guarantees regarding the 
              effectiveness of any products or methods mentioned or recommended through 
              this service. Individual results depend on many factors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Affiliate Disclosure</h2>
            <p>
              This website may contain affiliate links. This means we may earn a commission 
              if you click on a link and make a purchase. This comes at no additional cost 
              to you and helps support the operation of this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, 
              is the property of this website or its content suppliers and is protected 
              by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
            <p>
              In no event shall this website, its operators, or affiliates be liable for 
              any indirect, incidental, special, consequential, or punitive damages arising 
              out of your use of, or inability to use, this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be 
              effective immediately upon posting to the website. Your continued use of 
              the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please visit our{" "}
              <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
