import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Website studio | Avira Law", template: "%s | Avira Law Admin" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-dvh flex-1 flex-col">{children}</div>;
}
