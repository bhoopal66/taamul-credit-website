import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Events = () => {
  const { t, isRTL } = useLanguage();

  const events = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: t(`events.event${i}Title`),
    desc: t(`events.event${i}Desc`),
    date: t(`events.event${i}Date`),
    time: t(`events.event${i}Time`),
    location: t(`events.event${i}Location`),
    type: t(`events.event${i}Type`),
    price: t(`events.event${i}Price`),
    spots: t(`events.event${i}Spots`),
  }));

  const typeStyles: Record<string, string> = {
    inPerson: "bg-primary/10 text-primary",
    online: "bg-accent/10 text-accent-foreground",
    hybrid: "bg-success/10 text-success",
  };

  const typeLabel = (type: string) => {
    if (type === "inPerson") return t("events.inPerson");
    if (type === "online") return t("events.online");
    return t("events.hybrid");
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${t("events.title")} | Taamul Credit`}
        description={t("events.subtitle")}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-20 md:pb-28 bg-gradient-to-br from-primary via-primary to-navy-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <AnimatedSection>
                <span className={cn("inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-accent text-sm font-medium mb-6", isRTL && "flex-row-reverse")}>
                  <Calendar className="h-4 w-4" />
                  {t("events.badge")}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t("events.title")}
                </h1>
                <p className="text-base md:text-xl text-white mb-8 max-w-3xl mx-auto">
                  {t("events.subtitle")}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <AnimatedItem key={index} index={index} baseDelay={0.1}>
                  <div className={cn(
                    "bg-card rounded-2xl border border-border shadow-card p-8 h-full flex flex-col hover:shadow-elevated hover:-translate-y-1 transition-all duration-300",
                    isRTL && "text-right"
                  )}>
                    {/* Type + Status Badges */}
                    <div className={cn("flex items-center gap-2 mb-5 flex-wrap", isRTL && "flex-row-reverse")}>
                      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", typeStyles[event.type] || typeStyles.inPerson)}>
                        {typeLabel(event.type)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        {t("events.upcoming")}
                      </span>
                      {event.price === t("events.free") || event.price === "Free" || event.price === "مجاني" ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground">
                          {t("events.free")}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {event.price}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-4">{event.title}</h3>

                    {/* Details */}
                    <div className="space-y-2.5 mb-5">
                      <div className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                        <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                        <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                        <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", isRTL && "flex-row-reverse")}>
                        <Users className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{event.spots} {t("events.spotsLeft")}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">{event.desc}</p>

                    {/* CTA */}
                    <Button className="w-full" asChild>
                      <Link to="/contact">{t("events.registerNow")}</Link>
                    </Button>
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
                  {t("events.ctaTitle")}
                </h2>
                <p className="text-xl text-white mb-8">
                  {t("events.ctaDesc")}
                </p>
                <Button asChild size="xl" variant="accent">
                  <Link to="/contact" className={cn("inline-flex items-center gap-2", isRTL && "flex-row-reverse")}>
                    {t("nav.contactUs")}
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

export default Events;
