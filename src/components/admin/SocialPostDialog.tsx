import { useState } from "react";
import { Linkedin, Twitter, Facebook, Copy, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { buildPostText, shareIntents } from "@/lib/social";
import type { BlogPostRow } from "@/pages/BlogPage";

/** One-click: prepares the post text and opens X / LinkedIn / Facebook to publish it. */
export function SocialPostDialog({ post }: { post: BlogPostRow }) {
  const [text, setText] = useState(() => buildPostText(post));
  const { toast } = useToast();
  const s = shareIntents(post.slug, text);
  const xTooLong = text.length + 24 > 280;

  return (
    <Dialog onOpenChange={(o) => o && setText(buildPostText(post))}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Megaphone className="mr-1 h-3 w-3" /> Post to social</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Share "{post.title}"</DialogTitle></DialogHeader>
        <div className="overflow-hidden rounded-lg border border-border">
          {post.cover_image && <img src={post.cover_image} alt="" className="aspect-[1.91/1] w-full object-cover" />}
          <div className="bg-muted p-3">
            <p className="text-xs uppercase text-muted-foreground">fuselabsio.lovable.app</p>
            <p className="font-medium">{post.title}</p>
            {post.excerpt && <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">This preview card appears under your post. Edit the post text below:</p>
        <Textarea rows={7} value={text} onChange={(e) => setText(e.target.value)} />
        {xTooLong && <p className="text-xs text-destructive">Too long for X (280 characters). Shorten it before posting to X.</p>}
        <div className="flex flex-wrap gap-2">
          <Button asChild><a href={s.x} target="_blank" rel="noopener noreferrer"><Twitter className="mr-2 h-4 w-4" />Post to X</a></Button>
          <Button asChild><a href={s.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" />Post to LinkedIn</a></Button>
          <Button asChild variant="outline"><a href={s.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="mr-2 h-4 w-4" />Facebook</a></Button>
          <Button variant="outline" onClick={async () => {
            await navigator.clipboard.writeText(`${text}\n\n${s.url}`);
            toast({ title: "Copied post text and link" });
          }}><Copy className="mr-2 h-4 w-4" />Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
