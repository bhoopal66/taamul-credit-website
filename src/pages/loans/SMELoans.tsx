import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Rocket,
  Percent,
  Users,
  Shield,
  FileText,
  Clock,
  Briefcase,
  FileCheck,
  TrendingUp,
  Zap,
  Headphones,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import TaamulAdvantageSection from "@/components/loans/TaamulAdvantageSection";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const SMELoans = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Rocket,
      title: t('loanPages.growthFocused'),
      description: t('loanPages.growthFocusedDesc'),
    },
    {
      icon: Clock,
      title: t('loanPages.fastProcessing'),
      description: t('loanPages.fastProcessingDesc'),
    },
    {
      icon: Users,
      title: t('loanPages.dedicatedSupport'),
      description: t('loanPages.dedicatedSupportDesc'),
    },
    {
      icon: Briefcase,
      title: t('loanPages.flexibleTerms'),
      description: t('loanPages.flexibleTermsDesc'),
    },
  ];

  const eligibility = [
    t('loanPages.eligibility3Years'),
    t('loanPages.minTurnover5M'),
    t('loanPages.validTradeLicenseEjari'),
    t('loanPages.noTurnoverDrop'),
    t('loanPages.auditedOrManagement'),
    t('loanPages.noMajorDefaults'),
  ];

  const documents = [
    t('loanPages.tradeLicenseMOA'),
    t('loanPages.financialStatements1to2'),
    t('loanPages.bankStatements6to12'),
    t('loanPages.vatReturns'),
    t('loanPages.passportCopies'),
    t('loanPages.businessPlanStartups'),
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <SEO
        title="SME Loans in UAE | Small Business Financing | Taamul"
        description="Financing solutions designed for small and medium enterprises in the UAE. Taamul helps SMEs access business loans with favorable terms from trusted lenders."
        keywords="SME loans UAE, small business loans Dubai, SME financing, startup business loans"
      />

      <main id="main-content">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 md:pb-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--background))] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl ${isRTL ? 'mr-0 text-right' : ''}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--background))]/10 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Rocket className="h-4 w-4" />
              {t('loanPages.businessLoans')}
            </div>

            <h1 className="text-display-sm md:text-display text-white mb-6">
              {t('loanPages.smeLoansTitle')}{" "}
              <span className="text-accent">{t('loanPages.smeLoansHighlight')}</span>
            </h1>

            <p className="text-xl text-white mb-8 max-w-2xl">
              {t('loanPages.smeLoansDesc')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('common.contactUs')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0 48V20C240 4 480 0 720 0C960 0 1200 4 1440 20V48H0Z" fill="hsl(var(--background))" />
            <path d="M0 20C240 4 480 0 720 0C960 0 1200 4 1440 20" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.35" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center max-w-3xl mx-auto mb-8 md:mb-16`}>
            <h2 className="text-2xl md:text-display-sm text-foreground mb-4">
              {t('loanPages.smeLoansFeaturesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('loanPages.smeLoansFeaturesDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className={`bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 ${isRTL ? 'text-right' : ''}`}>
                <div className={`w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 ${isRTL ? 'ml-auto' : ''}`}>
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          <p className={`text-sm text-muted-foreground text-center mt-8`}>
            {t('loanPages.disclaimer')}
          </p>
        </div>
      </section>

      {/* Taamul Advantage Section */}
      <TaamulAdvantageSection
        descriptionKey="taamulAdvantage.sme.description"
        advantages={[
          { icon: FileCheck, titleKey: "taamulAdvantage.sme.card1Title", descKey: "taamulAdvantage.sme.card1Desc" },
          { icon: Users, titleKey: "taamulAdvantage.sme.card2Title", descKey: "taamulAdvantage.sme.card2Desc" },
          { icon: TrendingUp, titleKey: "taamulAdvantage.sme.card3Title", descKey: "taamulAdvantage.sme.card3Desc" },
          { icon: Zap, titleKey: "taamulAdvantage.sme.card4Title", descKey: "taamulAdvantage.sme.card4Desc" },
          { icon: Headphones, titleKey: "taamulAdvantage.sme.card5Title", descKey: "taamulAdvantage.sme.card5Desc" },
        ]}
      />

      {/* Eligibility & Documents */}
      <section className="py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className={`grid lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
            <div className={`bg-card rounded-2xl p-8 shadow-card ${isRTL ? 'text-right lg:col-start-2' : ''}`}>
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t('loanPages.eligibilityCriteria')}</h3>
              </div>
              <div className="space-y-4">
                {eligibility.map((item, index) => (
                  <div key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className={`text-foreground ${isRTL ? 'text-right flex-1' : ''}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`bg-card rounded-2xl p-8 shadow-card ${isRTL ? 'text-right lg:col-start-1' : ''}`}>
              <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t('loanPages.requiredDocuments')}</h3>
              </div>
              <div className="space-y-4">
                {documents.map((item, index) => (
                  <div key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className={`text-foreground ${isRTL ? 'text-right flex-1' : ''}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className={`text-sm text-muted-foreground text-center mt-8`}>
            {t('loanPages.documentsDisclaimer')}
          </p>
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
              {t('loanPages.smeLoansCtaTitle')}
            </h2>
            <p className="text-xl text-white mb-10">
              {t('loanPages.smeLoansCtaDesc')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('common.contactUs')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/contact">{t('common.talkToExpert')}</Link>
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

export default SMELoans;