import { EditableText, EditableLink } from "@/components/cms/Editable";
import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { BrandWatermark } from "@/components/BrandWatermark";
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
        <Section theme="light" size="spacious" stagger className="isolate overflow-hidden lg:flex lg:min-h-[46rem] lg:flex-col lg:justify-center">
          <BrandWatermark tone="deep-teal" />
          <div className="mx-auto grid w-full max-w-[88rem] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20 xl:gap-28">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-join-us-page-1">{"Join Us"}</EditableText></p>
              <h1 className="mt-5 font-serif text-6xl leading-[1.05] tracking-tight text-ink sm:text-7xl xl:text-8xl"><EditableText id="app-join-us-page-2">{"Working"}</EditableText><br /><EditableText id="app-join-us-page-3">{"at "}</EditableText><span className="italic text-forest"><EditableText id="app-join-us-page-4">{"Avira"}</EditableText></span>
              </h1>
              <EditableLink contentId="app-join-us-page-5"
                href="#join-avira"
                className="mt-9 inline-flex items-center gap-5 font-sans text-xs font-medium text-forest outline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-forest lg:mt-14"
              ><EditableText id="app-join-us-page-6">{"Explore opportunities "}</EditableText><ArrowDown aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              </EditableLink>
            </StaggerItem>
            <div className="lg:py-2">
              <StaggerItem>
                <p className="max-w-xl font-serif text-2xl leading-relaxed text-ink sm:text-3xl"><EditableText id="app-join-us-page-7">{"Avira is a firm where the quality of the work and the culture around it matter equally."}</EditableText></p>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-7 max-w-xl font-sans text-sm leading-8 text-ink/75 sm:text-base"><EditableText id="app-join-us-page-8">{"Lawyers are expected to look beyond the immediate task, understand how a matter is developing and contribute to the thinking that shapes it. Avira values curiosity, candour and independent judgment, with responsibility growing alongside experience."}</EditableText></p>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 max-w-xl font-sans text-sm leading-8 text-ink/75 sm:text-base"><EditableText id="app-join-us-page-9">{"The emphasis is on doing demanding, interesting work in an environment where people are encouraged to think, contribute and develop their own point of view."}</EditableText></p>
              </StaggerItem>
            </div>
          </div>
        </Section>

        <Section id="join-avira" theme="ivory" stagger className="scroll-mt-24">
          <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:gap-28">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-forest"><EditableText id="app-join-us-page-10">{"01 / Lawyers"}</EditableText></p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl"><EditableText id="app-join-us-page-11">{"Join Avira"}</EditableText></h2>
            </StaggerItem>
            <div>
              <StaggerItem>
                <p className="max-w-xl font-sans text-base leading-8 text-ink/75"><EditableText id="app-join-us-page-12">{"We welcome applications from lawyers at all levels of experience. If you would like to be considered, please write to"}</EditableText><EditableText id="app-join-us-page-13" dynamic>{" "}</EditableText>
                  <EditableLink contentId="app-join-us-page-14" href={`mailto:${careersEmail}`} className="font-medium text-forest underline decoration-forest/40 underline-offset-4 outline-offset-4 hover:decoration-forest focus-visible:outline-2 focus-visible:outline-forest">
                    <EditableText id="app-join-us-page-15" dynamic>{careersEmail}</EditableText>
                  </EditableLink><EditableText id="app-join-us-page-16" dynamic>{" "}</EditableText><EditableText id="app-join-us-page-17">{"with your CV. A short note about the work that interests you is welcome."}</EditableText></p>
              </StaggerItem>
              <StaggerItem>
                <EditableLink contentId="app-join-us-page-18"
                  href={`mailto:${careersEmail}?subject=Lawyer%20application`}
                  className="mt-9 inline-flex items-center gap-8 bg-forest px-6 py-4 font-sans text-xs font-medium text-cream outline-offset-4 transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-forest motion-reduce:transition-none"
                ><EditableText id="app-join-us-page-19">{"Send your application "}</EditableText><ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </EditableLink>
              </StaggerItem>
            </div>
          </div>
        </Section>

        <Section id="internships" theme="forest" stagger className="isolate">
          <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:gap-28">
            <StaggerItem>
              <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-cream/70"><EditableText id="app-join-us-page-20">{"02 / Law students"}</EditableText></p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl"><EditableText id="app-join-us-page-21">{"Internships"}</EditableText></h2>
            </StaggerItem>
            <div>
              <StaggerItem>
                <p className="max-w-xl font-sans text-base leading-8 text-cream/85"><EditableText id="app-join-us-page-22">{"We welcome internship applications from law students throughout the year. To apply, send your CV, year of study and preferred internship dates to"}</EditableText><EditableText id="app-join-us-page-23" dynamic>{" "}</EditableText>
                  <EditableLink contentId="app-join-us-page-24" href={`mailto:${careersEmail}`} className="font-medium text-cream underline decoration-cream/40 underline-offset-4 outline-offset-4 hover:decoration-cream focus-visible:outline-2 focus-visible:outline-cream">
                    <EditableText id="app-join-us-page-25" dynamic>{careersEmail}</EditableText>
                  </EditableLink>.
                </p>
              </StaggerItem>
              <StaggerItem>
                <EditableLink contentId="app-join-us-page-26"
                  href={`mailto:${careersEmail}?subject=Internship%20application`}
                  className="mt-9 inline-flex items-center gap-8 bg-cream px-6 py-4 font-sans text-xs font-medium text-ink outline-offset-4 transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-cream motion-reduce:transition-none"
                ><EditableText id="app-join-us-page-27">{"Apply for an internship "}</EditableText><ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </EditableLink>
              </StaggerItem>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
