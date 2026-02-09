import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { TrendingUp, ArrowRight, Building2, DollarSign, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CaseStudies = () => {
  const { t, isRTL } = useLanguage();

  const stats = [
    { label: t("caseStudies.statFunding"), value: t("caseStudies.statFundingValue") },
    { label: t("caseStudies.statBusinesses"), value: t("caseStudies.statBusinessesValue") },
    { label: t("caseStudies.statApproval"), value: t("caseStudies.statApprovalValue") },
    { label: t("caseStudies.statTime"), value: t("caseStudies.statTimeValue") },
  ];

  const studies = [1, 2, 3, 4].map((i) => ({
    client: t(`caseStudies.study${i}Client`),
    industry: t(`caseStudies.study${i}Industry`),
    funding: t(`caseStudies.study${i}Funding`),
    timeline: t(`caseStudies.study${i}Timeline`),
    before: t(`caseStudies.study${i}Before`),
    after: t(`caseStudies.study${i}After`),
    challenge: t(`caseStudies.study${i}Challenge`),
    solution: t(`caseStudies.study${i}Solution`),
    results: t(`caseStudies.study${i}Results`),
  }));

  return (
    <div className="min-h-screen">
      <SEO
        title={`${t("caseStudies.title")} | Taamul Credit`}
        description={t("caseStudies.subtitle")}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary via-primary to-navy-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <AnimatedSection>
                <span className={cn("inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-accent text-sm font-medium mb-6", isRTL && "flex-row-reverse")}>
                  <TrendingUp className="h-4 w-4" />
                  {t("caseStudies.badge")}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t("caseStudies.title")}
                </h1>
                <p className="text-base md:text-xl text-white mb-8 max-w-3xl mx-auto">
                  {t("caseStudies.subtitle")}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {studies.map((study, index) => (
                <AnimatedItem key={index} index={index} baseDelay={0.1}>
                  <div className={cn(
                    "bg-card rounded-2xl border border-border shadow-card overflow-hidden h-full flex flex-col hover:shadow-elevated hover:-translate-y-1 transition-all duration-300",
                    isRTL && "text-right"
                  )}>
                    {/* Header */}
                    <div className="p-8 border-b border-border">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {t("caseStudies.caseStudyLabel")}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{study.client}</h3>
                      <div className={cn("flex items-center gap-2 mt-2", isRTL && "flex-row-reverse")}>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{study.industry}</span>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100">
                          <div className={cn("flex items-center gap-1.5 mb-1", isRTL && "flex-row-reverse")}>
                            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">{t("caseStudies.fundingAmount")}</p>
                          </div>
                          <p className="text-base font-bold text-foreground">{study.funding}</p>
                        </div>
                        <div className="bg-sky-50 rounded-xl px-4 py-3 border border-sky-100">
                          <div className={cn("flex items-center gap-1.5 mb-1", isRTL && "flex-row-reverse")}>
                            <Clock className="h-3.5 w-3.5 text-sky-600" />
                            <p className="text-[10px] text-sky-600 font-medium uppercase tracking-wider">{t("caseStudies.approvalTime")}</p>
                          </div>
                          <p className="text-base font-bold text-foreground">{study.timeline}</p>
                        </div>
                      </div>

                      {/* Growth Journey */}
                      <div className="mt-4 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50 p-4 border border-emerald-100/60">
                        <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                          <div className={isRTL ? "text-right" : "text-left"}>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t("caseStudies.before")}</p>
                            <p className="text-sm font-semibold text-slate-500 mt-0.5">{study.before}</p>
                          </div>
                          <div className="flex-1 flex items-center gap-1.5">
                            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-emerald-300" />
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                              <TrendingUp className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-emerald-300 to-emerald-500" />
                          </div>
                          <div className={isRTL ? "text-left" : "text-right"}>
                            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">{t("caseStudies.after")}</p>
                            <p className="text-sm font-bold text-emerald-700 mt-0.5">{study.after}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 flex-1 space-y-5">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">{t("caseStudies.challenge")}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">{t("caseStudies.solution")}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">{t("caseStudies.keyResults")}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.results}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>
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
                    {t("caseStudies.ctaButton")}
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

export default CaseStudies;
