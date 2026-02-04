import { Link } from "react-router-dom";
import {
  Wallet,
  Users,
  PiggyBank,
  Lock,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";

const BusinessAccountsSection = () => {
  const { t, isRTL } = useLanguage();

  const accountTypes = [
    {
      icon: Wallet,
      titleKey: "businessAccountsSection.currentAccount",
      descKey: "businessAccountsSection.currentAccountDesc",
    },
    {
      icon: Users,
      titleKey: "businessAccountsSection.wpsAccount",
      descKey: "businessAccountsSection.wpsAccountDesc",
    },
    {
      icon: PiggyBank,
      titleKey: "businessAccountsSection.businessSavings",
      descKey: "businessAccountsSection.businessSavingsDesc",
    },
    {
      icon: Lock,
      titleKey: "businessAccountsSection.escrowAccount",
      descKey: "businessAccountsSection.escrowAccountDesc",
    },
    {
      icon: Building2,
      titleKey: "businessAccountsSection.corporateAccount",
      descKey: "businessAccountsSection.corporateAccountDesc",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? 'text-right' : ''}`}>
          <p className="text-accent font-semibold mb-3 uppercase tracking-wide text-sm">
            {t('businessAccountsSection.title')}
          </p>
          <h2 className="text-display-sm text-white mb-4">
            {t('businessAccountsSection.heading')}
          </h2>
          <p className="text-lg text-white/70">
            {t('businessAccountsSection.description')}
          </p>
        </AnimatedSection>

        {/* Account Types */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-12">
          {accountTypes.map((account, index) => (
            <AnimatedItem key={account.titleKey} index={index} baseDelay={0.1} className="h-full">
              <div className={`flex flex-col items-center p-4 md:p-6 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 h-full ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                  <account.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(account.titleKey)}
                </h3>
                <p className="text-sm text-white/70">
                  {t(account.descKey)}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </div>

        {/* CTA Button */}
        <AnimatedSection delay={0.3} direction="none" className="text-center">
          <Button asChild variant="accent" size="lg">
            <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t('common.talkToExpert')}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BusinessAccountsSection;
