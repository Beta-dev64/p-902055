import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import {
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Minus, Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  value: string; // markdown
  onChange: (markdown: string) => void;
}

const getMd = (editor: Editor): string =>
  (editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown();

async function uploadImage(file: File): Promise<string | null> {
  if (!file.type.startsWith("image/")) {
    toast({ title: "Invalid file type", description: "Please choose an image.", variant: "destructive" });
    return null;
  }
  if (file.size > 5 * 1024 * 1024) {
    toast({ title: "File too large", description: "Images must be under 5MB.", variant: "destructive" });
    return null;
  }
  const ext = file.name.split(".").pop();
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("uploads").upload(path, file);
  if (error) {
    toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    return null;
  }
  return supabase.storage.from("uploads").getPublicUrl(path).data.publicUrl;
}

export function RichTextEditor({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef<Editor | null>(null);

  const insertFiles = async (files: File[]) => {
    const ed = editorRef.current;
    if (!ed) return;
    setUploading(true);
    for (const f of files) {
      const url = await uploadImage(f);
      if (url) ed.chain().focus().setImage({ src: url, alt: f.name.replace(/\.[^.]+$/, "") }).run();
    }
    setUploading(false);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full" } }),
      Link.configure({ openOnClick: false }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose max-w-none min-h-[360px] px-4 py-3 focus:outline-none",
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files || []).filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        event.preventDefault();
        insertFiles(files);
        return true;
      },
      handleDrop: (_view, event) => {
        const files = Array.from((event as DragEvent).dataTransfer?.files || []).filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        event.preventDefault();
        insertFiles(files);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(getMd(editor)),
  });
  editorRef.current = editor;

  // Sync external changes (e.g. AI draft, editing another post)
  useEffect(() => {
    if (editor && value !== getMd(editor)) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const Btn = ({ onClick, active, label, children }: { onClick: () => void; active?: boolean; label: string; children: React.ReactNode }) => (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn("p-2 rounded hover:bg-muted text-foreground", active && "bg-muted text-primary")}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-input rounded-md bg-background">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input p-1 sticky top-0 bg-background z-10">
        <Btn label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold size={16} /></Btn>
        <Btn label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic size={16} /></Btn>
        <Btn label="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><Strikethrough size={16} /></Btn>
        <Btn label="Heading" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 size={16} /></Btn>
        <Btn label="Subheading" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 size={16} /></Btn>
        <Btn label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List size={16} /></Btn>
        <Btn label="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered size={16} /></Btn>
        <Btn label="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote size={16} /></Btn>
        <Btn label="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code size={16} /></Btn>
        <Btn label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></Btn>
        <Btn label="Link" onClick={setLink} active={editor.isActive("link")}><LinkIcon size={16} /></Btn>
        <Btn label="Insert image" onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
        </Btn>
        <span className="mx-1 h-5 w-px bg-border" />
        <Btn label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></Btn>
        <Btn label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></Btn>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            e.target.value = "";
            if (files.length) insertFiles(files);
          }}
        />
      </div>
      <EditorContent editor={editor} />
      <p className="px-4 py-2 text-xs text-muted-foreground border-t border-input">
        Tip: drag & drop or paste images straight into the article.
      </p>
    </div>
  );
}
