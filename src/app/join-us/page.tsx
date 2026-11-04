import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

const careersEmail = "careers@aviralaw.com";

export const metadata: Metadata = {
  title: "Join Us | Avira Law",
  description:
    "Working at Avira: demanding, interesting work in a culture that values curiosity, candour and independent judgment. Applications welcome from lawyers and law students.",
};

export default function JoinUsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main>
        <Section theme="light" stagger className="pb-20! pt-36! sm:pb-28! sm:pt-44!">
          <div className="mx-auto max-w-7xl">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">Join Us</p>
            </StaggerItem>
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:gap-28">
              <StaggerItem>
                <h1 className="font-serif text-6xl leading-[1.05] tracking-tight text-ink sm:text-7xl xl:text-8xl">
                  Working<br />at <span className="italic text-forest">Avira</span>
                </h1>
                <a
                  href="#join-avira"
                  className="mt-9 inline-flex items-center gap-5 font-sans text-xs font-medium text-forest outline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest lg:mt-14"
                >
                  Explore opportunities <ArrowDown aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </StaggerItem>
              <div>
                <StaggerItem>
                  <p className="max-w-xl font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
                    Avira is a firm where the quality of the work and the culture around it matter equally.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-7 max-w-xl font-sans text-sm leading-8 text-ink/75 sm:text-base">
                    Lawyers are expected to look beyond the immediate task, understand how a matter is developing and contribute to the thinking that shapes it. Avira values curiosity, candour and independent judgment, with responsibility growing alongside experience.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-5 max-w-xl font-sans text-sm leading-8 text-ink/75 sm:text-base">
                    The emphasis is on doing demanding, interesting work in an environment where people are encouraged to think, contribute and develop their own point of view.
                  </p>
                </StaggerItem>
              </div>
            </div>
          </div>
        </Section>

        <Section id="join-avira" theme="ivory" stagger className="scroll-mt-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:gap-28">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest">01 / Lawyers</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">Join Avira</h2>
            </StaggerItem>
            <div>
              <StaggerItem>
                <p className="max-w-xl font-sans text-base leading-8 text-ink/75">
                  We welcome applications from lawyers at all levels of experience. If you would like to be considered, please write to{" "}
                  <a href={`mailto:${careersEmail}`} className="font-medium text-forest underline decoration-forest/40 underline-offset-4 outline-offset-4 hover:decoration-forest focus-visible:outline-2 focus-visible:outline-forest">
                    {careersEmail}
                  </a>{" "}
                  with your CV. A short note about the work that interests you is welcome.
                </p>
              </StaggerItem>
              <StaggerItem>
                <a
                  href={`mailto:${careersEmail}?subject=Lawyer%20application`}
                  className="mt-9 inline-flex items-center gap-8 bg-forest px-6 py-4 font-sans text-xs font-medium text-cream outline-offset-4 transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
                >
                  Send your application <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </StaggerItem>
            </div>
          </div>
        </Section>

        <Section id="internships" theme="forest" stagger>
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:gap-28">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-cream/70">02 / Law students</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">Internships</h2>
            </StaggerItem>
            <div>
              <StaggerItem>
                <p className="max-w-xl font-sans text-base leading-8 text-cream/85">
                  We welcome internship applications from law students throughout the year. To apply, send your CV, year of study and preferred internship dates to{" "}
                  <a href={`mailto:${careersEmail}`} className="font-medium text-cream underline decoration-cream/40 underline-offset-4 outline-offset-4 hover:decoration-cream focus-visible:outline-2 focus-visible:outline-cream">
                    {careersEmail}
                  </a>.
                </p>
              </StaggerItem>
              <StaggerItem>
                <a
                  href={`mailto:${careersEmail}?subject=Internship%20application`}
                  className="mt-9 inline-flex items-center gap-8 bg-cream px-6 py-4 font-sans text-xs font-medium text-ink outline-offset-4 transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
                >
                  Apply for an internship <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </StaggerItem>
            </div>
          </div>
        </Section>
        <CtaSection theme="white" />
      </main>
      <Footer />
    </div>
  );
}
