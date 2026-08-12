// Style: Shared FuseLabs identity — compact fusion symbol plus a calm editorial wordmark that works across charcoal and paper surfaces.
type BrandLockupProps = {
  light?: boolean;
  compact?: boolean;
};

const BrandLockup = ({ light = false, compact = false }: BrandLockupProps) => (
  <span className={`inline-flex items-center ${compact ? "gap-2" : "gap-3"}`}>
    <svg aria-hidden="true" viewBox="0 0 54 44" className={compact ? "h-7 w-8" : "h-8 w-10"} fill="none">
      <path d="M7 4h36l-5 13H20l-4 10H4l5-13h17l4-10H7Z" fill={light ? "#F7F1E8" : "#DE8321"} />
      <path d="M20 27h28l-5 13H29l-4 10H17l5-13h15l4-10H20Z" fill={light ? "#DE8321" : "#F7F1E8"} transform="translate(-2 -7)" />
    </svg>
    <span className={`font-display text-[1.2rem] font-bold tracking-[-0.07em] ${light ? "text-[#F7F1E8]" : "text-[#151311]"}`}>
      Fuse<span className="text-[#DE8321]">Labs</span>
    </span>
  </span>
);

export default BrandLockup;
