import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  variant?: "bar" | "menu";
};

export function ThemeToggle({ className, variant = "bar" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center transition-transform duration-200 hover:scale-105",
        variant === "bar" &&
          "rounded-full border border-border/70 bg-background/40 text-foreground backdrop-blur-md",
        variant === "menu" &&
          "rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md dark:border-primary-500/40 dark:bg-primary-500/15 dark:text-primary-400",
        className
      )}
    >
      {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
    </button>
  );
}
