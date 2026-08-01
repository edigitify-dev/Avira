import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";

/** lucide-react no longer ships brand marks — minimal glyphs matched to its stroke style. */
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} {...props}>
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const company = ["Home", "About", "Our team", "Contact"];
const practiceAreas = ["Corporate advisory", "Litigation", "Compliance", "Transparent engagement"];
const socials = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: XIcon, label: "X (Twitter)", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <AnimatedSection
      as="footer"
      stagger
      staggerChildren={0.1}
      className="bg-ink px-6 pb-8 pt-20 text-cream sm:px-16"
    >
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <p className="font-serif text-2xl">Avira</p>
          <p className="mt-4 max-w-xs font-sans text-sm leading-6 text-cream/60">
            Strategic legal counsel for modern businesses — clear, responsive, and always in your
            corner.
          </p>
          <div className="mt-6 flex gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-cream/50 transition-colors hover:text-rust"
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Company
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {company.map((item) => (
              <li key={item}>
                <a href="#" className="font-sans text-sm text-cream/70 transition-colors hover:text-cream">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Practice areas
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {practiceAreas.map((item) => (
              <li key={item}>
                <a href="#" className="font-sans text-sm text-cream/70 transition-colors hover:text-cream">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40">
            Contact
          </p>
          <ul className="mt-5 flex flex-col gap-3 font-sans text-sm text-cream/70">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              hello@avira.law
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              New Delhi, India
            </li>
          </ul>
        </StaggerItem>
      </div>

      <StaggerItem className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs text-cream/40">
          © {new Date().getFullYear()} Avira Legal Platform. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="font-sans text-xs text-cream/40 transition-colors hover:text-cream">
            Privacy policy
          </a>
          <a href="#" className="font-sans text-xs text-cream/40 transition-colors hover:text-cream">
            Terms of service
          </a>
        </div>
      </StaggerItem>
    </AnimatedSection>
  );
}
