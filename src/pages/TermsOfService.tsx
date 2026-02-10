import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Scale,
  FileText,
  BookOpen,
  Briefcase,
  UserCheck,
  ClipboardCheck,
  Upload,
  AlertTriangle,
  Receipt,
  Database,
  Copyright,
  ShieldAlert,
  Gavel,
  RefreshCw,
  Mail,
} from "lucide-react";

const sections = [
  { key: "s1", icon: FileText },
  { key: "s2", icon: BookOpen },
  { key: "s3", icon: Briefcase },
  { key: "s4", icon: UserCheck },
  { key: "s5", icon: ClipboardCheck },
  { key: "s6", icon: Upload },
  { key: "s7", icon: AlertTriangle },
  { key: "s8", icon: Receipt },
  { key: "s9", icon: Database },
  { key: "s10", icon: Copyright },
  { key: "s11", icon: ShieldAlert },
  { key: "s12", icon: Gavel },
  { key: "s13", icon: RefreshCw },
  { key: "s14", icon: Mail },
];

const TermsOfService = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEO
        title={`${t("terms.title")} | Taamul Credit`}
        description={t("terms.subtitle")}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary via-primary to-navy-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <AnimatedSection>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-accent text-sm font-medium mb-6",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Scale className="h-4 w-4" />
                  {t("terms.badge")}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t("terms.title")}
                </h1>
                <p className="text-base md:text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                  {t("terms.subtitle")}
                </p>
                <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/70 text-sm">
                  {t("terms.lastUpdated")}
                </span>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {sections.map((section, index) => {
                const SectionIcon = section.icon;
                const titleKey = `terms.${section.key}Title`;
                const contentKey = `terms.${section.key}Content`;
                const itemsKey = `terms.${section.key}Items`;
                const noteKey = `terms.${section.key}Note`;
                const items = t(itemsKey);
                const note = t(noteKey);
                const hasItems = items && items !== itemsKey;
                const hasNote = note && note !== noteKey;

                return (
                  <AnimatedSection key={section.key}>
                    <div
                      className={cn(
                        "bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border",
                        isRTL && "text-right"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 mb-4",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        <SectionIcon className="h-4.5 w-4.5 text-primary/50 flex-shrink-0" />
                        <span className="text-xs font-bold text-primary/40 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-lg md:text-xl font-bold text-foreground">
                          {t(titleKey)}
                        </h2>
                      </div>

                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {t(contentKey)}
                      </p>

                      {hasItems && (
                        <ul
                          className={cn(
                            "mt-4 space-y-1.5 list-disc marker:text-primary/60",
                            isRTL ? "pr-5" : "pl-5"
                          )}
                        >
                          {items.split("|").map((item: string, i: number) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground leading-relaxed"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {hasNote && (
                        <p className="mt-4 text-sm text-primary/80 font-medium bg-primary/5 rounded-lg px-4 py-3">
                          {note}
                        </p>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default TermsOfService;
