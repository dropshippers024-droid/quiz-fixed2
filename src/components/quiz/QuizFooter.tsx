import { Link } from "react-router-dom";

const QuizFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 border-t border-border bg-card/50">
      <div className="max-w-2xl mx-auto">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4">
          <Link 
            to="/privacy-policy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link 
            to="/terms-of-service" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link 
            to="/contact" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link 
            to="/disclaimer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Disclaimer
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground">
          © {currentYear} All Rights Reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground/70 mt-4 max-w-lg mx-auto leading-relaxed">
          This site is not a part of the Facebook website or Facebook Inc. 
          Additionally, this site is not endorsed by Facebook in any way. 
          Results may vary. This quiz is for informational purposes only.
        </p>
      </div>
    </footer>
  );
};

export default QuizFooter;
