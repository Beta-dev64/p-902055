import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FusionField } from "@/components/FusionField";
import { SplitHeadline, Magnetic } from "@/components/motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070605] text-white">
      <FusionField />
      <div className="relative z-10 px-6 text-center">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
          Signal lost
        </p>
        <SplitHeadline
          as="h1"
          text="This page drifted into deep space."
          className="mx-auto max-w-2xl font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-md text-white/60">
          The link you followed may be broken, or the page may have been moved.
        </p>
        <div className="mt-9 flex items-center justify-center">
          <Magnetic strength={0.25}>
            <Link to="/" className="hero-cta-primary inline-flex">
              Back to base
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
