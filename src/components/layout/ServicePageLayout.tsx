import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import ServiceSidebar from "@/components/layout/ServiceSidebar";

interface ServicePageLayoutProps {
  children: ReactNode;
  heroSection: ReactNode;
}

const ServicePageLayout = ({ children, heroSection }: ServicePageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section (full width) */}
      {heroSection}

      {/* Content with Sidebar */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <ServiceSidebar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ServicePageLayout;
