import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
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

        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Disclaimer</h1>
        </div>
        
        <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last Updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">General Information</h2>
            <p>
              The information provided on this website is for general informational purposes 
              only. All information on the site is provided in good faith, however, we make 
              no representation or warranty of any kind, express or implied, regarding the 
              accuracy, adequacy, validity, reliability, availability, or completeness of 
              any information on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Not Medical Advice</h2>
            <p>
              The content on this website is not intended to be a substitute for professional 
              medical advice, diagnosis, or treatment. Always seek the advice of your physician 
              or other qualified health provider with any questions you may have regarding a 
              medical condition.
            </p>
            <p className="mt-3">
              Never disregard professional medical advice or delay in seeking it because of 
              something you have read on this website. If you think you may have a medical 
              emergency, call your doctor or emergency services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">No Guaranteed Results</h2>
            <p>
              Individual results may vary. The testimonials and examples used are exceptional 
              results and are not intended to guarantee, promise, represent and/or assure that 
              anyone will achieve the same or similar results. Each individual's success 
              depends on their background, dedication, desire, and motivation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Affiliate Disclosure</h2>
            <p>
              This website contains affiliate links, which means we may receive a commission 
              if you click a link and purchase something that we have recommended. While 
              clicking these links won't cost you any extra money, they will help us keep 
              this site up and running.
            </p>
            <p className="mt-3">
              Please note that we only recommend products and services that we believe will 
              add value to our readers. We are disclosing this in accordance with the Federal 
              Trade Commission's 16 CFR, Part 255: "Guides Concerning the Use of Endorsements 
              and Testimonials in Advertising."
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Products</h2>
            <p>
              Any products or services mentioned on this website are provided by third-party 
              vendors. We do not manufacture, sell, or directly provide any of the products 
              recommended. For product-specific questions, concerns, or issues, please contact 
              the respective product vendor directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">External Links Disclaimer</h2>
            <p>
              This website may contain links to external websites that are not provided or 
              maintained by us. Please note that we do not guarantee the accuracy, relevance, 
              timeliness, or completeness of any information on these external websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Facebook Disclaimer</h2>
            <p>
              This site is not a part of the Facebook website or Facebook Inc. Additionally, 
              this site is not endorsed by Facebook in any way. FACEBOOK is a trademark of 
              FACEBOOK, Inc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">ClickBank Disclaimer</h2>
            <p>
              ClickBank is the retailer of products on this site. CLICKBANK® is a registered 
              trademark of Click Sales Inc., a Delaware corporation located at 1444 S. 
              Entertainment Ave., Suite 410 Boise, ID 83709, USA and used by permission. 
              ClickBank's role as retailer does not constitute an endorsement, approval or 
              review of these products or any claim, statement or opinion used in promotion 
              of these products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Disclaimer, please{" "}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
