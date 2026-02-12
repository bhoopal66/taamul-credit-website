import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { TrendingUp, ArrowRight, Building2, Clock, CheckCircle2 } from "lucide-react";
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

        {/* Case Studies */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-10">
              {studies.map((study, index) => {
                const resultItems = study.results.split(". ").map(s => s.replace(/\.$/, "")).filter(Boolean);
                return (
                <AnimatedItem key={index} index={index} baseDelay={0.1}>
                  <div className={cn(
                    "bg-card rounded-2xl border border-border shadow-card overflow-hidden",
                    isRTL && "text-right"
                  )}>
                    {/* Card Header */}
                    <div className={cn("flex items-center justify-between px-6 md:px-8 py-5", isRTL && "flex-row-reverse")}>
                      <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">{study.client}</h3>
                          <p className="text-sm text-primary/70">{study.industry}</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-full whitespace-nowrap">
                        {t("caseStudies.caseStudyLabel")} #{index + 1}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-0.5 bg-primary/20" />

                    {/* Body: Two Column Layout */}
                    <div className={cn("grid md:grid-cols-2 gap-8 p-6 md:p-8", isRTL && "md:grid-flow-dense")}>
                      {/* Left Column: Challenge & Solution */}
                      <div className={cn("space-y-6", isRTL && "md:col-start-2")}>
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{t("caseStudies.challenge")}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{t("caseStudies.solution")}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                        </div>
                      </div>

                      {/* Right Column: Key Results */}
                      <div className={isRTL ? "md:col-start-1" : ""}>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{t("caseStudies.keyResults")}</h4>
                        <ul className="space-y-3">
                          {resultItems.map((item, i) => (
                            <li key={i} className={cn("flex items-start gap-2.5", isRTL && "flex-row-reverse")}>
                              <CheckCircle2 className="h-4.5 w-4.5 text-primary/70 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Metrics */}
                        <div className={cn("grid grid-cols-2 gap-3 mt-6", isRTL && "direction-rtl")}>
                          <div className="bg-primary/5 rounded-xl px-4 py-3 border border-primary/10">
                            <div className={cn("flex items-center gap-1.5 mb-1", isRTL && "flex-row-reverse")}>
                              <TrendingUp className="h-3.5 w-3.5 text-primary/60" />
                              <p className="text-[10px] text-primary/60 font-medium uppercase tracking-wider">{t("caseStudies.fundingAmount")}</p>
                            </div>
                            <p className="text-base font-bold text-foreground">{study.funding}</p>
                          </div>
                          <div className="bg-primary/5 rounded-xl px-4 py-3 border border-primary/10">
                            <div className={cn("flex items-center gap-1.5 mb-1", isRTL && "flex-row-reverse")}>
                              <Clock className="h-3.5 w-3.5 text-primary/60" />
                              <p className="text-[10px] text-primary/60 font-medium uppercase tracking-wider">{t("caseStudies.approvalTime")}</p>
                            </div>
                            <p className="text-base font-bold text-foreground">{study.timeline}</p>
                          </div>
                        </div>

                        {/* Before / After */}
                        <div className="mt-3 rounded-xl bg-primary/5 p-4 border border-primary/10">
                          <div className={cn("flex items-center justify-between gap-4", isRTL && "flex-row-reverse")}>
                            <div className={isRTL ? "text-right" : "text-left"}>
                              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t("caseStudies.before")}</p>
                              <p className="text-lg font-bold text-foreground mt-0.5">{study.before}</p>
                            </div>
                            <ArrowRight className={cn("h-5 w-5 text-primary/40 flex-shrink-0", isRTL && "rotate-180")} />
                            <div className={isRTL ? "text-left" : "text-right"}>
                              <p className="text-[10px] text-primary font-medium uppercase tracking-wider">{t("caseStudies.after")}</p>
                              <p className="text-lg font-bold text-primary mt-0.5">{study.after}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
                );
              })}
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
