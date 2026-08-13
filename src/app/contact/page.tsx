import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Avira Law",
  description:
    "Reach Avira Law for competition law counsel — litigation, merger control, compliance, and policy. We respond within one business day.",
};

export default function Contact() {
  return <ContactPage />;
}
