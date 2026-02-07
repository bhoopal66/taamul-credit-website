import { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
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
        <svg className="h-7 w-7 text-success-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
