import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const SITE_URL = "https://fuselabsio.lovable.app";

/** Link that social networks read for the rich preview (image, title, summary). */
export const blogShareUrl = (slug: string) => `${SITE_URL}/share/${slug}.html`;

const plain = (md: string) =>
  md.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]+/g, " ").replace(/\s+/g, " ").trim();

/** Ready-to-post text: title, a short teaser from the article, and the link. */
export function buildPostText(post: { title: string; excerpt?: string | null; content?: string | null; tags?: string[] | null }, max = 220) {
  const teaser = (post.excerpt || plain(post.content || "")).trim();
  const short = teaser.length > max ? teaser.slice(0, max).replace(/\s+\S*$/, "") + "…" : teaser;
  const tags = (post.tags || []).slice(0, 3).map((t) => "#" + t.replace(/[^a-z0-9]/gi, "")).filter((t) => t.length > 1).join(" ");
  return [post.title, short, tags].filter(Boolean).join("\n\n");
}

export const shareIntents = (slug: string, text: string) => {
  const url = blogShareUrl(slug);
  return {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${text}\n\n${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    url,
  };
};

export type SocialLinks = {
  twitter_url: string | null; linkedin_url: string | null; github_url: string | null;
  facebook_url: string | null; instagram_url: string | null;
};

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLinks | null>(null);
  useEffect(() => {
    (supabase as any).from("site_settings").select("*").eq("id", 1).maybeSingle()
      .then(({ data }: { data: SocialLinks | null }) => setLinks(data));
  }, []);
  return links;
}
