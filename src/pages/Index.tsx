import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import BusinessAccountsSection from "@/components/home/BusinessAccountsSection";
import CalculatorSection from "@/components/home/CalculatorSection";
import PartnersSection from "@/components/home/PartnersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Taamul Credit Review Services | Business Financing Solutions in UAE"
        description="Taamul Credit Review Services connects UAE businesses with the right financing solutions, including business loans, working capital, trade finance, and expert credit advisory."
      />
      <Header />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <BusinessAccountsSection />
        <CalculatorSection />
        <PartnersSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
