import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Landmark,
  Banknote,
  Shield,
  Building,
  Building2,
  Cog,
  Ship,
  Users,
  TrendingUp,
  Layers,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

const loanServices: ServiceLink[] = [
  { name: "Term Loans", href: "/loans/term-loans", icon: Landmark },
  { name: "Working Capital", href: "/loans/working-capital", icon: Banknote },
  { name: "Secured Loans", href: "/loans/secured-loans", icon: Shield },
  { name: "SME Loans", href: "/loans/sme-loans", icon: Building },
  { name: "Corporate Loans", href: "/loans/corporate-loans", icon: Building2 },
  { name: "Equipment Financing", href: "/loans/equipment-financing", icon: Cog },
  { name: "Trade Finance", href: "/loans/trade-finance", icon: Ship },
  { name: "Co-Lending", href: "/loans/co-lending", icon: Users },
];

const advisoryServices: ServiceLink[] = [
  { name: "Debt Advisory", href: "/services/debt-advisory", icon: TrendingUp },
  { name: "Mezzanine Financing", href: "/services/mezzanine-financing", icon: Layers },
];

const ServiceSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-28 space-y-6">
        {/* Loan Products */}
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
              Loan Products
            </h3>
          </div>
          <nav className="p-3 space-y-1">
            {loanServices.map((service) => {
              const Icon = service.icon;
              const active = isActive(service.href);
              return (
                <Link
                  key={service.href}
                  to={service.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-primary-foreground" : "text-muted-foreground")} />
                  {service.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Advisory Services */}
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
              Advisory Services
            </h3>
          </div>
          <nav className="p-3 space-y-1">
            {advisoryServices.map((service) => {
              const Icon = service.icon;
              const active = isActive(service.href);
              return (
                <Link
                  key={service.href}
                  to={service.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-accent-foreground" : "text-muted-foreground")} />
                  {service.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground">
          <h4 className="font-semibold mb-2">Need Help Choosing?</h4>
          <p className="text-sm text-primary-foreground/80 mb-4">
            Our experts can guide you to the right financing solution.
          </p>
          <Button asChild variant="hero" size="sm" className="w-full">
            <Link to="/contact" className="flex items-center justify-center gap-2">
              Talk to Expert
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* All Services Link */}
        <Link
          to="/services"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm font-medium"
        >
          View All Services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
};

export default ServiceSidebar;
