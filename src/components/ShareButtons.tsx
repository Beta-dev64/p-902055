import { useState } from "react";
import { Linkedin, Twitter, Facebook, Link2, Check, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { buildPostText, shareIntents } from "@/lib/social";

type Post = { slug: string; title: string; excerpt?: string | null; content?: string | null; tags?: string[] | null };

export function ShareButtons({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const text = buildPostText(post, 160);
  const s = shareIntents(post.slug, text);
  const path = `/blog/${post.slug}`;
  const links = [
    { name: "X", icon: Twitter, href: s.x },
    { name: "LinkedIn", icon: Linkedin, href: s.linkedin },
    { name: "Facebook", icon: Facebook, href: s.facebook },
  ];
  const cls = "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted-foreground">Share</span>
      {links.map(({ name, icon: Icon, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`} className={cls}
          onClick={() => trackEvent("share", { network: name, path })}>
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button type="button" aria-label="Copy link" className={cls}
        onClick={async () => {
          await navigator.clipboard.writeText(s.url);
          setCopied(true);
          trackEvent("share", { network: "copy", path });
          setTimeout(() => setCopied(false), 2000);
        }}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button type="button" aria-label="More sharing options" className={cls}
          onClick={() => navigator.share({ title: post.title, text, url: s.url }).then(() => trackEvent("share", { network: "native", path })).catch(() => {})}>
          <Share2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
