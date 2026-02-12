import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import taamulLogo from "@/assets/taamul-logo-new.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const loanServices = [
    { name: t('loanServices.businessLoans'), href: "/loans/business-loans", description: t('loanServices.businessLoansDesc') },
    { name: t('loanServices.workingCapital'), href: "/loans/working-capital", description: t('loanServices.workingCapitalDesc') },
    { name: t('loanServices.securedLoans'), href: "/loans/secured-loans", description: t('loanServices.securedLoansDesc') },
    { name: t('loanServices.smeLoans'), href: "/loans/sme-loans", description: t('loanServices.smeLoansDesc') },
    { name: t('loanServices.corporateLoans'), href: "/loans/corporate-loans", description: t('loanServices.corporateLoansDesc') },
    { name: t('loanServices.equipmentFinancing'), href: "/loans/equipment-financing", description: t('loanServices.equipmentFinancingDesc') },
    { name: t('loanServices.tradeFinance'), href: "/loans/trade-finance", description: t('loanServices.tradeFinanceDesc') },
    { name: t('loanServices.syndicatedLoans'), href: "/loans/syndicated", description: t('loanServices.syndicatedLoansDesc') },
  ];

  const advisoryServices = [
    { name: t('advisoryServices.debtAdvisory'), href: "/services/debt-advisory", description: t('advisoryServices.debtAdvisoryDesc') },
    { name: t('advisoryServices.mezzanineFinancing'), href: "/services/mezzanine-financing", description: t('advisoryServices.mezzanineFinancingDesc') },
    { name: t('advisoryServices.bankFinancing'), href: "/services", description: t('advisoryServices.bankFinancingDesc') },
  ];

  const knowledgeHubItems = [
    { name: t('nav.knowledgeBlog'), href: "/knowledge-center", description: t('nav.knowledgeBlogDesc') },
    { name: t('nav.knowledgeEvents'), href: "/knowledge/events", description: t('nav.knowledgeEventsDesc') },
    { name: t('nav.knowledgeCaseStudies'), href: "/knowledge/case-studies", description: t('nav.knowledgeCaseStudiesDesc') },
    { name: t('nav.knowledgeResearchPapers'), href: "/knowledge/research-papers", description: t('nav.knowledgeResearchPapersDesc') },
    { name: t('nav.knowledgeWebinars'), href: "/knowledge/webinars", description: t('nav.knowledgeWebinarsDesc') },
    { name: t('nav.knowledgeVideos'), href: "/knowledge/videos", description: t('nav.knowledgeVideosDesc') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isLoanActive = () => location.pathname.startsWith("/loans/");
  const isServiceActive = () => location.pathname.startsWith("/services");
  const isKnowledgeActive = () => location.pathname.startsWith("/knowledge");

  const toggleMobileDropdown = (dropdown: string) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
      >
        {t('common.skipToContent')}
      </a>

      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className={cn("flex items-center justify-between h-10 text-sm", isRTL && "flex-row-reverse")}>
            <div className={cn("flex items-center gap-6", isRTL && "flex-row-reverse")}>
              <a href="tel:+97145502800" className={cn("flex items-center gap-2 hover:text-white/80 transition-colors", isRTL && "flex-row-reverse")}>
                <Phone className="h-3.5 w-3.5" />
                +971 4 550 2800
              </a>
              <a href="mailto:info@taamulcredit.com" className={cn("flex items-center gap-2 hover:text-white/80 transition-colors", isRTL && "flex-row-reverse")}>
                <Mail className="h-3.5 w-3.5" />
                info@taamulcredit.com
              </a>
            </div>
            <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
              <span className="text-primary-foreground/80">{t('topBar.tagline')}</span>
              <button
                onClick={toggleLanguage}
                className={cn("flex items-center gap-1.5 px-3 py-1 rounded bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors", isRTL && "flex-row-reverse")}
              >
                <Globe className="h-3.5 w-3.5" />
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-card border-b",
          isScrolled ? "shadow-card border-border" : "border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <nav className={cn("flex items-center justify-between h-16 lg:h-20", isRTL && "flex-row-reverse")}>
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={taamulLogo} alt="Taamul Credit Review Services" className="h-10 lg:h-11 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className={cn("hidden lg:flex items-center", isRTL && "flex-row-reverse")}>
              {/* Left nav group – dropdowns use default left-aligned viewport */}
              <NavigationMenu>
                <NavigationMenuList className={cn("gap-1", isRTL && "flex-row-reverse")}>
                  <NavigationMenuItem>
                    <Link
                      to="/"
                      className={cn(
                        "text-[15px] font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap",
                        isActive("/")
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      {t('nav.home')}
                    </Link>
                  </NavigationMenuItem>

                  {/* Loans Mega Menu */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-[15px] font-medium whitespace-nowrap bg-transparent hover:bg-primary/5 data-[state=open]:bg-primary/5 px-3 h-auto py-2 rounded-md",
                        isLoanActive()
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary data-[state=open]:text-primary"
                      )}
                    >
                      {t('nav.loans')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-6 bg-card border border-border rounded-lg shadow-elevated">
                        <div className={cn("mb-4 pb-3 border-b border-border", isRTL && "text-right")}>
                          <h3 className="font-semibold text-foreground">{t('nav.loanProducts')}</h3>
                          <p className="text-sm text-muted-foreground">{t('nav.comprehensiveFinancing')}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {loanServices.map((loan) => (
                            <NavigationMenuLink key={loan.href} asChild>
                              <Link
                                to={loan.href}
                                className={cn(
                                  "block p-3 rounded-lg transition-colors group",
                                  isActive(loan.href)
                                    ? "bg-primary/5"
                                    : "hover:bg-muted/50",
                                  isRTL && "text-right"
                                )}
                              >
                                <span className={cn(
                                  "font-medium text-sm transition-colors",
                                  isActive(loan.href)
                                    ? "text-primary"
                                    : "text-foreground group-hover:text-primary"
                                )}>
                                  {loan.name}
                                </span>
                                <p className="text-xs text-muted-foreground mt-0.5">{loan.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                        <div className={cn("mt-4 pt-3 border-t border-border", isRTL && "text-right")}>
                          <Link
                            to="/services"
                            className="text-sm text-primary hover:text-primary/80 font-medium"
                          >
                            {t('nav.viewAllServices')} {isRTL ? '←' : '→'}
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Services Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-[15px] font-medium whitespace-nowrap bg-transparent hover:bg-primary/5 data-[state=open]:bg-primary/5 px-3 h-auto py-2 rounded-md",
                        isServiceActive()
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary data-[state=open]:text-primary"
                      )}
                    >
                      {t('nav.services')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-6 bg-card border border-border rounded-lg shadow-elevated">
                        <div className="space-y-1">
                          {advisoryServices.map((service) => (
                            <NavigationMenuLink key={service.href} asChild>
                              <Link
                                to={service.href}
                                className={cn(
                                  "block p-3 rounded-lg transition-colors group",
                                  isActive(service.href)
                                    ? "bg-primary/5"
                                    : "hover:bg-muted/50",
                                  isRTL && "text-right"
                                )}
                              >
                                <span className={cn(
                                  "font-medium text-sm transition-colors",
                                  isActive(service.href)
                                    ? "text-primary"
                                    : "text-foreground group-hover:text-primary"
                                )}>
                                  {service.name}
                                </span>
                                <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/business-accounts"
                      className={cn(
                        "text-[15px] font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap",
                        isActive("/business-accounts")
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      {t('nav.businessAccounts')}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Right nav group – viewport right-aligned so Knowledge Hub dropdown appears under its trigger */}
              <NavigationMenu className={cn(!isRTL && "[&>div]:right-0 [&>div]:left-auto", isRTL && "[&>div]:left-0")}>
                <NavigationMenuList className={cn("gap-1", isRTL && "flex-row-reverse")}>
                  {/* Knowledge Hub Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-[15px] font-medium whitespace-nowrap bg-transparent hover:bg-primary/5 data-[state=open]:bg-primary/5 px-3 h-auto py-2 rounded-md",
                        isKnowledgeActive()
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary data-[state=open]:text-primary"
                      )}
                    >
                      {t('nav.knowledgeHub')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-6 bg-card border border-border rounded-lg shadow-elevated">
                        <div className={cn("mb-4 pb-3 border-b border-border", isRTL && "text-right")}>
                          <h3 className="font-semibold text-foreground">{t('nav.knowledgeHub')}</h3>
                          <p className="text-sm text-muted-foreground">{t('nav.knowledgeHubDesc')}</p>
                        </div>
                        <div className="space-y-1">
                          {knowledgeHubItems.map((item) => (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                to={item.href}
                                className={cn(
                                  "block p-3 rounded-lg transition-colors group",
                                  isActive(item.href)
                                    ? "bg-primary/5"
                                    : "hover:bg-muted/50",
                                  isRTL && "text-right"
                                )}
                              >
                                <span className={cn(
                                  "font-medium text-sm transition-colors",
                                  isActive(item.href)
                                    ? "text-primary"
                                    : "text-foreground group-hover:text-primary"
                                )}>
                                  {item.name}
                                </span>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/how-it-works"
                      className={cn(
                        "text-[15px] font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap",
                        isActive("/how-it-works")
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      {t('nav.howItWorks')}
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/about"
                      className={cn(
                        "text-[15px] font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap",
                        isActive("/about")
                          ? "text-primary font-semibold bg-primary/[0.07]"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      {t('nav.about')}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Side - CTA */}
            <div className={cn("hidden lg:flex items-center gap-3", isRTL && "flex-row-reverse")}>
              <Button asChild variant="default" size="default">
                <Link to="/contact">{t('nav.contactUs')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-md hover:bg-muted/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 bg-card border-t border-border",
            isMobileMenuOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
          )}
        >
          <div className={cn("container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto", isRTL && "text-right")}>
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium bg-primary/10 text-primary mb-2"
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              </span>
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            <Link
              to="/"
              className={cn(
                "block px-4 py-3 rounded-lg font-medium transition-colors",
                isActive("/") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              )}
            >
              {t('nav.home')}
            </Link>

            {/* Mobile Loans Accordion */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("loans")}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors",
                  isLoanActive() ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                )}
              >
                <span>{t('nav.loans')}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === "loans" && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openMobileDropdown === "loans" ? "max-h-96" : "max-h-0"
                )}
              >
                <div className={cn("py-2 space-y-1", isRTL ? "pr-4" : "pl-4")}>
                  {loanServices.map((loan) => (
                    <Link
                      key={loan.href}
                      to={loan.href}
                      className={cn(
                        "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                        isActive(loan.href) ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-muted/50 hover:text-foreground",
                        isRTL && "text-right"
                      )}
                    >
                      {loan.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Services Accordion */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("services")}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors",
                  isServiceActive() ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                )}
              >
                <span>{t('nav.services')}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === "services" && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openMobileDropdown === "services" ? "max-h-60" : "max-h-0"
                )}
              >
                <div className={cn("py-2 space-y-1", isRTL ? "pr-4" : "pl-4")}>
                  {advisoryServices.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      className={cn(
                        "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                        isActive(service.href) ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-muted/50 hover:text-foreground",
                        isRTL && "text-right"
                      )}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/business-accounts"
              className={cn(
                "block px-4 py-3 rounded-lg font-medium transition-colors",
                isActive("/business-accounts") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              )}
            >
              {t('nav.businessAccounts')}
            </Link>

            {/* Mobile Knowledge Hub Accordion */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("knowledge")}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors",
                  isKnowledgeActive() ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                )}
              >
                <span>{t('nav.knowledgeHub')}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMobileDropdown === "knowledge" && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openMobileDropdown === "knowledge" ? "max-h-96" : "max-h-0"
                )}
              >
                <div className={cn("py-2 space-y-1", isRTL ? "pr-4" : "pl-4")}>
                  {knowledgeHubItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                        isActive(item.href) ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-muted/50 hover:text-foreground",
                        isRTL && "text-right"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/how-it-works"
              className={cn(
                "block px-4 py-3 rounded-lg font-medium transition-colors",
                isActive("/how-it-works") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              )}
            >
              {t('nav.howItWorks')}
            </Link>

            <Link
              to="/about"
              className={cn(
                "block px-4 py-3 rounded-lg font-medium transition-colors",
                isActive("/about") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              )}
            >
              {t('nav.about')}
            </Link>

            <Link
              to="/contact"
              className={cn(
                "block px-4 py-3 rounded-lg font-medium transition-colors",
                isActive("/contact") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              )}
            >
              {t('nav.contact')}
            </Link>

            <div className="pt-4">
              <Button asChild className="w-full" size="lg">
                <Link to="/contact">{t('nav.contactUs')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
