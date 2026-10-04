import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { useSocialLinks, type SocialLinks } from "@/lib/social";

export const SOCIAL_FIELDS: { key: keyof SocialLinks; label: string; icon: typeof Twitter }[] = [
  { key: "twitter_url", label: "X (Twitter)", icon: Twitter },
  { key: "linkedin_url", label: "LinkedIn", icon: Linkedin },
  { key: "facebook_url", label: "Facebook", icon: Facebook },
  { key: "instagram_url", label: "Instagram", icon: Instagram },
  { key: "github_url", label: "GitHub", icon: Github },
];

/** Profile icons; renders nothing until at least one link is set in admin. */
export function SocialIcons({ className = "" }: { className?: string }) {
  const links = useSocialLinks();
  const set = SOCIAL_FIELDS.filter((f) => links?.[f.key]);
  if (!set.length) return null;
  return (
    <div className={`flex space-x-4 ${className}`}>
      {set.map(({ key, label, icon: Icon }) => (
        <a key={key} href={links![key]!} target="_blank" rel="noopener noreferrer" aria-label={label}
          className="text-muted-foreground transition-colors hover:text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </a>
      ))}
    </div>
  );
}

export function FollowUs() {
  const links = useSocialLinks();
  if (!SOCIAL_FIELDS.some((f) => links?.[f.key])) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Follow us</span>
      <SocialIcons />
    </div>
  );
}
