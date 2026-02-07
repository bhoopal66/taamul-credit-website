import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const KnowledgeCenter = () => {
  const { t, isRTL, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${t("knowledgeCenter.title")} | ${t("knowledgeCenter.subtitle")} | Taamul Credit`}
        description="Expert insights on UAE business financing, loans, equipment funding, and banking. Practical guides to help your business grow."
        keywords="UAE business loans, business financing guide, equipment financing, startup loans UAE, knowledge center"
      />
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="py-12 md:py-20 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className={`max-w-3xl mx-auto text-center ${isRTL ? "text-right" : ""}`}>
              <span className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-accent text-sm font-medium mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <BookOpen className="h-4 w-4" />
                {t("knowledgeCenter.badge")}
              </span>
              <h1 className="text-display-sm md:text-display text-primary-foreground mb-4">
                {t("knowledgeCenter.title")}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                {t("knowledgeCenter.subtitle")}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Category Filter + Cards */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Category Pills */}
            <AnimatedSection className="mb-10">
              <div className={cn(
                "flex flex-wrap gap-2 justify-center",
                isRTL && "flex-row-reverse"
              )}>
                <button
                  onClick={() => setActiveCategory("All")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeCategory === "All"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {t("knowledgeCenter.allCategories")}
                </button>
                {blogCategories.map((cat) => (
                  <button
                    key={cat.en}
                    onClick={() => setActiveCategory(cat.en)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      activeCategory === cat.en
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {language === "ar" ? cat.ar : cat.en}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <AnimatedItem key={post.slug} index={index} baseDelay={0.1}>
                  <BlogCard
                    slug={post.slug}
                    title={language === "ar" ? post.titleAr : post.title}
                    description={language === "ar" ? post.descriptionAr : post.description}
                    category={language === "ar" ? post.categoryAr : post.category}
                    date={post.date}
                    readTime={post.readTime}
                    heroImage={post.heroImage}
                  />
                </AnimatedItem>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {language === "ar"
                    ? "لا توجد مقالات في هذه الفئة حالياً."
                    : "No articles in this category yet."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default KnowledgeCenter;
