import { Link } from "react-router-dom";
import { Quote, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    quote: "TAAMUL helped us secure the right financing solution quickly and efficiently. Their team understood our industry and found us the perfect banking partner.",
    author: "Noura Frikh",
    company: "Accounting & Book Keeping, Dubai",
    rating: 5,
  },
  {
    quote: "As an SME, we struggled to get traditional bank financing. TAAMUL's expertise opened doors we didn't know existed. Highly recommended for any business owner.",
    author: "Joby Paul Muttath",
    company: "Aquapix General Trading, Ajman",
    rating: 5,
  },
  {
    quote: "The transparency and professionalism throughout the process was exceptional. They negotiated rates that saved us significantly in interest over the loan term.",
    author: "Zaheer Ismail",
    company: "Zisma Trading, Dubai",
    rating: 5,
  },
  {
    quote: "From the initial consultation to final approval, the TAAMUL team was incredibly supportive. They made the entire financing process seamless and stress-free.",
    author: "Abdual Majid",
    company: "Golden Will Businessman Services, Dubai",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? 'text-right' : ''}`}>
          <p className="text-primary font-semibold mb-3 uppercase tracking-wide text-sm">
            {t('testimonialsSection.title')}
          </p>
          <h2 className="text-display-sm text-foreground mb-4">
            {t('testimonialsSection.heading')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('testimonialsSection.description')}
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedItem key={index} index={index} baseDelay={0.1}>
              <div className={`bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 relative h-full ${isRTL ? 'text-right' : ''}`}>
                {/* Quote Icon */}
                <div className={`absolute -top-4 ${isRTL ? 'right-8' : 'left-8'}`}>
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Quote className="h-4 w-4 text-accent-foreground" />
                  </div>
                </div>

                {/* Rating */}
                <div className={`flex gap-1 mb-4 pt-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className={`flex items-center gap-4 pt-4 border-t border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>

        {/* CTA Button */}
        <AnimatedSection delay={0.3} direction="none" className="text-center mt-12">
          <Button asChild variant="default" size="lg">
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

export default TestimonialsSection;
