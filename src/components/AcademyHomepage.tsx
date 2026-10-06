import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import academyPhoto from "@/assets/academy/academy-hero-photo.jpg";

export default function AcademyHomepage() {
  return (
    <section className="bg-muted py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <img src={academyPhoto} alt="Collaborative learning at FuseLabs Academy" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Learn with FuseLabs</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">FuseLabs Academy</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">Online programs in frontend, backend and AI/ML development. Explore the curriculum, compare programs and apply for your next step.</p>
          <p className="mt-5 text-sm font-medium">Frontend · Backend · AI &amp; Machine Learning</p>
          <Button asChild size="lg" className="mt-8"><Link to="/academic">Explore the Academy<ArrowUpRight aria-hidden="true" /></Link></Button>
        </div>
      </div>
    </section>
  );
}