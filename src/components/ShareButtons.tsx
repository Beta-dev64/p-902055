import { useState } from "react";
import { Linkedin, Twitter, Facebook, Link2, Check, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const SITE = "https://fuselabsio.lovable.app";

export function ShareButtons({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}${path}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "X", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  const cls = "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors";

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
      trackEvent("share", { network: "native", path });
    } catch { /* cancelled */ }
  };

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
          await navigator.clipboard.writeText(url);
          setCopied(true);
          trackEvent("share", { network: "copy", path });
          setTimeout(() => setCopied(false), 2000);
        }}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button type="button" aria-label="More sharing options" className={cls} onClick={nativeShare}>
          <Share2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
