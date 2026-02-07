import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: number;
  heroImage: string;
}

const BlogCard = ({ slug, title, description, category, date, readTime, heroImage }: BlogCardProps) => {
  const { t, isRTL } = useLanguage();

  const formattedDate = new Date(date).toLocaleDateString(isRTL ? "ar-AE" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to={`/knowledge-center/${slug}`}
      className="group block bg-card rounded-2xl shadow-card border border-border hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className={`p-5 md:p-6 flex flex-col flex-1 ${isRTL ? "text-right" : ""}`}>
        {/* Category Badge */}
        <span className="inline-block self-start px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-semibold mb-3">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className={`flex items-center justify-between pt-4 border-t border-border ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-4 text-xs text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Clock className="h-3.5 w-3.5" />
              {readTime} {t("knowledgeCenter.minRead")}
            </span>
          </div>
          <span className={`flex items-center gap-1 text-sm font-medium text-primary ${isRTL ? "flex-row-reverse" : ""}`}>
            {t("knowledgeCenter.readMore")}
            <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
