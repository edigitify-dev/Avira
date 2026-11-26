"use client";

import { EditableImage, EditableText, EditableLink } from "@/components/cms/Editable";

import { useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { practiceAreas } from "@/components/services/practiceAreas";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Expertise", href: "/services" },
  { label: "Join Us", href: "/join-us" },
  { label: "Reach Out", href: "/contact" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send email to your newsletter service
    setSubscribed(true);
  }

  return (
    <AnimatedSection
      as="footer"
      stagger
      staggerChildren={0.1}
      className="bg-slate px-6 pb-8 pt-20 text-cream sm:px-16"
    >
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <StaggerItem>
          <EditableImage contentId="components-Footer-1" scope="site"
            src="/logo.png"
            alt="Avira Law"
            width={200}
            height={100}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs font-sans text-sm leading-6 text-cream/60"><EditableText id="components-Footer-2" scope="site">{"Strategic legal counsel for modern businesses — clear, responsive, and always in your corner."}</EditableText></p>
          <EditableLink contentId="components-Footer-3" scope="site"
            href="#"
            className="mt-5 inline-flex min-h-11 items-center gap-3 font-sans text-sm font-medium tracking-wide text-cream/75 outline-offset-4 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
          ><EditableText id="components-Footer-4" scope="site">{"LinkedIn"}</EditableText><ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </EditableLink>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40"><EditableText id="components-Footer-5" scope="site">{"Quick Links"}</EditableText></p>
          <ul className="mt-5 flex flex-col gap-3">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <EditableLink contentId="components-Footer-6" scope="site" nextLink
                  href={item.href}
                  className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <EditableText id="components-Footer-7" dynamic scope="site">{item.label}</EditableText>
                </EditableLink>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40"><EditableText id="components-Footer-8" scope="site">{"Expertise"}</EditableText></p>
          <ul className="mt-5 flex flex-col gap-3">
            {practiceAreas.map((item) => (
              <li key={item.slug}>
                <EditableLink contentId="components-Footer-9" scope="site" nextLink
                  href={`/services#${item.slug}`}
                  className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <EditableText id="components-Footer-10" dynamic scope="site">{item.title}</EditableText>
                </EditableLink>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40"><EditableText id="components-Footer-11" scope="site">{"Contact"}</EditableText></p>
          <ul className="mt-5 flex flex-col gap-3 font-sans text-sm text-cream/70">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              <EditableLink contentId="components-Footer-12" scope="site" href="mailto:info@aviralaw.com" className="transition-colors hover:text-cream"><EditableText id="components-Footer-13" scope="site">{"info@aviralaw.com"}</EditableText></EditableLink>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-rust" strokeWidth={1.5} />
              <EditableLink contentId="components-Footer-14" scope="site" href="tel:+919818893922" className="transition-colors hover:text-cream">
                +91 – 9818893922
              </EditableLink>
            </li>
            <li className="flex items-center gap-3">
              <MapPin
                className="h-4 w-4 shrink-0 text-rust"
                strokeWidth={1.5}
              /><EditableText id="components-Footer-15" scope="site">{"Delhi NCR, India"}</EditableText></li>
          </ul>
        </StaggerItem>

        <StaggerItem>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/40"><EditableText id="components-Footer-16" scope="site">{"Newsletter"}</EditableText></p>
          {subscribed ? (
            <p className="mt-5 font-sans text-sm text-cream/70"><EditableText id="components-Footer-17" scope="site">{"Thanks for subscribing."}</EditableText></p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Your email"
                autoComplete="email"
                className="w-full border-b border-cream/25 bg-transparent pb-2 font-sans text-sm text-cream placeholder:text-cream/30 focus:border-cream focus:outline-none"
              />
              <button
                type="submit"
                className="w-fit cursor-pointer border border-cream/30 px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors duration-300 hover:bg-cream hover:text-slate"
              ><EditableText id="components-Footer-18" scope="site">{"Subscribe"}</EditableText></button>
            </form>
          )}
        </StaggerItem>
      </div>

      <StaggerItem className="mt-16 flex flex-col items-center gap-4 border-t border-cream/10 pt-8 text-center">
        <p className="font-sans text-xs text-cream/40"><EditableText id="components-Footer-19" scope="site">{"© 2026. Avira Law. All rights reserved."}</EditableText></p>
        <div className="flex justify-center gap-6">
          <EditableLink contentId="components-Footer-20" scope="site" nextLink
            href="/disclaimer"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          ><EditableText id="components-Footer-21" scope="site">{"Disclaimer"}</EditableText></EditableLink>
          <EditableLink contentId="components-Footer-22" scope="site" nextLink
            href="/privacy-policy"
            className="font-sans text-xs text-cream/40 transition-colors hover:text-cream"
          ><EditableText id="components-Footer-23" scope="site">{"Privacy Policy"}</EditableText></EditableLink>
        </div>
      </StaggerItem>
    </AnimatedSection>
  );
}
