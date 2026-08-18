import { cn } from "@/lib/utils";

type FuseLabsLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  variant?: "default" | "onAccent";
};

export function FuseLabsMark({
  className,
  variant = "default",
}: Pick<FuseLabsLogoProps, "className" | "variant">) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden="true"
    >
      <path
        d="M23.72 6.81A12 12 0 1 1 25.19 23.72"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M21.14 9.54A8 8 0 1 1 22.12 20.81"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.38"
      />
      <circle
        cx="16"
        cy="16"
        r="4.4"
        className={variant === "onAccent" ? "fill-white dark:fill-primary" : "fill-primary"}
      />
    </svg>
  );
}

export function FuseLabsLogo({
  className,
  markClassName,
  wordmarkClassName,
  variant = "default",
}: FuseLabsLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <FuseLabsMark className={markClassName} variant={variant} />
      <span
        className={cn(
          "font-display text-[0.95rem] font-extrabold uppercase leading-none tracking-[0.18em] sm:text-[1.05rem] sm:tracking-[0.2em]",
          wordmarkClassName
        )}
      >
        FuseLabs
        <span
          className={cn(
            "ml-1.5 tracking-[0.22em]",
            variant === "onAccent" ? "text-white dark:text-primary" : "text-primary"
          )}
        >
          IO
        </span>
      </span>
    </span>
  );
}
