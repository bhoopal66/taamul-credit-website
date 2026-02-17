import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Handshake,
  BarChart3,
  Building2,
  FileText,
  Shield,
  Target,
  Users,
  Zap,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import TaamulAdvantageSection from "@/components/loans/TaamulAdvantageSection";

const DebtAdvisory = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: TrendingUp,
      titleKey: "debtAdvisory.services.capitalStructure",
      descKey: "debtAdvisory.services.capitalStructureDesc",
    },
    {
      icon: RefreshCw,
      titleKey: "debtAdvisory.services.debtRefinancing",
      descKey: "debtAdvisory.services.debtRefinancingDesc",
    },
    {
      icon: Handshake,
      titleKey: "debtAdvisory.services.structuringNegotiation",
      descKey: "debtAdvisory.services.structuringNegotiationDesc",
    },
    {
      icon: BarChart3,
      titleKey: "debtAdvisory.services.riskAnalysis",
      descKey: "debtAdvisory.services.riskAnalysisDesc",
    },
  ];

  const benefits = ["b1", "b2", "b3", "b4", "b5", "b6"];
  const processSteps = ["p1", "p2", "p3", "p4", "p5"];

  return (
    <div className="min-h-screen">
      <SEO
        title="Debt Advisory Services in UAE | Taamul Credit"
        description="Expert debt restructuring and advisory services for UAE businesses. Taamul helps optimize your capital structure, manage debt obligations, and improve creditworthiness."
        keywords="debt advisory UAE, debt restructuring Dubai, capital structure optimization, credit advisory"
      />
      <Header />
      <main id="main-content">

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 md:pb-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--background))] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--background))]/10 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Building2 className="h-4 w-4" />
              {t("debtAdvisory.badge")}
            </div>

            <h1 className="text-display-sm md:text-display text-white mb-6">
              {t("debtAdvisory.title")}{" "}
              <span className="text-accent">{t("debtAdvisory.titleHighlight")}</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              {t("debtAdvisory.description")}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t("debtAdvisory.getConsultation")}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/contact">{t("common.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0 48V20C240 4 480 0 720 0C960 0 1200 4 1440 20V48H0Z" fill="hsl(var(--background))" />
            <path d="M0 20C240 4 480 0 720 0C960 0 1200 4 1440 20" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.35" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto mb-8 md:mb-16`}>
            <h2 className="text-2xl md:text-display-sm text-foreground mb-4">
              {t("debtAdvisory.servicesTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("debtAdvisory.servicesDesc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.titleKey}
                className={`bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taamul Advantage Section */}
      <TaamulAdvantageSection
        descriptionKey="taamulAdvantage.debtAdvisory.description"
        advantages={[
          { icon: Target, titleKey: "taamulAdvantage.debtAdvisory.card1Title", descKey: "taamulAdvantage.debtAdvisory.card1Desc" },
          { icon: Users, titleKey: "taamulAdvantage.debtAdvisory.card2Title", descKey: "taamulAdvantage.debtAdvisory.card2Desc" },
          { icon: Scale, titleKey: "taamulAdvantage.debtAdvisory.card3Title", descKey: "taamulAdvantage.debtAdvisory.card3Desc" },
          { icon: BarChart3, titleKey: "taamulAdvantage.debtAdvisory.card4Title", descKey: "taamulAdvantage.debtAdvisory.card4Desc" },
          { icon: RefreshCw, titleKey: "taamulAdvantage.debtAdvisory.card5Title", descKey: "taamulAdvantage.debtAdvisory.card5Desc" },
        ]}
      />

      {/* Benefits & Process */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className={`bg-card rounded-2xl p-8 shadow-card ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t("debtAdvisory.keyBenefits")}</h3>
              </div>
              <div className="space-y-4">
                {benefits.map((key) => (
                  <div key={key} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className={`text-foreground ${isRTL ? 'text-right flex-1' : ''}`}>{t(`debtAdvisory.benefits.${key}`)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className={`bg-card rounded-2xl p-8 shadow-card ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t("debtAdvisory.ourProcess")}</h3>
              </div>
              <div className="space-y-4">
                {processSteps.map((key, index) => (
                  <div key={key} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <p className={`text-foreground ${isRTL ? 'text-right flex-1' : ''}`}>{t(`debtAdvisory.process.${key}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[hsl(var(--background))] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl mx-auto text-center`}>
            <h2 className="text-2xl md:text-display-sm text-white mb-6">
              {t("debtAdvisory.ctaTitle")}
            </h2>
            <p className="text-xl text-white/80 mb-10">
              {t("debtAdvisory.ctaDesc")}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t("debtAdvisory.scheduleConsultation")}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/about">{t("debtAdvisory.learnAboutUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default DebtAdvisory;
