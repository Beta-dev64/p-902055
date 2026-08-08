import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const years = new Date();
  return (
    <footer className="relative overflow-hidden border-t border-border bg-muted py-8 text-foreground md:py-12">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-4 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-3 flex items-center space-x-2 md:mb-4">
              <img src="/logo.svg" alt="FuseLabs IO" className="h-8 dark:brightness-0 dark:invert" />
              <span className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
                FuseLabs
              </span>
            </div>
            <p className="mb-3 max-w-md text-sm text-muted-foreground md:mb-4 md:text-base">
              We craft digital solutions that transform your business vision into powerful, scalable
              applications that drive growth and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-transform duration-300 hover:translate-x-1 hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold md:mb-4 md:text-lg">Services</h3>
            <ul className="space-y-1 md:space-y-2">
              {[
                ["Custom Development", "/#features"],
                ["Cloud Solutions", "/#features"],
                ["AI & ML", "/academic"],
                ["Consulting", "/#details"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-block text-sm text-muted-foreground transition-transform duration-300 hover:translate-x-2 hover:text-primary md:text-base"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold md:mb-4 md:text-lg">Company</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link
                  to="/portfolio"
                  className="inline-block text-sm text-muted-foreground transition-transform duration-300 hover:translate-x-2 hover:text-primary md:text-base"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/academic"
                  className="inline-block text-sm text-muted-foreground transition-transform duration-300 hover:translate-x-2 hover:text-primary md:text-base"
                >
                  Academy
                </Link>
              </li>
              <li>
                <a
                  href="/#details"
                  className="inline-block text-sm text-muted-foreground transition-transform duration-300 hover:translate-x-2 hover:text-primary md:text-base"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-block text-sm text-muted-foreground transition-transform duration-300 hover:translate-x-2 hover:text-primary md:text-base"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-4 flex flex-col items-center justify-between space-y-2 text-xs md:mb-6 md:flex-row md:space-y-0 md:text-sm">
          <p className="text-muted-foreground">
            © {years.getFullYear()} FuseLabs IO. All rights reserved.
          </p>
          <div className="flex space-x-3 md:space-x-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 left-0 right-0 overflow-hidden text-center md:-bottom-12">
        <h2 className="select-none font-display text-6xl font-bold tracking-wider text-foreground/[0.04] md:text-8xl lg:text-9xl">
          FuseLabsIO
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
