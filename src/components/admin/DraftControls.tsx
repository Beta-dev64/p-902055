import React from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export type PreviewType = "service" | "program" | "case-study";

/** Draft/published switch used inside admin edit forms. */
export const PublishSwitch = ({
  published,
  onChange,
}: {
  published: boolean;
  onChange: (value: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
    <div>
      <p className="text-sm font-medium text-foreground">
        {published ? "Published" : "Draft"}
      </p>
      <p className="text-xs text-muted-foreground">
        {published
          ? "Live and visible to everyone on the site."
          : "Hidden from visitors — only visible in admin preview."}
      </p>
    </div>
    <Switch checked={published} onCheckedChange={onChange} aria-label="Published" />
  </div>
);

/** Small badge showing draft/published state in admin lists. */
export const StatusBadge = ({ published }: { published: boolean }) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
      published
        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
        : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
    }`}
  >
    {published ? "Published" : "Draft"}
  </span>
);

/** Opens the draft preview route in a new tab. */
export const PreviewButton = ({
  type,
  slug,
  disabled,
}: {
  type: PreviewType;
  slug: string;
  disabled?: boolean;
}) => (
  <Button size="sm" variant="outline" asChild disabled={disabled}>
    <Link to={`/preview/${type}/${slug}`} target="_blank" rel="noreferrer">
      <Eye className="mr-1 h-3 w-3" />
      Preview
    </Link>
  </Button>
);
