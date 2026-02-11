import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Info, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEiborRates } from "@/hooks/useEiborRates";
import { cn } from "@/lib/utils";

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const StepperInput = ({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) => (
  <div className="flex items-center rounded-md border border-input overflow-hidden">
    <button
      type="button"
      onClick={() => onChange(clamp(+(value - step).toFixed(10), min, max))}
      disabled={value <= min}
      className="h-10 w-10 shrink-0 bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
    >
      <Minus className="h-3.5 w-3.5" />
    </button>
    <input
      type="number"
      value={value}
      onChange={(e) => {
        const parsed = parseFloat(e.target.value);
        if (!isNaN(parsed))
          onChange(clamp(step >= 1 ? Math.round(parsed) : parsed, min, max));
      }}
      min={min}
      max={max}
      step={step}
      className="h-10 w-full bg-background text-center text-sm font-medium text-foreground border-x border-input outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
    <button
      type="button"
      onClick={() => onChange(clamp(+(value + step).toFixed(10), min, max))}
      disabled={value >= max}
      className="h-10 w-10 shrink-0 bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
    >
      <Plus className="h-3.5 w-3.5" />
    </button>
  </div>
);

const CalculatorSection = () => {
  const { t, isRTL } = useLanguage();
  const eiborRates = useEiborRates();

  const [turnover, setTurnover] = useState(5000000);
  const [rateMode, setRateMode] = useState<"eibor" | "manual">("eibor");
  const [eiborTenor, setEiborTenor] = useState<"3m" | "6m">("3m");
  const [bankSpread, setBankSpread] = useState(2);
  const [manualRate, setManualRate] = useState(7);
  const [tenure, setTenure] = useState(12);

  const { eligibleAmount, effectiveRate, monthlyPayment } = useMemo(() => {
    const eligible = Math.min(turnover / 8, 3000000);

    let totalRate: number;
    if (rateMode === "eibor") {
      const baseRate =
        eiborTenor === "3m" ? eiborRates.threeMonth : eiborRates.sixMonth;
      totalRate = baseRate + bankSpread;
    } else {
      totalRate = manualRate;
    }

    let emi = 0;
    if (eligible > 0 && tenure > 0) {
      const r = totalRate / 12 / 100;
      if (r > 0) {
        emi =
          (eligible * r * Math.pow(1 + r, tenure)) /
          (Math.pow(1 + r, tenure) - 1);
      } else {
        emi = eligible / tenure;
      }
    }

    return { eligibleAmount: eligible, effectiveRate: totalRate, monthlyPayment: emi };
  }, [turnover, rateMode, eiborTenor, bankSpread, manualRate, tenure, eiborRates]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(Math.round(value));

  const rtl = isRTL ? "flex-row-reverse" : "";

  return (
    <section id="calculator" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-accent rounded-full" />
            <p className="text-primary font-semibold uppercase tracking-wide text-sm">
              {t("calculator.sectionEyebrow")}
            </p>
            <span className="w-8 h-0.5 bg-accent rounded-full" />
          </div>
          <h2 className="text-2xl md:text-display-sm text-foreground mb-4">
            {t("calculator.sectionHeading")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("calculator.sectionDescription")}
          </p>
        </AnimatedSection>

        {/* Calculator Card */}
        <AnimatedSection>
          <div
            className={`bg-card rounded-3xl p-6 md:p-8 shadow-elevated border border-border ${isRTL ? "text-right" : ""}`}
          >
            <div
              className={`grid lg:grid-cols-2 gap-6 lg:gap-8 ${isRTL ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Left - Inputs */}
              <div>
                {/* Calculator Header */}
                <div className={`flex items-center gap-3 mb-6 ${rtl}`}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t("calculator.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("calculator.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Annual Turnover Slider */}
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${rtl}`}>
                      <label className="text-sm font-medium text-foreground">
                        {t("calculator.annualTurnover")}
                      </label>
                      <span className="text-base font-bold text-primary">
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
                    <div className={`flex justify-between text-xs text-muted-foreground ${rtl}`}>
                      <span>AED 500K</span>
                      <span>AED 100M</span>
                    </div>
                  </div>

                  {/* Rate Mode Toggle */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("calculator.rateMode")}
                    </label>
                    <div className={`flex rounded-lg bg-muted p-1 ${rtl}`}>
                      <button
                        type="button"
                        onClick={() => setRateMode("eibor")}
                        className={cn(
                          "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                          rateMode === "eibor"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {t("calculator.eiborPlusSpread")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRateMode("manual")}
                        className={cn(
                          "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                          rateMode === "manual"
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {t("calculator.manualRate")}
                      </button>
                    </div>
                  </div>

                  {/* EIBOR Mode Inputs */}
                  {rateMode === "eibor" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {t("calculator.eiborTenor")}
                        </label>
                        <div className={`flex rounded-lg bg-muted p-1 ${rtl}`}>
                          <button
                            type="button"
                            onClick={() => setEiborTenor("3m")}
                            className={cn(
                              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                              eiborTenor === "3m"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {t("calculator.threeMonthEibor")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEiborTenor("6m")}
                            className={cn(
                              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                              eiborTenor === "6m"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {t("calculator.sixMonthEibor")}
                          </button>
                        </div>
                      </div>

                      {/* Bank Spread + Tenure side by side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {t("calculator.bankSpread")}
                          </label>
                          <StepperInput
                            value={bankSpread}
                            onChange={setBankSpread}
                            min={0}
                            max={10}
                            step={0.1}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {t("calculator.tenure")}
                          </label>
                          <StepperInput
                            value={tenure}
                            onChange={setTenure}
                            min={1}
                            max={120}
                            step={1}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Manual Rate + Tenure side by side */}
                  {rateMode === "manual" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {t("calculator.manualAnnualRate")}
                        </label>
                        <StepperInput
                          value={manualRate}
                          onChange={setManualRate}
                          min={0}
                          max={30}
                          step={0.1}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {t("calculator.tenure")}
                        </label>
                        <StepperInput
                          value={tenure}
                          onChange={setTenure}
                          min={1}
                          max={120}
                          step={1}
                        />
                      </div>
                    </div>
                  )}

                  {/* Info Note */}
                  <div className={`flex items-center gap-2 p-3 bg-muted rounded-lg ${rtl}`}>
                    <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {t("calculator.minRequirement")}
                    </p>
                  </div>

                  {/* Live EIBOR Indicator */}
                  {rateMode === "eibor" && eiborRates.isLive && (
                    <div className={`flex items-center gap-1.5 ${rtl}`}>
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
                      <span className="text-xs text-success font-medium">
                        Live CBUAE Data
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Results */}
              <motion.div
                key={`${eligibleAmount}-${effectiveRate}-${monthlyPayment}`}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-6 md:p-8 gradient-hero text-primary-foreground h-full flex flex-col justify-between ${isRTL ? "text-right" : ""}`}
              >
                <div>
                  {/* Eligible Amount */}
                  <div className="mb-6">
                    <p className="text-sm opacity-80 mb-1">
                      {t("calculator.estimatedAmount")}
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold">
                      {formatCurrency(eligibleAmount)}
                    </p>
                  </div>

                  <div className="border-t border-white/20 my-5" />

                  {/* Rate + EMI */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs opacity-70 mb-1">
                        {t("calculator.effectiveRate")}
                      </p>
                      <p className="text-2xl font-bold">
                        {effectiveRate.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs opacity-70 mb-1">
                        {t("calculator.estMonthlyPayment")}
                      </p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(monthlyPayment)}
                      </p>
                      <p className="text-xs opacity-60 mt-0.5">
                        {t("calculator.perMonth")}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs opacity-60 mt-4">
                    {t("calculator.subNote")}
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    {t("calculator.estimateDisclaimer")}
                  </p>
                </div>

                <Button asChild variant="accent" size="lg" className="w-full mt-6">
                  <Link
                    to="/contact"
                    className={`flex items-center justify-center gap-2 ${rtl}`}
                  >
                    {t("common.talkToExpert")}
                    <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CalculatorSection;
