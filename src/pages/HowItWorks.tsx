import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare,
  FileCheck,
  Search,
  Send,
  CheckCircle2,
  ArrowRight,
  Shield,
  Users,
  Settings
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const HowItWorks = () => {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      number: "01",
      titleKey: "howItWorks.steps.consultation",
      descKey: "howItWorks.steps.consultationDesc",
      icon: MessageSquare,
      detailsKeys: ["howItWorks.steps.consultationDetails.0", "howItWorks.steps.consultationDetails.1", "howItWorks.steps.consultationDetails.2", "howItWorks.steps.consultationDetails.3"]
    },
    {
      number: "02",
      titleKey: "howItWorks.steps.documentCollection",
      descKey: "howItWorks.steps.documentCollectionDesc",
      icon: FileCheck,
      detailsKeys: ["howItWorks.steps.documentCollectionDetails.0", "howItWorks.steps.documentCollectionDetails.1", "howItWorks.steps.documentCollectionDetails.2", "howItWorks.steps.documentCollectionDetails.3"]
    },
    {
      number: "03",
      titleKey: "howItWorks.steps.bankSelection",
      descKey: "howItWorks.steps.bankSelectionDesc",
      icon: Search,
      detailsKeys: ["howItWorks.steps.bankSelectionDetails.0", "howItWorks.steps.bankSelectionDetails.1", "howItWorks.steps.bankSelectionDetails.2", "howItWorks.steps.bankSelectionDetails.3"]
    },
    {
      number: "04",
      titleKey: "howItWorks.steps.applicationSubmission",
      descKey: "howItWorks.steps.applicationSubmissionDesc",
      icon: Send,
      detailsKeys: ["howItWorks.steps.applicationSubmissionDetails.0", "howItWorks.steps.applicationSubmissionDetails.1", "howItWorks.steps.applicationSubmissionDetails.2", "howItWorks.steps.applicationSubmissionDetails.3"]
    },
    {
      number: "05",
      titleKey: "howItWorks.steps.approval",
      descKey: "howItWorks.steps.approvalDesc",
      icon: CheckCircle2,
      detailsKeys: ["howItWorks.steps.approvalDetails.0", "howItWorks.steps.approvalDetails.1", "howItWorks.steps.approvalDetails.2", "howItWorks.steps.approvalDetails.3"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      titleKey: "howItWorks.benefits.secureConfidential",
      descKey: "howItWorks.benefits.secureConfidentialDesc"
    },
    {
      icon: Users,
      titleKey: "howItWorks.benefits.dedicatedSupport",
      descKey: "howItWorks.benefits.dedicatedSupportDesc"
    },
    {
      icon: ArrowRight,
      titleKey: "howItWorks.benefits.expertGuidance",
      descKey: "howItWorks.benefits.expertGuidanceDesc"
    }
  ];

  // Get details array from translation
  const getDetails = (stepIndex: number) => {
    const stepKeys = ['consultation', 'documentCollection', 'bankSelection', 'applicationSubmission', 'approval'];
    const detailsKey = `howItWorks.steps.${stepKeys[stepIndex]}Details`;
    const details = t(detailsKey);
    // If translation returns the key, use hardcoded fallback
    if (typeof details === 'string' && details === detailsKey) {
      return steps[stepIndex].detailsKeys.map((_, i) => t(`${detailsKey}.${i}`));
    }
    return Array.isArray(details) ? details : steps[stepIndex].detailsKeys.map(k => t(k));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="How Business Financing Works | Taamul Credit UAE"
        description="Learn how Taamul helps UAE businesses secure financing in five simple steps: consultation, document collection, lender matching, application, and disbursement."
        keywords="how business financing works, loan application process, UAE business loans steps"
      />
      <Header />
      <main id="main-content">
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary via-primary to-navy-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-accent text-sm font-medium mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Settings className="h-4 w-4" />
              {t('howItWorks.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('howItWorks.heading')}
            </h1>
            <p className="text-base md:text-xl text-white mb-8">
              {t('howItWorks.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute ${isRTL ? 'right-8' : 'left-8'} top-24 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent/20 hidden md:block`} />
                )}
                
                <div className={`flex flex-col md:flex-row gap-6 mb-12 last:mb-0 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-lg relative z-10">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-grow bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border hover:shadow-xl transition-shadow ${isRTL ? 'text-right' : ''}`}>
                    <div className="mb-4">
                      <span className="text-sm font-bold text-primary tracking-wider">
                        {t('howItWorks.step')} {step.number}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground mt-1">
                        {t(step.titleKey)}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {t(step.descKey)}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {getDetails(index).map((detail, i) => (
                        <div key={i} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                          <span className={`text-sm text-foreground ${isRTL ? 'text-right flex-1' : ''}`}>{typeof detail === 'string' ? detail : t(steps[index].detailsKeys[i])}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('howItWorks.whyChoose')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.whyChooseDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-md border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(benefit.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-navy-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('howItWorks.ctaHeading')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('howItWorks.ctaDesc')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild size="xl" variant="accent">
                <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('common.talkToExpert')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
            </div>
            <p className={`text-sm text-white/70 mt-6 max-w-2xl mx-auto ${isRTL ? 'text-right' : ''}`}>
              {t('howItWorks.disclaimer')}
            </p>
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default HowItWorks;
