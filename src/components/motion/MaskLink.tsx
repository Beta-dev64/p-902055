/**
 * Dual-layer mask hover label: the base text slides up and out while the
 * brand-coloured duplicate slides in from below.
 */
export function MaskLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`mask-link ${className}`}>
      <span className="mask-base">{text}</span>
      <span className="mask-alt" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

