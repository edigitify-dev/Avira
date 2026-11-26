import Image from "next/image";

const logoSources = {
  "deep-teal": "/logo/AVIRA%20LOGO%20FINAL%20icon%20deep%20teal.png",
  sand: "/logo/AVIRA%20LOGO%20FINAL%20icon%20sand.png",
} as const;

export function BrandWatermark({
  tone,
  // Offset the source artwork's empty margins so the visible mark crosses both edges.
  className = "bottom-0 right-0 w-[min(64rem,125vw)] translate-x-[36%] translate-y-[22%]",
}: {
  tone: keyof typeof logoSources;
  className?: string;
}) {
  return (
    <Image
      src={logoSources[tone]}
      alt=""
      aria-hidden="true"
      width={900}
      height={900}
      sizes="(max-width: 820px) 125vw, 1024px"
      className={`pointer-events-none absolute -z-10 select-none object-contain opacity-[0.045] ${className}`}
    />
  );
}
