import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileCheck,
  Building2,
  Percent,
  Clock,
  FileText,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";

const benefits = [
  { icon: FileCheck, titleKey: "whyTaamul.benefit1Title", descKey: "whyTaamul.benefit1Desc" },
  { icon: Building2, titleKey: "whyTaamul.benefit2Title", descKey: "whyTaamul.benefit2Desc" },
  { icon: Percent, titleKey: "whyTaamul.benefit3Title", descKey: "whyTaamul.benefit3Desc" },
  { icon: Clock, titleKey: "whyTaamul.benefit4Title", descKey: "whyTaamul.benefit4Desc" },
  { icon: FileText, titleKey: "whyTaamul.benefit5Title", descKey: "whyTaamul.benefit5Desc" },
  { icon: Headphones, titleKey: "whyTaamul.benefit6Title", descKey: "whyTaamul.benefit6Desc" },
];

const WhyChooseTaamulSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <p className="text-accent font-semibold mb-3 uppercase tracking-wide text-sm">
            {t("calculator.whyChoose")}
          </p>
          <h2 className="text-2xl md:text-display-sm text-white mb-4">
            {t("calculator.fastTitle")}
          </h2>
          <p className="text-lg text-white/70">
            {t("calculator.fastDesc")}
          </p>
        </AnimatedSection>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <AnimatedItem key={benefit.titleKey} index={index} baseDelay={0.1} className="h-full">
              <div
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 h-full ${isRTL ? "text-right" : ""}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4 ${isRTL ? "ml-auto" : ""}`}
                >
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {t(benefit.descKey)}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </div>

        {/* CTA Buttons */}
        <AnimatedSection delay={0.3} direction="none" className="text-center">
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <Button asChild variant="accent" size="lg">
              <Link
                to="/how-it-works"
                className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("common.howItWorks")}
                <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link
                to="/contact"
                className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("common.talkToExpert")}
                <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhyChooseTaamulSection;
