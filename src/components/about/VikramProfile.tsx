import Image from "next/image";
import { Mail } from "lucide-react";
import { Section } from "@/components/Section";
import { StaggerItem } from "@/components/motion/StaggerItem";

const VIKRAM_EMAIL = "info@aviralaw.com";
const VIKRAM_LINKEDIN = "https://www.linkedin.com/in/shah-vikram/";
const VIKRAM_PHOTO = "/img.jpg";
export const VIKRAM_BIO =
  "Vikram has more than eleven years of experience in dispute resolution, with a practice focused on domestic and international arbitration, white-collar matters, investigations and regulatory enforcement.";
const INDICATIVE_WORK: string[] = [];

const credentials = [
  {
    label: "Education",
    value: "B.B.A., LL.B., Symbiosis Law School, Noida (2015)",
  },
  { label: "Admission", value: "Advocate, Bar Council of India (2015)" },
  { label: "Experience", value: "11 years" },
];

export function VikramProfile() {
  return (
    <Section
      theme="dark"
      topLine
      stagger
      staggerChildren={0.15}
      className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20"
    >
      <StaggerItem variant="slideInLeft" className="lg:col-span-4">
        <div className="relative aspect-4/5 w-full max-w-sm overflow-hidden">
          <Image
            src={VIKRAM_PHOTO}
            alt="Vikram Shah, Founding Partner"
            fill
            sizes="(min-width: 1024px) 30vw, 80vw"
            className="object-cover grayscale"
          />
        </div>
      </StaggerItem>

      <StaggerItem className="lg:col-span-8">
        <p
          id="vikram"
          className="scroll-mt-32 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cream/60"
        >
          Leadership
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Vikram Shah
        </h2>
        <p className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/50">
          Founding Partner
        </p>

        <p className="mt-10 font-serif text-2xl leading-[1.4] text-cream sm:text-[1.75rem]">
          {VIKRAM_BIO}
        </p>

        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.label}>
              <dt className="font-sans text-xs uppercase tracking-[0.15em] text-cream/35">
                {c.label}
              </dt>
              <dd className="mt-1 font-sans text-sm leading-6 text-cream/75">
                {c.value}
              </dd>
            </div>
          ))}
        </dl>

        {INDICATIVE_WORK.length > 0 && (
          <div className="mt-10">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-cream/50">
              Indicative work
            </p>
            <ul className="mt-4 flex flex-col divide-y divide-cream/10">
              {INDICATIVE_WORK.map((item) => (
                <li key={item} className="flex gap-3 py-3.5">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cream/40"
                    aria-hidden
                  />
                  <span className="font-sans text-sm leading-6 text-cream/70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${VIKRAM_EMAIL}`}
            className="inline-flex items-center gap-2 border border-cream/25 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            Email Vikram
          </a>
          <a
            href={VIKRAM_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-cream/25 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            View LinkedIn profile
            <span aria-hidden>↗</span>
          </a>
        </div>
      </StaggerItem>
    </Section>
  );
}
