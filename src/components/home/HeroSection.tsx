import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator, Building2, Users, Award, ChevronLeft, ChevronRight, Lightbulb, CheckCircle2, Landmark, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";

// Import background images
import heroSlide1 from "@/assets/hero-slide-1.webp";
import heroSlide2 from "@/assets/hero-slide-2.webp";
import heroSlide3 from "@/assets/hero-slide-3.webp";
import heroSlide4 from "@/assets/hero-slide-4.webp";

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const heroSlides = [
    {
      badge: t('hero.trustedBy'),
      badgeIcon: Award,
      title: t('hero.unlockPotential'),
      highlight: t('hero.smartFinancing'),
      description: t('hero.heroDesc'),
      backgroundImage: heroSlide1,
      stats: [
        { icon: Building2, value: "15+", label: t('hero.yearsExperience') },
        { icon: Users, value: "500+", label: t('hero.businessesServed') },
        { icon: Award, value: "AED 800M+", label: t('hero.loansFacilitated') },
      ],
    },
    {
      badge: t('hero.completeBanking'),
      badgeIcon: Building2,
      title: t('hero.yourOneStop'),
      highlight: t('hero.businessSuccess'),
      description: t('hero.bankingDesc'),
      backgroundImage: heroSlide2,
      stats: [
        { icon: Building2, value: "5+", label: t('hero.accountTypes') },
        { icon: Users, value: "100%", label: t('hero.compliance') },
        { icon: Award, value: "24/7", label: t('hero.onlineBanking') },
      ],
    },
    {
      badge: t('hero.simpleSolutions'),
      badgeIcon: Lightbulb,
      title: t('hero.situationsComplex'),
      highlight: t('hero.solutionsSimple'),
      description: t('hero.solutionsDesc'),
      backgroundImage: heroSlide3,
      stats: [
        { icon: Building2, value: "10+", label: t('hero.financingSolutions') },
        { icon: Users, value: isRTL ? "خبراء" : "Expert", label: t('hero.advisoryTeam') },
        { icon: Award, value: "100%", label: t('hero.clientFocus') },
      ],
    },
    {
      badge: t('hero.flexibleRefinancing'),
      badgeIcon: RefreshCw,
      title: t('hero.topUpBuyout'),
      highlight: t('hero.buyoutOptions'),
      description: t('hero.refinancingDesc'),
      backgroundImage: heroSlide4,
      stats: [
        { icon: Building2, value: isRTL ? "سريع" : "Quick", label: t('hero.processing') },
        { icon: Users, value: isRTL ? "أفضل" : "Better", label: t('hero.terms') },
        { icon: Award, value: isRTL ? "مرن" : "Flexible", label: t('hero.options') },
      ],
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="relative h-[calc(100vh-2rem)] overflow-hidden">
      {/* Background Images with Crossfade */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[current].backgroundImage})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.12, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 pt-4 pb-12 md:pt-6 md:pb-16 relative z-10 h-full">
        <div className={`grid lg:grid-cols-2 gap-4 lg:gap-8 items-center h-full ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          {/* Left Content */}
          <div className={`flex flex-col justify-center ${isRTL ? 'text-right' : ''}`}>
            {/* Carousel - only animated text content */}
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
                direction: isRTL ? "rtl" : "ltr",
                watchDrag: false,
              }}
              plugins={[
                Autoplay({
                  delay: 6000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full overflow-visible"
            >
              <CarouselContent className="-ml-0" allowOverflow>
                {heroSlides.map((slide, index) => (
                  <CarouselItem key={index} className="pl-0 overflow-visible">
                    <AnimatePresence mode="wait">
                      {current === index && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="space-y-4 min-h-[180px] md:min-h-[220px]"
                        >
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-primary-foreground/90 text-sm font-medium backdrop-blur-sm border border-primary-foreground/20 ${isRTL ? 'flex-row-reverse' : ''}`}
                          >
                            <slide.badgeIcon className="h-4 w-4" />
                            {slide.badge}
                          </div>

                          <h1 className="text-display-sm md:text-display text-primary-foreground leading-tight">
                            {slide.title}{" "}
                            <span className="text-accent">{slide.highlight}</span>
                          </h1>

                          <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
                            {slide.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Static elements - fixed position regardless of slide */}
            <div className={`flex flex-col sm:flex-row gap-3 flex-wrap mt-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild variant="accent" size="xl">
                <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('common.contactUs')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href="#calculator" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calculator className="h-5 w-5" />
                  {t('hero.calculateEligibility')}
                </a>
              </Button>
            </div>

            {/* Business Bank Account Highlight */}
            <div className="mt-5">
              <Link
                to="/business-accounts"
                className={`inline-flex items-center gap-3 px-4 py-2.5 bg-accent hover:bg-accent/90 border border-accent rounded-xl text-primary transition-all duration-300 group shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-accent" />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-xs text-primary/70">{t('hero.needBusinessAccount')}</p>
                  <p className="text-sm font-bold text-primary uppercase tracking-wide group-hover:underline">{t('hero.businessBankAccount')}</p>
                </div>
                <ArrowRight className={`h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 ${isRTL ? 'rotate-180 translate-x-2 group-hover:translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}`} />
              </Link>
            </div>

            {/* Trust Badges - crossfade per slide */}
            <div className={`pt-5 mt-5 border-t border-primary-foreground/20`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-wrap gap-5 md:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {heroSlides[current].stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
                        <stat.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                        <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center gap-4 mt-6">
              {/* Dots with Progress */}
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                      current === index
                        ? "w-8 bg-primary-foreground/30"
                        : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {current === index && (
                      <motion.div
                        className="absolute inset-0 bg-accent rounded-full"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrows */}
              <div className={`flex gap-2 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                <button
                  onClick={() => isRTL ? api?.scrollNext() : api?.scrollPrev()}
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all backdrop-blur-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={() => isRTL ? api?.scrollPrev() : api?.scrollNext()}
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all backdrop-blur-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Free Service Card */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-elevated p-7 border border-border/50 max-w-sm">
                <div className="text-center mb-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-primary mb-1">{t('hero.free100')}</h3>
                  <p className="text-lg font-semibold text-primary">{t('hero.noStrings')}</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    t('hero.noServiceFees'),
                    t('hero.noConsultancyCharges'), 
                    t('hero.noHiddenCosts')
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-lg bg-muted/50 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="mt-5 pt-5 border-t border-border text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    {t('hero.weEarnFromBanks')}
                  </p>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 48V20C240 4 480 0 720 0C960 0 1200 4 1440 20V48H0Z" fill="hsl(var(--background))" />
          <path d="M0 20C240 4 480 0 720 0C960 0 1200 4 1440 20" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.35" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
