import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBlogBySlug, getRelatedPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  ChevronRight,
  Phone,
} from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  const [activeHeading, setActiveHeading] = useState("");

  const post = slug ? getBlogBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post.slug, post.category, 3) : [];

  // Scroll spy for TOC
  useEffect(() => {
    if (!post || post.sections.length === 0) return;

    const h2Sections = post.sections.filter((s) => s.level === "h2");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    h2Sections.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">{t("blogPost.notFound")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("blogPost.notFoundDesc")}
          </p>
          <Button asChild>
            <Link to="/knowledge-center">{t("knowledgeCenter.backToKnowledge")}</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const title = language === "ar" ? post.titleAr : post.title;
  const description = language === "ar" ? post.descriptionAr : post.description;
  const category = language === "ar" ? post.categoryAr : post.category;

  const formattedDate = new Date(post.date).toLocaleDateString(
    isRTL ? "ar-AE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Determine image placement: image index 1 after ~1/3 sections, image index 2 after ~2/3 sections
  const totalSections = post.sections.length;
  const img2After = Math.max(1, Math.floor(totalSections / 3));
  const img3After = Math.max(2, Math.floor((totalSections * 2) / 3));

  const h2Sections = post.sections
    .map((s, i) => ({ ...s, index: i }))
    .filter((s) => s.level === "h2");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} | Taamul Credit`}
        description={post.description}
        keywords={post.keywords}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.description,
          "image": post.heroImage,
          "datePublished": post.date,
          "author": { "@type": "Organization", "name": "Taamul Credit Review Services" },
          "publisher": { "@type": "Organization", "name": "Taamul Credit Review Services" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://taamulcredit.com" },
            { "@type": "ListItem", "position": 2, "name": "Knowledge Center", "item": "https://taamulcredit.com/knowledge-center" },
            { "@type": "ListItem", "position": 3, "name": post.title }
          ]
        })}</script>
      </Helmet>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative">
          <div className="aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden relative">
            <img
              src={post.heroImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 pb-8 md:pb-12">
              <AnimatedSection>
                {/* Breadcrumb */}
                <nav
                  className={cn(
                    "flex items-center gap-1.5 text-sm text-white/60 mb-4",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Link
                    to="/knowledge-center"
                    className="hover:text-white transition-colors"
                  >
                    {t("knowledgeCenter.title")}
                  </Link>
                  <ChevronRight
                    className={cn("h-3.5 w-3.5", isRTL && "rotate-180")}
                  />
                  <span className="text-white/80 line-clamp-1">{title}</span>
                </nav>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold mb-3">
                  {category}
                </span>

                {/* Title */}
                <h1
                  className={cn(
                    "text-2xl md:text-4xl lg:text-display-sm font-bold text-white mb-4 max-w-4xl",
                    isRTL && "text-right"
                  )}
                >
                  {title}
                </h1>

                {/* Meta */}
                <div
                  className={cn(
                    "flex items-center gap-4 text-sm text-white/70",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <Clock className="h-4 w-4" />
                    {post.readTime} {t("knowledgeCenter.minRead")}
                  </span>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div
              className={cn(
                "flex gap-10 lg:gap-16",
                isRTL ? "flex-row-reverse" : ""
              )}
            >
              {/* Sidebar TOC - Desktop */}
              {h2Sections.length > 0 && (
                <aside className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-28">
                    <h4
                      className={cn(
                        "text-sm font-semibold text-foreground mb-4 uppercase tracking-wider",
                        isRTL && "text-right"
                      )}
                    >
                      {t("blogPost.inThisArticle")}
                    </h4>
                    <nav className="space-y-1">
                      {h2Sections.map((section, i) => {
                        const heading =
                          language === "ar"
                            ? section.headingAr
                            : section.heading;
                        const sectionId = `section-${section.index}`;
                        return (
                          <a
                            key={i}
                            href={`#${sectionId}`}
                            className={cn(
                              "block text-sm py-1.5 px-3 rounded-md transition-colors border-l-2",
                              activeHeading === sectionId
                                ? "text-primary border-primary bg-primary/5 font-medium"
                                : "text-muted-foreground border-transparent hover:text-foreground hover:border-border",
                              isRTL &&
                                "text-right border-l-0 border-r-2"
                            )}
                          >
                            {heading}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                </aside>
              )}

              {/* Main Content */}
              <article
                className={cn(
                  "flex-1 max-w-3xl",
                  isRTL && "text-right"
                )}
              >
                {post.sections.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      {t("blogPost.contentUpdating")}
                    </p>
                  </div>
                ) : (
                  post.sections.map((section, i) => {
                    const heading =
                      language === "ar"
                        ? section.headingAr
                        : section.heading;
                    const content =
                      language === "ar"
                        ? section.contentAr
                        : section.content;
                    const HeadingTag = section.level === "h2" ? "h2" : "h3";

                    return (
                      <div key={i}>
                        <div
                          id={`section-${i}`}
                          className="scroll-mt-24"
                        >
                          <HeadingTag
                            className={cn(
                              section.level === "h2"
                                ? "text-xl md:text-2xl font-bold text-foreground mt-10 mb-4"
                                : "text-lg md:text-xl font-semibold text-foreground mt-8 mb-3"
                            )}
                          >
                            {heading}
                          </HeadingTag>
                          <div
                            className="text-muted-foreground leading-relaxed space-y-4 prose-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        </div>

                        {/* Inline images after ~1/3 and ~2/3 of sections */}
                        {i === img2After && post.images[1] && (
                          <div className="my-8 rounded-xl overflow-hidden shadow-card">
                            <img
                              src={post.images[1]}
                              alt={`${title} - illustration`}
                              loading="lazy"
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                        {i === img3After && post.images[2] && (
                          <div className="my-8 rounded-xl overflow-hidden shadow-card">
                            <img
                              src={post.images[2]}
                              alt={`${title} - illustration`}
                              loading="lazy"
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}

                {/* Back Link */}
                <div className="mt-12 pt-8 border-t border-border">
                  <button
                    onClick={() => navigate("/knowledge-center")}
                    className={cn(
                      "flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    {isRTL ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : (
                      <ArrowLeft className="h-4 w-4" />
                    )}
                    {t("knowledgeCenter.backToKnowledge")}
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 md:py-20 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                {t("knowledgeCenter.ctaHeading")}
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                {t("knowledgeCenter.ctaDesc")}
              </p>
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-4 justify-center",
                  isRTL && "sm:flex-row-reverse"
                )}
              >
                <Button asChild variant="accent" size="xl">
                  <Link
                    to="/contact"
                    className={cn(
                      "flex items-center gap-2",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    {t("common.contactUs")}
                    <ArrowRight
                      className={cn("h-5 w-5", isRTL && "rotate-180")}
                    />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <a
                    href="tel:+971529015022"
                    className={cn(
                      "flex items-center gap-2",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    <Phone className="h-5 w-5" />
                    {t("ctaSection.callNow")} +971 52 901 5022
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <AnimatedSection>
                <h2
                  className={cn(
                    "text-2xl md:text-3xl font-bold text-foreground mb-8 text-center",
                    isRTL && "text-right"
                  )}
                >
                  {t("knowledgeCenter.relatedArticles")}
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedPosts.map((rp, i) => (
                  <AnimatedItem key={rp.slug} index={i} baseDelay={0.1}>
                    <BlogCard
                      slug={rp.slug}
                      title={language === "ar" ? rp.titleAr : rp.title}
                      description={
                        language === "ar" ? rp.descriptionAr : rp.description
                      }
                      category={
                        language === "ar" ? rp.categoryAr : rp.category
                      }
                      date={rp.date}
                      readTime={rp.readTime}
                      heroImage={rp.heroImage}
                    />
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default BlogPost;
