// Style: Signal in Motion — a deliberate kinetic identity rail that names the delivery system without becoming decorative noise.
const signals = ["strategy", "product", "engineering", "cloud", "AI", "growth"];

const SignalTicker = () => (
  <section className="signal-ticker overflow-hidden border-b border-[#8C4E12] bg-[#DE8321] py-4 text-[#17110B]" aria-label="FuseLabs capabilities">
    <div className="signal-ticker-track flex w-max items-center gap-6 whitespace-nowrap pl-5 sm:gap-10 sm:pl-8">
      {[...signals, ...signals].map((signal, index) => <span key={`${signal}-${index}`} className="flex items-center gap-6 font-display text-[clamp(1.7rem,3vw,3.2rem)] font-medium lowercase tracking-[-0.07em] sm:gap-10"><span>{signal}</span><span className="font-mono text-sm tracking-normal">↗</span></span>)}
    </div>
  </section>
);

export default SignalTicker;
