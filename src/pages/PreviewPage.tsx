import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, EyeOff, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { callAdminFunction, getAdminPassword } from "@/lib/admin-session";

type PreviewType = "service" | "program" | "case-study";

interface PreviewItem {
  slug: string;
  title: string;
  tagline?: string | null;
  description?: string | null;
  image?: string | null;
  published: boolean;
  price?: string | null;
  duration?: string | null;
  level?: string | null;
  highlights?: string[] | null;
  deliverables?: string[] | null;
  process?: string[] | null;
  syllabus?: string[] | null;
  outcomes?: string[] | null;
  tools?: string[] | null;
  technologies?: string[] | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  tags?: string[] | null;
}

const LABELS: Record<PreviewType, string> = {
  service: "Service",
  program: "Academy program",
  "case-study": "Case study",
};

const LIVE_PATH: Record<PreviewType, (slug: string) => string> = {
  service: (slug) => `/services/${slug}`,
  program: (slug) => `/academic/${slug}`,
  "case-study": (slug) => `/case-study/${slug}`,
};

const ListBlock = ({ title, items }: { title: string; items?: string[] | null }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h2 className="mb-3 font-display text-xl font-semibold text-foreground">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HtmlBlock = ({ title, html }: { title: string; html?: string | null }) => {
  if (!html) return null;
  return (
    <div>
      <h2 className="mb-3 font-display text-xl font-semibold text-foreground">{title}</h2>
      <div
        className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

const PreviewPage = () => {
  const { type, slug } = useParams<{ type: PreviewType; slug: string }>();
  const [item, setItem] = useState<PreviewItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!type || !slug) return;
      if (!getAdminPassword()) {
        setError("Sign in to the admin dashboard first, then reopen this preview.");
        setLoading(false);
        return;
      }
      try {
        const data = await callAdminFunction<{ item: PreviewItem }>("cms-preview", {
          type,
          slug,
        });
        setItem(data.item);
      } catch (err) {
        console.error(err);
        setError("Could not load this draft. Check that it is saved and you are signed in.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [type, slug]);

  const label = type ? LABELS[type] : "Content";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Draft preview | FuseLabs IO Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />

      <main className="pb-20 pt-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <EyeOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="font-medium">
                Draft preview — {label}
                {item && !item.published ? " (not published yet)" : item ? " (live)" : ""}
              </span>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link to="/admin">
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to admin
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading draft…
            </div>
          ) : error ? (
            <Card className="p-8 text-center">
              <p className="mb-4 text-muted-foreground">{error}</p>
              <Button asChild>
                <Link to="/admin">Go to admin login</Link>
              </Button>
            </Card>
          ) : item ? (
            <article className="space-y-10">
              <header className="space-y-3">
                <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  {item.title}
                </h1>
                {item.tagline && <p className="text-lg text-primary">{item.tagline}</p>}
                <p className="text-sm text-muted-foreground">
                  URL when published:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5">
                    {LIVE_PATH[(type as PreviewType) || "service"](item.slug)}
                  </code>
                </p>
                {(item.price || item.duration || item.level) && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[item.price, item.duration, item.level]
                      .filter(Boolean)
                      .map((meta) => (
                        <span
                          key={meta as string}
                          className="rounded-full bg-muted px-3 py-1 text-sm text-foreground"
                        >
                          {meta}
                        </span>
                      ))}
                  </div>
                )}
              </header>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-2xl border border-border object-cover"
                  loading="lazy"
                />
              )}

              {item.description && (
                <p className="text-lg leading-relaxed text-muted-foreground">{item.description}</p>
              )}

              <HtmlBlock title="Challenge" html={item.challenge} />
              <HtmlBlock title="Solution" html={item.solution} />
              <HtmlBlock title="Results" html={item.results} />

              <ListBlock title="Highlights" items={item.highlights} />
              <ListBlock title="Deliverables" items={item.deliverables} />
              <ListBlock title="Process" items={item.process} />
              <ListBlock title="Syllabus" items={item.syllabus} />
              <ListBlock title="Outcomes" items={item.outcomes} />
              <ListBlock title="Tools" items={item.tools} />
              <ListBlock title="Technologies" items={item.technologies} />
              <ListBlock title="Tags" items={item.tags} />
            </article>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PreviewPage;
