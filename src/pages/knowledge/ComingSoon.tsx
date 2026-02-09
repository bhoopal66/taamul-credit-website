import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ArrowLeft, ArrowRight, Video, Headphones, FileText, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  pageKey: "videos" | "webinars" | "research";
}

const heroIcons = {
  videos: Video,
  webinars: Headphones,
  research: FileText,
};

const ComingSoon = ({ pageKey }: ComingSoonProps) => {
  const { t, isRTL } = useLanguage();
  const HeroIcon = heroIcons[pageKey];
  const titleKey = `comingSoon.${pageKey}Title`;
  const subtitleKey = `comingSoon.${pageKey}Subtitle`;

  return (
    <div className="min-h-screen">
      <SEO
        title={`${t(titleKey)} | Taamul Credit`}
        description={t(subtitleKey)}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary via-primary to-navy-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <AnimatedSection>
                <span className={cn("inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-accent text-sm font-medium mb-6", isRTL && "flex-row-reverse")}>
                  <HeroIcon className="h-4 w-4" />
                  {t("comingSoon.badge")}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t(titleKey)}
                </h1>
                <p className="text-base md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {t(subtitleKey)}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Coming Soon — prominent */}
        <section className="py-16 md:py-28">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("comingSoon.badge")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {t("comingSoon.stayTuned")}
                </p>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/knowledge-center" className={cn("inline-flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
                    {t("comingSoon.backToHub")}
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-navy-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {t("caseStudies.ctaTitle")}
                </h2>
                <p className="text-xl text-white mb-8">
                  {t("caseStudies.ctaDesc")}
                </p>
                <Button asChild size="xl" variant="accent">
                  <Link to="/contact" className={cn("inline-flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    {t("nav.contactUs")}
                    <ArrowRight className={cn("h-5 w-5", isRTL && "rotate-180")} />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ComingSoon;
