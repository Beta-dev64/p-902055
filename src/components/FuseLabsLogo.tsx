import { cn } from "@/lib/utils";
import logoBlack from "@/assets/fuselabs-logo-black.png.asset.json";
import logoTransparent from "@/assets/fuselabs-logo-transparent.png.asset.json";

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
    <img
      src={variant === "onAccent" ? logoTransparent.url : logoBlack.url}
      alt=""
      className={cn("h-10 w-10 shrink-0 object-contain", className)}
      aria-hidden="true"
    />
  );
}

export function FuseLabsLogo({
  className,
  markClassName,
  wordmarkClassName: _wordmarkClassName,
  variant = "default",
}: FuseLabsLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <FuseLabsMark className={markClassName} variant={variant} />
    </span>
  );
}
