import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const COOKIE_CONSENT_KEY = "taamul_cookie_consent";

const CookieConsent = () => {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 animate-slide-up",
        "bg-card/95 backdrop-blur-md border-t border-border shadow-elevated"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center gap-4",
            isRTL && "sm:flex-row-reverse"
          )}
        >
          <Cookie className="h-5 w-5 text-primary flex-shrink-0 hidden sm:block" />
          <p
            className={cn(
              "text-sm text-muted-foreground flex-grow text-center sm:text-left",
              isRTL && "sm:text-right"
            )}
          >
            {t("cookieConsent.message")}{" "}
            <Link
              to="/privacy"
              className="text-primary underline hover:text-primary/80"
            >
              {t("cookieConsent.learnMore")}
            </Link>
          </p>
          <div
            className={cn(
              "flex items-center gap-3 flex-shrink-0",
              isRTL && "flex-row-reverse"
            )}
          >
            <button
              onClick={handleDecline}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("cookieConsent.decline")}
            </button>
            <Button onClick={handleAccept} variant="accent" size="sm">
              {t("cookieConsent.accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
