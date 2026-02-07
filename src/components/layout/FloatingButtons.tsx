import { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

const FloatingButtons = () => {
  const { t, isRTL } = useLanguage();
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [callbackForm, setCallbackForm] = useState({
    name: "",
    phone: "",
    preferredTime: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t('callback.whatsappMessage'));
    window.open(`https://wa.me/971529015022?text=${message}`, "_blank");
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to Cloudflare Worker API (Phase 4)
    setIsCallbackOpen(false);
    setCallbackForm({ name: "", phone: "", preferredTime: "" });
  };

  return (
    <>
      {/* WhatsApp Button - Bottom Left (LTR) / Bottom Right (RTL) */}
      <button
        onClick={handleWhatsApp}
        className={`fixed bottom-4 sm:bottom-6 z-40 w-14 h-14 sm:w-14 sm:h-14 bg-success rounded-full shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-200 ${isRTL ? 'right-4 sm:right-6' : 'left-4 sm:left-6'}`}
        aria-label={isRTL ? "تواصل عبر واتساب" : "Contact on WhatsApp"}
      >
        <MessageCircle className="h-7 w-7 text-success-foreground" />
      </button>

      {/* Back to Top Button - Above Callback Button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className={`fixed bottom-24 sm:bottom-28 z-40 w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full shadow-elevated flex items-center justify-center hover:scale-110 transition-all duration-200 animate-fade-in ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}
          aria-label={isRTL ? "العودة للأعلى" : "Back to top"}
        >
          <ArrowUp className="h-5 w-5 text-primary-foreground" />
        </button>
      )}

      {/* Callback Button - Bottom Right */}
      <button
        onClick={() => setIsCallbackOpen(true)}
        className={`fixed bottom-4 sm:bottom-6 z-40 w-14 h-14 sm:w-14 sm:h-14 bg-accent rounded-full shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-200 animate-pulse-slow ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}
        aria-label={t('callback.title')}
      >
        <Phone className="h-6 w-6 text-accent-foreground" />
      </button>

      {/* Callback Modal */}
      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {t('callback.title')}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            {t('callback.description')}
          </p>
          <form onSubmit={handleCallbackSubmit} className={`space-y-4 mt-4 ${isRTL ? 'text-right' : ''}`}>
            <div className="space-y-2">
              <Label htmlFor="callback-name">{t('callback.fullName')}</Label>
              <Input
                id="callback-name"
                placeholder={t('callback.namePlaceholder')}
                value={callbackForm.name}
                onChange={(e) =>
                  setCallbackForm({ ...callbackForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-phone">{t('callback.phoneNumber')}</Label>
              <Input
                id="callback-phone"
                placeholder={t('callback.phonePlaceholder')}
                dir="ltr"
                value={callbackForm.phone}
                onChange={(e) =>
                  setCallbackForm({ ...callbackForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="callback-time">{t('callback.preferredTime')}</Label>
              <select
                id="callback-time"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                value={callbackForm.preferredTime}
                onChange={(e) =>
                  setCallbackForm({
                    ...callbackForm,
                    preferredTime: e.target.value,
                  })
                }
                required
              >
                <option value="">{t('callback.selectTime')}</option>
                <option value="morning">{t('callback.morning')}</option>
                <option value="afternoon">{t('callback.afternoon')}</option>
                <option value="evening">{t('callback.evening')}</option>
              </select>
            </div>
            <Button type="submit" variant="cta" size="lg" className="w-full">
              {t('callback.submit')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingButtons;
