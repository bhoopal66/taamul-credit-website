import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index";

// Lazy-loaded pages for code splitting
const Services = lazy(() => import("./pages/Services"));
const BusinessLoans = lazy(() => import("./pages/loans/BusinessLoans"));
const WorkingCapital = lazy(() => import("./pages/loans/WorkingCapital"));
const SecuredLoans = lazy(() => import("./pages/loans/SecuredLoans"));
const SMELoans = lazy(() => import("./pages/loans/SMELoans"));
const CorporateLoans = lazy(() => import("./pages/loans/CorporateLoans"));
const EquipmentFinancing = lazy(() => import("./pages/loans/EquipmentFinancing"));
const TradeFinance = lazy(() => import("./pages/loans/TradeFinance"));
const Syndicated = lazy(() => import("./pages/loans/Syndicated"));
const DebtAdvisory = lazy(() => import("./pages/services/DebtAdvisory"));
const MezzanineFinancing = lazy(() => import("./pages/services/MezzanineFinancing"));
const BusinessAccounts = lazy(() => import("./pages/BusinessAccounts"));
const Contact = lazy(() => import("./pages/Contact"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const KnowledgeCenter = lazy(() => import("./pages/KnowledgeCenter"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Events = lazy(() => import("./pages/knowledge/Events"));
const CaseStudies = lazy(() => import("./pages/knowledge/CaseStudies"));
const ComingSoon = lazy(() => import("./pages/knowledge/ComingSoon"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/loans/business-loans" element={<BusinessLoans />} />
              <Route path="/loans/working-capital" element={<WorkingCapital />} />
              <Route path="/loans/secured-loans" element={<SecuredLoans />} />
              <Route path="/loans/sme-loans" element={<SMELoans />} />
              <Route path="/loans/corporate-loans" element={<CorporateLoans />} />
              <Route path="/loans/equipment-financing" element={<EquipmentFinancing />} />
              <Route path="/loans/trade-finance" element={<TradeFinance />} />
              <Route path="/loans/syndicated" element={<Syndicated />} />
              <Route path="/services/debt-advisory" element={<DebtAdvisory />} />
              <Route path="/services/mezzanine-financing" element={<MezzanineFinancing />} />
              <Route path="/business-accounts" element={<BusinessAccounts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/knowledge-center" element={<KnowledgeCenter />} />
              <Route path="/knowledge-center/:slug" element={<BlogPost />} />
              <Route path="/knowledge/events" element={<Events />} />
              <Route path="/knowledge/case-studies" element={<CaseStudies />} />
              <Route path="/knowledge/research-papers" element={<ComingSoon pageKey="research" />} />
              <Route path="/knowledge/webinars" element={<ComingSoon pageKey="webinars" />} />
              <Route path="/knowledge/videos" element={<ComingSoon pageKey="videos" />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
