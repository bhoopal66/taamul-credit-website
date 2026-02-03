import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";

// Banking partner logos
import rakbankLogo from "@/assets/partners/rakbank.png";
import ublLogo from "@/assets/partners/ubl.png";
import ruyaLogo from "@/assets/partners/ruya.png";
import nbfLogo from "@/assets/partners/nbf.png";
import wioLogo from "@/assets/partners/wio.png";
import mashreqLogo from "@/assets/partners/mashreq.png";

// Fintech partner logos
import credibleXLogo from "@/assets/partners/credible-x.png";
import flapkapLogo from "@/assets/partners/flapkap.png";
import comfiLogo from "@/assets/partners/comfi.png";
import fundingSouqLogo from "@/assets/partners/funding-souq.png";
import zeloLogo from "@/assets/partners/zelo.png";
import upfrontLogo from "@/assets/partners/upfront.png";

const partnerBanks = [
  { name: "RAKBANK", logo: rakbankLogo },
  { name: "UBL", logo: ublLogo },
  { name: "Ruya Bank", logo: ruyaLogo },
  { name: "National Bank of Fujairah", logo: nbfLogo },
  { name: "WIO Bank", logo: wioLogo },
  { name: "Mashreq Bank", logo: mashreqLogo },
];

const fintechPartners = [
  { name: "Credible X", logo: credibleXLogo },
  { name: "Flapkap", logo: flapkapLogo },
  { name: "Comfi", logo: comfiLogo },
  { name: "Funding Souq", logo: fundingSouqLogo },
  { name: "Zelo", logo: zeloLogo },
  { name: "Upfront", logo: upfrontLogo },
];

const PartnersSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <AnimatedSection className={`text-center ${isRTL ? 'text-right' : ''}`}>
          <p className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">
            {t('partnersSection.title')}
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            {t('partnersSection.heading')}
          </h2>
        </AnimatedSection>
      </div>

      {/* Banking Partners Marquee */}
      <AnimatedSection delay={0.2} direction="none">
        <p className="text-center text-sm font-medium text-muted-foreground mb-4">
          {t('partnersSection.bankingPartners')}
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-muted to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-muted to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...partnerBanks, ...partnerBanks].map((bank, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-3 sm:mx-8 group"
              >
                <div className="w-32 sm:w-40 h-16 sm:h-20 bg-card rounded-xl shadow-sm flex items-center justify-center px-3 sm:px-4 transition-all duration-300 group-hover:shadow-card">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-h-10 sm:max-h-12 max-w-[90%] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Fintech Partners Marquee */}
      <AnimatedSection delay={0.3} direction="none" className="mt-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-4">
          {t('partnersSection.fintechPartners')}
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-muted to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-muted to-transparent z-10" />

          <div className="flex animate-marquee-reverse">
            {[...fintechPartners, ...fintechPartners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-3 sm:mx-8 group"
              >
                <div className="w-36 sm:w-44 h-16 sm:h-20 bg-card rounded-xl shadow-sm flex items-center justify-center px-3 sm:px-4 transition-all duration-300 group-hover:shadow-card">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 sm:max-h-12 max-w-[90%] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Button */}
      <AnimatedSection delay={0.4} direction="none" className="text-center mt-10">
        <Button asChild variant="default" size="lg">
          <Link to="/contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t('common.talkToExpert')}
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </Button>
      </AnimatedSection>
    </section>
  );
};

export default PartnersSection;
