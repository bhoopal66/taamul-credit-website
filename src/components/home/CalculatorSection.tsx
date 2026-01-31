import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";

const benefitKeys = [
  "calculator.benefit1",
  "calculator.benefit2",
  "calculator.benefit3",
  "calculator.benefit4",
  "calculator.benefit5",
  "calculator.benefit6",
];

const CalculatorSection = () => {
  const { t, isRTL } = useLanguage();
  const [turnover, setTurnover] = useState(5000000);

  const eligibleAmount = useMemo(() => {
    let amount = turnover / 8;
    return Math.min(amount, 3000000);
  }, [turnover]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculator" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Left - Calculator */}
          <AnimatedSection direction={isRTL ? "right" : "left"}>
            <div className={`bg-card rounded-3xl p-8 shadow-elevated border border-border ${isRTL ? 'text-right' : ''}`}>
              <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t('calculator.title')}</h3>
                  <p className="text-muted-foreground">{t('calculator.subtitle')}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Annual Turnover Slider */}
                <div className="space-y-4">
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <label className="text-sm font-medium text-foreground">
                      {t('calculator.annualTurnover')}
                    </label>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(turnover)}
                    </span>
                  </div>
                  <Slider
                    value={[turnover]}
                    onValueChange={(value) => setTurnover(value[0])}
                    min={500000}
                    max={100000000}
                    step={500000}
                    className="w-full"
                  />
                  <div className={`flex justify-between text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>AED 500K</span>
                    <span>AED 100M</span>
                  </div>
                </div>

                {/* Minimum Requirement Note */}
                <div className={`flex items-center gap-2 p-3 bg-muted rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {t('calculator.minRequirement')}
                  </p>
                </div>
              </div>

              {/* Result */}
              <motion.div
                key={eligibleAmount}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`mt-8 p-6 rounded-2xl gradient-hero text-primary-foreground ${isRTL ? 'text-right' : ''}`}
              >
                <p className="text-sm opacity-80 mb-1">{t('calculator.estimatedAmount')}</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  {formatCurrency(eligibleAmount)}
                </p>
                <p className="text-xs opacity-70 mb-4">{t('calculator.estimateDisclaimer')}</p>
                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/contact" className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t('common.talkToExpert')}
                    <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right - Benefits */}
          <AnimatedSection direction={isRTL ? "left" : "right"} delay={0.1}>
            <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>
              <div>
                <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">
                  {t('calculator.whyChoose')}
                </p>
                <h2 className="text-display-sm text-foreground mb-4">
                  {t('calculator.fastTitle')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('calculator.fastDesc')}
                </p>
              </div>

              <div className="space-y-4">
                {benefitKeys.map((key, index) => (
                  <AnimatedItem key={key} index={index} baseDelay={0.3}>
                    <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                      <p className="text-foreground">{t(key)}</p>
                    </div>
                  </AnimatedItem>
                ))}
              </div>

              <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button asChild variant="default" size="lg">
                  <Link to="/how-it-works">{t('common.howItWorks')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">{t('common.talkToExpert')}</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
